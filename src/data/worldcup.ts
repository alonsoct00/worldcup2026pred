// src/data/worldcup.ts
// Auto-synced: 2026-06-28T09:17:07.595Z
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

export const LAST_UPDATED = "2026-06-28T09:17:07.595Z"

export const news: NewsItem[] = [
  { id:"n57", date:"2026-06-27", tag:"resultado",
    title:"Uruguay 0–1 España",
    body:"España suma 3 puntos con marcador 0–1."
  },
  { id:"n54", date:"2026-06-27", tag:"resultado",
    title:"Cabo Verde 0–0 Arabia Saudita: empate",
    body:"El partido terminó igualado 0–0. Ambos equipos suman 1 punto."
  },
  { id:"n55", date:"2026-06-27", tag:"resultado",
    title:"Egipto 1–1 Irán: empate",
    body:"El partido terminó igualado 1–1. Ambos equipos suman 1 punto."
  },
  { id:"n56", date:"2026-06-27", tag:"sorpresa",
    title:"Nueva Zelanda 1–5 Bélgica",
    body:"Bélgica suma 3 puntos con marcador 1–5."
  },
  { id:"n51", date:"2026-06-26", tag:"resultado",
    title:"Paraguay 0–0 Australia: empate",
    body:"El partido terminó igualado 0–0. Ambos equipos suman 1 punto."
  },
  { id:"n52", date:"2026-06-26", tag:"resultado",
    title:"Türkiye 3–2 USA",
    body:"Türkiye suma 3 puntos con marcador 3–2."
  },
  { id:"n53", date:"2026-06-26", tag:"sorpresa",
    title:"Senegal 5–0 Iraq",
    body:"Senegal suma 3 puntos con marcador 5–0."
  },
  { id:"n47", date:"2026-06-25", tag:"resultado",
    title:"Curazao 0–2 Costa de Marfil",
    body:"Costa de Marfil suma 3 puntos con marcador 0–2."
  },
  { id:"n48", date:"2026-06-25", tag:"resultado",
    title:"Ecuador 2–1 Alemania",
    body:"Ecuador suma 3 puntos con marcador 2–1."
  },
  { id:"n49", date:"2026-06-25", tag:"resultado",
    title:"Japón 1–1 Suecia: empate",
    body:"El partido terminó igualado 1–1. Ambos equipos suman 1 punto."
  },
  { id:"n50", date:"2026-06-25", tag:"resultado",
    title:"Túnez 1–3 Países Bajos",
    body:"Países Bajos suma 3 puntos con marcador 1–3."
  },
  { id:"n46", date:"2026-06-25", tag:"resultado",
    title:"Chequia 0–3 México",
    body:"México suma 3 puntos con marcador 0–3."
  },
  { id:"n42", date:"2026-06-25", tag:"sorpresa",
    title:"SORPRESA MUNDIAL: Sudáfrica elimina a Corea del Sur y clasifica al r32",
    body:"Bafana Bafana 1-0 con gol de Tau (67'). Corea del Sur, que llegó con 3 pts, queda ELIMINADA. Sudáfrica termina 2°A con 4 pts y será el rival de España en el r32. La mayor sorpresa del Grupo A y una de las más grandes del torneo."
  },
  { id:"n41", date:"2026-06-25", tag:"estadistica",
    title:"México perfecto: 9 pts, 6-0 GF-GA, mejor equipo de los 12 grupos",
    body:"Goleada 3-0 a Chequia (Quiñones x2, Jiménez). México es el único equipo con 9 pts en el torneo. La Selección llega al r32 como el equipo más en forma de la fase de grupos fuera de Argentina."
  },
  { id:"n43", date:"2026-06-24", tag:"resultado",
    title:"Colombia 1–0 RD Congo",
    body:"Colombia suma 3 puntos con marcador 1–0."
  },
  { id:"n44", date:"2026-06-24", tag:"resultado",
    title:"Bosnia 3–1 Qatar",
    body:"Bosnia suma 3 puntos con marcador 3–1."
  },
  { id:"n45", date:"2026-06-24", tag:"resultado",
    title:"Marruecos 4–2 Haití",
    body:"Marruecos suma 3 puntos con marcador 4–2."
  },
  { id:"n40", date:"2026-06-24", tag:"resultado",
    title:"Grupo C cerrado: Brasil 1° y Marruecos 2° — Escocia eliminada",
    body:"Brasil 3-0 a Escocia (Vinícius Jr., Rodrygo, Paquetá). Marruecos 4-2 a Haití (Ziyech x2, En-Nesyri). Ambos con 7 pts. Brasil 1° por mejor GD (+6 vs +3). Escocia queda fuera. El Grupo C dejó dos gigantes al r32."
  },
  { id:"n39", date:"2026-06-24", tag:"estadistica",
    title:"Colombia confirma 1°K y Portugal 2°: el Grupo K clasifica a sus favoritos",
    body:"Colombia 1-0 vs RD Congo (Luis Díaz). Los Cafeteros 1° con 6 pts. Portugal respondió con 5-0 vs Uzbekistán (Ronaldo x2, Bruno, Leao, Bernardo). La crisis quedó atrás — llegan al r32 con autoridad."
  },
  { id:"n38", date:"2026-06-24", tag:"resultado",
    title:"Suiza 7 pts, 1°B. Croacia revive — Canadá y Bosnia al r32",
    body:"Suiza 2-1 Canadá, Bosnia 3-1 Qatar. Suiza termina 1°B con 7 pts. Canadá 2° (4 pts) sobre Bosnia (4 pts, peor GD). Croacia 1-0 Panamá en el Grupo L — los balkánicos sobreviven con 3 pts y aún pueden clasificar como mejor 3°."
  },
  { id:"n35", date:"2026-06-23", tag:"resultado",
    title:"Jordania 1–2 Argelia: Argelia en la pelea por el 2°J",
    body:"Argelia suma 3 pts y empata con Austria en el 2° puesto del Grupo J. El 2° lugar se decide en J3 el 27 jun (Argelia vs Austria). Austria parte con ventaja en GD."
  },
  { id:"n34", date:"2026-06-23", tag:"resultado",
    title:"Noruega 3–2 Senegal: Haaland letal — Francia vs Noruega define el 1°I",
    body:"Haaland con otro doblete. Noruega y Francia, ambas con 6 pts, se juegan el 1° del Grupo I el 26 jun. La joya de la J3."
  },
  { id:"n32", date:"2026-06-22", tag:"resultado",
    title:"Argentina 2–0 Austria: la Albiceleste clasifica imparable",
    body:"Argentina suma 3 puntos con marcador 2–0. Primer equipo en clasificar del torneo."
  },
  { id:"n33", date:"2026-06-22", tag:"resultado",
    title:"Francia 3–0 Iraq: Mbappé en modo campeón",
    body:"Francia suma 3 puntos con marcador 3–0."
  },
  { id:"n31", date:"2026-06-21", tag:"estadistica",
    title:"Argentina clasifica en 2 juegos: 6 pts, 5 goles a favor, 0 en contra",
    body:"Victoria 2-0 vs Austria. Argentina es el primer equipo en clasificar del torneo. Messi + Di María + Álvarez indeteniables. La mejor defensa entre los 12 grupos. Con J3 vs Jordania de descanso, llegan frescos al r32."
  }
]

