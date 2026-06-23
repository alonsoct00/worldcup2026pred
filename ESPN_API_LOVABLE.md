# ESPN Public API — Guía de implementación para Lovable

> API no oficial, sin autenticación, sin costo. Ideal para apps de deportes en Lovable.

---

## ¿Por qué ESPN?

| | ESPN | Alternativas (football-data.org, etc.) |
|---|---|---|
| API Key | ❌ No necesita | ✅ Requerido |
| Costo | Gratis | Free tier limitado |
| Rate limits | Sin límite publicado | 10 req/min (free) |
| Datos en vivo | ✅ Tiempo real | ✅ |
| Cobertura | 17 deportes, 139 ligas | Solo fútbol |
| Estabilidad | No oficial, puede cambiar | Semi-oficial |

---

## Base URLs

```
https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/{recurso}
```

Para el **Mundial 2026**:
```
sport = soccer
league = fifa.world
```

---

## Endpoint principal: Scoreboard

```
GET https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard
```

### Parámetros útiles

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `dates` | Fecha o rango de fechas | `20260622` o `20260611-20260627` |

### Ejemplos

```bash
# Partidos de hoy
GET .../scoreboard

# Fecha específica
GET .../scoreboard?dates=20260622

# Rango de fechas (fase de grupos completa)
GET .../scoreboard?dates=20260611-20260627

# Fase eliminatoria completa
GET .../scoreboard?dates=20260628-20260719
```

> **Tip:** Con un rango de fechas puedes obtener todos los partidos del torneo en 2 llamadas en lugar de una por día.

---

## Estructura de respuesta

```jsonc
{
  "leagues": [ /* info del torneo */ ],
  "events": [
    {
      "id": "...",
      "name": "Mexico at South Africa",
      "date": "2026-06-11T19:00Z",      // UTC
      "competitions": [
        {
          "competitors": [
            {
              "homeAway": "home",         // "home" | "away"
              "score": "2",               // string, no number
              "team": {
                "displayName": "Mexico",
                "abbreviation": "MEX",
                "logo": "https://a.espncdn.com/..."
              }
            },
            {
              "homeAway": "away",
              "score": "0",
              "team": { "displayName": "South Africa", ... }
            }
          ],
          "status": {
            "clock": 5400.0,
            "displayClock": "90'+3'",   // para partidos en vivo
            "period": 2,                // 1=1T, 2=2T, 3=ET1, 4=ET2, 5=Penales
            "type": {
              "name": "STATUS_FULL_TIME",
              "state": "post",          // "pre" | "in" | "post"
              "completed": true,
              "description": "Full Time",
              "detail": "FT",
              "shortDetail": "FT"
            }
          },
          "venue": {
            "fullName": "Estadio Banorte",
            "address": { "city": "Monterrey", "country": "Mexico" }
          }
        }
      ]
    }
  ]
}
```

---

## Estados del partido (`status.type`)

| `state` | `name` | Significado |
|---|---|---|
| `pre` | `STATUS_SCHEDULED` | Por jugar |
| `in` | `STATUS_IN_PROGRESS` | En vivo |
| `post` | `STATUS_FULL_TIME` | Terminado (90 min) |
| `post` | `STATUS_FINAL_AET` | Terminado en tiempo extra |
| `post` | `STATUS_FINAL_PEN` | Terminado en penales |

**Detección de tiempo extra / penales vía `period`:**

| `period` | Fase |
|---|---|
| 1 | Primer tiempo |
| 2 | Segundo tiempo |
| 3 | Primer tiempo extra |
| 4 | Segundo tiempo extra |
| 5 | Tanda de penales |

---

## Código de implementación

### Hook de React para Lovable

```typescript
// hooks/useWorldCupMatches.ts

interface ESPNMatch {
  home: string
  away: string
  homeLogo: string
  awayLogo: string
  homeScore: number | null
  awayScore: number | null
  status: 'upcoming' | 'live' | 'played'
  displayClock?: string   // "72'" si está en vivo
  extra?: 'AET' | 'PEN'
  date: string            // ISO UTC
  venue: string
}

// Traducciones de nombres (ESPN usa inglés)
const NAME_MAP: Record<string, string> = {
  'Mexico': 'México',
  'South Korea': 'Corea del Sur',
  'Netherlands': 'Países Bajos',
  'France': 'Francia',
  'Germany': 'Alemania',
  'Spain': 'España',
  'Brazil': 'Brasil',
  'Morocco': 'Marruecos',
  'Argentina': 'Argentina',
  'England': 'Inglaterra',
  'Norway': 'Noruega',
  'Japan': 'Japón',
  'Iran': 'Irán',
  'Egypt': 'Egipto',
  'Tunisia': 'Túnez',
  'Saudi Arabia': 'Arabia Saudita',
  'Cape Verde': 'Cabo Verde',
  'Colombia': 'Colombia',
  'Uruguay': 'Uruguay',
  'United States': 'USA',
  'Ivory Coast': 'Costa de Marfil',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Turkey': 'Türkiye',
  'Czech Republic': 'Chequia',
  'New Zealand': 'Nueva Zelanda',
  'DR Congo': 'RD Congo',
  'Bosnia-Herzegovina': 'Bosnia',
  'Uzbekistan': 'Uzbekistán',
  // Agrega más según necesites
}

function normalizeName(name: string): string {
  return NAME_MAP[name] ?? name
}

async function fetchESPNMatches(dateRange: string): Promise<ESPNMatch[]> {
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dateRange}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ESPN error: ${res.status}`)
  const data = await res.json()

  const matches: ESPNMatch[] = []

  for (const event of data.events ?? []) {
    const comp = event.competitions?.[0]
    if (!comp) continue

    const statusType = comp.status?.type ?? {}
    const state: string = statusType.state ?? 'pre'
    const statusName: string = statusType.name ?? ''
    const period: number = comp.status?.period ?? 0

    // Mapear estado
    let status: ESPNMatch['status']
    if (state === 'post') status = 'played'
    else if (state === 'in') status = 'live'
    else status = 'upcoming'

    // Detectar tiempo extra y penales
    let extra: 'AET' | 'PEN' | undefined
    if (statusName.includes('AET') || period === 3 || period === 4) extra = 'AET'
    if (statusName.includes('PEN') || period === 5) extra = 'PEN'

    const homeComp = comp.competitors?.find((c: any) => c.homeAway === 'home')
    const awayComp = comp.competitors?.find((c: any) => c.homeAway === 'away')
    if (!homeComp || !awayComp) continue

    matches.push({
      home: normalizeName(homeComp.team?.displayName ?? ''),
      away: normalizeName(awayComp.team?.displayName ?? ''),
      homeLogo: homeComp.team?.logo ?? '',
      awayLogo: awayComp.team?.logo ?? '',
      homeScore: status !== 'upcoming' ? parseInt(homeComp.score ?? '0') : null,
      awayScore: status !== 'upcoming' ? parseInt(awayComp.score ?? '0') : null,
      status,
      displayClock: status === 'live' ? comp.status?.displayClock : undefined,
      extra,
      date: event.date ?? '',
      venue: comp.venue?.fullName ?? '',
    })
  }

  return matches
}

