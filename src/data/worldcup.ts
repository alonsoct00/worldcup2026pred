// src/data/worldcup.ts
// Auto-synced: 2026-06-23T03:25:46.802Z
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

export const LAST_UPDATED = "2026-06-23T03:25:46.802Z"

export const news: NewsItem[] = [
  { id:"n34", date:"2026-06-23", tag:"resultado",
    title:"Noruega 3–2 Senegal",
    body:"Noruega suma 3 puntos con marcador 3–2."
  },
  { id:"n32", date:"2026-06-22", tag:"resultado",
    title:"Argentina 2–0 Austria",
    body:"Argentina suma 3 puntos con marcador 2–0."
  },
  { id:"n33", date:"2026-06-22", tag:"resultado",
    title:"Francia 3–0 Iraq",
    body:"Francia suma 3 puntos con marcador 3–0."
  },
  { id:"n31", date:"2026-06-21", tag:"estadistica",
    title:"Argentina clasifica en 2 juegos: 6 pts, 5 goles a favor, 0 en contra",
    body:"Victoria 2-0 vs Austria. Argentina es el primer equipo en clasificar del torneo. Messi + Di María + Álvarez indeteniables. La mejor defensa entre los 12 grupos. Con J3 vs Jordania de descanso, llegan frescos al r32."
  },
  { id:"n30", date:"2026-06-21", tag:"sorpresa",
    title:"España 4–0 Arabia Saudita: La Furia vuelve con venganza",
    body:"Morata x2, Yamal y Pedri. España borró el mal sabor del 0-0 vs Cabo Verde con una goleada demoledora. 4 pts, GD +4, liderato del Grupo H. La Roja sigue viva en su camino al r32."
  },
  { id:"n29", date:"2026-06-21", tag:"sorpresa",
    title:"Uruguay 2–2 Cabo Verde: La Celeste no puede ganar en dos intentos",
    body:"Cabo Verde volvió a empatar a los favoritos (ya frenaron a España 0-0). Uruguay tiene 2 puntos en 2 juegos y necesita vencer a España en J3 para asegurar el pase. Sin victoria en fase de grupos, Uruguay roza la eliminación."
  },
  { id:"n28", date:"2026-06-21", tag:"sorpresa",
    title:"Bélgica 0–0 Irán: 180 minutos sin marcar, De Bruyne impotente",
    body:"Bélgica suma su segundo partido sin gol (1-1 y 0-0). De Bruyne jugó sin espacios, Lukaku desaparecido. Egipto lidera el Grupo G con 4 pts. Bélgica e Irán, con 2 pts cada uno, lo juegan todo en J3. La 'Generación Dorada' puede quedar fuera."
  },
  { id:"n27", date:"2026-06-21", tag:"resultado",
    title:"Egipto 3–1 Nueva Zelanda: Salah comanda el Grupo G",
    body:"Mohamed Salah 1G+1A. Egipto con 4 pts lidera el Grupo G sin haber perdido. Bélgica queda al borde con 2 empates. Irán igual a 2 pts. El boleto del 2° lugar del Grupo G se decide en J3: Bélgica vs NZ e Irán vs Egipto."
  },
  { id:"n25", date:"2026-06-20", tag:"resultado",
    title:"Brasil 3–0 Haití",
    body:"Brasil suma 3 puntos con marcador 3–0."
  },
  { id:"n26", date:"2026-06-20", tag:"resultado",
    title:"Türkiye 0–1 Paraguay",
    body:"Paraguay suma 3 puntos con marcador 0–1."
  },
  { id:"n24", date:"2026-06-19", tag:"resultado",
    title:"Escocia 0–1 Marruecos",
    body:"Marruecos suma 3 puntos con marcador 0–1."
  },
  { id:"n23", date:"2026-06-19", tag:"resultado",
    title:"México 1–0 Corea del Sur",
    body:"México suma 3 puntos con marcador 1–0."
  },
  { id:"n22", date:"2026-06-18", tag:"sorpresa",
    title:"Canadá 6–0 Qatar",
    body:"Canadá suma 3 puntos con marcador 6–0."
  },
  { id:"n20", date:"2026-06-18", tag:"resultado",
    title:"Chequia 1–1 Sudáfrica: empate",
    body:"El partido terminó igualado 1–1. Ambos equipos suman 1 punto."
  },
  { id:"n21", date:"2026-06-18", tag:"resultado",
    title:"Suiza 4–1 Bosnia",
    body:"Suiza suma 3 puntos con marcador 4–1."
  },
  { id:"n19", date:"2026-06-18", tag:"estadistica",
    title:"J1 completa: los favoritos confirmados y las crisis reveladas",
    body:"Mejor debut: Alemania 7-1, Argentina 3-0, Inglaterra 4-2, Noruega 5-1, USA 4-1. En crisis: España 0-0 vs Cabo Verde, Portugal 1-1 vs RD Congo, Brasil 1-1 vs Marruecos. El torneo ya tiene ganadores y sorpresas claras."
  },
  { id:"n18", date:"2026-06-18", tag:"sorpresa",
    title:"Colombia 3–1 a Uzbekistán: Los Cafeteros lideran el Grupo K sobre Portugal",
    body:"Luis Díaz y Córdoba brillaron. Colombia aplastó con juego vistoso y ocupa el 1° del Grupo K mientras Portugal solo empató 1-1 vs RD Congo. Los Cafeteros son la revelación sudamericana del torneo junto a Argentina."
  },
  { id:"n17", date:"2026-06-17", tag:"sorpresa",
    title:"Ghana 1–0 Panamá: los Black Stars amenazan el Grupo L",
    body:"Gol de Jordan Ayew (38'). Ghana iguala en puntos con Inglaterra tras la J1 y deja a Croacia y Panamá con 0 pts. El 2° lugar del Grupo L está más disputado de lo esperado."
  },
  { id:"n16", date:"2026-06-17", tag:"resultado",
    title:"Inglaterra 4–2 Croacia: los Tres Leones rugen en Dallas",
    body:"Kane doblete, Saka y Bellingham. La revancha del EURO 2020 fue contundente. Uno de los mejores debuts del torneo junto a Alemania (7-1) y Argentina (3-0)."
  },
  { id:"n15", date:"2026-06-17", tag:"sorpresa",
    title:"Portugal 1–1 RD Congo: Ronaldo y cía. en crisis desde J1",
    body:"El favorito del Grupo K no pudo pasar a RD Congo, que igualó con un golazo de media distancia. Portugal tuvo posesión pero careció de profundidad. Colombia le roba el liderato del grupo. Grave advertencia para el r32."
  },
  { id:"n13", date:"2026-06-17", tag:"estadistica",
    title:"Messi 1G+1A: Argentina aplasta 3–0 a Argelia en Kansas City",
    body:"Messi marcó al 17' (gol anterior anulado por offside) y asistió a Álvarez. El 80% del estadio en Kansas City vistió camiseta albiceleste. Argentina es el equipo más en forma del torneo — Messi camina hacia su segunda Copa del Mundo."
  },
  { id:"n14", date:"2026-06-17", tag:"resultado",
    title:"Austria 3–1 Jordania: alerta para Francia en la r32",
    body:"Sabitzer y Arnautovic guiaron a Austria. El rival de Francia en la r32 mostró contundencia, velocidad en bandas y solidez defensiva. El debut austriaco es la mejor noticia de la jornada para los que buscan sorpresas en el cuadro de Mbappé."
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
  }
]

