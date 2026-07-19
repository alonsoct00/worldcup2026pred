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

export const EMPTY_EXTRACTION: Extraction = {
  injuries: [],
  suspensions: [],
  upsets: [],
  hatTricks: [],
  newsItems: [],
}
