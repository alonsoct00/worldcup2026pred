// src/data/worldcup.ts
// Auto-synced: 2026-09-05T23:33:28.570Z
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

export const LAST_UPDATED = "2026-09-05T23:33:28.570Z"

export const news: NewsItem[] = [
  { id:"n88", date:"2026-07-14", tag:"resultado",
    title:"¡ESPAÑA A LA FINAL! España 2–0 Francia en semifinales",
    body:"La Roja vence a Francia en la semifinal (sf-1) y llega invicta a su primera final desde 2010. Yamal fue decisivo ante Mbappé. España espera rival: Inglaterra o Argentina (sf-2, 15 jul)."
  },
  { id:"n83", date:"2026-07-12", tag:"resultado",
    title:"Argentina 3–1 Suiza (p.e.)",
    body:"Argentina suma 3 puntos con marcador 3–1  (p.e.)."
  },
  { id:"n87", date:"2026-07-11", tag:"resultado",
    title:"Inglaterra 2–1 Noruega (p.e.): Haaland eliminado en cuartos",
    body:"Bellingham y compañía tumban a Noruega en la prórroga de cuartos de final. Haaland, que venía de eliminar a Brasil, se queda sin semifinal."
  },
  { id:"n86", date:"2026-07-09", tag:"resultado",
    title:"Francia 2–0 Marruecos: la revancha de Qatar 2022, pero en cuartos",
    body:"Francia se venga del semifinalista de 2022 y avanza a semifinales sin necesidad de prórroga. Mbappé sigue intratable en la fase eliminatoria."
  },
  { id:"n85", date:"2026-07-07", tag:"sorpresa",
    title:"Suiza elimina a Colombia por penales en octavos (0-0)",
    body:"Colombia, invicta hasta ese punto, cae en la tanda de penales ante Suiza tras un 0-0 sin goles. Una de las mayores sorpresas silenciosas del cuadro."
  },
  { id:"n82", date:"2026-07-07", tag:"resultado",
    title:"USA 1–4 Bélgica",
    body:"Bélgica suma 3 puntos con marcador 1–4."
  },
  { id:"n81", date:"2026-07-06", tag:"resultado",
    title:"Portugal 0–1 España",
    body:"España suma 3 puntos con marcador 0–1."
  },
  { id:"n80", date:"2026-07-06", tag:"resultado",
    title:"México 2–3 Inglaterra",
    body:"Inglaterra suma 3 puntos con marcador 2–3."
  },
  { id:"n79", date:"2026-07-05", tag:"resultado",
    title:"Brasil 1–2 Noruega",
    body:"Noruega suma 3 puntos con marcador 1–2."
  },
  { id:"n84", date:"2026-07-04", tag:"sorpresa",
    title:"Marruecos 3–0 Canadá: termina el cuento de hadas canadiense",
    body:"Los Leones del Atlas golean a Canadá en octavos y confirman por qué son especialistas en la fase eliminatoria — avanzan a cuartos a enfrentar a Francia."
  },
  { id:"n78", date:"2026-07-04", tag:"resultado",
    title:"Colombia 1–0 Ghana",
    body:"Colombia suma 3 puntos con marcador 1–0."
  },
  { id:"n77", date:"2026-07-03", tag:"resultado",
    title:"Australia 1–1 Egipto: empate",
    body:"El partido terminó igualado 1–1. Ambos equipos suman 1 punto."
  },
  { id:"n76", date:"2026-07-03", tag:"resultado",
    title:"Suiza 2–0 Argelia",
    body:"Suiza suma 3 puntos con marcador 2–0."
  },
  { id:"n73", date:"2026-07-02", tag:"resultado",
    title:"USA 2–0 Bosnia",
    body:"USA suma 3 puntos con marcador 2–0."
  },
  { id:"n74", date:"2026-07-02", tag:"resultado",
    title:"España 3–0 Austria",
    body:"España suma 3 puntos con marcador 3–0."
  },
  { id:"n75", date:"2026-07-02", tag:"resultado",
    title:"Portugal 2–1 Croacia",
    body:"Portugal suma 3 puntos con marcador 2–1."
  },
  { id:"n72", date:"2026-07-01", tag:"resultado",
    title:"Inglaterra 2–1 RD Congo",
    body:"Inglaterra suma 3 puntos con marcador 2–1."
  },
  { id:"n69", date:"2026-06-30", tag:"resultado",
    title:"Países Bajos 1–1 Marruecos: empate",
    body:"El partido terminó igualado 1–1. Ambos equipos suman 1 punto."
  },
  { id:"n70", date:"2026-06-30", tag:"resultado",
    title:"Costa de Marfil 1–2 Noruega",
    body:"Noruega suma 3 puntos con marcador 1–2."
  },
  { id:"n71", date:"2026-06-30", tag:"resultado",
    title:"Francia 3–0 Suecia",
    body:"Francia suma 3 puntos con marcador 3–0."
  },
  { id:"n68", date:"2026-06-29", tag:"resultado",
    title:"Brasil 2–1 Japón",
    body:"Brasil suma 3 puntos con marcador 2–1."
  },
  { id:"n67", date:"2026-06-28", tag:"resultado",
    title:"Jordania 1–3 Argentina",
    body:"Argentina suma 3 puntos con marcador 1–3."
  },
  { id:"n63", date:"2026-06-28", tag:"sorpresa",
    title:"Predicciones actualizadas: España finalista, Marruecos cae en r16 ante Francia",
    body:"Con el bracket real del r32 confirmado, se actualizan las predicciones: Francia sigue como campeón proyectado, pero España reemplaza a Marruecos como finalista. El cambio clave: en el cuadro real, Francia y Marruecos están en el mismo lado del bracket (r16-3: Marruecos vs Francia, 5 jul) — es imposible que ambos lleguen a la final. Marruecos da el upset sobre Países Bajos en r32, pero Francia los elimina en r16. La nueva final proyectada: Francia 2-1 España (AET) en MetLife Stadium."
  },
  { id:"n62", date:"2026-06-28", tag:"estadistica",
    title:"Bracket r32 confirmado: México vs Ecuador, el duelo más atractivo de CONCACAF",
    body:"El cuadro real de 16vos tiene la mayor sorpresa para México: enfrentará a Ecuador (1 jul), el equipo que venció a Alemania 2-1 en la fase de grupos. El Tri llega como 1°A (9 pts perfectos) pero Ecuador 3°E (4 pts) es peligrosísimo en forma. Otros duelos destacados: Brasil vs Japón (29 jun), Marruecos vs PB (30 jun), y el derbi ibérico España vs Portugal en r16 (6 jul)."
  },
  { id:"n61", date:"2026-06-28", tag:"resultado",
    title:"Bracket real r32: Argentina vs Cabo Verde, no vs Irán — mismatch histórico",
    body:"El cuadro real del Mundial reveló que Argentina (1°J, 9 pts, 8 GF) enfrenta a Cabo Verde (2°H, 3 pts, 3 empates sin marcar). Es el mismatch más claro de toda la fase knockout. Messi, Di María y compañía ante el equipo que nunca ganó un partido en la fase de grupos. Proyección: Argentina 4-0 Cabo Verde, con hat-trick de Messi."
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
    projected: ["🇺🇸 USA (1°) ✅","🇦🇺 Australia (2°) ⚡✅"],
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
    projected: ["🇩🇪 Alemania (1°) ✅","🇨🇮 Costa de Marfil (2°) ✅","🇪🇨 Ecuador (3°)* ⚡SORPRESA"],
    matches: [
      { id:"E1", home:"Alemania", away:"Curazao", homeFlag:"🇩🇪", awayFlag:"🇨🇼", homeScore:7, awayScore:1, homePrediction:4, awayPrediction:0, date:"14 jun", venue:"NRG Stadium, Houston", status:"played", result:"home", notes:"Havertz x2, Musiala, Schlotterbeck. Comenencia: 1er gol de Curazao en Mundiales." },
      { id:"E2", home:"Costa de Marfil", away:"Ecuador", homeFlag:"🇨🇮", awayFlag:"🇪🇨", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"14 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Amad Diallo (sub, 90'). Ecuador pegó 2 veces en el palo." },
      { id:"E3", home:"Alemania", away:"Costa de Marfil", homeFlag:"🇩🇪", awayFlag:"🇨🇮", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:1, date:"20 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"E4", home:"Ecuador", away:"Curazao", homeFlag:"🇪🇨", awayFlag:"🇨🇼", homeScore:0, awayScore:0, homePrediction:3, awayPrediction:0, date:"20 jun", venue:"Arrowhead, Kansas City", status:"played", result:"draw", notes:"Ecuador necesita ganar sí o sí." },
      { id:"E5", home:"Ecuador", away:"Alemania", homeFlag:"🇪🇨", awayFlag:"🇩🇪", homeScore:2, awayScore:1, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"NRG Stadium, Houston", status:"played", result:"home", notes:"SORPRESA ⚡ Ecuador 2-1 a Alemania. Valencia decisivo. Alemania sobrevive como 1°E (GD +6 vs +2 CdI). Ecuador 3°E, 4 pts — candidato top a mejor 3°." },
      { id:"E6", home:"Curazao", away:"Costa de Marfil", homeFlag:"🇨🇼", awayFlag:"🇨🇮", homeScore:0, awayScore:2, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"away" },
    ]
  },
  {
    id: "F", label: "Grupo F",
    teams: [
      { name: "Países Bajos", flag: "🇳🇱", played: 3, w: 2, d: 1, l: 0, gf: 10, ga: 4, pts: 7 },
      { name: "Japón", flag: "🇯🇵", played: 3, w: 1, d: 2, l: 0, gf: 7, ga: 3, pts: 5 },
      { name: "Suecia", flag: "🇸🇪", played: 3, w: 1, d: 1, l: 1, gf: 7, ga: 7, pts: 4 },
      { name: "Túnez", flag: "🇹🇳", played: 3, w: 0, d: 0, l: 3, gf: 2, ga: 12, pts: 0 },
    ],
    projected: ["🇳🇱 Países Bajos (1°) ✅","🇯🇵 Japón (2°) ✅","🇸🇪 Suecia (3°)* ⚠️"],
    matches: [
      { id:"F1", home:"Países Bajos", away:"Japón", homeFlag:"🇳🇱", awayFlag:"🇯🇵", homeScore:2, awayScore:2, homePrediction:2, awayPrediction:1, date:"14 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"draw", notes:"Van Dijk, Summerville (PB). Nakamura y Ogawa (cabeza) para Japón al 88'." },
      { id:"F2", home:"Túnez", away:"Suecia", homeFlag:"🇹🇳", awayFlag:"🇸🇪", homeScore:1, awayScore:5, homePrediction:0, awayPrediction:2, date:"14 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"away", notes:"Isak, Gyökeres, Ayari x2, Svanberg. Gol anulado revertido por VAR." },
      { id:"F3", home:"Países Bajos", away:"Suecia", homeFlag:"🇳🇱", awayFlag:"🇸🇪", homeScore:5, awayScore:1, homePrediction:1, awayPrediction:1, date:"20 jun", venue:"NRG Stadium, Houston", status:"played", result:"home" },
      { id:"F4", home:"Túnez", away:"Japón", homeFlag:"🇹🇳", awayFlag:"🇯🇵", homeScore:0, awayScore:4, homePrediction:0, awayPrediction:2, date:"20 jun", venue:"Estadio BBVA, Monterrey", status:"played", result:"away" },
      { id:"F5", home:"Suecia", away:"Japón", homeFlag:"🇸🇪", awayFlag:"🇯🇵", homeScore:1, awayScore:1, homePrediction:1, awayPrediction:0, date:"25 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"draw", notes:"Empate que confirma Japón 2°F (5 pts) y Suecia 3°F (4 pts, candidata a mejor 3°)." },
      { id:"F6", home:"Países Bajos", away:"Túnez", homeFlag:"🇳🇱", awayFlag:"🇹🇳", homeScore:3, awayScore:1, homePrediction:3, awayPrediction:0, date:"25 jun", venue:"Arrowhead, Kansas City", status:"played", result:"home", notes:"Países Bajos 1°F dominante: 10 GF, 4 GA, GD +6. Túnez eliminada sin victorias." },
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
    projected: ["🇧🇪 Bélgica (1°) ⚡✅","🇪🇬 Egipto (2°) ✅","🇮🇷 Irán (3°)* ⚠️"],
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
    projected: ["🇪🇸 España (1°) ✅","🇨🇻 Cabo Verde (2°) ⚡","🇺🇾 Uruguay (3°)* ❌ eliminado"],
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
    projected: ["🇫🇷 Francia (1°) ✅","🇳🇴 Noruega (2°) ✅"],
    matches: [
      { id:"I1", home:"Francia", away:"Senegal", homeFlag:"🇫🇷", awayFlag:"🇸🇳", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home", notes:"Mbappé x2 → máximo goleador histórico de Francia. Olise estelar." },
      { id:"I2", home:"Iraq", away:"Noruega", homeFlag:"🇮🇶", awayFlag:"🇳🇴", homeScore:1, awayScore:4, homePrediction:0, awayPrediction:2, date:"16 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away", notes:"Haaland doblete en 1ª parte. Noruega goleó en su regreso al Mundial." },
      { id:"I3", home:"Francia", away:"Iraq", homeFlag:"🇫🇷", awayFlag:"🇮🇶", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, date:"22 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
      { id:"I4", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home" },
      { id:"I5", home:"Noruega", away:"Francia", homeFlag:"🇳🇴", awayFlag:"🇫🇷", homeScore:1, awayScore:4, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away", notes:"Francia ARRASÓ 4-1 (Mbappé x2, Griezmann, Dembélé). Les Bleus 1°I con 9 pts y 10 GF — la mejor ofensiva del torneo. Noruega 2°I con 6 pts también clasifica." },
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
    projected: ["🇦🇷 Argentina (1°) ✅","🇦🇹 Austria (2°) ✅"],
    matches: [
      { id:"J1", home:"Argentina", away:"Argelia", homeFlag:"🇦🇷", awayFlag:"🇩🇿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Arrowhead, Kansas City", status:"played", result:"home", notes:"Messi (17') + Álvarez. Gol inicial de Messi anulado por offside. Casi 80% del estadio con camiseta albiceleste." },
      { id:"J2", home:"Austria", away:"Jordania", homeFlag:"🇦🇹", awayFlag:"🇯🇴", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"home" },
      { id:"J3", home:"Argentina", away:"Austria", homeFlag:"🇦🇷", awayFlag:"🇦🇹", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"22 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home", notes:"Argentina CLASIFICA. 6 pts, 5 GF, 0 GA. 1er equipo en asegurar el pase al torneo." },
      { id:"J4", home:"Jordania", away:"Argelia", homeFlag:"🇯🇴", awayFlag:"🇩🇿", homeScore:1, awayScore:2, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"away" },
      { id:"J5", home:"Jordania", away:"Argentina", homeFlag:"🇯🇴", awayFlag:"🇦🇷", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:3, date:"27 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"away", notes:"Argentina 3-1 con rotaciones. Messi salió al 70' — llegan perfectos al r32. 9 pts, 8 GF, solo 1 GA (propio)." },
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
    projected: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra (1°) ✅","🇭🇷 Croacia (2°) ⚡✅","🇬🇭 Ghana (3°)* ⚠️"],
    matches: [
      { id:"L1", home:"Inglaterra", away:"Croacia", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇭🇷", homeScore:4, awayScore:2, homePrediction:2, awayPrediction:1, date:"17 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home" },
      { id:"L2", home:"Ghana", away:"Panamá", homeFlag:"🇬🇭", awayFlag:"🇵🇦", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"17 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"L3", home:"Inglaterra", away:"Ghana", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇬🇭", homeScore:0, awayScore:0, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Gillette Stadium, Boston", status:"played", result:"draw" },
      { id:"L4", home:"Panamá", away:"Croacia", homeFlag:"🇵🇦", awayFlag:"🇭🇷", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, date:"23 jun", venue:"BMO Field, Toronto", status:"played", result:"away" },
      { id:"L5", home:"Panamá", away:"Inglaterra", homeFlag:"🇵🇦", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:0, awayScore:2, homePrediction:0, awayPrediction:4, date:"27 jun", venue:"MetLife Stadium, NJ", status:"played", result:"away" },
      { id:"L6", home:"Croacia", away:"Ghana", homeFlag:"🇭🇷", awayFlag:"🇬🇭", homeScore:2, awayScore:1, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Croacia 2-1 con goles de Modrić y Gvardiol. Los Vatreni remontaron y terminan 2°L con 6 pts. Ghana queda 3°L (4 pts) — podría calificar como mejor 3°." },
    ]
  }
]

// ─── KNOCKOUT BRACKET ───────────────────────────────────────────────────────

export const knockoutMatches: KnockoutMatch[] = [
  { id:"r32-1", round:"r32", home:"Sudáfrica", away:"Canadá", homeFlag:"🇿🇦", awayFlag:"🇨🇦", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, winner:"Canadá", winnerFlag:"🇨🇦", status:"played", date:"28 jun", notes:"Jonathan David (56') decide. Canadá histórico: primer partido de eliminación en mundiales, primer triunfo. Sudáfrica eliminada pese a ganar el Grupo A." },
  { id:"r32-2", round:"r32", home:"Brasil", away:"Japón", homeFlag:"🇧🇷", awayFlag:"🇯🇵", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:0, winner:"Brasil", winnerFlag:"🇧🇷", status:"played", date:"29 jun", notes:"Brasil 1°C (7 pts, 5 GF, Vinícius Jr. + Rodrygo) vs Japón 2°F (5 pts, 6 GF, Kubo). Japón eliminó a Alemania en Qatar 2022 — otro upset posible, pero Brasil tiene demasiada profundidad." },
  { id:"r32-3", round:"r32", home:"Alemania", away:"Paraguay", homeFlag:"🇩🇪", awayFlag:"🇵🇾", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:1, winner:"Paraguay", winnerFlag:"🇵🇾", status:"played", date:"29 jun", notes:"RESULTADO REAL: Paraguay ganó la tanda de penales — Alemania ELIMINADA en el r32 pese a llegar como 1°E con GD +6. Paraguay 3°D avanza como la gran sorpresa del cuadro.", extra:"PEN" },
  { id:"r32-4", round:"r32", home:"Países Bajos", away:"Marruecos", homeFlag:"🇳🇱", awayFlag:"🇲🇦", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:1, winner:"Marruecos", winnerFlag:"🇲🇦", status:"played", extra:"PEN", date:"30 jun", notes:"⚡ PREDICCIÓN UPSET: Marruecos 1-0 PB (prórroga). Bounou infranqueable, Ziyech decisivo. PB 1°F (7 pts, 10 GF, favorito absoluto) — pero los Leones del Atlas son maestros de los upsets." },
  { id:"r32-5", round:"r32", home:"C. de Marfil", away:"Noruega", homeFlag:"🇨🇮", awayFlag:"🇳🇴", homeScore:1, awayScore:2, homePrediction:1, awayPrediction:2, winner:"Noruega", winnerFlag:"🇳🇴", status:"played", date:"30 jun", notes:"CdI 2°E (6 pts, GD +2, Haller + Pépé) vs Noruega 2°I (6 pts, Haaland x4). El duelo más parejo del r32 — Haaland es la diferencia." },
  { id:"r32-6", round:"r32", home:"Francia", away:"Suecia", homeFlag:"🇫🇷", awayFlag:"🇸🇪", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"played", date:"30 jun", notes:"Francia IMPARABLE: 9 pts, 10 GF (Mbappé x4, Griezmann x2, Dembélé). Suecia 3°F (4 pts, Isak + Gyökeres). Mismatch total — Les Bleus en modo final desde el primer minuto." },
  { id:"r32-7", round:"r32", home:"México", away:"Ecuador", homeFlag:"🇲🇽", awayFlag:"🇪🇨", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:1, winner:"México", winnerFlag:"🇲🇽", status:"played", date:"1 jul", notes:"¡EL DUELO CONTINENTAL! México 1°A (9 pts perfectos) vs Ecuador 3°E (4 pts) — SORPRESA del torneo que venció a Alemania 2-1. El Tri favorito en casa virtual, pero Ecuador llega con moral máxima. Quiñones vs Valencia." },
  { id:"r32-8", round:"r32", home:"Inglaterra", away:"RD Congo", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇨🇩", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:0, winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"played", date:"1 jul", notes:"Inglaterra 1°L (7 pts, Bellingham dominante) vs RD Congo 3°K (4 pts, revelación africana). Los Leones avanzan sin complicaciones — la brecha de calidad es demasiado grande." },
  { id:"r32-9", round:"r32", home:"Bélgica", away:"Senegal", homeFlag:"🇧🇪", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:2, awayPrediction:0, winner:"Bélgica", winnerFlag:"🇧🇪", status:"played", date:"1 jul", notes:"Bélgica 1°G (5 pts, GD +4, generación dorada) vs Senegal 3°I (3 pts, GD +2). De Bruyne y Lukaku en modo final — última oportunidad de la 'Generación Dorada' de Bélgica.", extra:"AET" },
  { id:"r32-10", round:"r32", home:"USA", away:"Bosnia", homeFlag:"🇺🇸", awayFlag:"🇧🇦", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:1, winner:"USA", winnerFlag:"🇺🇸", status:"played", date:"2 jul", notes:"USA 1°D (6 pts) — los anfitriones ante su afición. Bosnia 3°B (4 pts, 3-1 vs Qatar). Pulisic y McKennie líderes en casa. Advertencia: USMNT perdió 2-3 vs Türkiye en J3. Džeko a vigilar." },
  { id:"r32-11", round:"r32", home:"España", away:"Austria", homeFlag:"🇪🇸", awayFlag:"🇦🇹", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, winner:"España", winnerFlag:"🇪🇸", status:"played", date:"2 jul", notes:"España 1°H (7 pts, GD +5 — 5-0 Arabia, 2-0 Dinamarca) vs Austria 2°J (4 pts, empató 3-3 vs Argelia en el descuento). Yamal y Morata liquidan en 60 min." },
  { id:"r32-12", round:"r32", home:"Portugal", away:"Croacia", homeFlag:"🇵🇹", awayFlag:"🇭🇷", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:1, winner:"Portugal", winnerFlag:"🇵🇹", status:"played", extra:"AET", date:"2 jul", notes:"DUELO EUROPEO: Portugal 2°K (5 pts, Ronaldo + Bruno Fernandes) vs Croacia 2°L (6 pts, Modrić magistral, W2). Los Vatreni son maduros en eliminatorias — Portugal avanza en prórroga." },
  { id:"r32-13", round:"r32", home:"Suiza", away:"Argelia", homeFlag:"🇨🇭", awayFlag:"🇩🇿", homeScore:2, awayScore:0, homePrediction:1, awayPrediction:0, winner:"Suiza", winnerFlag:"🇨🇭", status:"played", date:"3 jul", notes:"Suiza 1°B (7 pts, Xhaka capitán, organización suiza) vs Argelia 3°J (4 pts — casi elimina Austria 3-3). La Nati sólida y sólida — Argelia llega con energía pero Suiza no pierde fácil." },
  { id:"r32-14", round:"r32", home:"Australia", away:"Egipto", homeFlag:"🇦🇺", awayFlag:"🇪🇬", homeScore:1, awayScore:1, homePrediction:1, awayPrediction:2, winner:"Egipto", winnerFlag:"🇪🇬", status:"played", date:"3 jul", notes:"⚡ PREDICCIÓN UPSET: Egipto 2-1 Australia. Salah (3 goles en grupos, mejor del mundo en forma) decide el partido. Australia 2°D llegó fuerte (2-0 Türkiye) pero con Salah al frente, Egipto pasa.", extra:"PEN" },
  { id:"r32-15", round:"r32", home:"Argentina", away:"Cabo Verde", homeFlag:"🇦🇷", awayFlag:"🇨🇻", homeScore:3, awayScore:2, homePrediction:4, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"played", date:"3 jul", notes:"MISMATCH HISTÓRICO: Argentina 1°J (9 pts, 8 GF — Messi x3, Di María x2) vs Cabo Verde 2°H (3 pts, 3 empates sin marcar). El campeón defensor aplasta. Messi busca el hat-trick de torneos.", extra:"AET" },
  { id:"r32-16", round:"r32", home:"Colombia", away:"Ghana", homeFlag:"🇨🇴", awayFlag:"🇬🇭", homeScore:1, awayScore:0, homePrediction:2, awayPrediction:0, winner:"Colombia", winnerFlag:"🇨🇴", status:"played", date:"4 jul", notes:"Colombia 1°K (7 pts, invicta — Luis Díaz imparable, Falcao Jr. vigente) vs Ghana 3°L (4 pts, Kudus brillante). Los Cafeteros avanzan con autoridad. Luis Díaz define antes del min 70." },
  { id:"r16-1", round:"r16", home:"Canadá", away:"Marruecos", homeFlag:"🇨🇦", awayFlag:"🇲🇦", homeScore:0, awayScore:3, homePrediction:1, awayPrediction:2, winner:"Marruecos", winnerFlag:"🇲🇦", status:"played", date:"4 jul", notes:"RESULTADO REAL: Marruecos 3–0 Canadá. Termina el cuento de hadas canadiense — los Leones del Atlas confirman por qué son maestros de los cruces eliminatorios." },
  { id:"r16-2", round:"r16", home:"Brasil", away:"Noruega", homeFlag:"🇧🇷", awayFlag:"🇳🇴", homeScore:1, awayScore:2, homePrediction:2, awayPrediction:1, winner:"Noruega", winnerFlag:"🇳🇴", status:"played", date:"4 jul", notes:"RESULTADO: Noruega 2–1 Brasil. Haaland fue decisivo y elimina a la Canarinha, que llegaba como 1°C con más profundidad sobre el papel — el gran upset de los octavos." },
  { id:"r16-3", round:"r16", home:"Paraguay", away:"Francia", homeFlag:"🇵🇾", awayFlag:"🇫🇷", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:2, winner:"Francia", winnerFlag:"🇫🇷", status:"played", date:"5 jul", notes:"RESULTADO REAL: tras eliminar a Alemania por penales en el r32, Paraguay cae 0–1 ante Francia. Mbappé decide — Les Bleus avanzan sufriendo pero avanzan." },
  { id:"r16-4", round:"r16", home:"México", away:"Inglaterra", homeFlag:"🇲🇽", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:2, awayScore:3, homePrediction:1, awayPrediction:0, winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"played", date:"6 jul", notes:"RESULTADO: Inglaterra 3–2 México. Bellingham fue la diferencia y corta la racha perfecta del Tri (9 pts en fase de grupos) en el partido más esperado por la afición local." },
  { id:"r16-5", round:"r16", home:"España", away:"Portugal", homeFlag:"🇪🇸", awayFlag:"🇵🇹", homeScore:1, awayScore:0, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"played", date:"6 jul", notes:"DERBI IBÉRICO: España 1–0 Portugal. Yamal vs la leyenda — la nueva generación se impone en tiempo regular a la última oportunidad de Cristiano." },
  { id:"r16-6", round:"r16", home:"Bélgica", away:"USA", homeFlag:"🇧🇪", awayFlag:"🇺🇸", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, winner:"Bélgica", winnerFlag:"🇧🇪", status:"played", date:"7 jul", notes:"De Bruyne y la Generación Dorada golean 4-1 a los anfitriones. USA pierde la ventaja local — De Bruyne y Lukaku deciden ante su multitud opuesta." },
  { id:"r16-7", round:"r16", home:"Argentina", away:"Egipto", homeFlag:"🇦🇷", awayFlag:"🇪🇬", homeScore:3, awayScore:2, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"played", date:"7 jul", notes:"RESULTADO REAL: no era el cruce esperado (Colombia cayó ante Suiza en el otro lado del cuadro). Argentina 3–2 Egipto — Messi vs Salah, partidazo con el campeón defensor imponiéndose." },
  { id:"r16-8", round:"r16", home:"Suiza", away:"Colombia", homeFlag:"🇨🇭", awayFlag:"🇨🇴", homeScore:0, awayScore:0, homePrediction:1, awayPrediction:2, winner:"Suiza", winnerFlag:"🇨🇭", status:"played", extra:"PEN", date:"7 jul", notes:"RESULTADO REAL: gran sorpresa — Suiza elimina a Colombia (invicta hasta entonces) en la tanda de penales tras un 0-0 sin goles. La Nati avanza silenciosamente." },
  { id:"qf-1", round:"qf", home:"Francia", away:"Marruecos", homeFlag:"🇫🇷", awayFlag:"🇲🇦", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"played", date:"9 jul", notes:"RESULTADO REAL: LA REVANCHA DE QATAR 2022, pero en cuartos, no en octavos. Francia 2–0 Marruecos — Mbappé y compañía se vengan del semifinalista de 2022 en tiempo regular." },
  { id:"qf-2", round:"qf", home:"España", away:"Bélgica", homeFlag:"🇪🇸", awayFlag:"🇧🇪", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:0, winner:"España", winnerFlag:"🇪🇸", status:"played", date:"10 jul", notes:"La Roja invicta vs la Generación Dorada de Bélgica. Yamal, Morata y Pedri son una maquinaria bien engrasada. De Bruyne lo intenta todo, pero España es superior en todos los aspectos." },
  { id:"qf-3", round:"qf", home:"Noruega", away:"Inglaterra", homeFlag:"🇳🇴", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:1, awayScore:2, homePrediction:1, awayPrediction:2, winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"played", extra:"AET", date:"11 jul", notes:"RESULTADO REAL: Haaland (imparable desde que tumbó a Brasil) se topa con Bellingham e Inglaterra en cuartos — los Tres Leones se imponen 2-1 en prórroga." },
  { id:"qf-4", round:"qf", home:"Argentina", away:"Suiza", homeFlag:"🇦🇷", awayFlag:"🇨🇭", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"played", extra:"AET", date:"12 jul", notes:"RESULTADO REAL: Argentina 3–1 Suiza (prórroga). Messi decide ante el equipo que dio la sorpresa eliminando a Colombia. El campeón defensor sigue con vida." },
  { id:"sf-1", round:"sf", home:"Francia", away:"España", homeFlag:"🇫🇷", awayFlag:"🇪🇸", homeScore:0, awayScore:2, homePrediction:1, awayPrediction:2, winner:"España", winnerFlag:"🇪🇸", status:"played", date:"14 jul", notes:"RESULTADO REAL: España 2–0 Francia. Yamal vs Mbappé en el duelo más esperado del torneo — La Roja, invicta en todo el camino, avanza a su primera final desde 2010." },
  { id:"sf-2", round:"sf", home:"Inglaterra", away:"Argentina", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇦🇷", homeScore:1, awayScore:2, homePrediction:1, awayPrediction:2, winner:"Argentina", winnerFlag:"🇦🇷", status:"played", extra:"AET", date:"15 jul", notes:"ACTUALIZADO: el cruce real no es Francia vs Argentina (Francia ya quedó eliminado en la sf-1 ante España) — es Bellingham vs Messi. Argentina, campeón defensor, es favorito pero Inglaterra ha sido letal en la fase KO." },
  { id:"third", round:"third", home:"Francia", away:"Inglaterra", homeFlag:"🇫🇷", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:4, awayScore:6, homePrediction:2, awayPrediction:1, winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"played", date:"18 jul", notes:"ACTUALIZADO: el tercer lugar depende de quién pierda la sf-2. Predicción: Francia (eliminada por España en semis) vs el perdedor de Inglaterra-Argentina. Mbappé se despide con el bronce." },
  { id:"final", round:"final", home:"España", away:"Argentina", homeFlag:"🇪🇸", awayFlag:"🇦🇷", homeScore:1, awayScore:0, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"played", extra:"AET", date:"19 jul", notes:"ACTUALIZADO: España ya es finalista confirmada (venció a Francia 2-0 en semis). El rival depende de la sf-2 Inglaterra-Argentina; predicción: España vs Argentina. Yamal vs Messi — La Roja, invicta todo el torneo, favorita para el título." }
]
