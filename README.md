# ⚽ Mundial 2026 — Predicciones Claude

Web app de predicciones del Mundial FIFA 2026, actualizable diariamente. Stack: **Next.js 14 + Tailwind CSS**, deploy estático en Vercel.

## Estructura

```
src/
  data/worldcup.ts   ← ÚNICA fuente de datos (NO editar scores manualmente)
  app/page.tsx       ← UI principal
  styles/globals.css ← Estilos base
scripts/
  sync.ts            ← Orquestador principal
  api-fetch.ts       ← Resultados de APIs
  web-scraper.ts     ← Scraping de noticias
  claude-extract.ts  ← Extracción con Claude AI
  write-data.ts      ← Escritura de worldcup.ts
  normalize.ts       ← Normalización de nombres de equipos
```

## Setup local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Automatic Sync

### How it works
The sync runs automatically at 00:00 and 16:00 Mexico City time via
GitHub Actions. It pulls from 3 layers:

| Layer | Source | What it provides |
|-------|--------|-----------------|
| 1 | football-data.org API | Scores, cards, scorers |
| 2 | OpenFootball (fallback) | Scores when primary fails |
| 3 | ESPN, BBC, Goal, Yahoo Sports, FourFourTwo, CBS Sports scraped + Claude extraction | Injuries, suspensions, upsets, news |

### GitHub Secrets required
Go to: GitHub repo → Settings → Secrets and variables → Actions → New secret

| Secret | Where to get it |
|--------|----------------|
| `FOOTBALL_DATA_TOKEN` | Already provided: d77238a4915a4fac81bb936ba7956666 |
| `OPENFOOTBALL_TOKEN` | Already provided: cf9cde84eb5190e3500f4b3d04d5ba75 |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `GH_PAT` | github.com → Settings → Developer settings → Personal access tokens → repo scope |

### Manual trigger
1. Go to GitHub repo → Actions tab
2. Click "Daily World Cup Sync"
3. Click "Run workflow"
4. Optional: check "Dry run" to preview without writing

### Local sync
```bash
npm run sync          # full sync, writes file
npm run sync:dry      # preview only
npm run sync:debug    # full sync + verbose output
```

## Deploy en Vercel

```bash
# 1. Sube a GitHub
git init
git add .
git commit -m "Mundial 2026 predicciones"
git remote add origin https://github.com/TU_USUARIO/worldcup2026.git
git push -u origin main

# 2. En vercel.com → "New Project" → importa el repo
#    Framework: Next.js (auto-detect)
#    Sin variables de entorno necesarias
#    → Deploy
```

## Cómo actualizar predicciones manualmente

Todo el contenido vive en `src/data/worldcup.ts`. Para actualizar:

1. **Resultados de grupo**: En `groups[].matches`, cambia `homeScore`/`awayScore` y `status: "played"`.
2. **Tabla de puntos**: Actualiza el array `teams` dentro de cada grupo (pts, w, d, l, gf, ga).
3. **Bracket eliminatorio**: En `knockoutMatches`, actualiza scores y `status`.
4. **Novedades**: Agrega items al array `news` con tag: `lesion | tarjeta | resultado | sorpresa | estadistica`.
5. **LAST_UPDATED**: Cambia la fecha al momento de actualización.
