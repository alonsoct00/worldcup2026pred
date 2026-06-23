import { NextResponse } from 'next/server'

const FOOTBALL_DATA_TOKEN = process.env.FOOTBALL_DATA_TOKEN ?? ''
const GH_PAT = process.env.GH_PAT ?? ''
const GH_OWNER = 'alonsoct00'
const GH_REPO = 'worldcup2026pred'
const GH_FILE = 'src/data/worldcup.ts'
const GH_BRANCH = 'main'

// ── Name normalization ────────────────────────────────────────────────────────

const NAME_MAP: Record<string, string> = {
  'Mexico': 'México', 'South Korea': 'Corea del Sur', 'Korea Republic': 'Corea del Sur',
  'Czech Republic': 'Chequia', 'Czechia': 'Chequia', 'United States': 'USA', 'USA': 'USA',
  'Turkey': 'Türkiye', 'Turkiye': 'Türkiye', 'Ivory Coast': 'Costa de Marfil',
  "Côte d'Ivoire": 'Costa de Marfil', "Cote d'Ivoire": 'Costa de Marfil',
  'Netherlands': 'Países Bajos', 'Belgium': 'Bélgica', 'Germany': 'Alemania',
  'France': 'Francia', 'Spain': 'España', 'England': 'Inglaterra',
  'Argentina': 'Argentina', 'Brazil': 'Brasil', 'Morocco': 'Marruecos',
  'Norway': 'Noruega', 'Sweden': 'Suecia', 'Switzerland': 'Suiza', 'Austria': 'Austria',
  'Croatia': 'Croacia', 'Scotland': 'Escocia', 'Algeria': 'Argelia',
  'Saudi Arabia': 'Arabia Saudita', 'Cape Verde': 'Cabo Verde', 'Cape Verde Islands': 'Cabo Verde',
  'Uruguay': 'Uruguay', 'Ecuador': 'Ecuador', 'Colombia': 'Colombia', 'Paraguay': 'Paraguay',
  'Australia': 'Australia', 'Japan': 'Japón', 'Iran': 'Irán', 'Senegal': 'Senegal',
  'Ghana': 'Ghana', 'Egypt': 'Egipto', 'Tunisia': 'Túnez', 'New Zealand': 'Nueva Zelanda',
  'Bosnia and Herzegovina': 'Bosnia', 'Bosnia & Herzegovina': 'Bosnia', 'Bosnia-Herzegovina': 'Bosnia',
  'DR Congo': 'RD Congo', 'Democratic Republic of Congo': 'RD Congo', 'Congo DR': 'RD Congo',
  'Uzbekistan': 'Uzbekistán', 'Jordan': 'Jordania', 'Iraq': 'Iraq', 'Qatar': 'Qatar',
  'Canada': 'Canadá', 'Haiti': 'Haití', 'Panama': 'Panamá', 'Curacao': 'Curazao',
  'Curaçao': 'Curazao', 'South Africa': 'Sudáfrica', 'Serbia': 'Serbia',
  'Portugal': 'Portugal',
}

function normalizeTeam(name: string): string {
  if (!name) return name
  return NAME_MAP[name] ?? name
}

// ── Interfaces ────────────────────────────────────────────────────────────────

interface APIMatch {
  home: string; away: string
  homeScore: number | null; awayScore: number | null
  status: 'played' | 'live' | 'upcoming'
  extra?: 'AET' | 'PEN'
  homeYellow?: number; awayYellow?: number; homeRed?: number; awayRed?: number
  utcDate?: string
}

interface TeamStats {
  name: string; flag: string
  played: number; w: number; d: number; l: number; gf: number; ga: number; pts: number
}

interface MatchLike {
  home: string; away: string
  homeScore: number | null; awayScore: number | null
  status: string; result: string | null; extra?: string
  homeYellow?: number; awayYellow?: number; homeRed?: number; awayRed?: number
  [key: string]: unknown
}

interface GroupLike {
  id: string; label: string
  teams: TeamStats[]
  matches: MatchLike[]
  projected: string[]
}

interface KnockoutLike extends MatchLike {
  id: string; round: string
  homeFlag: string; awayFlag: string
  homePrediction: number; awayPrediction: number
  winner: string | null; winnerFlag: string | null
  date?: string
}

