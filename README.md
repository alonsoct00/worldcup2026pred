# ⚽ Mundial 2026 — Predicciones Claude

Web app de predicciones del Mundial FIFA 2026, actualizable diariamente. Stack: **Next.js 14 + Tailwind CSS**, deploy estático en Vercel.

## Estructura

```
src/
  data/worldcup.ts   ← ÚNICA fuente de datos (editar aquí)
  app/page.tsx       ← UI principal
  styles/globals.css ← Estilos base
```

## Setup local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Cómo actualizar predicciones

Todo el contenido vive en `src/data/worldcup.ts`. Para actualizar:

1. **Resultados de grupo**: En `groups[].matches`, cambia `homeScore`/`awayScore` y `status: "played"`.
2. **Tabla de puntos**: Actualiza el array `teams` dentro de cada grupo (pts, w, d, l, gf, ga).
3. **Bracket eliminatorio**: En `knockoutMatches`, actualiza scores y `status`.
4. **Novedades**: Agrega items al array `news` con tag: `lesion | tarjeta | resultado | sorpresa | estadistica`.
5. **LAST_UPDATED**: Cambia la fecha al momento de actualización.

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

El botón **Sync** en la UI simula una recarga; para actualización real de datos, edita `worldcup.ts` y redeploya (o usa Vercel CLI: `vercel --prod`).

## Actualización automática diaria

Para actualización automática, agrega un GitHub Action en `.github/workflows/daily.yml`:

```yaml
name: Daily update
on:
  schedule:
    - cron: '0 6 * * *'  # 00:00 MT = 06:00 UTC
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

Luego actualiza `worldcup.ts` con un script o manualmente cada día antes del cron.
