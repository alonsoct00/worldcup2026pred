import { NextResponse } from 'next/server'

const FOOTBALL_DATA_TOKEN = process.env.FOOTBALL_DATA_TOKEN ?? ''
const GH_PAT = process.env.GH_PAT ?? ''
const GH_OWNER = 'alonsoct00'
const GH_REPO = 'worldcup2026pred'
const GH_FILE = 'src/data/worldcup.ts'
const GH_BRANCH = 'main'

// ── Helpers ─────────────────────────────────────────────────────────────────

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

interface APIMatch {
  home: string; away: string
  homeScore: number | null; awayScore: number | null
  status: 'played' | 'live' | 'upcoming'
  extra?: 'AET' | 'PEN'
  homeYellow?: number; awayYellow?: number; homeRed?: number; awayRed?: number
}

async function fetchMatches(): Promise<APIMatch[]> {
  const res = await fetch('https://api.football-data.org/v4/competitions/WC/matches?season=2026', {
    headers: { 'X-Auth-Token': FOOTBALL_DATA_TOKEN },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`football-data.org returned ${res.status}`)
  const data = await res.json() as any
  return (data.matches ?? []).map((m: any) => {
    const rawStatus: string = m.status ?? ''
    const status = rawStatus === 'FINISHED' ? 'played' : rawStatus === 'IN_PLAY' || rawStatus === 'PAUSED' ? 'live' : 'upcoming'
    let extra: 'AET' | 'PEN' | undefined
    if (m.score?.penalties?.home != null) extra = 'PEN'
    else if (m.score?.extraTime?.home != null) extra = 'AET'
    const match: APIMatch = {
      home: normalizeTeam(m.homeTeam?.name ?? ''),
      away: normalizeTeam(m.awayTeam?.name ?? ''),
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      status,
    }
    if (extra) match.extra = extra
    return match
  })
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

// ── Data update logic ────────────────────────────────────────────────────────

interface MatchLike {
  home: string; away: string
  homeScore: number | null; awayScore: number | null
  status: string; result: string | null; extra?: string
  homeYellow?: number; awayYellow?: number; homeRed?: number; awayRed?: number
  [key: string]: unknown
}

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
  return true
}

// Minimal regex-based score patch — avoids full TS parse/serialize
function patchScores(src: string, apiMatches: APIMatch[]): { content: string; updated: number } {
  let content = src
  let updated = 0

  const apiByKey = new Map<string, APIMatch>()
  for (const m of apiMatches) {
    if (m.home && m.away) apiByKey.set(`${m.home}|${m.away}`, m)
  }

  // Match lines like: { id:"X1", home:"Argentina", away:"Argelia", ..., homeScore:2, awayScore:0, ... status:"played"|"upcoming" ... }
  content = content.replace(
    /(\{ id:"[^"]+",\s*(?:round:"[^"]+",\s*)?home:"([^"]+)",\s*away:"([^"]+)",[^}]+?\})/g,
    (block, _full, home, away) => {
      const api = apiByKey.get(`${home}|${away}`)
      if (!api || (api.status !== 'played' && api.status !== 'live')) return block
      if (api.homeScore == null || api.awayScore == null) return block

      const result = api.homeScore > api.awayScore ? 'home' : api.awayScore > api.homeScore ? 'away' : 'draw'

      let patched = block
        .replace(/homeScore:\s*(?:\d+|null)/, `homeScore:${api.homeScore}`)
        .replace(/awayScore:\s*(?:\d+|null)/, `awayScore:${api.awayScore}`)
        .replace(/status:\s*"[^"]+"/, `status:"${api.status}"`)
        .replace(/result:\s*(?:"[^"]+"|null)/, `result:"${result}"`)

      if (patched !== block) updated++
      return patched
    }
  )

  // Update LAST_UPDATED timestamp
  const timestamp = new Date().toISOString()
  content = content.replace(/export const LAST_UPDATED = "[^"]+"/, `export const LAST_UPDATED = "${timestamp}"`)

  return { content, updated }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // Simple secret check for cron calls
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Fetch from API
    const apiMatches = await fetchMatches()
    const played = apiMatches.filter(m => m.status === 'played').length

    // 2. Get current file from GitHub
    const { content: currentContent, sha } = await getFileSha()

    // 3. Patch scores
    const { content: newContent, updated } = patchScores(currentContent, apiMatches)

    // 4. Commit only if something changed
    if (updated > 0) {
      await commitFile(newContent, sha, `sync: update ${updated} match result(s) [auto]`)
    }

    return NextResponse.json({
      ok: true,
      matchesFetched: apiMatches.length,
      playedMatches: played,
      matchesUpdated: updated,
      committed: updated > 0,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[sync]', err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}

// Allow GET for easy browser testing
export async function GET() {
  return POST(new Request('http://localhost', { method: 'POST' }))
}