interface NewsItem {
  id: string; date: string
  tag: 'lesion' | 'tarjeta' | 'resultado' | 'sorpresa' | 'estadistica'
  title: string; body: string
}

// ── Fetch from ESPN (primary — no API key required) ──────────────────────────

async function fetchMatchesFromESPN(): Promise<APIMatch[]> {
  const ranges = ['20260611-20260627', '20260628-20260719']
  const allMatches: APIMatch[] = []

  for (const range of ranges) {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${range}`,
      { next: { revalidate: 0 } }
    )
    if (!res.ok) throw new Error(`ESPN returned ${res.status} for range ${range}`)
    const data = await res.json() as any

    for (const event of (data.events ?? [])) {
      const comp = event.competitions?.[0]
      if (!comp) continue
      const espnStatus: string = comp.status?.type?.name ?? ''
      const state: string = comp.status?.type?.state ?? ''

      let status: APIMatch['status']
      if (state === 'post') status = 'played'
      else if (state === 'in') status = 'live'
      else status = 'upcoming'

      let extra: 'AET' | 'PEN' | undefined
      if (espnStatus.includes('AET') || espnStatus.includes('EXTRA_TIME') || comp.status?.period === 3 || comp.status?.period === 4) extra = 'AET'
      if (espnStatus.includes('PEN') || espnStatus.includes('SHOOTOUT') || comp.status?.period === 5) extra = 'PEN'

      const home = (comp.competitors ?? []).find((c: any) => c.homeAway === 'home')
      const away = (comp.competitors ?? []).find((c: any) => c.homeAway === 'away')
      if (!home || !away) continue

      const match: APIMatch = {
        home: normalizeTeam(home.team?.displayName ?? ''),
        away: normalizeTeam(away.team?.displayName ?? ''),
        homeScore: status !== 'upcoming' ? (parseInt(home.score ?? '') || 0) : null,
        awayScore: status !== 'upcoming' ? (parseInt(away.score ?? '') || 0) : null,
        status,
        utcDate: event.date,
      }
      if (extra) match.extra = extra
      allMatches.push(match)
    }
  }
  return allMatches
}

// ── Fetch from football-data.org (fallback) ───────────────────────────────────

async function fetchMatchesFromFootballData(): Promise<APIMatch[]> {
  const res = await fetch('https://api.football-data.org/v4/competitions/WC/matches?season=2026', {
    headers: { 'X-Auth-Token': FOOTBALL_DATA_TOKEN },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`football-data.org returned ${res.status}`)
  const data = await res.json() as any
  return (data.matches ?? []).map((m: any) => {
    const rawStatus: string = m.status ?? ''
    const status: APIMatch['status'] =
      rawStatus === 'FINISHED' ? 'played' :
      rawStatus === 'IN_PLAY' || rawStatus === 'PAUSED' ? 'live' : 'upcoming'
    let extra: 'AET' | 'PEN' | undefined
    if (m.score?.penalties?.home != null) extra = 'PEN'
    else if (m.score?.extraTime?.home != null) extra = 'AET'
    const match: APIMatch = {
      home: normalizeTeam(m.homeTeam?.name ?? ''),
      away: normalizeTeam(m.awayTeam?.name ?? ''),
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      status,
      utcDate: m.utcDate,
    }
    if (extra) match.extra = extra
    return match
  })
}

async function fetchMatches(): Promise<{ matches: APIMatch[]; source: string }> {
  try {
    const matches = await fetchMatchesFromESPN()
    return { matches, source: 'espn' }
  } catch (espnErr) {
    console.warn(`[sync] ESPN failed: ${(espnErr as Error).message} — falling back to football-data.org`)
    const matches = await fetchMatchesFromFootballData()
    return { matches, source: 'football-data' }
  }
}

// ── GitHub helpers ────────────────────────────────────────────────────────────

async function getFileSha(): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`,
    { headers: { Authorization: `Bearer ${GH_PAT}`, Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) throw new Error(`GitHub GET file returned ${res.status}`)
  const data = await res.json() as any
  return { content: Buffer.from(data.content, 'base64').toString('utf-8'), sha: data.sha }
}

async function commitFile(content: string, sha: string, message: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GH_PAT}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, 'utf-8').toString('base64'),
        sha,
        branch: GH_BRANCH,
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub commit failed ${res.status}: ${err.substring(0, 200)}`)
  }
}

// ── Parse worldcup.ts ─────────────────────────────────────────────────────────

function extractBlock(src: string, exportName: string): string {
  const pattern = new RegExp(`export const ${exportName}[^=]+=\\s*`)
  const match = pattern.exec(src)
  if (!match) return '[]'
  const start = match.index + match[0].length
  let depth = 0; let i = start
  while (i < src.length) {
    if (src[i] === '[' || src[i] === '{') depth++
    if (src[i] === ']' || src[i] === '}') { depth--; if (depth === 0) return src.slice(start, i + 1) }
    i++
  }
  return '[]'
}

function parseCurrentData(src: string): { groups: GroupLike[]; knockoutMatches: KnockoutLike[]; news: NewsItem[] } {
  // eslint-disable-next-line no-new-func
  const evalSafe = (code: string) => new Function(`return (${code})`)()
  return {
    groups: evalSafe(extractBlock(src, 'groups')),
    knockoutMatches: evalSafe(extractBlock(src, 'knockoutMatches')),
    news: evalSafe(extractBlock(src, 'news')),
  }
}

function extractTypeBlock(src: string): string {
  const start = src.indexOf('export type MatchStatus')
  if (start === -1) return ''
  const end = src.indexOf('// ─── NEWS')
  if (end === -1) return src.slice(start)
  return src.slice(start, end).trimEnd()
}

// ── Apply scores ──────────────────────────────────────────────────────────────

function applyApiMatch(match: MatchLike, api: APIMatch): boolean {
  if (api.status !== 'played' && api.status !== 'live') return false
  if (api.homeScore == null || api.awayScore == null) return false

  const changed =
    match.homeScore !== api.homeScore ||
    match.awayScore !== api.awayScore ||
    match.status !== api.status

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
  return changed
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
      const home = stats[m.home]; const away = stats[m.away]
      if (!home || !away) continue
      home.played++; away.played++
      home.gf += m.homeScore; home.ga += m.awayScore
      away.gf += m.awayScore; away.ga += m.homeScore
      if (m.homeScore > m.awayScore) { home.w++; home.pts += 3; away.l++ }
      else if (m.homeScore < m.awayScore) { away.w++; away.pts += 3; home.l++ }
      else { home.d++; away.d++; home.pts++; away.pts++ }
    }
    group.teams = group.teams.map(t => stats[t.name] ?? t)
  }
}

// ── Auto news from results ────────────────────────────────────────────────────

function generateNewsFromResults(
  apiMatches: APIMatch[],
  existingNews: NewsItem[],
): NewsItem[] {
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  const maxId = existingNews.reduce((max, n) => {
    const num = parseInt((n.id ?? '').replace(/\D/g, '')) || 0
    return Math.max(max, num)
  }, 0)

  const recentPlayed = apiMatches.filter(m =>
    m.status === 'played' &&
    m.utcDate &&
    (m.utcDate.startsWith(today) || m.utcDate.startsWith(yesterday))
  )

  const newItems: NewsItem[] = []
  let idx = 0

  for (const m of recentPlayed) {
    if (!m.home || !m.away || m.homeScore == null || m.awayScore == null) continue

    const alreadyExists = existingNews.some(n =>
      n.title.toLowerCase().includes(m.home.toLowerCase()) &&
      n.title.toLowerCase().includes(m.away.toLowerCase())
    ) || newItems.some(n =>
      n.title.toLowerCase().includes(m.home.toLowerCase()) &&
      n.title.toLowerCase().includes(m.away.toLowerCase())
    )
    if (alreadyExists) continue

    const score = `${m.homeScore}–${m.awayScore}`
    const margin = Math.abs(m.homeScore - m.awayScore)
    const isDraw = m.homeScore === m.awayScore
    const winner = isDraw ? null : (m.homeScore > m.awayScore ? m.home : m.away)
    const suffix = m.extra === 'PEN' ? ' (pen.)' : m.extra === 'AET' ? ' (p.e.)' : ''

    let title: string
    let body: string
    let tag: NewsItem['tag'] = 'resultado'

    if (isDraw) {
      title = `${m.home} ${score} ${m.away}: empate`
      body = `El partido terminó igualado ${score}. Ambos equipos suman 1 punto.`
    } else {
      title = `${m.home} ${score} ${m.away}${suffix}`
      body = `${winner} suma 3 puntos con marcador ${score}${suffix ? ` ${suffix}` : ''}.`
      if (margin >= 4) tag = 'sorpresa'
    }

    const matchDate = m.utcDate ? m.utcDate.slice(0, 10) : today
    newItems.push({ id: `n${maxId + idx + 1}`, date: matchDate, tag, title, body })
    idx++
  }

  return newItems
}

// ── Serialization ─────────────────────────────────────────────────────────────

function serializeGroups(groups: GroupLike[]): string {
  const items = groups.map(g => {
    const teams = g.teams.map(t =>
      `      { name: ${JSON.stringify(t.name)}, flag: ${JSON.stringify(t.flag)}, played: ${t.played}, w: ${t.w}, d: ${t.d}, l: ${t.l}, gf: ${t.gf}, ga: ${t.ga}, pts: ${t.pts} }`
    ).join(',\n')
    const matches = g.matches.map(m => {
      const parts: string[] = []
      for (const [k, v] of Object.entries(m)) {
        if (v === undefined) continue
        parts.push(`${k}:${typeof v === 'string' ? JSON.stringify(v) : v === null ? 'null' : v}`)
      }
      return `      { ${parts.join(', ')} }`
    }).join(',\n')
    return `  {\n    id: ${JSON.stringify(g.id)}, label: ${JSON.stringify(g.label)},\n    teams: [\n${teams},\n    ],\n    projected: ${JSON.stringify(g.projected)},\n    matches: [\n${matches},\n    ]\n  }`
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
  const items = news.map(n =>
    `  { id:${JSON.stringify(n.id)}, date:${JSON.stringify(n.date)}, tag:${JSON.stringify(n.tag)},\n    title:${JSON.stringify(n.title)},\n    body:${JSON.stringify(n.body)}\n  }`
  )
  return `[\n${items.join(',\n')}\n]`
}

// ── Build updated file content ────────────────────────────────────────────────

function buildUpdatedContent(
  src: string,
  apiMatches: APIMatch[],
): { content: string; updated: number; newNews: number } {
  const { groups, knockoutMatches, news } = parseCurrentData(src)
  const typeBlock = extractTypeBlock(src)

  const apiByKey = new Map<string, APIMatch>()
  for (const m of apiMatches) {
    if (m.home && m.away) apiByKey.set(`${m.home}|${m.away}`, m)
  }

  let updated = 0

  for (const group of groups) {
    for (const match of group.matches) {
      const api = apiByKey.get(`${match.home}|${match.away}`)
      if (api && applyApiMatch(match, api)) updated++
    }
  }
  for (const match of knockoutMatches) {
    const api = apiByKey.get(`${match.home}|${match.away}`)
    if (api && applyApiMatch(match, api)) updated++
  }

  recalcStandings(groups)

  const generatedNews = generateNewsFromResults(apiMatches, news)
  const mergedNews = [...generatedNews, ...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 25)

  const timestamp = new Date().toISOString()
  const content = `// src/data/worldcup.ts
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

  return { content, updated, newNews: generatedNews.length }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { matches: apiMatches, source } = await fetchMatches()
    const played = apiMatches.filter(m => m.status === 'played').length
    const live = apiMatches.filter(m => m.status === 'live').length

    const { content: currentContent, sha } = await getFileSha()
    const { content: newContent, updated, newNews } = buildUpdatedContent(currentContent, apiMatches)

    const hasChanges = updated > 0 || newNews > 0
    if (hasChanges) {
      const parts: string[] = []
      if (updated > 0) parts.push(`${updated} score(s)`)
      if (newNews > 0) parts.push(`${newNews} news`)
      await commitFile(newContent, sha, `sync: ${parts.join(', ')} via ${source} [auto]`)
    }

    return NextResponse.json({
      ok: true,
      source,
      matchesFetched: apiMatches.length,
      playedMatches: played,
      liveMatches: live,
      matchesUpdated: updated,
      newNewsItems: newNews,
      committed: hasChanges,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[sync]', err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}

export async function GET() {
  return POST(new Request('http://localhost', { method: 'POST' }))
}
