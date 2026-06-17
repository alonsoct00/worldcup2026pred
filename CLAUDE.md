# CLAUDE.md — Mundial 2026 Predicciones

## Stack

- **Framework**: Next.js 14 (App Router, `'use client'`)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 3 + globals.css manual
- **Íconos**: lucide-react
- **Deploy**: Vercel (output `out/` con export estático)
- **Node**: 20

## Estructura de archivos clave

```
src/
  app/
    page.tsx          — SPA principal (toda la UI en un solo archivo)
    layout.tsx        — HTML shell, metadata
    api/
      sync/route.ts   — POST /api/sync: fetch football-data.org → commit a GitHub
  data/
    worldcup.ts       — FUENTE DE VERDAD: grupos, knockouts, news, tipos
  styles/
    globals.css       — Fuentes (Barlow Condensed, Inter, JetBrains Mono), animaciones
scripts/
  sync.ts             — CLI local: orquesta api-fetch → web-scraper → claude-extract → write-data
  api-fetch.ts        — Llama football-data.org y otras APIs
  web-scraper.ts      — Scrapea sitios de noticias deportivas
  claude-extract.ts   — Usa Anthropic API para extraer lesiones/suspensiones/noticias
  write-data.ts       — Escribe worldcup.ts actualizado al disco
.github/workflows/
  daily-sync.yml      — Cron 06:00 UTC y 22:00 UTC, ejecuta npm run sync y hace commit
```

## Datos: `src/data/worldcup.ts`

**Regla: NO editar scores manualmente. Correr `npm run sync`.**

### Tipos principales

```ts
MatchStatus = "played" | "live" | "upcoming"
MatchResult = "home" | "away" | "draw" | null

Match {
  id, home, away, homeFlag, awayFlag
  homeScore, awayScore (null = no jugado)
  homePrediction, awayPrediction
  date, venue, status, result
  extra?  // "AET" | "PEN"
  notes?, homeYellow?, awayYellow?, homeRed?, awayRed?
}

KnockoutMatch {
  id, round ("r32"|"r16"|"qf"|"sf"|"third"|"final")
  home, away, homeFlag, awayFlag
  homeScore, awayScore, homePrediction, awayPrediction
  winner, winnerFlag, status
  extra?, notes?, date?
}

NewsItem {
  id, date, title, body
  tag: "lesion"|"tarjeta"|"resultado"|"sorpresa"|"estadistica"
}

Group {
  id (A–L), label
  teams: [{ name, flag, played, w, d, l, gf, ga, pts }]
  matches: Match[]
  projected: string[]   // e.g. ["🇲🇽 México (1°)","🇰🇷 Corea del Sur (2°)"]
}
```

### Exportaciones de worldcup.ts

- `LAST_UPDATED` — ISO timestamp del último sync
- `news` — array NewsItem[], máx 25, ordenado por fecha desc
- `groups` — 12 grupos (A–L)
- `knockoutMatches` — array con r32 (16), r16 (8), qf (4), sf (2), third (1), final (1)

## UI: `src/app/page.tsx`

Componentes principales (todo en un archivo):

| Componente | Función |
|---|---|
| `Home` | Root: tabs, header, stats bar, sync button |
| `GroupsView` | Tabla de posiciones + partidos por grupo, selector A–L |
| `KnockoutView` | Grid 2 cols de partidos por ronda; vista especial para `final` |
| `NewsView` | Lista de noticias con tag e ícono |
| `ScoreBlock` | Muestra score real (si jugado) o predicción (si upcoming) |
| `PredRow` | Compara resultado real vs predicción (exacto/ganador/✗) |
| `ResultBadge` | Badge "EN VIVO" o "X gana" |
| `Toast` | Notificación flotante (success/error/info) |

### Tabs

```
groups → r32 → r16 → qf → sf → third → final → news
```
- `sessionStorage` persiste tab activo y grupo activo entre recargas.
- Auto-poll cada 5 min si hay partidos `live`.

### Predicción del torneo (hardcodeada en UI)

- 🏆 **Francia** — Campeón
- 🥈 **Marruecos** — Finalista
- 🥉 **Argentina** — Tercer lugar
- Final: Francia 2–1 Marruecos (AET) — MetLife Stadium, 19 jul 2026

## Diseño / Tema

### Paleta de colores (Tailwind custom)

| Token | Valor |
|---|---|
| `pitch` | `#0a1628` (fondo oscuro navy) |
| `pitch-mid` | `#0f2040` (cards) |
| `pitch-light` | `#162d55` (hover) |
| `gold` | `#f5c842` (acento principal, tabs activos, predicciones) |
| `gold-dim` | `#c9a22e` |
| `grass` | `#1db954` (verde, avanza) |
| `red` | `#e63946` |

### Fuentes

- Display: **Barlow Condensed** (títulos, scores)
- Body: **Inter**
- Mono: **JetBrains Mono** (scores en vivo)

### Clases CSS custom

- `.pitch-bg` — fondo con líneas de cancha (repeating-linear-gradient)
- `.match-card` — hover: `translateY(-1px)` + sombra dorada
- `.tab-active` — underline animado dorado (::after)
- `.pulse-dot` — animación para badge EN VIVO
- `.spin` — rotación para icono de sync

## Flujo de sincronización

### Desde el browser (botón Sync)
1. POST `/api/sync`
2. Fetch `football-data.org/v4/competitions/WC/matches?season=2026`
3. Normaliza nombres (inglés → español, e.g. "France" → "Francia")
4. Descarga `worldcup.ts` de GitHub via API
5. Aplica scores, recalcula standings, genera news automáticas
6. Commit si hubo cambios → auto-reload en 3s

### Desde GitHub Actions (cron)
- 06:00 UTC y 22:00 UTC diario
- Corre `npm run sync` (CLI con Claude extraction + web scraping)
- Commit automático si cambia worldcup.ts

### Variables de entorno necesarias
```
FOOTBALL_DATA_TOKEN   — API football-data.org
GH_PAT                — GitHub Personal Access Token (repo write)
ANTHROPIC_API_KEY     — Para claude-extract en sync local
CRON_SECRET           — Opcional, protege /api/sync
```

## Scripts npm

```bash
npm run dev           # Next.js dev server
npm run build         # Build estático
npm run sync          # Sync completo (API + scraping + Claude)
npm run sync:dry      # Dry run (preview sin escribir)
npm run sync:debug    # Con logs verbose
```

## Convenciones de datos

- IDs de matches: `A1`–`A6`, `B1`–`B6`, ..., `r32-1`–`r32-16`, `r16-1`–`r16-8`, `qf-1`–`qf-4`, `sf-1`–`sf-2`, `third`, `final`
- IDs de news: `n1`, `n2`, ... (autoincremental)
- Fechas en datos: `"dd mmm"` (e.g. `"11 jun"`) para grupos; ISO en news
- Idioma de la UI: **español mexicano** (es-MX)
- Zona horaria de display: **America/Mexico_City** (MT)

## Grupos y estado actual (al 2026-06-17)

**12 grupos, 48 equipos, 6 partidos por grupo**

Grupos con partidos jugados en J1: A, B, C, D, E, F, G, H, I, J  
Grupos sin inicio: K (Portugal, Colombia, RD Congo, Uzbekistán), L (Inglaterra, Croacia, Ghana, Panamá)

Sorpresas notables hasta J1:
- España 0–0 Cabo Verde (Grupo H)
- Australia 2–0 Türkiye (Grupo D)
- Brasil 1–1 Marruecos (Grupo C)
- Alemania 7–1 Curazao (Grupo E)
