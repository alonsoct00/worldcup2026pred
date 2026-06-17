import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { normalizeTeam } from './normalize.js'
import type { APIMatch } from './api-fetch.js'
import type { Extraction, NewsItem } from './claude-extract.js'

export interface WriteSummary {
  matchesUpdated: number
  newNewsItems: number
  suspensionNotes: number
  injuryNotes: number
}

const WORLDCUP_PATH = join(process.cwd(), 'src/data/worldcup.ts')

// ── Helpers ──────────────────────────────────────────────────────────────────

function matchKey(home: string, away: string): string {
  return `${normalizeTeam(home)}|${normalizeTeam(away)}`
}

interface MatchLike {
  home: string
  away: string
  homeScore: number | null
  awayScore: number | null
  status: string
  result: string | null
  extra?: string
  notes?: string
  homeYellow?: number
  awayYellow?: number
  homeRed?: number
  awayRed?: number
  [key: string]: unknown
}

interface TeamStats {
  name: string
  flag: string
  played: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  pts: number
}

interface GroupLike {
  id: string
  label: string
  teams: TeamStats[]
  matches: MatchLike[]
  projected: string[]
}

interface KnockoutLike extends MatchLike {
  id: string
  round: string
  homeFlag: string
  awayFlag: string
  homePrediction: number
  awayPrediction: number
  winner: string | null
  winnerFlag: string | null
  date?: string
}

// ── Parse current worldcup.ts ─────────────────────────────────────────────────

function extractBlock(src: string, exportName: string): string {
  const pattern = new RegExp(`export const ${exportName}[^=]+=\\s*`)
  const match = pattern.exec(src)
  if (!match) return '[]'
  const start = match.index + match[0].length
  let depth = 0
  let i = start
  while (i < src.length) {
    if (src[i] === '[' || src[i] === '{') depth++
    if (src[i] === ']' || src[i] === '}') {
      depth--
      if (depth === 0) return src.slice(start, i + 1)
    }
    i++
  }
  return '[]'
}

function parseCurrentData(src: string): { groups: GroupLike[]; knockoutMatches: KnockoutLike[]; news: NewsItem[] } {
  // Use a sandboxed eval to parse the TypeScript data structures
  // We extract the raw JS object literals and evaluate them
  const groupsBlock = extractBlock(src, 'groups')
  const knockoutBlock = extractBlock(src, 'knockoutMatches')
  const newsBlock = extractBlock(src, 'news')

  // eslint-disable-next-line no-new-func
  const evalSafe = (code: string) => new Function(`return (${code})`)()

  try {
    return {
      groups: evalSafe(groupsBlock),
      knockoutMatches: evalSafe(knockoutBlock),
      news: evalSafe(newsBlock),
    }
  } catch (err) {
    throw new Error(`Failed to parse worldcup.ts: ${(err as Error).message}`)
  }
}

// ── Match updating ────────────────────────────────────────────────────────────

function applyApiMatch(match: MatchLike, api: APIMatch): boolean {
  if (api.status !== 'played' && api.status !== 'live') return false
  if (api.homeScore == null || api.awayScore == null) return false

  match.homeScore = api.homeScore
  match.awayScore = api.awayScore
  match.status = api.status
  match.result = api.status === 'played'
    ? (api.homeScore > api.awayScore ? 'home' : api.awayScore > api.homeScore ? 'away' : 'draw')
    : null
  if (api.extra) match.extra = api.extra
  if (api.homeYellow != null) match.homeYellow = api.homeYellow
  if (api.awayYellow != null) match.awayYellow = api.awayYellow
  if (api.homeRed != null) match.homeRed = api.homeRed
  if (api.awayRed != null) match.awayRed = api.awayRed
  return true
}

// ── Standings recalculation ───────────────────────────────────────────────────

