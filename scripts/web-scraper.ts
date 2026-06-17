const RSS_FEEDS = [
  'https://www.espn.com/espn/rss/soccer/news',
  'https://www.goal.com/feeds/en/news',
  'https://feeds.bbci.co.uk/sport/football/rss.xml',
  'https://www.fourfourtwo.com/rss',
]

const PAGES = [
  'https://www.bbc.com/sport/football/world-cup',
  'https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket',
  'https://sports.yahoo.com/soccer/world-cup/',
  'https://www.cbssports.com/soccer/news/world-cup-group-standings-table-results/',
  'https://www.foxsports.com/soccer/fifa-world-cup/scores',
  'https://www.fourfourtwo.com/competition/all-of-the-world-cup-scores-so-far-at-the-2026-tournament',
]

const WC_KEYWORDS = ['world cup', 'mundial', '2026', 'fifa']

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function isRelevant(text: string): boolean {
  const lower = text.toLowerCase()
  return WC_KEYWORDS.some(kw => lower.includes(kw))
}

async function parseRssFeed(url: string): Promise<string> {
  const res = await fetchWithTimeout(url, {}, 5000)
  if (!res.ok) throw new Error(`RSS ${url} returned ${res.status}`)
  const xml = await res.text()
  const items: string[] = []
  const itemRe = /<item>([\s\S]*?)<\/item>/g
  let itemMatch: RegExpExecArray | null
  while ((itemMatch = itemRe.exec(xml)) !== null) {
    const m = itemMatch
    const item = m[1]
    const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/)
    const descMatch = item.match(/<description>([\s\S]*?)<\/description>/)
    const title = titleMatch ? stripHtml(titleMatch[1]) : ''
    const desc = descMatch ? stripHtml(descMatch[1]) : ''
    const combined = `${title} ${desc}`
    if (isRelevant(combined)) {
      items.push(`${title}\n${desc}`)
      if (items.length >= 10) break
    }
  }
  return items.join('\n\n')
}

async function scrapePage(url: string): Promise<string> {
  const res = await fetchWithTimeout(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8',
    },
  }, 8000)
  if (!res.ok) throw new Error(`Page ${url} returned ${res.status}`)
  const html = await res.text()
  const text = stripHtml(html)
  return text.substring(0, 6000)
}

export async function scrapeWebSources(): Promise<string> {
  const parts: string[] = []

  const rssResults = await Promise.allSettled(RSS_FEEDS.map(url => parseRssFeed(url)))
  for (let i = 0; i < rssResults.length; i++) {
    const r = rssResults[i]
    if (r.status === 'fulfilled' && r.value) {
      parts.push(r.value)
    } else if (r.status === 'rejected') {
      console.warn(`[scraper] RSS failed ${RSS_FEEDS[i]}: ${r.reason?.message}`)
    }
  }

  const pageResults = await Promise.allSettled(PAGES.map(url => scrapePage(url)))
  for (let i = 0; i < pageResults.length; i++) {
    const r = pageResults[i]
    if (r.status === 'fulfilled' && r.value) {
      parts.push(r.value)
    } else if (r.status === 'rejected') {
      console.warn(`[scraper] Page failed ${PAGES[i]}: ${r.reason?.message}`)
    }
  }

  const combined = parts.join('\n---SOURCE---\n')
  return combined.substring(0, 30000)
}
