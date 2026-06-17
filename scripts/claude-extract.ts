import type { APIMatch } from './api-fetch.js'

export interface Injury {
  player: string
  team: string
  status: 'duda' | 'baja' | 'disponible'
  detail: string
  affectsNextMatch: boolean
}

export interface Suspension {
  player: string
  team: string
  missesMatch: string
  reason: 'tarjeta roja' | 'acumulacion'
}

export interface Upset {
  winner: string
  loser: string
  score: string
  detail: string
}

export interface HatTrick {
  player: string
  team: string
  goals: number
}

export interface NewsItem {
  id?: string
  tag: 'lesion' | 'tarjeta' | 'resultado' | 'sorpresa' | 'estadistica'
  title: string
  body: string
  date: string
  priority?: number
}

export interface Extraction {
  injuries: Injury[]
  suspensions: Suspension[]
  upsets: Upset[]
  hatTricks: HatTrick[]
  newsItems: NewsItem[]
}

const EMPTY_EXTRACTION: Extraction = {
  injuries: [],
  suspensions: [],
  upsets: [],
  hatTricks: [],
  newsItems: [],
}

export async function extractWithClaude(rawText: string, apiMatches: APIMatch[]): Promise<Extraction> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

  const today = new Date().toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })

  const systemPrompt = `You are a football data extraction bot for the FIFA World Cup 2026.
Today is ${today}.
Extract structured information from raw sports news text.
Respond ONLY with valid JSON. No markdown. No explanation. No code blocks.
All text fields must be in Spanish.`

  const userPrompt = `Known match results from official API (already confirmed):
${JSON.stringify(apiMatches.filter(m => m.status === 'played'), null, 2)}

Raw text from sports news websites and RSS feeds:
---
${rawText}
---

Extract and return this exact JSON structure:
{
  "injuries": [
    {
      "player": "Full name",
      "team": "Team in Spanish",
      "status": "duda|baja|disponible",
      "detail": "brief description in Spanish max 100 chars",
      "affectsNextMatch": true
    }
  ],
  "suspensions": [
    {
      "player": "Full name",
      "team": "Team in Spanish",
      "missesMatch": "opponent team name in Spanish",
      "reason": "tarjeta roja|acumulacion"
    }
  ],
  "upsets": [
    {
      "winner": "team that won unexpectedly",
      "loser": "team that was expected to win",
      "score": "e.g. 2-0",
      "detail": "brief in Spanish"
    }
  ],
  "hatTricks": [
    {
      "player": "name",
      "team": "team in Spanish",
      "goals": 3
    }
  ],
  "newsItems": [
    {
      "tag": "lesion|tarjeta|resultado|sorpresa|estadistica",
      "title": "headline in Spanish, max 80 chars",
      "body": "detail in Spanish, max 200 chars, factual and specific",
      "date": "YYYY-MM-DD",
      "priority": 1
    }
  ]
}

Rules:
- Only include information you found in the text — do not invent
- newsItems: include max 8 items, sorted by priority (1=most important)
- Priority 1: upsets, hat-tricks, red cards
- Priority 2: injuries to key players, significant results
- Priority 3: team news, tactical info
- If nothing found for a category, return empty array []`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6-20251001',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Anthropic API returned ${res.status}: ${errBody.substring(0, 300)}`)
  }
  const data = await res.json() as any
  const text: string = data.content?.[0]?.text ?? ''

  try {
    return JSON.parse(text) as Extraction
  } catch {
    console.error('[claude-extract] Failed to parse response:', text.substring(0, 500))
    return EMPTY_EXTRACTION
  }
}