function recalcStandings(groups: GroupLike[]): void {
  for (const group of groups) {
    const stats: Record<string, TeamStats> = {}
    for (const t of group.teams) {
      stats[t.name] = { ...t, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    }

    for (const m of group.matches) {
      if (m.status !== 'played' || m.homeScore == null || m.awayScore == null) continue
      const home = stats[m.home]
      const away = stats[m.away]
      if (!home || !away) continue

      home.played++
      away.played++
      home.gf += m.homeScore
      home.ga += m.awayScore
      away.gf += m.awayScore
      away.ga += m.homeScore

      if (m.homeScore > m.awayScore) {
        home.w++; home.pts += 3; away.l++
      } else if (m.homeScore < m.awayScore) {
        away.w++; away.pts += 3; home.l++
      } else {
        home.d++; away.d++; home.pts++; away.pts++
      }
    }

    group.teams = group.teams.map(t => stats[t.name] ?? t)
  }
}

// ── Serialization ─────────────────────────────────────────────────────────────

function jsonToTs(val: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)

  if (val === null) return 'null'
  if (val === undefined) return 'undefined'
  if (typeof val === 'string') return JSON.stringify(val)
  if (typeof val === 'number' || typeof val === 'boolean') return String(val)

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]'
    const items = val.map(v => `${pad1}${jsonToTs(v, indent + 1)}`).join(',\n')
    return `[\n${items},\n${pad}]`
  }

  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const props = entries
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${pad1}${k}: ${jsonToTs(v, indent + 1)}`)
      .join(', ')
    // Inline small match-like objects for readability
    if ((val as MatchLike).id && entries.length < 20) {
      return `{ ${props.replace(/\n\s*/g, ' ')} }`
    }
    return `{\n${pad1}${Object.entries(val as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}: ${jsonToTs(v, indent + 1)}`)
      .join(`, ${pad1}`)}\n${pad}}`
  }

  return JSON.stringify(val)
}

function serializeGroups(groups: GroupLike[]): string {
  const items = groups.map(g => {
    const teams = g.teams.map(t => `      { name: ${JSON.stringify(t.name)}, flag: ${JSON.stringify(t.flag)}, played: ${t.played}, w: ${t.w}, d: ${t.d}, l: ${t.l}, gf: ${t.gf}, ga: ${t.ga}, pts: ${t.pts} }`).join(',\n')
    const matches = g.matches.map(m => {
      const parts: string[] = []
      for (const [k, v] of Object.entries(m)) {
        if (v === undefined) continue
        parts.push(`${k}:${typeof v === 'string' ? JSON.stringify(v) : v === null ? 'null' : typeof v === 'boolean' ? v : v}`)
      }
      return `      { ${parts.join(', ')} }`
    }).join(',\n')
    const projected = JSON.stringify(g.projected)
    return `  {\n    id: ${JSON.stringify(g.id)}, label: ${JSON.stringify(g.label)},\n    teams: [\n${teams},\n    ],\n    projected: ${projected},\n    matches: [\n${matches},\n    ]\n  }`
  })
  return `[\n${items.join(',\n')}\n]`
}

function serializeKnockout(matches: KnockoutLike[]): string {
  const items = matches.map(m => {
    const parts: string[] = []
    for (const [k, v] of Object.entries(m)) {
      if (v === undefined) continue
      parts.push(`${k}:${typeof v === 'string' ? JSON.stringify(v) : v === null ? 'null' : v}`)
    }
    return `  { ${parts.join(', ')} }`
  })
  return `[\n${items.join(',\n')}\n]`
}

function serializeNews(news: NewsItem[]): string {
  const items = news.map(n => {
    return `  { id:${JSON.stringify(n.id)}, date:${JSON.stringify(n.date)}, tag:${JSON.stringify(n.tag)},\n    title:${JSON.stringify(n.title)},\n    body:${JSON.stringify(n.body)}\n  }`
  })
  return `[\n${items.join(',\n')}\n]`
}

// ── Type definitions block (extracted verbatim from source) ──────────────────