// ─── GRUPOS ─────────────────────────────────────────────────────────────────

export const groups: Group[] = [
  {
    id: "A", label: "Grupo A",
    teams: [
      { name: "México", flag: "🇲🇽", played: 2, w: 2, d: 0, l: 0, gf: 3, ga: 0, pts: 6 },
      { name: "Corea del Sur", flag: "🇰🇷", played: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, pts: 3 },
      { name: "Chequia", flag: "🇨🇿", played: 2, w: 0, d: 1, l: 1, gf: 2, ga: 3, pts: 1 },
      { name: "Sudáfrica", flag: "🇿🇦", played: 2, w: 0, d: 1, l: 1, gf: 1, ga: 3, pts: 1 },
    ],
    projected: ["🇲🇽 México (1°)","🇰🇷 Corea del Sur (2°)","🇨🇿 Chequia (3°)*"],
    matches: [
      { id:"A1", home:"México", away:"Sudáfrica", homeFlag:"🇲🇽", awayFlag:"🇿🇦", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"11 jun", venue:"Estadio Azteca, CDMX", status:"played", result:"home", notes:"Quiñones y Jiménez. Roja a Montes (80'). Sudáfrica 2 expulsados.", homeRed:1, awayRed:2 },
      { id:"A2", home:"Corea del Sur", away:"Chequia", homeFlag:"🇰🇷", awayFlag:"🇨🇿", homeScore:2, awayScore:1, homePrediction:0, awayPrediction:1, date:"11 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Oh Hyeon-gyu decisivo de sub al 80'. Son Heung-min lideró." },
      { id:"A3", home:"México", away:"Corea del Sur", homeFlag:"🇲🇽", awayFlag:"🇰🇷", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"18 jun", venue:"Estadio BBVA, Guadalajara", status:"played", result:"home", notes:"Sin Montes (susp.). Partido crucial para el liderato." },
      { id:"A4", home:"Chequia", away:"Sudáfrica", homeFlag:"🇨🇿", awayFlag:"🇿🇦", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"Atlanta Stadium", status:"played", result:"draw" },
      { id:"A5", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Estadio BBVA, Guadalajara", status:"upcoming", result:null },
      { id:"A6", home:"Sudáfrica", away:"Corea del Sur", homeFlag:"🇿🇦", awayFlag:"🇰🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"23 jun", venue:"Estadio BBVA, Monterrey", status:"upcoming", result:null },
    ]
  },
  {
    id: "B", label: "Grupo B",
    teams: [
      { name: "Canadá", flag: "🇨🇦", played: 2, w: 1, d: 1, l: 0, gf: 7, ga: 1, pts: 4 },
      { name: "Bosnia", flag: "🇧🇦", played: 2, w: 0, d: 1, l: 1, gf: 2, ga: 5, pts: 1 },
      { name: "Qatar", flag: "🇶🇦", played: 2, w: 0, d: 1, l: 1, gf: 1, ga: 7, pts: 1 },
      { name: "Suiza", flag: "🇨🇭", played: 2, w: 1, d: 1, l: 0, gf: 5, ga: 2, pts: 4 },
    ],
    projected: ["🇨🇭 Suiza (1°)","🇨🇦 Canadá (2°)"],
    matches: [
      { id:"B1", home:"Canadá", away:"Bosnia", homeFlag:"🇨🇦", awayFlag:"🇧🇦", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"BMO Field, Toronto", status:"played", result:"draw", notes:"Lukic (Bosnia) temprano. Larin (78') empató con desvío." },
      { id:"B2", home:"Qatar", away:"Suiza", homeFlag:"🇶🇦", awayFlag:"🇨🇭", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"draw", notes:"Khoukhi igualó para Qatar en el descuento. Suiza dominó." },
      { id:"B3", home:"Suiza", away:"Bosnia", homeFlag:"🇨🇭", awayFlag:"🇧🇦", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, date:"18 jun", venue:"SoFi Stadium, LA", status:"played", result:"home" },
      { id:"B4", home:"Canadá", away:"Qatar", homeFlag:"🇨🇦", awayFlag:"🇶🇦", homeScore:6, awayScore:0, homePrediction:2, awayPrediction:0, date:"18 jun", venue:"BC Place, Vancouver", status:"played", result:"home" },
      { id:"B5", home:"Suiza", away:"Canadá", homeFlag:"🇨🇭", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"24 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
      { id:"B6", home:"Bosnia", away:"Qatar", homeFlag:"🇧🇦", awayFlag:"🇶🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, date:"24 jun", venue:"Lumen Field, Seattle", status:"upcoming", result:null },
    ]
  },
  {
    id: "C", label: "Grupo C",
    teams: [
      { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 2, w: 1, d: 0, l: 1, gf: 1, ga: 1, pts: 3 },
      { name: "Brasil", flag: "🇧🇷", played: 2, w: 1, d: 1, l: 0, gf: 4, ga: 1, pts: 4 },
      { name: "Marruecos", flag: "🇲🇦", played: 2, w: 1, d: 1, l: 0, gf: 2, ga: 1, pts: 4 },
      { name: "Haití", flag: "🇭🇹", played: 2, w: 0, d: 0, l: 2, gf: 0, ga: 4, pts: 0 },
    ],
    projected: ["🇧🇷 Brasil (1°)","🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia (2°) ⚡","🇲🇦 Marruecos (3°)*"],
    matches: [
      { id:"C1", home:"Brasil", away:"Marruecos", homeFlag:"🇧🇷", awayFlag:"🇲🇦", homeScore:1, awayScore:1, homePrediction:3, awayPrediction:1, date:"13 jun", venue:"MetLife Stadium, NJ", status:"played", result:"draw", notes:"Vinícius Jr. salvó a Brasil con empate tardío. Marruecos muy sólido." },
      { id:"C2", home:"Haití", away:"Escocia", homeFlag:"🇭🇹", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:0, awayScore:1, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"away", notes:"McGinn (28'). Escocia líder del grupo." },
      { id:"C3", home:"Escocia", away:"Marruecos", homeFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag:"🇲🇦", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away" },
      { id:"C4", home:"Brasil", away:"Haití", homeFlag:"🇧🇷", awayFlag:"🇭🇹", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, date:"19 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
      { id:"C5", home:"Brasil", away:"Escocia", homeFlag:"🇧🇷", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"24 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
      { id:"C6", home:"Marruecos", away:"Haití", homeFlag:"🇲🇦", awayFlag:"🇭🇹", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, date:"24 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
    ]
  },
  {
    id: "D", label: "Grupo D",
    teams: [
      { name: "USA", flag: "🇺🇸", played: 2, w: 2, d: 0, l: 0, gf: 6, ga: 1, pts: 6 },
      { name: "Australia", flag: "🇦🇺", played: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, pts: 3 },
      { name: "Türkiye", flag: "🇹🇷", played: 2, w: 0, d: 0, l: 2, gf: 0, ga: 3, pts: 0 },
      { name: "Paraguay", flag: "🇵🇾", played: 2, w: 1, d: 0, l: 1, gf: 2, ga: 4, pts: 3 },
    ],
    projected: ["🇺🇸 USA (1°)","🇦🇺 Australia (2°) ⚡sorpresa"],
    matches: [
      { id:"D1", home:"USA", away:"Paraguay", homeFlag:"🇺🇸", awayFlag:"🇵🇾", homeScore:4, awayScore:1, homePrediction:2, awayPrediction:1, date:"12 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"home", notes:"OG 7', Balogun x2, Reyna. Mejor debut en historia de USMNT." },
      { id:"D2", home:"Australia", away:"Türkiye", homeFlag:"🇦🇺", awayFlag:"🇹🇷", homeScore:2, awayScore:0, homePrediction:0, awayPrediction:2, date:"13 jun", venue:"BC Place, Vancouver", status:"played", result:"home", notes:"Irankunda (27') + Metcalfe (75'). Gran sorpresa del torneo." },
      { id:"D3", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"19 jun", venue:"Lumen Field, Seattle", status:"played", result:"home", notes:"Pulisic en duda (pantorrilla)." },
      { id:"D4", home:"Türkiye", away:"Paraguay", homeFlag:"🇹🇷", awayFlag:"🇵🇾", homeScore:0, awayScore:1, homePrediction:1, awayPrediction:1, date:"19 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"away" },
      { id:"D5", home:"Türkiye", away:"USA", homeFlag:"🇹🇷", awayFlag:"🇺🇸", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"25 jun", venue:"SoFi Stadium, Los Ángeles", status:"upcoming", result:null },
      { id:"D6", home:"Paraguay", away:"Australia", homeFlag:"🇵🇾", awayFlag:"🇦🇺", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"25 jun", venue:"Levi's Stadium, San Francisco", status:"upcoming", result:null },
    ]
  },
  {
    id: "E", label: "Grupo E",
    teams: [
      { name: "Alemania", flag: "🇩🇪", played: 2, w: 2, d: 0, l: 0, gf: 9, ga: 2, pts: 6 },
      { name: "Costa de Marfil", flag: "🇨🇮", played: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, pts: 3 },
      { name: "Ecuador", flag: "🇪🇨", played: 2, w: 0, d: 1, l: 1, gf: 0, ga: 1, pts: 1 },
      { name: "Curazao", flag: "🇨🇼", played: 2, w: 0, d: 1, l: 1, gf: 1, ga: 7, pts: 1 },
    ],
    projected: ["🇩🇪 Alemania (1°)","🇨🇮 Costa de Marfil (2°) ⚡","🇪🇨 Ecuador (3°)*"],
    matches: [
      { id:"E1", home:"Alemania", away:"Curazao", homeFlag:"🇩🇪", awayFlag:"🇨🇼", homeScore:7, awayScore:1, homePrediction:4, awayPrediction:0, date:"14 jun", venue:"NRG Stadium, Houston", status:"played", result:"home", notes:"Havertz x2, Musiala, Schlotterbeck. Comenencia: 1er gol de Curazao en Mundiales." },
      { id:"E2", home:"Costa de Marfil", away:"Ecuador", homeFlag:"🇨🇮", awayFlag:"🇪🇨", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"14 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home", notes:"Amad Diallo (sub, 90'). Ecuador pegó 2 veces en el palo." },
      { id:"E3", home:"Alemania", away:"Costa de Marfil", homeFlag:"🇩🇪", awayFlag:"🇨🇮", homeScore:2, awayScore:1, homePrediction:2, awayPrediction:1, date:"20 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"E4", home:"Ecuador", away:"Curazao", homeFlag:"🇪🇨", awayFlag:"🇨🇼", homeScore:0, awayScore:0, homePrediction:3, awayPrediction:0, date:"20 jun", venue:"Arrowhead, Kansas City", status:"played", result:"draw", notes:"Ecuador necesita ganar sí o sí." },
      { id:"E5", home:"Ecuador", away:"Alemania", homeFlag:"🇪🇨", awayFlag:"🇩🇪", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"E6", home:"Curazao", away:"Costa de Marfil", homeFlag:"🇨🇼", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"25 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
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
      { name: "Bélgica", flag: "🇧🇪", played: 2, w: 0, d: 2, l: 0, gf: 1, ga: 1, pts: 2 },
      { name: "Egipto", flag: "🇪🇬", played: 2, w: 1, d: 1, l: 0, gf: 4, ga: 2, pts: 4 },
      { name: "Irán", flag: "🇮🇷", played: 2, w: 0, d: 2, l: 0, gf: 2, ga: 2, pts: 2 },
      { name: "Nueva Zelanda", flag: "🇳🇿", played: 2, w: 0, d: 1, l: 1, gf: 3, ga: 5, pts: 1 },
    ],
    projected: ["🇪🇬 Egipto (1°) ⚡","🇧🇪 Bélgica (2°) ⚠️","🇮🇷 Irán (3°)*"],
    matches: [
      { id:"G1", home:"Bélgica", away:"Egipto", homeFlag:"🇧🇪", awayFlag:"🇪🇬", homeScore:1, awayScore:1, homePrediction:2, awayPrediction:0, date:"15 jun", venue:"Lumen Field, Seattle", status:"played", result:"draw", notes:"De Bruyne vs Salah. Empate que sorprendió a los favoritos." },
      { id:"G2", home:"Irán", away:"Nueva Zelanda", homeFlag:"🇮🇷", awayFlag:"🇳🇿", homeScore:2, awayScore:2, homePrediction:1, awayPrediction:0, date:"15 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"draw", notes:"Rezaeian: gol + asistencia, 1er iraní con G+A en Mundiales. Just: 2 goles NZ." },
      { id:"G3", home:"Bélgica", away:"Irán", homeFlag:"🇧🇪", awayFlag:"🇮🇷", homeScore:0, awayScore:0, homePrediction:2, awayPrediction:1, date:"21 jun", venue:"SoFi Stadium, Los Ángeles", status:"played", result:"draw", notes:"180 min sin gol para Bélgica. De Bruyne impotente. 'Generación Dorada' al borde." },
      { id:"G4", home:"Nueva Zelanda", away:"Egipto", homeFlag:"🇳🇿", awayFlag:"🇪🇬", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:1, date:"21 jun", venue:"BC Place, Vancouver", status:"played", result:"away", notes:"Salah 1G+1A. Egipto lidera el Grupo G con 4 pts." },
      { id:"G5", home:"Egipto", away:"Irán", homeFlag:"🇪🇬", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"26 jun", venue:"Lumen Field, Seattle", status:"upcoming", result:null },
      { id:"G6", home:"Nueva Zelanda", away:"Bélgica", homeFlag:"🇳🇿", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:3, date:"26 jun", venue:"BC Place, Vancouver", status:"upcoming", result:null },
    ]
  },
  {
    id: "H", label: "Grupo H 🔥",
    teams: [
      { name: "España", flag: "🇪🇸", played: 2, w: 1, d: 1, l: 0, gf: 4, ga: 0, pts: 4 },
      { name: "Cabo Verde", flag: "🇨🇻", played: 2, w: 0, d: 2, l: 0, gf: 2, ga: 2, pts: 2 },
      { name: "Arabia Saudita", flag: "🇸🇦", played: 2, w: 0, d: 1, l: 1, gf: 1, ga: 5, pts: 1 },
      { name: "Uruguay", flag: "🇺🇾", played: 2, w: 0, d: 2, l: 0, gf: 3, ga: 3, pts: 2 },
    ],
    projected: ["🇪🇸 España (1°) ✅","🇺🇾 Uruguay (2°) ⚠️","🇨🇻 Cabo Verde (3°)*"],
    matches: [
      { id:"H1", home:"España", away:"Cabo Verde", homeFlag:"🇪🇸", awayFlag:"🇨🇻", homeScore:0, awayScore:0, homePrediction:4, awayPrediction:0, date:"15 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"draw", notes:"27 remates de España, xG 2.29. Vozinha (40 años) infranqueable. Mayor sorpresa del torneo." },
      { id:"H2", home:"Arabia Saudita", away:"Uruguay", homeFlag:"🇸🇦", awayFlag:"🇺🇾", homeScore:1, awayScore:1, homePrediction:0, awayPrediction:2, date:"15 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw", notes:"Olivera (Uruguay) 106 toques: récord uruguayo en Mundiales." },
      { id:"H3", home:"España", away:"Arabia Saudita", homeFlag:"🇪🇸", awayFlag:"🇸🇦", homeScore:4, awayScore:0, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Mercedes-Benz, Atlanta", status:"played", result:"home", notes:"Morata x2, Yamal, Pedri. La Furia regresa con venganza. Borran el 0-0 vs Cabo Verde." },
      { id:"H4", home:"Uruguay", away:"Cabo Verde", homeFlag:"🇺🇾", awayFlag:"🇨🇻", homeScore:2, awayScore:2, homePrediction:2, awayPrediction:0, date:"21 jun", venue:"Hard Rock Stadium, Miami", status:"played", result:"draw", notes:"Segundo empate de Uruguay. 2 pts en 2 juegos — NECESITA ganar J3 vs España." },
      { id:"H5", home:"Cabo Verde", away:"Arabia Saudita", homeFlag:"🇨🇻", awayFlag:"🇸🇦", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:1, date:"26 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"H6", home:"Uruguay", away:"España", homeFlag:"🇺🇾", awayFlag:"🇪🇸", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Estadio Akron, Guadalajara", status:"upcoming", result:null },
    ]
  },
  {
    id: "I", label: "Grupo I",
    teams: [
      { name: "Francia", flag: "🇫🇷", played: 2, w: 2, d: 0, l: 0, gf: 6, ga: 1, pts: 6 },
      { name: "Noruega", flag: "🇳🇴", played: 2, w: 2, d: 0, l: 0, gf: 7, ga: 3, pts: 6 },
      { name: "Senegal", flag: "🇸🇳", played: 2, w: 0, d: 0, l: 2, gf: 3, ga: 6, pts: 0 },
      { name: "Iraq", flag: "🇮🇶", played: 2, w: 0, d: 0, l: 2, gf: 1, ga: 7, pts: 0 },
    ],
    projected: ["🇫🇷 Francia (1°)","🇳🇴 Noruega (2°)"],
    matches: [
      { id:"I1", home:"Francia", away:"Senegal", homeFlag:"🇫🇷", awayFlag:"🇸🇳", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home", notes:"Mbappé x2 → máximo goleador histórico de Francia. Olise estelar." },
      { id:"I2", home:"Iraq", away:"Noruega", homeFlag:"🇮🇶", awayFlag:"🇳🇴", homeScore:1, awayScore:4, homePrediction:0, awayPrediction:2, date:"16 jun", venue:"Gillette Stadium, Boston", status:"played", result:"away", notes:"Haaland doblete en 1ª parte. Noruega goleó en su regreso al Mundial." },
      { id:"I3", home:"Francia", away:"Iraq", homeFlag:"🇫🇷", awayFlag:"🇮🇶", homeScore:3, awayScore:0, homePrediction:3, awayPrediction:0, date:"22 jun", venue:"Lincoln Financial, Philadelphia", status:"played", result:"home" },
      { id:"I4", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"MetLife Stadium, NJ", status:"played", result:"home" },
      { id:"I5", home:"Noruega", away:"Francia", homeFlag:"🇳🇴", awayFlag:"🇫🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:2, date:"26 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
      { id:"I6", home:"Senegal", away:"Iraq", homeFlag:"🇸🇳", awayFlag:"🇮🇶", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"26 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
    ]
  },
  {
    id: "J", label: "Grupo J",
    teams: [
      { name: "Argentina", flag: "🇦🇷", played: 2, w: 2, d: 0, l: 0, gf: 5, ga: 0, pts: 6 },
      { name: "Austria", flag: "🇦🇹", played: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, pts: 3 },
      { name: "Argelia", flag: "🇩🇿", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 3, pts: 0 },
      { name: "Jordania", flag: "🇯🇴", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
    ],
    projected: ["🇦🇷 Argentina (1°)","🇦🇹 Austria (2°)"],
    matches: [
      { id:"J1", home:"Argentina", away:"Argelia", homeFlag:"🇦🇷", awayFlag:"🇩🇿", homeScore:3, awayScore:0, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Arrowhead, Kansas City", status:"played", result:"home", notes:"Messi (17') + Álvarez. Gol inicial de Messi anulado por offside. Casi 80% del estadio con camiseta albiceleste." },
      { id:"J2", home:"Austria", away:"Jordania", homeFlag:"🇦🇹", awayFlag:"🇯🇴", homeScore:3, awayScore:1, homePrediction:2, awayPrediction:0, date:"16 jun", venue:"Levi's Stadium, San Francisco", status:"played", result:"home" },
      { id:"J3", home:"Argentina", away:"Austria", homeFlag:"🇦🇷", awayFlag:"🇦🇹", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:0, date:"22 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home", notes:"Argentina CLASIFICA. 6 pts, 5 GF, 0 GA. 1er equipo en asegurar el pase al torneo." },
      { id:"J4", home:"Jordania", away:"Argelia", homeFlag:"🇯🇴", awayFlag:"🇩🇿", homeScore:0, awayScore:0, homePrediction:1, awayPrediction:1, date:"22 jun", venue:"Levi's Stadium, San Francisco", status:"live", result:null },
      { id:"J5", home:"Jordania", away:"Argentina", homeFlag:"🇯🇴", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:3, date:"27 jun", venue:"AT&T Stadium, Dallas", status:"upcoming", result:null },
      { id:"J6", home:"Argelia", away:"Austria", homeFlag:"🇩🇿", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Arrowhead, Kansas City", status:"upcoming", result:null },
    ]
  },
  {
    id: "K", label: "Grupo K",
    teams: [
      { name: "Portugal", flag: "🇵🇹", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Colombia", flag: "🇨🇴", played: 1, w: 1, d: 0, l: 0, gf: 3, ga: 1, pts: 3 },
      { name: "RD Congo", flag: "🇨🇩", played: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
      { name: "Uzbekistán", flag: "🇺🇿", played: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
    ],
    projected: ["🇨🇴 Colombia (1°) ⚡","🇵🇹 Portugal (2°) ⚠️"],
    matches: [
      { id:"K1", home:"Portugal", away:"RD Congo", homeFlag:"🇵🇹", awayFlag:"🇨🇩", homeScore:1, awayScore:1, homePrediction:3, awayPrediction:0, date:"17 jun", venue:"NRG Stadium, Houston", status:"played", result:"draw" },
      { id:"K2", home:"Uzbekistán", away:"Colombia", homeFlag:"🇺🇿", awayFlag:"🇨🇴", homeScore:1, awayScore:3, homePrediction:0, awayPrediction:2, date:"17 jun", venue:"Estadio Azteca, CDMX", status:"played", result:"away" },
      { id:"K3", home:"Portugal", away:"Uzbekistán", homeFlag:"🇵🇹", awayFlag:"🇺🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"NRG Stadium, Houston", status:"upcoming", result:null },
      { id:"K4", home:"Colombia", away:"RD Congo", homeFlag:"🇨🇴", awayFlag:"🇨🇩", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, date:"23 jun", venue:"Estadio BBVA, Guadalajara", status:"upcoming", result:null },
      { id:"K5", home:"Colombia", away:"Portugal", homeFlag:"🇨🇴", awayFlag:"🇵🇹", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Hard Rock Stadium, Miami", status:"upcoming", result:null },
      { id:"K6", home:"RD Congo", away:"Uzbekistán", homeFlag:"🇨🇩", awayFlag:"🇺🇿", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Mercedes-Benz, Atlanta", status:"upcoming", result:null },
    ]
  },
  {
    id: "L", label: "Grupo L",
    teams: [
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 1, w: 1, d: 0, l: 0, gf: 4, ga: 2, pts: 3 },
      { name: "Croacia", flag: "🇭🇷", played: 1, w: 0, d: 0, l: 1, gf: 2, ga: 4, pts: 0 },
      { name: "Ghana", flag: "🇬🇭", played: 1, w: 1, d: 0, l: 0, gf: 1, ga: 0, pts: 3 },
      { name: "Panamá", flag: "🇵🇦", played: 1, w: 0, d: 0, l: 1, gf: 0, ga: 1, pts: 0 },
    ],
    projected: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra (1°)","🇬🇭 Ghana (2°) ⚡","🇭🇷 Croacia (3°)*"],
    matches: [
      { id:"L1", home:"Inglaterra", away:"Croacia", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇭🇷", homeScore:4, awayScore:2, homePrediction:2, awayPrediction:1, date:"17 jun", venue:"AT&T Stadium, Dallas", status:"played", result:"home" },
      { id:"L2", home:"Ghana", away:"Panamá", homeFlag:"🇬🇭", awayFlag:"🇵🇦", homeScore:1, awayScore:0, homePrediction:1, awayPrediction:1, date:"17 jun", venue:"BMO Field, Toronto", status:"played", result:"home" },
      { id:"L3", home:"Inglaterra", away:"Ghana", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, date:"23 jun", venue:"Gillette Stadium, Boston", status:"upcoming", result:null },
      { id:"L4", home:"Panamá", away:"Croacia", homeFlag:"🇵🇦", awayFlag:"🇭🇷", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, date:"23 jun", venue:"BMO Field, Toronto", status:"upcoming", result:null },
      { id:"L5", home:"Panamá", away:"Inglaterra", homeFlag:"🇵🇦", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:4, date:"27 jun", venue:"MetLife Stadium, NJ", status:"upcoming", result:null },
      { id:"L6", home:"Croacia", away:"Ghana", homeFlag:"🇭🇷", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, date:"27 jun", venue:"Lincoln Financial, Philadelphia", status:"upcoming", result:null },
    ]
  }
]

// ─── KNOCKOUT BRACKET ───────────────────────────────────────────────────────

export const knockoutMatches: KnockoutMatch[] = [
  { id:"r32-1", round:"r32", home:"Argentina", away:"Irán", homeFlag:"🇦🇷", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Argentina aplastó 3-0 a Argelia — el equipo más en forma del torneo. Irán solo empató 2-2 vs NZ. Mismatch claro." },
  { id:"r32-2", round:"r32", home:"España", away:"Corea del Sur", homeFlag:"🇪🇸", awayFlag:"🇰🇷", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", notes:"España se recuperó con goleada 4-0 vs Arabia Saudita (Morata x2, Yamal, Pedri). La crisis quedó atrás. Corea del Sur es peligrosa pero España avanza." },
  { id:"r32-3", round:"r32", home:"Inglaterra", away:"Noruega", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, extra:"PEN", winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"upcoming", notes:"Haaland x2 vs Iraq — el duelo más parejo del r32, penaltis" },
  { id:"r32-4", round:"r32", home:"Brasil", away:"Escocia", homeFlag:"🇧🇷", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming", notes:"Brasil decepcionó vs Marruecos (1-1). Escocia lidera el Grupo C ⚡" },
  { id:"r32-5", round:"r32", home:"Portugal", away:"Ghana", homeFlag:"🇵🇹", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Portugal", winnerFlag:"🇵🇹", status:"upcoming", notes:"Portugal en crisis (1-1 vs RD Congo). Ghana ganó J1 vs Panamá. El choque más incierto del r32 — Ghana puede dar la sorpresa ⚡" },
  { id:"r32-6", round:"r32", home:"Francia", away:"Austria", homeFlag:"🇫🇷", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"Austria contundente 3-1 vs Jordania (Sabitzer, Arnautovic). Mbappé en modo histórico (2G vs Senegal). Francia favorita pero Austria es el rival más peligroso del cuadro ⚠️" },
  { id:"r32-7", round:"r32", home:"Alemania", away:"Japón", homeFlag:"🇩🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Alemania", winnerFlag:"🇩🇪", status:"upcoming", extra:"AET" },
  { id:"r32-8", round:"r32", home:"Marruecos", away:"C. de Marfil", homeFlag:"🇲🇦", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"r32-9", round:"r32", home:"Uruguay", away:"Canadá", homeFlag:"🇺🇾", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming", notes:"Uruguay en crisis: 2 empates (2 pts), necesita ganar J3 vs España para avanzar. Canadá goleó 6-0 a Qatar ⚡ — Si Uruguay no pasa, Cabo Verde podría estar aquí ⚠️" },
  { id:"r32-10", round:"r32", home:"Noruega", away:"Senegal", homeFlag:"🇳🇴", awayFlag:"🇸🇳", homeScore:3, awayScore:2, homePrediction:3, awayPrediction:0, winner:"Noruega", winnerFlag:"🇳🇴", status:"played", notes:"Haaland en modo destrucción (2G vs Iraq). Senegal goleado 1-3 por Francia", result:"home" },
  { id:"r32-11", round:"r32", home:"Países Bajos", away:"Bélgica", homeFlag:"🇳🇱", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming", notes:"Países Bajos goleó 5-1 a Suecia y domina su grupo. Bélgica (180 min sin marcar) avanza si gana J3 vs NZ. Este duelo no será parejo — Países Bajos es superior." },
  { id:"r32-12", round:"r32", home:"C. de Marfil", away:"Paraguay", homeFlag:"🇨🇮", awayFlag:"🇵🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"C. de Marfil", winnerFlag:"🇨🇮", status:"upcoming", notes:"CAMBIO ⚡ Ecuador (1pt) y Türkiye (0pts) eliminados. Costa de Marfil (Gpo E, 3pts) vs Paraguay (3pts, mejor 3°). Amad Diallo impone jerarquía." },
  { id:"r32-13", round:"r32", home:"México", away:"Chequia", homeFlag:"🇲🇽", awayFlag:"🇨🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"México", winnerFlag:"🇲🇽", status:"upcoming" },
  { id:"r32-14", round:"r32", home:"Japón", away:"Egipto", homeFlag:"🇯🇵", awayFlag:"🇪🇬", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, extra:"PEN", winner:"Japón", winnerFlag:"🇯🇵", status:"upcoming", notes:"Suecia perdió 1-5 vs Países Bajos → Japón toma el 2° del Grupo F. Salah (4 pts, Egipto) vs Japón (4 pts). El duelo más parejo del r32 — penaltis." },
  { id:"r32-15", round:"r32", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:2, awayScore:0, homePrediction:2, awayPrediction:1, winner:"USA", winnerFlag:"🇺🇸", status:"played", notes:"Los dos dominaron J1 — Australia sorprende al mundo. El duelo inesperado del r32", result:"home" },
  { id:"r32-16", round:"r32", home:"Colombia", away:"Irán", homeFlag:"🇨🇴", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming", notes:"Colombia aplastó 3-1 a Uzbekistán — Los Cafeteros son la revelación de J1. Irán solo empató 2-2. Colombia avanza con autoridad." },
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
  { id:"qf-4", round:"qf", home:"Uruguay", away:"Suecia", homeFlag:"🇺🇾", awayFlag:"🇸🇪", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Uruguay", winnerFlag:"🇺🇾", status:"upcoming", notes:"Suecia es la gran revelación — Uruguay lo resuelve en el alargue" },
  { id:"sf-1", round:"sf", home:"Francia", away:"Argentina", homeFlag:"🇫🇷", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", notes:"La revancha de Qatar 2022 — Mbappé máximo goleador histórico de Francia vs Messi buscando su segundo título. Ambos brillaron en J1. El partido del siglo." },
  { id:"sf-2", round:"sf", home:"Marruecos", away:"Uruguay", homeFlag:"🇲🇦", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming" },
  { id:"third", round:"third", home:"Argentina", away:"Uruguay", homeFlag:"🇦🇷", awayFlag:"🇺🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", date:"18 jul", notes:"Clásico rioplatense por el bronce" },
  { id:"final", round:"final", home:"Francia", away:"Marruecos", homeFlag:"🇫🇷", awayFlag:"🇲🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", date:"19 jul", notes:"MetLife Stadium, Nueva Jersey. Mbappé 34' · Griezmann 97' — Ziyech 78'" }
]
