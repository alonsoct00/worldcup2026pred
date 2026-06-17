// src/data/worldcup.ts
// Auto-synced: 2026-06-17T06:16:16.494Z
// DO NOT EDIT SCORES MANUALLY — run npm run sync

export type MatchStatus = "played" | "live" | "upcoming"
export type MatchResult = "home" | "away" | "draw" | null

export interface Match {
  id: string
  home: string
  away: string
  homeFlag: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
  homePrediction: number
  awayPrediction: number
  date: string
  venue: string
  status: MatchStatus
  result: MatchResult
  extra?: string // "AET" | "PEN"
  notes?: string
  homeYellow?: number
  awayYellow?: number
  homeRed?: number
  awayRed?: number
}

export interface Group {
  id: string
  label: string
  teams: { name: string; flag: string; played: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }[]
  matches: Match[]
  projected: string[] // top 2 (+ optional 3rd*)
}

export interface KnockoutMatch {
  id: string
  round: "r32" | "r16" | "qf" | "sf" | "third" | "final"
  home: string
  away: string
  homeFlag: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
  homePrediction: number
  awayPrediction: number
  winner: string | null
  winnerFlag: string | null
  status: MatchStatus
  extra?: string
  notes?: string
  date?: string
}

export interface NewsItem {
  id: string
  date: string
  title: string
  body: string
  tag: "lesion" | "tarjeta" | "resultado" | "sorpresa" | "estadistica"
}

// ─── NEWS / NOVEDADES ───────────────────────────────────────────────────────

export const LAST_UPDATED = "2026-06-17T06:16:16.494Z"

export const news: NewsItem[] = [
  { id:"n13", date:"2026-06-17", tag:"resultado",
    title:"Argentina 3–0 Argelia",
    body:"Argentina suma 3 puntos con marcador 3–0."
  },
  { id:"n14", date:"2026-06-17", tag:"resultado",
    title:"Austria 3–1 Jordania",
    body:"Austria suma 3 puntos con marcador 3–1."
  },
  { id:"n11", date:"2026-06-16", tag:"resultado",
    title:"Irán 2–2 Nueva Zelanda: empate",
    body:"El partido terminó igualado 2–2. Ambos equipos suman 1 punto."
  },
  { id:"n12", date:"2026-06-16", tag:"resultado",
    title:"Francia 3–1 Senegal",
    body:"Francia suma 3 puntos con marcador 3–1."
  },
  { id:"n1", date:"2026-06-16", tag:"estadistica",
    title:"Mbappé: máximo goleador histórico de Francia",
    body:"Con su doblete vs Senegal (3–1), Mbappé superó el récord de goles de Francia en Mundiales y se convirtió en el máximo goleador histórico de la selección."
  },
  { id:"n2", date:"2026-06-16", tag:"resultado",
    title:"Haaland debuta con brace en la goleada 4–1 de Noruega vs Iraq",
    body:"El delantero del Manchester City marcó dos goles en la primera mitad. Noruega arranca liderando el Grupo I junto a Francia."
  },
  { id:"n3", date:"2026-06-15", tag:"sorpresa",
    title:"España frenada 0–0 por Cabo Verde",
    body:"El portero Vozinha (40 años) fue infranqueable. España tuvo 27 remates, xG 2.29, y no pudo marcar. Oyarzabal jugó 30 minutos sin tocar el balón."
  },
  { id:"n4", date:"2026-06-15", tag:"estadistica",
    title:"Día histórico: cuatro empates consecutivos el 15 jun",
    body:"España 0–0, Bélgica 1–1, Arabia Saudita 1–1, Irán 2–2. Nunca en la historia del Mundial hubo un día entero de empates. Sudamérica suma 0W en 4 partidos."
  },
  { id:"n8", date:"2026-06-15", tag:"lesion",
    title:"Pulisic: duda para USA vs Australia (19 jun)",
    body:"El capitán americano salió lesionado en la pantorrilla a mitad del partido vs Paraguay (4–1). Downplay oficial pero su presencia en J2 está en duda."
  },
  { id:"n5", date:"2026-06-14", tag:"sorpresa",
    title:"Australia 2–0 Türkiye: shock en el Grupo D",
    body:"Irankunda (27') y Metcalfe (75') voltearon el pronóstico. Türkiye y Paraguay quedan con 0 puntos. Australia comparte liderato con USA."
  },
  { id:"n6", date:"2026-06-14", tag:"resultado",
    title:"Alemania 7–1 Curazao: declaración de intenciones",
    body:"La goleada más amplia del torneo. Havertz x2, Musiala, Schlotterbeck entre los goleadores. Alemania arranca como favorita del Grupo E."
  },
  { id:"n7", date:"2026-06-14", tag:"sorpresa",
    title:"Costa de Marfil 1–0 Ecuador en el minuto 90",
    body:"Amad Diallo (sub) marcó el gol de la victoria. Ecuador falló dos veces en el palo. Ecuador sin puntos y en crisis."
  },
  { id:"n9", date:"2026-06-13", tag:"resultado",
    title:"USA 4–1 Paraguay: mejor debut americano en historia del Mundial",
    body:"Balogun doblete, gol propio en el 7' y Gio Reyna al final. La selección más goleadora del torneo hasta ahora."
  },
  { id:"n10", date:"2026-06-11", tag:"tarjeta",
    title:"Montes (México) expulsado vs Sudáfrica — suspendido para J2",
    body:"Red card en el minuto 80 de la inauguración. México deberá enfrentar a Corea del Sur sin su capitán."
  }
]