function extractTypeBlock(src: string): string {
  const start = src.indexOf('export type MatchStatus')
  if (start === -1) return ''
  const end = src.indexOf('// ─── NEWS')
  if (end === -1) return src.slice(start)
  return src.slice(start, end).trimEnd()
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function writeWorldcupTs(
  apiMatches: APIMatch[],
  extracted: Extraction,
  dryRun = false
): Promise<WriteSummary> {
  const src = readFileSync(WORLDCUP_PATH, 'utf-8')
  const { groups, knockoutMatches, news } = parseCurrentData(src)
  const typeBlock = extractTypeBlock(src)

  // Build lookup
  const apiByKey = new Map<string, APIMatch>()
  for (const m of apiMatches) apiByKey.set(`${m.home}|${m.away}`, m)

  let matchesUpdated = 0

  // Update group matches
  for (const group of groups) {
    for (const match of group.matches) {
      const key = matchKey(match.home, match.away)
      const api = apiByKey.get(key)
      if (api && applyApiMatch(match, api)) matchesUpdated++
    }
  }

  // Update knockout matches
  for (const match of knockoutMatches) {
    const key = matchKey(match.home, match.away)
    const api = apiByKey.get(key)
    if (api && applyApiMatch(match, api)) matchesUpdated++
  }

  // Recalculate standings
  recalcStandings(groups)

  // Apply suspension notes
  let suspensionNotes = 0
  for (const susp of extracted.suspensions) {
    const teamName = normalizeTeam(susp.team)
    for (const group of groups) {
      for (const match of group.matches) {
        if (match.status !== 'upcoming') continue
        if (normalizeTeam(match.home) !== teamName && normalizeTeam(match.away) !== teamName) continue
        const note = ` | 🟥 ${susp.player} suspendido`
        if (!(match.notes ?? '').includes(susp.player)) {
          match.notes = (match.notes ?? '') + note
          suspensionNotes++
          break
        }
      }
    }
  }

  // Apply injury notes
  let injuryNotes = 0
  for (const inj of extracted.injuries) {
    if (!inj.affectsNextMatch) continue
    const teamName = normalizeTeam(inj.team)
    for (const group of groups) {
      for (const match of group.matches) {
        if (match.status !== 'upcoming') continue
        if (normalizeTeam(match.home) !== teamName && normalizeTeam(match.away) !== teamName) continue
        const note = ` | ⚠️ ${inj.player} (${inj.status})`
        if (!(match.notes ?? '').includes(inj.player)) {
          match.notes = (match.notes ?? '') + note
          injuryNotes++
          break
        }
      }
    }
  }

  // Merge news
  const today = new Date().toISOString().slice(0, 10)
  const existingTitles = new Set(news.map(n => n.title.toLowerCase()))
  let newNewsItems = 0
  const maxId = news.reduce((max, n) => {
    const num = parseInt((n.id ?? '').replace(/\D/g, '')) || 0
    return Math.max(max, num)
  }, 0)

  for (const item of extracted.newsItems) {
    if (existingTitles.has(item.title.toLowerCase())) continue
    existingTitles.add(item.title.toLowerCase())
    news.push({
      id: `n${maxId + newNewsItems + 1}`,
      date: item.date ?? today,
      tag: item.tag,
      title: item.title,
      body: item.body,
    })
    newNewsItems++
  }

  // Sort news descending by date, keep max 25
  news.sort((a, b) => b.date.localeCompare(a.date))
  const mergedNews = news.slice(0, 25)

  // Generate output
  const timestamp = new Date().toISOString()
  const output = `// src/data/worldcup.ts
// Auto-synced: ${timestamp}
// DO NOT EDIT SCORES MANUALLY — run npm run sync

${typeBlock}

// ─── NEWS / NOVEDADES ───────────────────────────────────────────────────────

export const LAST_UPDATED = "${timestamp}"

export const news: NewsItem[] = ${serializeNews(mergedNews)}

// ─── GRUPOS ─────────────────────────────────────────────────────────────────

export const groups: Group[] = ${serializeGroups(groups)}

// ─── KNOCKOUT BRACKET ───────────────────────────────────────────────────────

export const knockoutMatches: KnockoutMatch[] = ${serializeKnockout(knockoutMatches)}
`

  if (dryRun) {
    console.log('\n[dry-run] Would write worldcup.ts with:')
    console.log(`  - ${matchesUpdated} matches updated`)
    console.log(`  - ${newNewsItems} new news items`)
    console.log(`  - ${suspensionNotes} suspension notes`)
    console.log(`  - ${injuryNotes} injury notes`)
    console.log('\n[dry-run] First 2000 chars of generated file:')
    console.log(output.substring(0, 2000))
  } else {
    writeFileSync(WORLDCUP_PATH, output, 'utf-8')
  }

  return { matchesUpdated, newNewsItems, suspensionNotes, injuryNotes }
}
