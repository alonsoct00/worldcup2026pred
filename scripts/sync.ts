#!/usr/bin/env tsx
import { fetchMatchResults } from './api-fetch.js'
import { scrapeWebSources } from './web-scraper.js'
import { extractWithClaude, type Extraction } from './claude-extract.js'
import { writeWorldcupTs } from './write-data.js'

const isDryRun = process.argv.includes('--dry-run')
const isDebug = process.argv.includes('--debug')

async function main() {
  const startTime = Date.now()
  console.log(`\n🌍 World Cup 2026 Sync — ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })} MT`)
  console.log(`   Mode: ${isDryRun ? 'DRY RUN (no file writes)' : 'LIVE'}\n`)

  // Step 1: API results
  console.log('1/4 ⚽ Fetching match results from APIs...')
  let apiMatches: Awaited<ReturnType<typeof fetchMatchResults>> = []
  try {
    apiMatches = await fetchMatchResults()
    const played = apiMatches.filter(m => m.status === 'played').length
    console.log(`   ✓ ${apiMatches.length} matches fetched (${played} played) — source: ${apiMatches[0]?.source ?? 'none'}`)
  } catch (err) {
    console.warn(`   ⚠ API fetch failed: ${(err as Error).message} — continuing without scores`)
  }

  // Step 2: Web scraping
  console.log('2/4 🌐 Scraping sports news sites...')
  let scrapedText = ''
  try {
    scrapedText = await scrapeWebSources()
    console.log(`   ✓ ${scrapedText.length.toLocaleString()} chars scraped`)
    if (isDebug) console.log('   [DEBUG] First 500 chars:', scrapedText.substring(0, 500))
  } catch (err) {
    console.warn(`   ⚠ Web scraping failed: ${(err as Error).message} — continuing without news enrichment`)
  }

  // Step 3: Claude extraction
  console.log('3/4 🤖 Extracting structured data with Claude...')
  let extracted: Extraction = { injuries: [], suspensions: [], upsets: [], hatTricks: [], newsItems: [] }
  if (scrapedText && process.env.ANTHROPIC_API_KEY) {
    try {
      extracted = await extractWithClaude(scrapedText, apiMatches)
      console.log(`   ✓ Injuries: ${extracted.injuries.length} | Suspensions: ${extracted.suspensions.length} | News: ${extracted.newsItems.length} | Upsets: ${extracted.upsets.length}`)
      if (isDebug) console.log('   [DEBUG] Extracted:', JSON.stringify(extracted, null, 2))
    } catch (err) {
      console.warn(`   ⚠ Claude extraction failed: ${(err as Error).message} — skipping news enrichment`)
    }
  } else {
    console.log('   ⚠ Skipped (no ANTHROPIC_API_KEY or no scraped text)')
  }

  // Step 4: Write
  console.log(`4/4 💾 ${isDryRun ? 'Previewing' : 'Writing'} worldcup.ts...`)
  try {
    const summary = await writeWorldcupTs(apiMatches, extracted, isDryRun)
    console.log(`   ✓ Matches updated: ${summary.matchesUpdated}`)
    console.log(`   ✓ News items added: ${summary.newNewsItems}`)
    console.log(`   ✓ Suspension notes: ${summary.suspensionNotes}`)
    console.log(`   ✓ Injury notes: ${summary.injuryNotes}`)
  } catch (err) {
    console.error(`   ✗ Write failed: ${(err as Error).message}`)
    process.exit(1)
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n✅ Sync complete in ${elapsed}s\n`)
}

main().catch(err => {
  console.error('💥 Fatal sync error:', err)
  process.exit(1)
})