// ─── GRUPOS ─────────────────────────────────────────────────────────────────

export const groups: Group[] = [
  {
    id: "A", label: "Grupo A",
    teams: [
      { name: "México", flag: "🇲🇽", played: 3, w: 3, d: 0, l: 0, gf: 6, ga: 0, pts: 9 },
      { name: "Sudáfrica", flag: "🇿🇦", played: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, pts: 4 },
      { name: "Corea del Sur", flag: "🇰🇷", played: 3, w: 1, d: 0, l: 2, gf: 2, ga: 3, pts: 3 },
      { name: "Chequia", flag: "🇨🇿", played: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, pts: 1 },
    ],
    projected: ["🇲🇽 México (1°) ✅","🇿🇦 Sudáfrica (2°) ⚡SORPRESA"],
    matches: [
      { id:"A1", home:"México", away:"Sudáfrica", homeFlag:"🇲🇽", awayFlag:"🇿🇦", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"11 jun", venue:"Estadio Azteca, CDMX", status:"played", result:"home", notes:"Quiñones y Jiménez. Roja a Montes (80'). Sudáfrica 2 expulsados.", homeRed:1, awayRed:2 },
      { id:"A2", home:"Corea del Sur", away:"Chequia", homeFlag:"🇰🇷", awayFlag:"🇨🇿", homeScore:2, awayScore:1, homePrediction:0, awayPrediction:1, date:"11 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Oh Hyeon-gyu decisivo de sub al 80'. Son Heung-min lideró." },
      { id:"A3", home:"México", away:"Corea del Sur", homeFlag:"🇲🇽", awayFlag:"🇰🇷", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"18 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Sin Montes (susp.). Partido crucial para el liderato." },
      { id:"A4", home:"Chequia", away:"Sudáfrica", homeFlag:"🇨🇿", awayFlag:"🇿🇦", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"Atlanta Stadium", status:"played", result:"draw" },
      { id:"A5", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"25 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Quiñones x2, Jiménez. México 9 pts perfectos — mejor equipo de la fase de grupos." },
      { id:"A6", home:"Sudáfrica", away:"Corea del Sur", homeFlag:"🇿🇦", awayFlag:"🇰🇷", homeScore:1, awayScore:0, homePrediction:0, awayPrediction:1, date:"25 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"home", notes:"Tau (67'). Sudáfrica ELIMINA a Corea del Sur — los Bafana Bafana al r32. Mayor sorpresa del Grupo A." },
    ]
  },
  {
    id: "B", label: "Grupo B",
    teams: [
      { name: "Canadá", flag: "🇨🇦", played: 3, w: 1, d: 1, l: 1, gf: 8, ga: 3, pts: 4 },
      { name: "Bosnia", flag: "🇧🇦", played: 3, w: 1, d: 1, l: 1, gf: 5, ga: 6, pts: 4 },
      { name: "Qatar", flag: "🇶🇦", played: 3, w: 0, d: 1, l: 2, gf: 2, ga: 10, pts: 1 },
      { name: "Suiza", flag: "🇨🇭", played: 3, w: 2, d: 1, l: 0, gf: 7, ga: 3, pts: 7 },
    ],
    projected: ["🇨🇭 Suiza (1°) ✅","🇨🇦 Canadá (2°) ✅"],
    matches: [
      { id:"B1", home:"Canadá", away:"Bosnia", homeFlag:"🇨🇦", awayFlag:"🇧🇦", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"BMO Field, Toronto", status:"played", result:"draw", notes:"Lukic (Bosnia) temprano. Larin (78') empató con desvío." },
      { id:"B2", home:"Qatar", away:"Suiza", homeFlag:"🇶🇦", awayFlag:"🇨🇭", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"draw", notes:"Khoukhi igualó para Qatar en el descuento. Suiza dominó." },
      { id:"B3", home:"Suiza", away:"Bosnia", homeFlag:"🇨🇭", awayFlag:"🇧🇦", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, date:"18 jun", venue:"SoFi Stadium, LA", status:"played", result:"home" },
      { id:"B4", home:"Canadá", away:"Qatar", homeFlag:"🇨🇦", awayFlag:"🇶🇦", homeScore:6, awayScore:0, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"BC Place, Vancouver", status:"played", result:"home" },
      { id:"B5", home:"Suiza", away:"Canadá", homeFlag:"🇨🇭", awayFlag:"🇨🇦", homeScore:2, awayScore:1, homePrediction:1, awayPrediction:1, date:"24 jun", venue:"BC Place, Vancouver", status:"played", result:"home" },
      { id:"B6", home:"Bosnia", away:"Qatar", homeFlag:"🇧🇦", awayFlag:"🇶🇦", homeScore:3, awayScore:1, homePrediction:1, awayPrediction:0, date:"24 jun", venue:"Lumen Field, Seattle", status:"played", result:"home" },
    ]
  },
  {
    id: "C", label: "Grupo C",
    teams: [
      { name: "Brasil", flag: "🇧🇷", played: 3, w: 2, d: 1, l: 0, gf: 7, ga: 1, pts: 7 },
      { name: "Marruecos", flag: "🇲🇦", played: 3, w: 2, d: 1, l: 0, gf: 6, ga: 3, pts: 7 },
      { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 3, w: 1, d: 0, l: 2, gf: 1, ga: 4, pts: 3 },
      { name: "Haití", flag: "🇭🇹", played: 3, w: 0, d: 0, l: 3, gf: 2, ga: 8, pts: 0 },
    ],
    projected: ["🇧🇷 Brasil (1°) ✅","🇲🇦 Marruecos (2°) ⚡✅","🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia eliminada"],
    matches: [
      { id:"C1", home:"Brasil", away:"Marruecos", homeFlag:"🇧🇷", awayFlag:"🇲🇦", homeScore:1, awayScore:1, homePrediction:3, awayPrediction:1, date:"13 jun", venue:"MetLife Stadium, NJ", status:"played", result:"draw", notes:"Vinícius Jr. salvó a Brasil con empate tardío. Marruecos muy sólido." },
      { id:"C2", home:"Haití", away:"Escocia", homeFlag:"🇭🇹", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"away", notes:"McGinn (28'). Escocia líder del grupo." },
      { id:"C3", home:"Escocia", away:"Marruecos", homeFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag:"🇲🇦", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away" },
      { id:"C4", home:"Brasil", away:"Haití", homeFlag:"🇧🇷", awayFlag:"🇭🇹", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, date:"19 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
      { id:"C5", home:"Brasil", away:"Escocia", homeFlag:"🇧🇷", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"24 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Vinícius Jr., Rodrygo, Paquetá. Escocia ELIMINADA con 3 pts y GD -3." },
      { id:"C6", home:"Marruecos", away:"Haití", homeFlag:"🇲🇦", awayFlag:"🇭🇹", homeScore:4, awayScore:2, homePrediction:3, awayPrediction:0, date:"24 jun", venue:"Gillette Stadium, Boston", status:"played", result:"home", notes:"Ziyech x2, En-Nesyri, Boufal. Marruecos 2°C con 7 pts — Leones del Atlas al r32 en forma." },
    ]
  },
  {
    id: "D", label: "Grupo D",
    teams: [
      { name: "USA", flag: "🇺🇸", played: 3, w: 2, d: 0, l: 1, gf: 8, ga: 4, pts: 6 },
      { name: "Australia", flag: "🇦🇺", played: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, pts: 4 },
      { name: "Türkiye", flag: "🇹🇷", played: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
      { name: "Paraguay", flag: "🇵🇾", played: 3, w: 1, d: 1, l: 1, gf: 2, ga: 4, pts: 4 },
    ],
    projected: ["🇺🇸 USA (1°)","🇦🇺 Australia (2°) ⚡sorpresa"],
    matches: [
      { id:"D1", home:"USA", away:"Paraguay", homeFlag:"🇺🇸", awayFlag:"🇵🇾", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"home", notes:"OG 7', Balogun x2, Reyna. Mejor debut en historia de USMNT." },
      { id:"D2", home:"Australia", away:"Türkiye", homeFlag:"🇦🇺", awayFlag:"🇹🇷", homeScore:2, awayScore:0, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"BC Place, Vancouver", status:"played", result:"home", notes:"Irankunda (27') + Metcalfe (75'). Gran sorpresa del torneo." },
      { id:"D3", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"19 jun", venue:"Lumen Field, Seattle", status:"played", result:"home", notes:"Pulisic en duda (pantorrilla)." },
      { id:"D4", home:"Türkiye", away:"Paraguay", homeFlag:"🇹🇷", awayFlag:"🇵🇾", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"away" },
      { id:"D5", home:"Türkiye", away:"USA", homeFlag:"🇹🇷", awayFlag:"🇺🇸", homeScore:3, awayScore:2, homePrediction:0, awayPrediction:1, date:"25 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"home" },
      { id:"D6", home:"Paraguay", away:"Australia", homeFlag:"🇵🇾", awayFlag:"🇦🇺", homeScore:0, awayScore:0, homePrediction:2, awayPrediction:1, date:"25 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"draw" },
    ]
  },
  {
    id: "E", label: "Grupo E",
    teams: [
      { name: "Alemania", flag: "🇩🇪", played: 3, w: 2, d: 0, l: 1, gf: 10, ga: 4, pts: 6 },
      { name: "Costa de Marfil", flag: "🇨🇮", played: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, pts: 6 },
      { name: "Ecuador", flag: "🇪🇨", played: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, pts: 4 },
      { name: "Curazao", flag: "🇨🇼", played: 3, w: 0, d: 1, l: 2, gf: 1, ga: 9, pts: 1 },
    ],
    projected: ["🇩🇪 Alemania (1°)","🇨🇮 Costa de Marfil (2°) ⚡","🇪🇨 Ecuador (3°)*"],
    matches: [
      { id:"E1", home:"Alemania", away:"Curazao", homeFlag:"🇩🇪", awayFlag:"🇨🇼", homeScore:7, awayScore:1, homePrediction:4, awayPrediction:0, date:"14 jun", venue:"NRG Stadium, Houston", status:"played", result:"home", notes:"Havertz x2, Musiala, Schlotterbeck. Comenencia: 1er gol de Curazao en Mundiales." },
      { id:"E2", home:"Costa de Marfil", away:"Ecuador", homeFlag:"🇨🇮", awayFlag:"🇪🇨", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"14 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Amad Diallo (sub, 90'). Ecuador pegó 2 veces en el palo." },
      { id:"E3", home:"Alemania", away:"Costa de Marfil", homeFlag:"🇩🇪", awayFlag:"🇨🇮", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:1, date:"20 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"E4", home:"Ecuador", away:"Curazao", homeFlag:"🇪🇨", awayFlag:"🇨🇼", homeScore:0, awayScore:0, homePrediction:3, awayPrediction:0, date:"20 jun", venue:"Arrowhead, Kansas City", status:"played", result:"draw", notes:"Ecuador necesita ganar sí o sí." },
      { id:"E5", home:"Ecuador", away:"Alemania", homeFlag:"🇪🇨", awayFlag:"🇩🇪", homeScore:2, awayScore:1, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"NRG Stadium, Houston", status:"played", result:"home" },
      { id:"E6", home:"Curazao", away:"Costa de Marfil", homeFlag:"🇨🇼", awayFlag:"🇨🇮", homeScore:0, awayScore:2, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"away" },
    ]
  },
  {
    id: "F", label: "Grupo F",
    teams: [
      { name: "Suecia", flag: "🇸🇪", played: 2, w: 1, d: 0, l: 1, gf: 6, ga: 6, pts: 3 },
      { name: "Países Bajos", flag: "🇳🇱", played: 2, w: 1, d: 1, l: 0, gf: 7, ga: 3, pts: 4 },
      { name: "Japón", flag: "🇯🇵", played: 2, w: 1, d: 1, l: 0, gf: 6, ga: 2, pts: 4 },
      { name: "Túnez", flag: "🇹🇳", played: 2, w: 0, d: 0, l: 2, gf: 1, ga: 9, pts: 0 },
    ],
    projected: ["🇳🇱 Países Bajos (1°)","🇯🇵 Japón (2°) ⚡","🇸🇪 Suecia (3°)*"],
    matches: [
      { id:"F1", home:"Países Bajos", away:"Japón", homeFlag:"🇳🇱", awayFlag:"🇯🇵", homeScore:2, awayScore:2, homePrediction:2, awayPrediction:1, date:"14 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"draw", notes:"Van Dijk, Summerville (PB). Nakamura y Ogawa (cabeza) para Japón al 88'." },
      { id:"F2", home:"Túnez", away:"Suecia", homeFlag:"🇹🇳", awayFlag:"🇸🇪", homeScore:1, awayScore:5, homePrediction:0, awayPrediction:2, date:"14 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"away", notes:"Isak, Gyökeres, Ayari x2, Svanberg. Gol anulado revertido por VAR." },
      { id:"F3", home:"Países Bajos", away:"Suecia", homeFlag:"🇳🇱", awayFlag:"🇸🇪", homeScore:5, awayScore:1, homePrediction:1, awayPrediction:1, date:"20 jun", venue:"NRG Stadium, Houston", status:"played", result:"home" },
      { id:"F4", home:"Túnez", away:"Japón", homeFlag:"🇹🇳", awayFlag:"🇯🇵", homeScore:0, awayScore:4, homePrediction:0, awayPrediction:2, date:"20 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"away" },
      { id:"F5", home:"Suecia", away:"Japón", homeFlag:"🇸🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, date:"25 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"F6", home:"Países Bajos", away:"Túnez", homeFlag:"🇳🇱", awayFlag:"🇹🇳", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"25 jun", venue:"Arrowhead, Kansas City", status:"upcoming", result:null },
    ]
  },
  {
    id: "G", label: "Grupo G",
    teams: [
      { name: "Bélgica", flag: "🇧🇪", played: 3, w: 1, d: 2, l: 0, gf: 6, ga: 2, pts: 5 },
      { name: "Egipto", flag: "🇪🇬", played: 3, w: 1, d: 2, l: 0, gf: 5, ga: 3, pts: 5 },
      { name: "Irán", flag: "🇮🇷", played: 3, w: 0, d: 3, l: 0, gf: 3, ga: 3, pts: 3 },
      { name: "Nueva Zelanda", flag: "🇳🇿", played: 3, w: 0, d: 1, l: 2, gf: 4, ga: 10, pts: 1 },
    ],
    projected: ["🇪🇬 Egipto (1°) ⚡","🇧🇪 Bélgica (2°) ⚠️","🇮🇷 Irán (3°)*"],
    matches: [
      { id:"G1", home:"Bélgica", away:"Egipto", homeFlag:"🇧🇪", awayFlag:"🇪🇬", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:0, date:"15 jun", venue:"Lumen Field, Seattle", status:"played", result:"draw", notes:"De Bruyne vs Salah. Empate que sorprendió a los favoritos." },
      { id:"G2", home:"Irán", away:"Nueva Zelanda", homeFlag:"🇮🇷", awayFlag:"🇳🇿", homeScore:2, awayScore:2, homePrediction:1, awayPrediction:0, date:"15 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"draw", notes:"Rezaeian: gol + asistencia, 1er iraní con G+A en Mundiales. Just: 2 goles NZ." },
      { id:"G3", home:"Bélgica", away:"Irán", homeFlag:"🇧🇪", awayFlag:"🇮🇷", homeScore:0, awayScore:0, homePrediction:2, awayPrediction:1, date:"21 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"draw", notes:"180 min sin gol para Bélgica. De Bruyne impotente. 'Generación Dorada' al borde." },
      { id:"G4", home:"Nueva Zelanda", away:"Egipto", homeFlag:"🇳🇿", awayFlag:"🇪🇬", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:1, date:"21 jun", venue:"BC Place, Vancouver", status:"played", result:"away", notes:"Salah 1G+1A. Egipto lidera el Grupo G con 4 pts." },
      { id:"G5", home:"Egipto", away:"Irán", homeFlag:"🇪🇬", awayFlag:"🇮🇷", homeScore:1, awayScore:1, homePrediction:1, awayPrediction:1, date:"26 jun", venue:"Lumen Field, Seattle", status:"played", result:"draw" },
      { id:"G6", home:"Nueva Zelanda", away:"Bélgica", homeFlag:"🇳🇿", awayFlag:"🇧🇪", homeScore:1, awayScore:5, homePrediction:0, awayPrediction:3, date:"26 jun", venue:"BC Place, Vancouver", status:"played", result:"away" },
    ]
  },
  {
    id: "H", label: "Grupo H 🔥",
    teams: [
      { name: "España", flag: "🇪🇸", played: 3, w: 2, d: 1, l: 0, gf: 5, ga: 0, pts: 7 },
      { name: "Cabo Verde", flag: "🇨🇻", played: 3, w: 0, d: 3, l: 0, gf: 2, ga: 2, pts: 3 },
      { name: "Arabia Saudita", flag: "🇸🇦", played: 3, w: 0, d: 2, l: 1, gf: 1, ga: 5, pts: 2 },
      { name: "Uruguay", flag: "🇺🇾", played: 3, w: 0, d: 2, l: 1, gf: 3, ga: 4, pts: 2 },
    ],
    projected: ["🇪🇸 España (1°) ✅","🇺🇾 Uruguay (2°) ⚠️","🇨🇻 Cabo Verde (3°)*"],
    matches: [
      { id:"H1", home:"España", away:"Cabo Verde", homeFlag:"🇪🇸", awayFlag:"🇨🇻", homeScore:0, awayScore:0, homePrediction:4, awayPrediction:0, date:"15 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"draw", notes:"27 remates de España, xG 2.29. Vozinha (40 años) infranqueable. Mayor sorpresa del torneo." },
      { id:"H2", home:"Arabia Saudita", away:"Uruguay", homeFlag:"🇸🇦", awayFlag:"🇺🇾", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"15 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw", notes:"Olivera (Uruguay) 106 toques: récord uruguayo en Mundiales." },
      { id:"H3", home:"España", away:"Arabia Saudita", homeFlag:"🇪🇸", awayFlag:"🇸🇦", homeScore:4, awayScore:0, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"home", notes:"Morata x2, Yamal, Pedri. La Furia regresa con venganza. Borran el 0-0 vs Cabo Verde." },
      { id:"H4", home:"Uruguay", away:"Cabo Verde", homeFlag:"🇺🇾", awayFlag:"🇨🇻", homeScore:2, awayScore:2, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw", notes:"Segundo empate de Uruguay. 2 pts en 2 juegos — NECESITA ganar J3 vs España." },
      { id:"H5", home:"Cabo Verde", away:"Arabia Saudita", homeFlag:"🇨🇻", awayFlag:"🇸🇦", homeScore:0, awayScore:0, homePrediction:0, awayPrediction:1, date:"26 jun", venue:"NRG Stadium, Houston", status:"played", result:"draw" },
      { id:"H6", home:"Uruguay", away:"España", homeFlag:"🇺🇾", awayFlag:"🇪🇸", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Estadio Akron, Guadalajara", status:"played", result:"away" },
    ]
  },
  {
    id: "I", label: "Grupo I",
    teams: [
      { name: "Francia", flag: "🇫🇷", played: 3, w: 3, d: 0, l: 0, gf: 10, ga: 2, pts: 9 },
      { name: "Noruega", flag: "🇳🇴", played: 3, w: 2, d: 0, l: 1, gf: 8, ga: 7, pts: 6 },
      { name: "Senegal", flag: "🇸🇳", played: 3, w: 1, d: 0, l: 2, gf: 8, ga: 6, pts: 3 },
      { name: "Iraq", flag: "🇮🇶", played: 3, w: 0, d: 0, l: 3, gf: 1, ga: 12, pts: 0 },
    ],
    projected: ["🇫🇷 Francia (1°)","🇳🇴 Noruega (2°)"],
    matches: [
      { id:"I1", home:"Francia", away:"Senegal", homeFlag:"🇫🇷", awayFlag:"🇸🇳", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home", notes:"Mbappé x2 → máximo goleador histórico de Francia. Olise estelar." },
      { id:"I2", home:"Iraq", away:"Noruega", homeFlag:"🇮🇶", awayFlag:"🇳🇴", homeScore:1, awayScore:4, homePrediction:0, awayPrediction:2, date:"16 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away", notes:"Haaland doblete en 1ª parte. Noruega goleó en su regreso al Mundial." },
      { id:"I3", home:"Francia", away:"Iraq", homeFlag:"🇫🇷", awayFlag:"🇮🇶", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, date:"22 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
      { id:"I4", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home" },
      { id:"I5", home:"Noruega", away:"Francia", homeFlag:"🇳🇴", awayFlag:"🇫🇷", homeScore:1, awayScore:4, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away" },
      { id:"I6", home:"Senegal", away:"Iraq", homeFlag:"🇸🇳", awayFlag:"🇮🇶", homeScore:5, awayScore:0, homePrediction:2, awayPrediction:0, date:"26 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
    ]
  },
  {
    id: "J", label: "Grupo J",
    teams: [
      { name: "Argentina", flag: "🇦🇷", played: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, pts: 9 },
      { name: "Austria", flag: "🇦🇹", played: 3, w: 1, d: 1, l: 1, gf: 6, ga: 6, pts: 4 },
      { name: "Argelia", flag: "🇩🇿", played: 3, w: 1, d: 1, l: 1, gf: 5, ga: 7, pts: 4 },
      { name: "Jordania", flag: "🇯🇴", played: 3, w: 0, d: 0, l: 3, gf: 3, ga: 8, pts: 0 },
    ],
    projected: ["🇦🇷 Argentina (1°)","🇦🇹 Austria (2°)"],
    matches: [
      { id:"J1", home:"Argentina", away:"Argelia", homeFlag:"🇦🇷", awayFlag:"🇩🇿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Arrowhead, Kansas City", status:"played", result:"home", notes:"Messi (17') + Álvarez. Gol inicial de Messi anulado por offside. Casi 80% del estadio con camiseta albiceleste." },
      { id:"J2", home:"Austria", away:"Jordania", homeFlag:"🇦🇹", awayFlag:"🇯🇴", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"home" },
      { id:"J3", home:"Argentina", away:"Austria", homeFlag:"🇦🇷", awayFlag:"🇦🇹", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"22 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home", notes:"Argentina CLASIFICA. 6 pts, 5 GF, 0 GA. 1er equipo en asegurar el pase al torneo." },
      { id:"J4", home:"Jordania", away:"Argelia", homeFlag:"🇯🇴", awayFlag:"🇩🇿", homeScore:1, awayScore:2, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"away" },
      { id:"J5", home:"Jordania", away:"Argentina", homeFlag:"🇯🇴", awayFlag:"🇦🇷", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:3, date:"27 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"away" },
      { id:"J6", home:"Argelia", away:"Austria", homeFlag:"🇩🇿", awayFlag:"🇦🇹", homeScore:3, awayScore:3, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Arrowhead, Kansas City", status:"played", result:"draw" },
    ]
  },
  {
    id: "K", label: "Grupo K",
    teams: [
      { name: "Portugal", flag: "🇵🇹", played: 3, w: 1, d: 2, l: 0, gf: 6, ga: 1, pts: 5 },
      { name: "Colombia", flag: "🇨🇴", played: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, pts: 7 },
      { name: "RD Congo", flag: "🇨🇩", played: 3, w: 1, d: 1, l: 1, gf: 4, ga: 3, pts: 4 },
      { name: "Uzbekistán", flag: "🇺🇿", played: 3, w: 0, d: 0, l: 3, gf: 2, ga: 11, pts: 0 },
    ],
    projected: ["🇨🇴 Colombia (1°) ✅","🇵🇹 Portugal (2°) ✅"],
    matches: [
      { id:"K1", home:"Portugal", away:"RD Congo", homeFlag:"🇵🇹", awayFlag:"🇨🇩", homeScore:1, awayScore:1, homePrediction:3, awayPrediction:0, date:"17 jun", venue:"NRG Stadium, Houston", status:"played", result:"draw" },
      { id:"K2", home:"Uzbekistán", away:"Colombia", homeFlag:"🇺🇿", awayFlag:"🇨🇴", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:2, date:"17 jun", venue:"Estadio Azteca, CDMX", status:"played", result:"away" },
      { id:"K3", home:"Portugal", away:"Uzbekistán", homeFlag:"🇵🇹", awayFlag:"🇺🇿", homeScore:5, awayScore:0, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"NRG Stadium, Houston", status:"played", result:"home" },
      { id:"K4", home:"Colombia", away:"RD Congo", homeFlag:"🇨🇴", awayFlag:"🇨🇩", homeScore:1, awayScore:0, homePrediction:2, awayPrediction:1, date:"23 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home" },
      { id:"K5", home:"Colombia", away:"Portugal", homeFlag:"🇨🇴", awayFlag:"🇵🇹", homeScore:0, awayScore:0, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw" },
      { id:"K6", home:"RD Congo", away:"Uzbekistán", homeFlag:"🇨🇩", awayFlag:"🇺🇿", homeScore:3, awayScore:1, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"home" },
    ]
  },
  {
    id: "L", label: "Grupo L",
    teams: [
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, pts: 7 },
      { name: "Croacia", flag: "🇭🇷", played: 3, w: 2, d: 0, l: 1, gf: 5, ga: 5, pts: 6 },
      { name: "Ghana", flag: "🇬🇭", played: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, pts: 4 },
      { name: "Panamá", flag: "🇵🇦", played: 3, w: 0, d: 0, l: 3, gf: 0, ga: 4, pts: 0 },
    ],
    projected: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra (1°)","🇬🇭 Ghana (2°) ⚡","🇭🇷 Croacia (3°)* ⚠️"],
    matches: [
      { id:"L1", home:"Inglaterra", away:"Croacia", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇭🇷", homeScore:4, awayScore:2, homePrediction:2, awayPrediction:1, date:"17 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home" },
      { id:"L2", home:"Ghana", away:"Panamá", homeFlag:"🇬🇭", awayFlag:"🇵🇦", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"17 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"L3", home:"Inglaterra", away:"Ghana", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇬🇭", homeScore:0, awayScore:0, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Gillette Stadium, Boston", status:"played", result:"draw" },
      { id:"L4", home:"Panamá", away:"Croacia", homeFlag:"🇵🇦", awayFlag:"🇭🇷", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, date:"23 jun", venue:"BMO Field, Toronto", status:"played", result:"away" },
      { id:"L5", home:"Panamá", away:"Inglaterra", homeFlag:"🇵🇦", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:0, awayScore:2, homePrediction:0, awayPrediction:4, date:"27 jun", venue:"MetLife Stadium, NJ", status:"played", result:"away" },
      { id:"L6", home:"Croacia", away:"Ghana", homeFlag:"🇭🇷", awayFlag:"🇬🇭", homeScore:2, awayScore:1, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
    ]
  }
]

// ─── KNOCKOUT BRACKET ───────────────────────────────────────────────────────

export const knockoutMatches: KnockoutMatch[] = [
  { id:"r32-1", round:"r32", home:"Argentina", away:"Irán", homeFlag:"🇦🇷", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Argentina aplastó 3-0 a Argelia — el equipo más en forma del torneo. Irán solo empató 2-2 vs NZ. Mismatch claro." },
  { id:"r32-2", round:"r32", home:"España", away:"Sudáfrica", homeFlag:"🇪🇸", awayFlag:"🇿🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", notes:"CAMBIO ⚡ Sudáfrica eliminó a Corea del Sur 1-0 y clasifica 2°A. España 1°H dominante. Sudáfrica creyó todo el torneo — España favorita pero los Bafana Bafana son peligrosos." },
  { id:"r32-3", round:"r32", home:"Inglaterra", away:"Noruega", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, extra:"PEN", winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"upcoming", notes:"Haaland x2 vs Iraq — el duelo más parejo del r32, penaltis" },
  { id:"r32-4", round:"r32", home:"Brasil", away:"Croacia", homeFlag:"🇧🇷", awayFlag:"🇭🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming", notes:"CAMBIO ⚡ Escocia eliminada (3 pts, GD -3). Croacia 3°L con 3 pts (posible mejor 3°). Brasil 1°C dominante (7 pts, Vinícius, Rodrygo, Paquetá en forma)." },
  { id:"r32-5", round:"r32", home:"Portugal", away:"Ghana", homeFlag:"🇵🇹", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Portugal", winnerFlag:"🇵🇹", status:"upcoming", notes:"Portugal SE RECUPERA: 5-0 vs Uzbekistán (Ronaldo x2, Bruno, Leao, Bernardo). La crisis quedó atrás. Ghana 2°L con 4 pts y 0 goles encajados ⚠️" },
  { id:"r32-6", round:"r32", home:"Francia", away:"Austria", homeFlag:"🇫🇷", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"Austria contundente 3-1 vs Jordania (Sabitzer, Arnautovic). Mbappé en modo histórico (2G vs Senegal). Francia favorita pero Austria es el rival más peligroso del cuadro ⚠️" },
  { id:"r32-7", round:"r32", home:"Alemania", away:"Japón", homeFlag:"🇩🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Alemania", winnerFlag:"🇩🇪", status:"upcoming", extra:"AET" },
  { id:"r32-8", round:"r32", home:"Marruecos", away:"C. de Marfil", homeFlag:"🇲🇦", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Marruecos confirma 2°C (7 pts, 4-2 vs Haití). Ziyech, En-Nesyri y Bounou en su mejor nivel del torneo." },
  { id:"r32-9", round:"r32", home:"Uruguay", away:"Canadá", homeFlag:"🇺🇾", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming", notes:"Uruguay en crisis: 2 empates (2 pts), necesita ganar J3 vs España para avanzar. Canadá goleó 6-0 a Qatar ⚡ — Si Uruguay no pasa, Cabo Verde podría estar aquí ⚠️" },
  { id:"r32-10", round:"r32", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:3, awayPrediction:0, winner:"Noruega", winnerFlag:"🇳🇴", status:"played", notes:"Haaland en modo destrucción (2G vs Iraq). Senegal goleado 1-3 por Francia" },
  { id:"r32-11", round:"r32", home:"Países Bajos", away:"Bélgica", homeFlag:"🇳🇱", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming", notes:"Países Bajos goleó 5-1 a Suecia y domina su grupo. Bélgica (180 min sin marcar) avanza si gana J3 vs NZ. Este duelo no será parejo — Países Bajos es superior." },
  { id:"r32-12", round:"r32", home:"C. de Marfil", away:"Paraguay", homeFlag:"🇨🇮", awayFlag:"🇵🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"C. de Marfil", winnerFlag:"🇨🇮", status:"upcoming", notes:"CAMBIO ⚡ Ecuador (1pt) y Türkiye (0pts) eliminados. Costa de Marfil (Gpo E, 3pts) vs Paraguay (3pts, mejor 3°). Amad Diallo impone jerarquía." },
  { id:"r32-13", round:"r32", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"México", winnerFlag:"🇲🇽", status:"upcoming", notes:"México 9 pts perfectos — mejor selección de la fase de grupos. El Tri llega al r32 como favorito del continente junto a Argentina." },
  { id:"r32-14", round:"r32", home:"Japón", away:"Egipto", homeFlag:"🇯🇵", awayFlag:"🇪🇬", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, extra:"PEN", winner:"Japón", winnerFlag:"🇯🇵", status:"upcoming", notes:"Suecia perdió 1-5 vs Países Bajos → Japón toma el 2° del Grupo F. Salah (4 pts, Egipto) vs Japón (4 pts). El duelo más parejo del r32 — penaltis." },
  { id:"r32-15", round:"r32", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:1, winner:"USA", winnerFlag:"🇺🇸", status:"played", notes:"Los dos dominaron J1 — Australia sorprende al mundo. El duelo inesperado del r32" },
  { id:"r32-16", round:"r32", home:"Colombia", away:"Irán", homeFlag:"🇨🇴", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming", notes:"Colombia 1°K con 6 pts (3-1 y 1-0). Luis Díaz dominante en todo el torneo. La segunda revelación tras México." },
  { id:"r16-1", round:"r16", home:"Argentina", away:"México", homeFlag:"🇦🇷", awayFlag:"🇲🇽", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming" },
  { id:"r16-2", round:"r16", home:"España", away:"Inglaterra", homeFlag:"🇪🇸", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", extra:"AET" },
  { id:"r16-3", round:"r16", home:"Brasil", away:"Portugal", homeFlag:"🇧🇷", awayFlag:"🇵🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming" },
  { id:"r16-4", round:"r16", home:"Francia", away:"Alemania", homeFlag:"🇫🇷", awayFlag:"🇩🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming" },
  { id:"r16-5", round:"r16", home:"Uruguay", away:"Colombia", homeFlag:"🇺🇾", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming" },
  { id:"r16-6", round:"r16", home:"Marruecos", away:"USA", homeFlag:"🇲🇦", awayFlag:"🇺🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"r16-7", round:"r16", home:"Países Bajos", away:"Noruega", homeFlag:"🇳🇱", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming" },
  { id:"r16-8", round:"r16", home:"Ecuador", away:"Japón", homeFlag:"🇪🇨", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, winner:"Japón", winnerFlag:"🇯🇵", status:"upcoming", notes:"Suecia cayó 1-5 vs Países Bajos → Japón toma el slot. Ecuador en crisis (0-0 vs Curazao en J2, 0 pts). Japón 4 pts domina al grupo. CAMBIO ⚡" },
  { id:"qf-1", round:"qf", home:"Francia", away:"España", homeFlag:"🇫🇷", awayFlag:"🇪🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"España se recuperó 4-0 vs Arabia Saudita — ya no está en crisis. Francia dominante (Mbappé histórico). El QF más atractivo del torneo." },
  { id:"qf-2", round:"qf", home:"Argentina", away:"Brasil", homeFlag:"🇦🇷", awayFlag:"🇧🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Argentina 3-0 vs Argelia (Messi magistral) vs Brasil 1-1 vs Marruecos. El Superclásico de América — Argentina llega como favorita clara por forma y moral" },
  { id:"qf-3", round:"qf", home:"Marruecos", away:"Países Bajos", homeFlag:"🇲🇦", awayFlag:"🇳🇱", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Bounou imbatible" },
  { id:"qf-4", round:"qf", home:"Uruguay", away:"Canadá", homeFlag:"🇺🇾", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming", notes:"CAMBIO ⚡ Suecia eliminada en Grupo F (perdió 1-5 vs Países Bajos). Canadá 2°B (6-0 a Qatar). Uruguay (J3 vs España pending) vs Canadá — duelo americano." },
  { id:"sf-1", round:"sf", home:"Francia", away:"Argentina", homeFlag:"🇫🇷", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", notes:"La revancha de Qatar 2022 — Mbappé máximo goleador histórico de Francia vs Messi buscando su segundo título. Ambos brillaron en J1. El partido del siglo." },
  { id:"sf-2", round:"sf", home:"Marruecos", away:"Uruguay", homeFlag:"🇲🇦", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"third", round:"third", home:"Argentina", away:"Uruguay", homeFlag:"🇦🇷", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", date:"18 jul", notes:"Clásico rioplatense por el bronce" },
  { id:"final", round:"final", home:"Francia", away:"Marruecos", homeFlag:"🇫🇷", awayFlag:"🇲🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", date:"19 jul", notes:"MetLife Stadium, Nueva Jersey. Mbappé 34' · Griezmann 97' — Ziyech 78'" }
]