// ─── GRUPOS ─────────────────────────────────────────────────────────────────

export const groups: Group[] = [
  {
    id: "A", label: "Grupo A",
    teams: [
      { name: "México", flag: "🇲🇽", played: 1, w: 1, d: 0, l: 0, gf: 2, ga: 0, pts: 3 },
      { name: "Corea del Sur", flag: "🇰🇷", played: 1, w: 1, d: 0, l: 0, gf: 2, ga: 1, pts: 3 },
      { name: "Chequia", flag: "🇨🇿", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 2, pts: 0 },
      { name: "Sudáfrica", flag: "🇿🇦", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 2, pts: 0 },
    ],
    projected: ["🇲🇽 México (1°)","🇰🇷 Corea del Sur (2°)","🇨🇿 Chequia (3°)*"],
    matches: [
      { id:"A1", home:"México", away:"Sudáfrica", homeFlag:"🇲🇽", awayFlag:"🇿🇦", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"11 jun", venue:"Estadio Azteca, CDMX", status:"played", result:"home", notes:"Quiñones y Jiménez. Roja a Montes (80'). Sudáfrica 2 expulsados.", homeRed:1, awayRed:2 },
      { id:"A2", home:"Corea del Sur", away:"Chequia", homeFlag:"🇰🇷", awayFlag:"🇨🇿", homeScore:2, awayScore:1, homePrediction:0, awayPrediction:1, date:"11 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Oh Hyeon-gyu decisivo de sub al 80'. Son Heung-min lideró." },
      { id:"A3", home:"México", away:"Corea del Sur", homeFlag:"🇲🇽", awayFlag:"🇰🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"18 jun", venue:"Estadio BBVA, Guadalajara", status:"upcoming", result:null, notes:"Sin Montes (susp.). Partido crucial para el liderato." },
      { id:"A4", home:"Chequia", away:"Sudáfrica", homeFlag:"🇨🇿", awayFlag:"🇿🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"Atlanta Stadium", status:"upcoming", result:null },
      { id:"A5", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Estadio BBVA, Guadalajara", status:"upcoming", result:null },
      { id:"A6", home:"Sudáfrica", away:"Corea del Sur", homeFlag:"🇿🇦", awayFlag:"🇰🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"23 jun", venue:"Estadio BBVA, Monterrey", status:"upcoming", result:null },
    ]
  },
  {
    id: "B", label: "Grupo B",
    teams: [
      { name: "Canadá", flag: "🇨🇦", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Bosnia", flag: "🇧🇦", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Qatar", flag: "🇶🇦", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Suiza", flag: "🇨🇭", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    ],
    projected: ["🇨🇭 Suiza (1°)","🇨🇦 Canadá (2°)"],
    matches: [
      { id:"B1", home:"Canadá", away:"Bosnia", homeFlag:"🇨🇦", awayFlag:"🇧🇦", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"BMO Field, Toronto", status:"played", result:"draw", notes:"Lukic (Bosnia) temprano. Larin (78') empató con desvío." },
      { id:"B2", home:"Qatar", away:"Suiza", homeFlag:"🇶🇦", awayFlag:"🇨🇭", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"draw", notes:"Khoukhi igualó para Qatar en el descuento. Suiza dominó." },
      { id:"B3", home:"Suiza", away:"Bosnia", homeFlag:"🇨🇭", awayFlag:"🇧🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"18 jun", venue:"SoFi Stadium, LA", status:"upcoming", result:null },
      { id:"B4", home:"Canadá", away:"Qatar", homeFlag:"🇨🇦", awayFlag:"🇶🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
      { id:"B5", home:"Suiza", away:"Canadá", homeFlag:"🇨🇭", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"24 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
      { id:"B6", home:"Bosnia", away:"Qatar", homeFlag:"🇧🇦", awayFlag:"🇶🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, date:"24 jun", venue:"Lumen Field, Seattle", status:"upcoming", result:null },
    ]
  },
  {
    id: "C", label: "Grupo C",
    teams: [
      { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 1, w: 1, d: 0, l: 0, gf: 1, ga: 0, pts: 3 },
      { name: "Brasil", flag: "🇧🇷", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Marruecos", flag: "🇲🇦", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Haití", flag: "🇭🇹", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 1, pts: 0 },
    ],
    projected: ["🇧🇷 Brasil (1°)","🇲🇦 Marruecos (2°)","🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia (3°)*"],
    matches: [
      { id:"C1", home:"Brasil", away:"Marruecos", homeFlag:"🇧🇷", awayFlag:"🇲🇦", homeScore:1, awayScore:1, homePrediction:3, awayPrediction:1, date:"13 jun", venue:"MetLife Stadium, NJ", status:"played", result:"draw", notes:"Vinícius Jr. salvó a Brasil con empate tardío. Marruecos muy sólido." },
      { id:"C2", home:"Haití", away:"Escocia", homeFlag:"🇭🇹", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"away", notes:"McGinn (28'). Escocia líder del grupo." },
      { id:"C3", home:"Escocia", away:"Marruecos", homeFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag:"🇲🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
      { id:"C4", home:"Brasil", away:"Haití", homeFlag:"🇧🇷", awayFlag:"🇭🇹", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"19 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
      { id:"C5", home:"Brasil", away:"Escocia", homeFlag:"🇧🇷", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"24 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
      { id:"C6", home:"Marruecos", away:"Haití", homeFlag:"🇲🇦", awayFlag:"🇭🇹", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"24 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
    ]
  },
  {
    id: "D", label: "Grupo D",
    teams: [
      { name: "USA", flag: "🇺🇸", played: 1, w: 1, d: 0, l: 0, gf: 4, ga: 1, pts: 3 },
      { name: "Australia", flag: "🇦🇺", played: 1, w: 1, d: 0, l: 0, gf: 2, ga: 0, pts: 3 },
      { name: "Türkiye", flag: "🇹🇷", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 2, pts: 0 },
      { name: "Paraguay", flag: "🇵🇾", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 4, pts: 0 },
    ],
    projected: ["🇺🇸 USA (1°)","🇦🇺 Australia (2°) ⚡sorpresa"],
    matches: [
      { id:"D1", home:"USA", away:"Paraguay", homeFlag:"🇺🇸", awayFlag:"🇵🇾", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"home", notes:"OG 7', Balogun x2, Reyna. Mejor debut en historia de USMNT." },
      { id:"D2", home:"Australia", away:"Türkiye", homeFlag:"🇦🇺", awayFlag:"🇹🇷", homeScore:2, awayScore:0, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"BC Place, Vancouver", status:"played", result:"home", notes:"Irankunda (27') + Metcalfe (75'). Gran sorpresa del torneo." },
      { id:"D3", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"19 jun", venue:"Lumen Field, Seattle", status:"upcoming", result:null, notes:"Pulisic en duda (pantorrilla)." },
      { id:"D4", home:"Türkiye", away:"Paraguay", homeFlag:"🇹🇷", awayFlag:"🇵🇾", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Levi's Stadium, San Francisco", status:"upcoming", result:null },
      { id:"D5", home:"Türkiye", away:"USA", homeFlag:"🇹🇷", awayFlag:"🇺🇸", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"25 jun", venue:"SoFi Stadium, Los Ángeles", status:"upcoming", result:null },
      { id:"D6", home:"Paraguay", away:"Australia", homeFlag:"🇵🇾", awayFlag:"🇦🇺", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"25 jun", venue:"Levi's Stadium, San Francisco", status:"upcoming", result:null },
    ]
  },
  {
    id: "E", label: "Grupo E",
    teams: [
      { name: "Alemania", flag: "🇩🇪", played: 1, w: 1, d: 0, l: 0, gf: 7, ga: 1, pts: 3 },
      { name: "Costa de Marfil", flag: "🇨🇮", played: 1, w: 1, d: 0, l: 0, gf: 1, ga: 0, pts: 3 },
      { name: "Ecuador", flag: "🇪🇨", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 1, pts: 0 },
      { name: "Curazao", flag: "🇨🇼", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 7, pts: 0 },
    ],
    projected: ["🇩🇪 Alemania (1°)","🇨🇮 Costa de Marfil (2°) ⚡","🇪🇨 Ecuador (3°)*"],
    matches: [
      { id:"E1", home:"Alemania", away:"Curazao", homeFlag:"🇩🇪", awayFlag:"🇨🇼", homeScore:7, awayScore:1, homePrediction:4, awayPrediction:0, date:"14 jun", venue:"NRG Stadium, Houston", status:"played", result:"home", notes:"Havertz x2, Musiala, Schlotterbeck. Comenencia: 1er gol de Curazao en Mundiales." },
      { id:"E2", home:"Costa de Marfil", away:"Ecuador", homeFlag:"🇨🇮", awayFlag:"🇪🇨", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"14 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Amad Diallo (sub, 90'). Ecuador pegó 2 veces en el palo." },
      { id:"E3", home:"Alemania", away:"Costa de Marfil", homeFlag:"🇩🇪", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"20 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
      { id:"E4", home:"Ecuador", away:"Curazao", homeFlag:"🇪🇨", awayFlag:"🇨🇼", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"20 jun", venue:"Arrowhead, Kansas City", status:"upcoming", result:null, notes:"Ecuador necesita ganar sí o sí." },
      { id:"E5", home:"Ecuador", away:"Alemania", homeFlag:"🇪🇨", awayFlag:"🇩🇪", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"E6", home:"Curazao", away:"Costa de Marfil", homeFlag:"🇨🇼", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
    ]
  },
  {
    id: "F", label: "Grupo F",
    teams: [
      { name: "Suecia", flag: "🇸🇪", played: 1, w: 1, d: 0, l: 0, gf: 5, ga: 1, pts: 3 },
      { name: "Países Bajos", flag: "🇳🇱", played: 1, w: 0, d: 1, l: 0, gf: 2, ga: 2, pts: 1 },
      { name: "Japón", flag: "🇯🇵", played: 1, w: 0, d: 1, l: 0, gf: 2, ga: 2, pts: 1 },
      { name: "Túnez", flag: "🇹🇳", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 5, pts: 0 },
    ],
    projected: ["🇸🇪 Suecia (1°) ⚡","🇳🇱 Países Bajos (2°)","🇯🇵 Japón (3°)*"],
    matches: [
      { id:"F1", home:"Países Bajos", away:"Japón", homeFlag:"🇳🇱", awayFlag:"🇯🇵", homeScore:2, awayScore:2, homePrediction:2, awayPrediction:1, date:"14 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"draw", notes:"Van Dijk, Summerville (PB). Nakamura y Ogawa (cabeza) para Japón al 88'." },
      { id:"F2", home:"Túnez", away:"Suecia", homeFlag:"🇹🇳", awayFlag:"🇸🇪", homeScore:1, awayScore:5, homePrediction:0, awayPrediction:2, date:"14 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"away", notes:"Isak, Gyökeres, Ayari x2, Svanberg. Gol anulado revertido por VAR." },
      { id:"F3", home:"Países Bajos", away:"Suecia", homeFlag:"🇳🇱", awayFlag:"🇸🇪", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"20 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"F4", home:"Túnez", away:"Japón", homeFlag:"🇹🇳", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"20 jun", venue:"Estadio BBVA, Monterrey", status:"upcoming", result:null },
      { id:"F5", home:"Suecia", away:"Japón", homeFlag:"🇸🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, date:"25 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"F6", home:"Países Bajos", away:"Túnez", homeFlag:"🇳🇱", awayFlag:"🇹🇳", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"25 jun", venue:"Arrowhead, Kansas City", status:"upcoming", result:null },
    ]
  },
  {
    id: "G", label: "Grupo G",
    teams: [
      { name: "Bélgica", flag: "🇧🇪", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Egipto", flag: "🇪🇬", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Irán", flag: "🇮🇷", played: 1, w: 0, d: 1, l: 0, gf: 2, ga: 2, pts: 1 },
      { name: "Nueva Zelanda", flag: "🇳🇿", played: 1, w: 0, d: 1, l: 0, gf: 2, ga: 2, pts: 1 },
    ],
    projected: ["🇧🇪 Bélgica (1°)","🇪🇬 Egipto (2°)","🇮🇷 Irán (3°)*"],
    matches: [
      { id:"G1", home:"Bélgica", away:"Egipto", homeFlag:"🇧🇪", awayFlag:"🇪🇬", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:0, date:"15 jun", venue:"Lumen Field, Seattle", status:"played", result:"draw", notes:"De Bruyne vs Salah. Empate que sorprendió a los favoritos." },
      { id:"G2", home:"Irán", away:"Nueva Zelanda", homeFlag:"🇮🇷", awayFlag:"🇳🇿", homeScore:2, awayScore:2, homePrediction:1, awayPrediction:0, date:"15 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"draw", notes:"Rezaeian: gol + asistencia, 1er iraní con G+A en Mundiales. Just: 2 goles NZ." },
      { id:"G3", home:"Bélgica", away:"Irán", homeFlag:"🇧🇪", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"21 jun", venue:"SoFi Stadium, Los Ángeles", status:"upcoming", result:null },
      { id:"G4", home:"Nueva Zelanda", away:"Egipto", homeFlag:"🇳🇿", awayFlag:"🇪🇬", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"21 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
      { id:"G5", home:"Egipto", away:"Irán", homeFlag:"🇪🇬", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"26 jun", venue:"Lumen Field, Seattle", status:"upcoming", result:null },
      { id:"G6", home:"Nueva Zelanda", away:"Bélgica", homeFlag:"🇳🇿", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:3, date:"26 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
    ]
  },
  {
    id: "H", label: "Grupo H 🔥",
    teams: [
      { name: "España", flag: "🇪🇸", played: 1, w: 0, d: 1, l: 0, gf: 0, ga: 0, pts: 1 },
      { name: "Cabo Verde", flag: "🇨🇻", played: 1, w: 0, d: 1, l: 0, gf: 0, ga: 0, pts: 1 },
      { name: "Arabia Saudita", flag: "🇸🇦", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Uruguay", flag: "🇺🇾", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    ],
    projected: ["🇪🇸 España (1°) ⚠️","🇺🇾 Uruguay (2°)"],
    matches: [
      { id:"H1", home:"España", away:"Cabo Verde", homeFlag:"🇪🇸", awayFlag:"🇨🇻", homeScore:0, awayScore:0, homePrediction:4, awayPrediction:0, date:"15 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"draw", notes:"27 remates de España, xG 2.29. Vozinha (40 años) infranqueable. Mayor sorpresa del torneo." },
      { id:"H2", home:"Arabia Saudita", away:"Uruguay", homeFlag:"🇸🇦", awayFlag:"🇺🇾", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"15 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw", notes:"Olivera (Uruguay) 106 toques: récord uruguayo en Mundiales." },
      { id:"H3", home:"España", away:"Arabia Saudita", homeFlag:"🇪🇸", awayFlag:"🇸🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Mercedes-Benz, Atlanta", status:"upcoming", result:null, notes:"España DEBE ganar para mantenerse viva." },
      { id:"H4", home:"Uruguay", away:"Cabo Verde", homeFlag:"🇺🇾", awayFlag:"🇨🇻", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Hard Rock Stadium, Miami", status:"upcoming", result:null },
      { id:"H5", home:"Cabo Verde", away:"Arabia Saudita", homeFlag:"🇨🇻", awayFlag:"🇸🇦", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"26 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"H6", home:"Uruguay", away:"España", homeFlag:"🇺🇾", awayFlag:"🇪🇸", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Estadio Akron, Guadalajara", status:"upcoming", result:null },
    ]
  },
  {
    id: "I", label: "Grupo I",
    teams: [
      { name: "Francia", flag: "🇫🇷", played: 1, w: 1, d: 0, l: 0, gf: 3, ga: 1, pts: 3 },
      { name: "Noruega", flag: "🇳🇴", played: 1, w: 1, d: 0, l: 0, gf: 4, ga: 1, pts: 3 },
      { name: "Senegal", flag: "🇸🇳", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
      { name: "Iraq", flag: "🇮🇶", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 4, pts: 0 },
    ],
    projected: ["🇫🇷 Francia (1°)","🇳🇴 Noruega (2°)"],
    matches: [
      { id:"I1", home:"Francia", away:"Senegal", homeFlag:"🇫🇷", awayFlag:"🇸🇳", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home", notes:"Mbappé x2 → máximo goleador histórico de Francia. Olise estelar." },
      { id:"I2", home:"Iraq", away:"Noruega", homeFlag:"🇮🇶", awayFlag:"🇳🇴", homeScore:1, awayScore:4, homePrediction:0, awayPrediction:2, date:"16 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away", notes:"Haaland doblete en 1ª parte. Noruega goleó en su regreso al Mundial." },
      { id:"I3", home:"Francia", away:"Iraq", homeFlag:"🇫🇷", awayFlag:"🇮🇶", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"22 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
      { id:"I4", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"MetLife Stadium, NJ", status:"upcoming", result:null },
      { id:"I5", home:"Noruega", away:"Francia", homeFlag:"🇳🇴", awayFlag:"🇫🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
      { id:"I6", home:"Senegal", away:"Iraq", homeFlag:"🇸🇳", awayFlag:"🇮🇶", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"26 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
    ]
  },
  {
    id: "J", label: "Grupo J",
    teams: [
      { name: "Argentina", flag: "🇦🇷", played: 1, w: 1, d: 0, l: 0, gf: 3, ga: 0, pts: 3 },
      { name: "Austria", flag: "🇦🇹", played: 1, w: 1, d: 0, l: 0, gf: 3, ga: 1, pts: 3 },
      { name: "Argelia", flag: "🇩🇿", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 3, pts: 0 },
      { name: "Jordania", flag: "🇯🇴", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
    ],
    projected: ["🇦🇷 Argentina (1°)","🇦🇹 Austria (2°)"],
    matches: [
      { id:"J1", home:"Argentina", away:"Argelia", homeFlag:"🇦🇷", awayFlag:"🇩🇿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Arrowhead, Kansas City", status:"played", result:"home", notes:"Messi (17') + Álvarez. Gol inicial de Messi anulado por offside. Casi 80% del estadio con camiseta albiceleste." },
      { id:"J2", home:"Austria", away:"Jordania", homeFlag:"🇦🇹", awayFlag:"🇯🇴", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"home" },
      { id:"J3", home:"Argentina", away:"Austria", homeFlag:"🇦🇷", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"22 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"J4", home:"Jordania", away:"Argelia", homeFlag:"🇯🇴", awayFlag:"🇩🇿", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"Levi's Stadium, San Francisco", status:"upcoming", result:null },
      { id:"J5", home:"Jordania", away:"Argentina", homeFlag:"🇯🇴", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:3, date:"27 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"J6", home:"Argelia", away:"Austria", homeFlag:"🇩🇿", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Arrowhead, Kansas City", status:"upcoming", result:null },
    ]
  },
  {
    id: "K", label: "Grupo K",
    teams: [
      { name: "Portugal", flag: "🇵🇹", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "Colombia", flag: "🇨🇴", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "RD Congo", flag: "🇨🇩", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "Uzbekistán", flag: "🇺🇿", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    projected: ["🇵🇹 Portugal (1°)","🇨🇴 Colombia (2°)"],
    matches: [
      { id:"K1", home:"Portugal", away:"RD Congo", homeFlag:"🇵🇹", awayFlag:"🇨🇩", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"17 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"K2", home:"Uzbekistán", away:"Colombia", homeFlag:"🇺🇿", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"17 jun", venue:"Estadio Azteca, CDMX", status:"upcoming", result:null },
      { id:"K3", home:"Portugal", away:"Uzbekistán", homeFlag:"🇵🇹", awayFlag:"🇺🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"K4", home:"Colombia", away:"RD Congo", homeFlag:"🇨🇴", awayFlag:"🇨🇩", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"23 jun", venue:"Estadio BBVA, Guadalajara", status:"upcoming", result:null },
      { id:"K5", home:"Colombia", away:"Portugal", homeFlag:"🇨🇴", awayFlag:"🇵🇹", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Hard Rock Stadium, Miami", status:"upcoming", result:null },
      { id:"K6", home:"RD Congo", away:"Uzbekistán", homeFlag:"🇨🇩", awayFlag:"🇺🇿", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Mercedes-Benz, Atlanta", status:"upcoming", result:null },
    ]
  },
  {
    id: "L", label: "Grupo L",
    teams: [
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "Croacia", flag: "🇭🇷", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "Ghana", flag: "🇬🇭", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: "Panamá", flag: "🇵🇦", played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    projected: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra (1°)","🇭🇷 Croacia (2°)","🇬🇭 Ghana (3°)*"],
    matches: [
      { id:"L1", home:"Inglaterra", away:"Croacia", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇭🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"17 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"L2", home:"Ghana", away:"Panamá", homeFlag:"🇬🇭", awayFlag:"🇵🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"17 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
      { id:"L3", home:"Inglaterra", away:"Ghana", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
      { id:"L4", home:"Panamá", away:"Croacia", homeFlag:"🇵🇦", awayFlag:"🇭🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"23 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
      { id:"L5", home:"Panamá", away:"Inglaterra", homeFlag:"🇵🇦", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:4, date:"27 jun", venue:"MetLife Stadium, NJ", status:"upcoming", result:null },
      { id:"L6", home:"Croacia", away:"Ghana", homeFlag:"🇭🇷", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
    ]
  }
]

// ─── KNOCKOUT BRACKET ───────────────────────────────────────────────────────

export const knockoutMatches: KnockoutMatch[] = [
  { id:"r32-1", round:"r32", home:"Argentina", away:"Irán", homeFlag:"🇦🇷", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Messi dominante" },
  { id:"r32-2", round:"r32", home:"España", away:"Corea del Sur", homeFlag:"🇪🇸", awayFlag:"🇰🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", notes:"España debe reaccionar" },
  { id:"r32-3", round:"r32", home:"Inglaterra", away:"Noruega", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"upcoming", notes:"Haaland difícil de contener" },
  { id:"r32-4", round:"r32", home:"Brasil", away:"Escocia", homeFlag:"🇧🇷", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming" },
  { id:"r32-5", round:"r32", home:"Portugal", away:"Ghana", homeFlag:"🇵🇹", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Portugal", winnerFlag:"🇵🇹", status:"upcoming" },
  { id:"r32-6", round:"r32", home:"Francia", away:"Austria", homeFlag:"🇫🇷", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"Mbappé imparable" },
  { id:"r32-7", round:"r32", home:"Alemania", away:"Japón", homeFlag:"🇩🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Alemania", winnerFlag:"🇩🇪", status:"upcoming", extra:"AET" },
  { id:"r32-8", round:"r32", home:"Marruecos", away:"C. de Marfil", homeFlag:"🇲🇦", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"r32-9", round:"r32", home:"Uruguay", away:"Canadá", homeFlag:"🇺🇾", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming" },
  { id:"r32-10", round:"r32", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Noruega", winnerFlag:"🇳🇴", status:"upcoming", notes:"Haaland vs Mané" },
  { id:"r32-11", round:"r32", home:"Países Bajos", away:"Bélgica", homeFlag:"🇳🇱", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming" },
  { id:"r32-12", round:"r32", home:"Ecuador", away:"Türkiye", homeFlag:"🇪🇨", awayFlag:"🇹🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Ecuador", winnerFlag:"🇪🇨", status:"upcoming" },
  { id:"r32-13", round:"r32", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"México", winnerFlag:"🇲🇽", status:"upcoming" },
  { id:"r32-14", round:"r32", home:"Suecia", away:"Egipto", homeFlag:"🇸🇪", awayFlag:"🇪🇬", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Suecia", winnerFlag:"🇸🇪", status:"upcoming" },
  { id:"r32-15", round:"r32", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:1, winner:"USA", winnerFlag:"🇺🇸", status:"upcoming" },
  { id:"r32-16", round:"r32", home:"Colombia", away:"Irán", homeFlag:"🇨🇴", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming" },
  { id:"r16-1", round:"r16", home:"Argentina", away:"México", homeFlag:"🇦🇷", awayFlag:"🇲🇽", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming" },
  { id:"r16-2", round:"r16", home:"España", away:"Inglaterra", homeFlag:"🇪🇸", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", extra:"AET" },
  { id:"r16-3", round:"r16", home:"Brasil", away:"Portugal", homeFlag:"🇧🇷", awayFlag:"🇵🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming" },
  { id:"r16-4", round:"r16", home:"Francia", away:"Alemania", homeFlag:"🇫🇷", awayFlag:"🇩🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming" },
  { id:"r16-5", round:"r16", home:"Uruguay", away:"Colombia", homeFlag:"🇺🇾", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming" },
  { id:"r16-6", round:"r16", home:"Marruecos", away:"USA", homeFlag:"🇲🇦", awayFlag:"🇺🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"r16-7", round:"r16", home:"Países Bajos", away:"Noruega", homeFlag:"🇳🇱", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming" },
  { id:"r16-8", round:"r16", home:"Ecuador", away:"Suecia", homeFlag:"🇪🇨", awayFlag:"🇸🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Ecuador", winnerFlag:"🇪🇨", status:"upcoming", extra:"AET" },
  { id:"qf-1", round:"qf", home:"Francia", away:"España", homeFlag:"🇫🇷", awayFlag:"🇪🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", notes:"España llega sin ritmo" },
  { id:"qf-2", round:"qf", home:"Argentina", away:"Brasil", homeFlag:"🇦🇷", awayFlag:"🇧🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming" },
  { id:"qf-3", round:"qf", home:"Marruecos", away:"Países Bajos", homeFlag:"🇲🇦", awayFlag:"🇳🇱", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Bounou imbatible" },
  { id:"qf-4", round:"qf", home:"Uruguay", away:"Ecuador", homeFlag:"🇺🇾", awayFlag:"🇪🇨", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming" },
  { id:"sf-1", round:"sf", home:"Francia", away:"Argentina", homeFlag:"🇫🇷", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", notes:"Revancha Qatar 2022" },
  { id:"sf-2", round:"sf", home:"Marruecos", away:"Uruguay", homeFlag:"🇲🇦", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"third", round:"third", home:"Argentina", away:"Uruguay", homeFlag:"🇦🇷", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", date:"18 jul", notes:"Clásico rioplatense por el bronce" },
  { id:"final", round:"final", home:"Francia", away:"Marruecos", homeFlag:"🇫🇷", awayFlag:"🇲🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", date:"19 jul", notes:"MetLife Stadium, Nueva Jersey. Mbappé 34' · Griezmann 97' — Ziyech 78'" }
]
