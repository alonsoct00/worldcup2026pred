import { normalizeTeam } from './normalize.js'

// ── ESPN API ──────────────────────────────────────────────────────────────────

async function fetchFromESPN(): Promise<APIMatch[]> {
  // Group stage: Jun 11–27. Knockout: Jun 28–Jul 19.
  const ranges = [
    '20260611-20260627',
    '20260628-20260719',
  ]
  const allMatches: APIMatch[] = []

  for (const range of ranges) {
    const res = await fetchWithTimeout(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${range}`,
      {},
      12000
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

      // Detect AET / PEN from status type name
      let extra: 'AET' | 'PEN' | undefined
      if (espnStatus.includes('AET') || espnStatus.includes('EXTRA_TIME') || comp.status?.period === 3 || comp.status?.period === 4) {
        extra = 'AET'
      }
      if (espnStatus.includes('PEN') || espnStatus.includes('SHOOTOUT') || comp.status?.period === 5) {
        extra = 'PEN'
      }

      const home = comp.competitors?.find((c: any) => c.homeAway === 'home')
      const away = comp.competitors?.find((c: any) => c.homeAway === 'away')
      if (!home || !away) continue

      const homeScore = status !== 'upcoming' ? (parseInt(home.score ?? '') || 0) : null
      const awayScore = status !== 'upcoming' ? (parseInt(away.score ?? '') || 0) : null

      const match: APIMatch = {
        home: normalizeTeam(home.team?.displayName ?? ''),
        away: normalizeTeam(away.team?.displayName ?? ''),
        homeScore,
        awayScore,
        status,
        source: 'espn',
      }
      if (extra) match.extra = extra

      // ESPN doesn't provide bookings in scoreboard endpoint, skip cards
      allMatches.push(match)
    }
  }
  return allMatches
}

export interface APIMatch {
  home: string
  away: string
  homeScore: number | null
  awayScore: number | null
  status: 'played' | 'live' | 'upcoming'
  extra?: 'AET' | 'PEN'
  homeYellow?: number
  awayYellow?: number
  homeRed?: number
  awayRed?: number
  source: 'espn' | 'football-data' | 'openfootball'
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchBookings(matchId: number, token: string): Promise<{
  homeYellow: number; awayYellow: number; homeRed: number; awayRed: number; homeTeamId: number; awayTeamId: number
}> {
  try {
    const res = await fetchWithTimeout(
      `https://api.football-data.org/v4/matches/${matchId}`,
      { headers: { 'X-Auth-Token': token } },
      8000
    )
    if (!res.ok) return { homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, homeTeamId: 0, awayTeamId: 0 }
    const data = await res.json() as any
    const homeTeamId: number = data.homeTeam?.id ?? 0
    const awayTeamId: number = data.awayTeam?.id ?? 0
    let homeYellow = 0, awayYellow = 0, homeRed = 0, awayRed = 0
    for (const b of (data.bookings ?? [])) {
      const isHome = b.team?.id === homeTeamId
      if (b.card === 'YELLOW') isHome ? homeYellow++ : awayYellow++
      if (b.card === 'RED') isHome ? homeRed++ : awayRed++
    }
    return { homeYellow, awayYellow, homeRed, awayRed, homeTeamId, awayTeamId }
  } catch {
    return { homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, homeTeamId: 0, awayTeamId: 0 }
  }
}

async function fetchFromFootballData(): Promise<APIMatch[]> {
  const token = process.env.FOOTBALL_DATA_TOKEN ?? ''
  const res = await fetchWithTimeout(
    'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
    { headers: { 'X-Auth-Token': token } }
  )
  if (!res.ok) throw new Error(`football-data.org returned ${res.status}`)
  const data = await res.json() as any
  const matches: APIMatch[] = []

  for (const m of (data.matches ?? [])) {
    const rawStatus: string = m.status ?? ''
    let status: APIMatch['status']
    if (rawStatus === 'FINISHED') status = 'played'
    else if (rawStatus === 'IN_PLAY' || rawStatus === 'PAUSED') status = 'live'
    else status = 'upcoming'

    let extra: 'AET' | 'PEN' | undefined
    if (m.score?.penalties?.home != null) extra = 'PEN'
    else if (m.score?.extraTime?.home != null) extra = 'AET'

    const match: APIMatch = {
      home: normalizeTeam(m.homeTeam?.name ?? ''),
      away: normalizeTeam(m.awayTeam?.name ?? ''),
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      status,
      source: 'football-data',
    }
    if (extra) match.extra = extra

    if (status === 'played' && m.id) {
      await new Promise(r => setTimeout(r, 700))
      const bookings = await fetchBookings(m.id, token)
      if (bookings.homeYellow) match.homeYellow = bookings.homeYellow
      if (bookings.awayYellow) match.awayYellow = bookings.awayYellow
      if (bookings.homeRed) match.homeRed = bookings.homeRed
      if (bookings.awayRed) match.awayRed = bookings.awayRed
    }

    matches.push(match)
  }
  return matches
}

async function fetchFromOpenFootball(): Promise<APIMatch[]> {
  const token = process.env.OPENFOOTBALL_TOKEN ?? ''
  const res = await fetchWithTimeout(
    'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026/worldcup.json',
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`openfootball returned ${res.status}`)
  const data = await res.json() as any
  const matches: APIMatch[] = []

  for (const round of (data.rounds ?? data)) {
    for (const m of (round.matches ?? [])) {
      const hasScore = m.score?.ft != null
      matches.push({
        home: normalizeTeam(m.team1?.name ?? m.team1 ?? ''),
        away: normalizeTeam(m.team2?.name ?? m.team2 ?? ''),
        homeScore: hasScore ? m.score.ft[0] : null,
        awayScore: hasScore ? m.score.ft[1] : null,
        status: hasScore ? 'played' : 'upcoming',
        source: 'openfootball',
      })
    }
  }
  return matches
}

export async function fetchMatchResults(): Promise<APIMatch[]> {
  // ESPN is primary — no API key required, real-time, covers full tournament
  try {
    const results = await fetchFromESPN()
    console.log(`[api-fetch] ESPN: ${results.length} matches fetched`)
    return results
  } catch (espnErr) {
    console.warn(`[api-fetch] ESPN failed: ${(espnErr as Error).message} — trying football-data.org`)
    try {
      return await fetchFromFootballData()
    } catch (err) {
      console.warn(`[api-fetch] football-data.org failed: ${(err as Error).message} — trying openfootball`)
      return await fetchFromOpenFootball()
    }
  }
}
