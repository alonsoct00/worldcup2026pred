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

export const LAST_UPDATED = "2026-06-28T18:00:00.000Z"

export const news: NewsItem[] = [
  { id:"n60", date:"2026-06-28", tag:"sorpresa",
    title:"Canadá 1–0 Sudáfrica: primer shock del r32 — los Bafana Bafana eliminados",
    body:"Canadá derrota a Sudáfrica en el debut del r32. La mayor sorpresa de la fase eliminatoria hasta ahora: Sudáfrica, que eliminó a Corea del Sur en grupos y llegó con 4 pts, cae ante la hornada dorada de Canadá (Jonathan David, Buchanan). Los norteamericanos son el equipo con más goles de la fase de grupos (8) y ahora están en los 16 mejores del mundo."
  },
  { id:"n59", date:"2026-06-28", tag:"sorpresa",
    title:"Argelia 3–3 Austria: drama total — Austria 2°J en el descuento",
    body:"Partido de infarto en el cierre del Grupo J. Austria empató 3-3 vs Argelia y termina 2°J por mejor GD (0 vs -2). Argelia queda 3°J con 4 pts y entra en la carrera de los mejores terceros."
  },
  { id:"n58", date:"2026-06-27", tag:"sorpresa",
    title:"Croacia 2–1 Ghana: los balkánicos remontan y son 2°L con 6 pts",
    body:"Croacia revive en el último partido del Grupo L. Con 6 pts (W2, L1), Croacia termina 2°L sobre Ghana (4 pts). Los Vatreni muestran el carácter de sus grandes generaciones. Ghana 3°L — aún con 4 pts puede pelear como mejor 3°."
  },
  { id:"n57", date:"2026-06-27", tag:"sorpresa",
    title:"Uruguay 0–1 España y ELIMINADO — Cabo Verde es el inesperado 2°H",
    body:"España 1-0 a Uruguay con gol de Morata (34'). Uruguay queda ELIMINADO con solo 2 pts en 3 juegos — la mayor decepción sudamericana del torneo. Cabo Verde, que empató los 3 partidos (0-0 España, 2-2 Uruguay, 0-0 Arabia), termina inesperadamente 2°H con 3 pts. Los Tubarões Azuis al r32 por primera vez en la historia."
  },
  { id:"n56", date:"2026-06-27", tag:"estadistica",
    title:"Bélgica 5–1 Nueva Zelanda: la Generación Dorada revive y toma el 1°G sobre Egipto",
    body:"Bélgica goleó 5-1 a NZ (De Bruyne x2, Lukaku x2, Trossard) en J3 y termina 1°G con 5 pts y GD +4, superando a Egipto (5 pts, GD +2) por diferencia de goles. La 'Generación Dorada' que parecía muerta después de 180 min sin gol en J1-J2 entra al r32 como primera del grupo."
  },
  { id:"n55", date:"2026-06-27", tag:"resultado",
    title:"Egipto 1–1 Irán: ambos con 5 pts — Salah lidera pero Irán sobrevive",
    body:"Empate agridulce para Egipto: termina 2°G (5 pts, GD +2) detrás de Bélgica. Irán con 3 pts y GD 0 entra a la pelea de los mejores terceros."
  },
  { id:"n54", date:"2026-06-27", tag:"resultado",
    title:"Colombia 0–0 Portugal: empate estratégico, ambos clasificados y en forma",
    body:"Colombia 1°K (7 pts, GD +3) y Portugal 2°K (5 pts) se guardan para el r32. Colombia llegó con la Jornada 3 asegurada y Falcao la sentó en el banco. RD Congo 4 pts como 3°K pelea por los mejores terceros."
  },
  { id:"n53", date:"2026-06-26", tag:"sorpresa",
    title:"Senegal 5–0 Iraq: Mané descata — Senegal 3°I con 3 pts busca el top-8 de terceros",
    body:"Senegal aplastó 5-0 a Iraq para acabar con el mejor average goleador de los terceros. Con 8 GF y 6 GA (GD +2, 3 pts), Senegal 3°I es candidato fuerte a calificar como uno de los 8 mejores terceros del torneo."
  },
  { id:"n52", date:"2026-06-26", tag:"sorpresa",
    title:"SORPRESA: Türkiye 3–2 USA en la despedida — pero USA llega al r32 como 1°D",
    body:"Türkiye, ya eliminada, goleó 3-2 a USA en el cierre del Grupo D. Los anfitriones encajaron su primera derrota del torneo pero igualmente avanzan como 1°D con 6 pts. Australia confirma el 2°D (4 pts). El resultado levantó dudas sobre la solidez defensiva de USMNT de cara al r32."
  },
  { id:"n51", date:"2026-06-26", tag:"estadistica",
    title:"Francia 4–1 Noruega: Mbappé HISTÓRICO — Les Bleus terminan grupo con 9 pts y 10 GF",
    body:"Francia destruyó a Noruega 4-1 (Mbappé x2, Griezmann, Dembélé) en el partido más esperado de J3. Francia 1°I con 9 pts y 10 goles — la mejor ofensiva del torneo junto a Argentina. Noruega 2°I con 6 pts (Haaland con 4 goles en el torneo) también avanza. El partido más entretenido de la fase de grupos."
  },
  { id:"n50", date:"2026-06-25", tag:"sorpresa",
    title:"SORPRESA COLOSAL: Ecuador 2–1 Alemania — Die Mannschaft humillada en el cierre del Grupo E",
    body:"Ecuador venció 2-1 a Alemania en J3 del Grupo E. Alemania sobrevive (1°E por GD: +6 vs +2 de CdI) pero fue humillada por el equipo que empató 0-0 con Curazao. Ecuador 3°E con 4 pts (GD 0) es uno de los mejores candidatos para el top-8 de terceros. Enner Valencia fue el héroe ecuatoriano."
  },
  { id:"n49", date:"2026-06-25", tag:"resultado",
    title:"Grupo F cerrado: Países Bajos 1° (7pts) y Japón 2° (5pts) — Suecia 3°F en la pelea",
    body:"PB 3-1 Túnez y Japón 1-1 Suecia cierran el Grupo F. Países Bajos domina con 7 pts y GD +6. Japón 5 pts, GD +4. Suecia 4 pts como 3°F con GD 0 — uno de los 8 mejores terceros candidatos."
  },
  { id:"n48", date:"2026-06-25", tag:"resultado",
    title:"Paraguay 0–0 Australia: Grupo D cierra — USA 1° y Australia 2° van al r32",
    body:"Partido sin goles con clasificaciones ya definidas. USA 1°D (6 pts) y Australia 2°D (4 pts, GD 0 sobre Paraguay GD -2). Paraguay 3°D con 4 pts entra en carrera de mejores terceros."
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
  { id:"r32-1", round:"r32", home:"Argentina", away:"Irán", homeFlag:"🇦🇷", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:3, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Argentina aplastó 3-0 a Argelia — el equipo más en forma del torneo. Irán solo empató 2-2 vs NZ. Mismatch claro." },
  { id:"r32-2", round:"r32", home:"España", away:"Senegal", homeFlag:"🇪🇸", awayFlag:"🇸🇳", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", notes:"ACTUALIZADO ⚡ Sudáfrica ELIMINADA en r32 real por Canadá 1-0 (jun 28). España 1°H (7 pts, 5-0 GD) vs Senegal 3°I (3 pts, 8 GF, GD +2 — mejor candidato de los terceros). España favorita clara." },
  { id:"r32-3", round:"r32", home:"Inglaterra", away:"Noruega", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:1, extra:"PEN", winner:"Inglaterra", winnerFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", status:"upcoming", notes:"Haaland x2 vs Iraq — el duelo más parejo del r32, penaltis" },
  { id:"r32-4", round:"r32", home:"Brasil", away:"Croacia", homeFlag:"🇧🇷", awayFlag:"🇭🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming", notes:"CONFIRMADO ✅ Croacia terminó 2°L con 6 pts (W2: 1-0 Panamá, 2-1 Ghana). La revancha del QF de Qatar 2022 — Brasil 1°C dominante (7 pts). Modric vs Vinícius Jr. es el duelo del r32." },
  { id:"r32-5", round:"r32", home:"Portugal", away:"Ghana", homeFlag:"🇵🇹", awayFlag:"🇬🇭", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Portugal", winnerFlag:"🇵🇹", status:"upcoming", notes:"Ghana 3°L (4 pts) — clasificó como mejor 3° al igual que Croacia avanzó al 2°. Portugal 2°K (5 pts, Ronaldo, Bruno). Portugal favorito claro pero Ghana es disciplinada defensivamente." },
  { id:"r32-6", round:"r32", home:"Francia", away:"Austria", homeFlag:"🇫🇷", awayFlag:"🇦🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"Francia BRUTAL: 9 pts, 10 GF, 2 GA (Mbappé x4, Griezmann x2, Dembélé). Austria 2°J (4 pts, salvó el pase con empate 3-3 vs Argelia en el descuento). David vs Goliat — Francia aplasta." },
  { id:"r32-7", round:"r32", home:"Alemania", away:"Japón", homeFlag:"🇩🇪", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Alemania", winnerFlag:"🇩🇪", status:"upcoming", extra:"AET", notes:"Alemania 1°E (6 pts, GD +6) — SOBREVIVIÓ derrota 1-2 vs Ecuador. Japón 2°F (5 pts, GD +4). Partido trampa: Alemania con dudas defensivas, Japón eliminó a Alemania en Qatar 2022. Alarma Havertz." },
  { id:"r32-8", round:"r32", home:"Marruecos", away:"C. de Marfil", homeFlag:"🇲🇦", awayFlag:"🇨🇮", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Marruecos confirma 2°C (7 pts, 4-2 vs Haití). Ziyech, En-Nesyri y Bounou en su mejor nivel del torneo." },
  { id:"r32-9", round:"r32", home:"Cabo Verde", away:"Canadá", homeFlag:"🇨🇻", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:2, winner:"Canadá", winnerFlag:"🇨🇦", status:"upcoming", notes:"CAMBIO ⚡ Uruguay ELIMINADO (0-1 España, solo 2 pts). Cabo Verde 2°H (3 pts, 3 empates) sustituye a Uruguay. Canadá ELIMINÓ a Sudáfrica en el r32 real (1-0, jun 28) — Jonathan David letal. Los norteamericanos van a por todo." },
  { id:"r32-10", round:"r32", home:"Noruega", away:"Bélgica", homeFlag:"🇳🇴", awayFlag:"🇧🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Noruega", winnerFlag:"🇳🇴", status:"upcoming", notes:"Noruega 2°I (6 pts, Haaland 4 goles) vs Bélgica 1°G (5 pts, GD +4 — golearon 5-1 a NZ). Haaland vs De Bruyne: el duelo estrella del r32. Noruega vengará la eliminación de Qatar." },
  { id:"r32-11", round:"r32", home:"Países Bajos", away:"Egipto", homeFlag:"🇳🇱", awayFlag:"🇪🇬", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming", notes:"Países Bajos 1°F (7 pts, 10 GF, GD +6) vs Egipto 2°G (5 pts). Salah vs Van Dijk — pero Países Bajos tiene demasiado nivel. Egypt llega sólido pero la calidad holandesa es superior." },
  { id:"r32-12", round:"r32", home:"Ecuador", away:"Paraguay", homeFlag:"🇪🇨", awayFlag:"🇵🇾", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Ecuador", winnerFlag:"🇪🇨", status:"upcoming", notes:"Ecuador 3°E (4 pts, GD 0) ⚡ SORPRESA — venció 2-1 a Alemania en J3! Paraguay 3°D (4 pts, GD -2). El mejor duelo de terceros: ambos con 4 pts pero Ecuador llega con moral altísima. Valencia vs Sanabria." },
  { id:"r32-13", round:"r32", home:"México", away:"Bosnia", homeFlag:"🇲🇽", awayFlag:"🇧🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"México", winnerFlag:"🇲🇽", status:"upcoming", notes:"CAMBIO ⚡ Chequia eliminada (1 pt, Gpo A). México 9 pts perfectos — mejor selección de la fase. Bosnia 3°B (4 pts, GD -1) vs El Tri. México favorito pero Bosnia tiene calidad en ataque (3-1 vs Qatar)." },
  { id:"r32-14", round:"r32", home:"Suecia", away:"Irán", homeFlag:"🇸🇪", awayFlag:"🇮🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Suecia", winnerFlag:"🇸🇪", status:"upcoming", extra:"AET", notes:"CAMBIO ⚡ Suecia 3°F (4 pts, GD 0) vs Irán 3°G (3 pts, GD 0). Partido de terceros. Isak y Gyökeres vs Rezaeian. Suecia tiene más calidad ofensiva — Irán apostará al contraataque." },
  { id:"r32-15", round:"r32", home:"USA", away:"Australia", homeFlag:"🇺🇸", awayFlag:"🇦🇺", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"USA", winnerFlag:"🇺🇸", status:"upcoming", notes:"USA 1°D (6 pts) — los anfitriones en casa. Australia 2°D (4 pts, sorpresa de la fase de grupos). USMNT recibió una advertencia: 2-3 vs Türkiye en J3. Pulisic vs Irankunda — el duelo más parejo del cuadro americano." },
  { id:"r32-16", round:"r32", home:"Colombia", away:"Argelia", homeFlag:"🇨🇴", awayFlag:"🇩🇿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming", notes:"CAMBIO ⚡ Argelia 3°J (4 pts) clasificó como mejor 3° sobre Irán (3 pts). Colombia 1°K (7 pts, invicta). Luis Díaz vs el equipo africano más en forma del torneo. Colombia favorita pero Argelia tiene calidad." },
  { id:"r16-1", round:"r16", home:"Argentina", away:"México", homeFlag:"🇦🇷", awayFlag:"🇲🇽", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming" },
  { id:"r16-2", round:"r16", home:"España", away:"Inglaterra", homeFlag:"🇪🇸", awayFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"España", winnerFlag:"🇪🇸", status:"upcoming", extra:"AET" },
  { id:"r16-3", round:"r16", home:"Brasil", away:"Portugal", homeFlag:"🇧🇷", awayFlag:"🇵🇹", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Brasil", winnerFlag:"🇧🇷", status:"upcoming" },
  { id:"r16-4", round:"r16", home:"Francia", away:"Alemania", homeFlag:"🇫🇷", awayFlag:"🇩🇪", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming" },
  { id:"r16-5", round:"r16", home:"Canadá", away:"Colombia", homeFlag:"🇨🇦", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:0, awayPrediction:2, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming", notes:"CAMBIO ⚡ Uruguay eliminado en grupos (2 pts). Canadá reemplaza — ya eliminaron a Sudáfrica en r32. Colombia 1°K invicta vs Canadá en racha. Luis Díaz define." },
  { id:"r16-6", round:"r16", home:"Marruecos", away:"USA", homeFlag:"🇲🇦", awayFlag:"🇺🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Marruecos 2°C (7 pts, Ziyech imbatible) vs USA (6 pts pero 2-3 vs Türkiye en J3 — defensiva cuestionada). El partido más abierto del r16." },
  { id:"r16-7", round:"r16", home:"Países Bajos", away:"Noruega", homeFlag:"🇳🇱", awayFlag:"🇳🇴", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Países Bajos", winnerFlag:"🇳🇱", status:"upcoming", notes:"CAMBIO ⚡ Bélgica (r32-10) es reemplazada por Noruega como proyección de r16. Noruega 2°I (Haaland, 4 goles) vs Países Bajos 1°F (GD +6). El más entretenido del r16." },
  { id:"r16-8", round:"r16", home:"México", away:"Japón", homeFlag:"🇲🇽", awayFlag:"🇯🇵", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"México", winnerFlag:"🇲🇽", status:"upcoming", notes:"CAMBIO ⚡ México 9 pts vs Japón 2°F (5 pts). El r16 más atractivo de América vs Asia. El Tri en casa virtual — Japón tiene el talento para dar sorpresa. Quiñones vs Nakamura." },
  { id:"qf-1", round:"qf", home:"Francia", away:"España", homeFlag:"🇫🇷", awayFlag:"🇪🇸", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", notes:"España se recuperó 4-0 vs Arabia Saudita — ya no está en crisis. Francia dominante (Mbappé histórico). El QF más atractivo del torneo." },
  { id:"qf-2", round:"qf", home:"Argentina", away:"Brasil", homeFlag:"🇦🇷", awayFlag:"🇧🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", notes:"Argentina 3-0 vs Argelia (Messi magistral) vs Brasil 1-1 vs Marruecos. El Superclásico de América — Argentina llega como favorita clara por forma y moral" },
  { id:"qf-3", round:"qf", home:"Marruecos", away:"Países Bajos", homeFlag:"🇲🇦", awayFlag:"🇳🇱", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"Bounou imbatible" },
  { id:"qf-4", round:"qf", home:"Colombia", away:"Canadá", homeFlag:"🇨🇴", awayFlag:"🇨🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:0, winner:"Colombia", winnerFlag:"🇨🇴", status:"upcoming", notes:"CAMBIO ⚡ Uruguay ELIMINADO. La predicción se convierte en el duelo del norte y sur de América: Colombia invicta (7 pts) vs Canadá en racha (r32 ganado vs Sudáfrica). Luis Díaz vs Jonathan David." },
  { id:"sf-1", round:"sf", home:"Francia", away:"Argentina", homeFlag:"🇫🇷", awayFlag:"🇦🇷", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", notes:"La revancha de Qatar 2022 — Mbappé máximo goleador histórico de Francia (ya x4 goles en el torneo) vs Messi en busca de su segundo título. Francia llega 9 pts, 10 GF. El partido del siglo." },
  { id:"sf-2", round:"sf", home:"Marruecos", away:"Colombia", homeFlag:"🇲🇦", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:1, awayPrediction:0, winner:"Marruecos", winnerFlag:"🇲🇦", status:"upcoming", notes:"CAMBIO ⚡ Uruguay eliminado. Marruecos (2°C, 7 pts, imbatibles con Bounou y Ziyech) vs Colombia (1°K invicta). La semifinal más inesperada — los Leones del Atlas buscan repetir Qatar 2022." },
  { id:"third", round:"third", home:"Argentina", away:"Colombia", homeFlag:"🇦🇷", awayFlag:"🇨🇴", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Argentina", winnerFlag:"🇦🇷", status:"upcoming", date:"18 jul", notes:"CAMBIO ⚡ Uruguay eliminado. Clásico sudamericano por el bronce — Messi vs Luis Díaz. Argentina busca el tercer lugar; Colombia haría historia llegando aquí." },
  { id:"final", round:"final", home:"Francia", away:"Marruecos", homeFlag:"🇫🇷", awayFlag:"🇲🇦", homeScore:null, awayScore:null, homePrediction:2, awayPrediction:1, winner:"Francia", winnerFlag:"🇫🇷", status:"upcoming", extra:"AET", date:"19 jul", notes:"MetLife Stadium, Nueva Jersey. Mbappé 34' · Griezmann 97' — Ziyech 78'" }
]