// Hook principal
export function useWorldCupMatches() {
  const [matches, setMatches] = React.useState<ESPNMatch[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    try {
      setLoading(true)
      // Fase de grupos: Jun 11-27
      const group = await fetchESPNMatches('20260611-20260627')
      // Fase eliminatoria: Jun 28 - Jul 19
      const knockout = await fetchESPNMatches('20260628-20260719')
      setMatches([...group, ...knockout])
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()

    // Auto-refresh si hay partido en vivo: cada 60 segundos
    const interval = setInterval(async () => {
      const today = await fetchESPNMatches(new Date().toISOString().slice(0,10).replace(/-/g,''))
      const hasLive = today.some(m => m.status === 'live')
      if (hasLive) load()
    }, 60_000)

    return () => clearInterval(interval)
  }, [load])

  const liveMatches = matches.filter(m => m.status === 'live')
  const todayMatches = matches.filter(m => {
    const today = new Date().toISOString().slice(0, 10)
    return m.date.startsWith(today)
  })

  return { matches, liveMatches, todayMatches, loading, error, refresh: load }
}
```

---

## Otros endpoints útiles

### Resumen de un partido (estadísticas, play-by-play)

```
GET https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={eventId}
```

Devuelve: posesión, disparos, corners, tarjetas, goles detallados, formaciones.

### Noticias del Mundial

```
GET https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/news
```

### Tabla de posiciones

```
GET https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings
```

### Otros deportes — mismo patrón

```
# NBA
GET .../sports/basketball/nba/scoreboard

# NFL
GET .../sports/football/nfl/scoreboard

# MLB
GET .../sports/baseball/mlb/scoreboard?dates=20260622
```

---

## Recomendaciones para Lovable

1. **No proxies en Lovable** — llama ESPN directamente desde el cliente. No necesita backend.

2. **Cache local** — guarda el resultado en `useState` o `localStorage` con un TTL de 60s para no saturar:
   ```typescript
   const CACHE_TTL = 60_000 // 1 minuto
   const cache = { data: null, ts: 0 }
   if (Date.now() - cache.ts < CACHE_TTL) return cache.data
   ```

3. **Auto-poll en vivo** — solo activa el polling (cada 30-60s) si `liveMatches.length > 0`. Cuando no hay partidos en vivo, no hagas polling.

4. **Manejo de CORS** — ESPN no bloquea requests desde el browser. Si usas un backend (Supabase Edge Function), funciona igual sin headers adicionales.

5. **Nombres en inglés** — ESPN siempre devuelve nombres en inglés (`Mexico`, `France`, etc.). Si tu app es en español, usa el `NAME_MAP` del código de arriba.

6. **Logos gratis** — `homeComp.team?.logo` devuelve una URL de ESPN CDN. Úsalos directamente, son públicos.

---

## Ligas de fútbol disponibles

| Liga | Slug |
|---|---|
| Mundial FIFA | `fifa.world` |
| Champions League | `uefa.champions` |
| Premier League | `eng.1` |
| La Liga | `esp.1` |
| Bundesliga | `ger.1` |
| Serie A | `ita.1` |
| Ligue 1 | `fra.1` |
| MLS | `usa.1` |
| Liga MX | `mex.1` |
| Copa Libertadores | `conmebol.libertadores` |

---

## Limitaciones conocidas

- **No oficial** — ESPN puede cambiar la estructura sin aviso
- **Sin bookings/tarjetas** en el scoreboard. Para tarjetas, usar `summary?event={id}`
- **Sin token** — si empiezan a bloquear, necesitarás un proxy/backend
- **Nombres en inglés** — siempre requieren normalización para apps en español
- **Scores como string** — `"score": "2"`, no número. Usar `parseInt()`
