'use client'
import { useState, useCallback } from 'react'
import { RefreshCw, Trophy, Users, Zap, ChevronRight, Clock, AlertCircle, TrendingUp } from 'lucide-react'
import { groups, knockoutMatches, news, LAST_UPDATED, type Match, type KnockoutMatch, type NewsItem } from '@/data/worldcup'

// ─── HELPERS ────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('es-MX', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City'
  })
}

function ResultBadge({ match }: { match: Match | KnockoutMatch }) {
  const isPlayed = match.status === 'played'
  const isLive = match.status === 'live'
  if (!isPlayed && !isLive) return null

  const h = match.homeScore ?? 0
  const a = match.awayScore ?? 0
  const isHome = h > a
  const isAway = a > h

  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
      isLive ? 'bg-red-500/20 text-red-400 pulse-dot' :
      isHome ? 'bg-green-900/40 text-green-400' :
      isAway ? 'bg-blue-900/40 text-blue-400' :
      'bg-gray-800 text-gray-400'
    }`}>
      {isLive ? '🔴 EN VIVO' : isHome ? `${match.home.split(' ')[0]} gana` : isAway ? `${match.away.split(' ')[0].substring(0,6)} gana` : 'EMPATE'}
    </span>
  )
}

function ScoreBlock({ home, away, homeFlag, awayFlag, homeScore, awayScore, homePrediction, awayPrediction, status, extra }:
  { home: string; away: string; homeFlag: string; awayFlag: string; homeScore: number | null; awayScore: number | null; homePrediction: number; awayPrediction: number; status: string; extra?: string }) {
  const played = status === 'played' || status === 'live'
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      {/* Home */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-xl leading-none shrink-0">{homeFlag}</span>
        <span className="text-sm font-medium text-white truncate">{home}</span>
      </div>
      {/* Score / Prediction */}
      <div className="flex flex-col items-center shrink-0 mx-2">
        {played ? (
          <div className="flex items-center gap-1">
            <span className="font-display text-2xl font-bold text-white leading-none">{homeScore}</span>
            <span className="text-gray-500 mx-1 text-lg">–</span>
            <span className="font-display text-2xl font-bold text-white leading-none">{awayScore}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 opacity-50">
            <span className="font-display text-xl font-bold text-gold leading-none">{homePrediction}</span>
            <span className="text-gray-500 mx-1">–</span>
            <span className="font-display text-xl font-bold text-gold leading-none">{awayPrediction}</span>
          </div>
        )}
        {extra && played && <span className="text-[10px] text-gold/70 mt-0.5">{extra}</span>}
        {!played && <span className="text-[10px] text-gray-600 mt-0.5">pred.</span>}
      </div>
      {/* Away */}
      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <span className="text-sm font-medium text-white truncate text-right">{away}</span>
        <span className="text-xl leading-none shrink-0">{awayFlag}</span>
      </div>
    </div>
  )
}

// ─── GROUPS VIEW ────────────────────────────────────────────────────────────

function GroupsView() {
  const [activeGroup, setActiveGroup] = useState<string>('A')
  const group = groups.find(g => g.id === activeGroup)!

  return (
    <div className="space-y-4">
      {/* Group selector */}
      <div className="flex gap-1 flex-wrap">
        {groups.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeGroup === g.id
                ? 'bg-gold text-pitch font-bold'
                : 'bg-pitch-mid text-gray-400 hover:text-white hover:bg-pitch-light'
            }`}
          >
            {g.id}
          </button>
        ))}
      </div>

      {/* Standings table */}
      <div className="bg-pitch-mid rounded-xl overflow-hidden border border-white/5">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white tracking-wide">{group.label}</h3>
          <div className="flex gap-1 flex-wrap">
            {group.projected.map((p, i) => (
              <span key={i} className={`text-[11px] px-2 py-0.5 rounded-full ${
                p.includes('3°') ? 'bg-blue-900/50 text-blue-300' : 'bg-green-900/40 text-green-400'
              }`}>{p}</span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-2">Equipo</th>
                <th className="px-2 py-2 text-center">PJ</th>
                <th className="px-2 py-2 text-center">G</th>
                <th className="px-2 py-2 text-center">E</th>
                <th className="px-2 py-2 text-center">P</th>
                <th className="px-2 py-2 text-center">GF</th>
                <th className="px-2 py-2 text-center">GC</th>
                <th className="px-3 py-2 text-center font-bold text-gold">PTS</th>
              </tr>
            </thead>
            <tbody>
              {[...group.teams].sort((a,b) => b.pts - a.pts || (b.gf-b.ga) - (a.gf-a.ga)).map((t, i) => (
                <tr key={t.name} className={`border-t border-white/5 ${i < 2 ? 'bg-green-900/10' : ''}`}>
                  <td className="px-4 py-2.5 flex items-center gap-2">
                    <span className="text-gray-600 text-xs w-4">{i+1}</span>
                    <span>{t.flag}</span>
                    <span className="text-white font-medium">{t.name}</span>
                    {i < 2 && <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1" title="Clasifica"/>}
                  </td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.played}</td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.w}</td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.d}</td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.l}</td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.gf}</td>
                  <td className="px-2 py-2 text-center text-gray-400">{t.ga}</td>
                  <td className="px-3 py-2 text-center font-bold text-gold">{t.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matches */}
      <div className="grid gap-2">
        {group.matches.map(match => (
          <div key={match.id} className={`match-card bg-pitch-mid rounded-xl px-4 pt-2 pb-3 border ${
            match.status === 'played' ? 'border-white/10' :
            match.status === 'live' ? 'border-red-500/40' :
            'border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gray-500">{match.date} · {match.venue}</span>
              {match.status === 'upcoming' && (
                <span className="text-[11px] text-gold/70">pred. {match.homePrediction}–{match.awayPrediction}</span>
              )}
              <ResultBadge match={match} />
            </div>
            <ScoreBlock
              home={match.home} away={match.away}
              homeFlag={match.homeFlag} awayFlag={match.awayFlag}
              homeScore={match.homeScore} awayScore={match.awayScore}
              homePrediction={match.homePrediction} awayPrediction={match.awayPrediction}
              status={match.status} extra={match.extra}
            />
            {match.notes && (
              <p className="text-[11px] text-gray-500 mt-1 border-t border-white/5 pt-1.5">{match.notes}</p>
            )}
            {(match.homeYellow || match.awayYellow || match.homeRed || match.awayRed) && (
              <div className="flex gap-3 text-[11px] mt-1">
                {match.homeYellow ? <span>🟨 {match.home}: {match.homeYellow}</span> : null}
                {match.awayYellow ? <span>🟨 {match.away}: {match.awayYellow}</span> : null}
                {match.homeRed ? <span>🟥 {match.home}: {match.homeRed}</span> : null}
                {match.awayRed ? <span>🟥 {match.away}: {match.awayRed}</span> : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── KNOCKOUT VIEW ──────────────────────────────────────────────────────────

const ROUND_LABELS: Record<string, string> = {
  r32: 'Dieciseisavos', r16: 'Octavos', qf: 'Cuartos', sf: 'Semifinales', third: 'Tercer lugar', final: 'Gran Final'
}
const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'third', 'final']

function KnockoutView({ round }: { round: string }) {
  const matches = knockoutMatches.filter(m => m.round === round)

  if (round === 'final') {
    const m = matches[0]
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-b from-gold/20 to-transparent rounded-2xl border border-gold/40 p-6 text-center">
          <div className="text-gold/60 text-xs font-display tracking-[4px] uppercase mb-4">Gran Final · 19 julio 2026</div>
          <div className="text-gray-400 text-sm mb-2">MetLife Stadium, Nueva Jersey</div>
          <div className="flex items-center justify-center gap-6 my-6">
            <div className="text-center">
              <div className="text-5xl mb-2">{m.homeFlag}</div>
              <div className="font-display text-xl font-bold text-white">{m.home}</div>
            </div>
            <div className="text-center">
              {m.status === 'played' ? (
                <div className="font-display text-4xl font-bold text-white">{m.homeScore} – {m.awayScore}</div>
              ) : (
                <div className="font-display text-3xl font-bold text-gold">{m.homePrediction} – {m.awayPrediction}</div>
              )}
              {m.extra && <div className="text-gold/70 text-sm mt-1">{m.extra}</div>}
              {m.status === 'upcoming' && <div className="text-gray-500 text-xs mt-1">predicción</div>}
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">{m.awayFlag}</div>
              <div className="font-display text-xl font-bold text-white">{m.away}</div>
            </div>
          </div>
          {m.winner && (
            <div className="bg-gold/10 rounded-xl p-3 mt-2">
              <div className="text-gold text-xs mb-1 uppercase tracking-widest">Campeón proyectado</div>
              <div className="font-display text-2xl font-bold text-gold">{m.winnerFlag} {m.winner}</div>
            </div>
          )}
          {m.notes && <p className="text-gray-500 text-xs mt-3">{m.notes}</p>}
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { pos: '🥈', team: 'Marruecos', flag: '🇲🇦', note: 'La gran sorpresa' },
            { pos: '🏆', team: 'Francia', flag: '🇫🇷', note: 'Campeón proyectado' },
            { pos: '🥉', team: 'Argentina', flag: '🇦🇷', note: 'Tercer lugar' },
          ].map(p => (
            <div key={p.team} className={`rounded-xl p-3 text-center border ${
              p.pos === '🏆' ? 'bg-gold/10 border-gold/30' : 'bg-pitch-mid border-white/5'
            }`}>
              <div className="text-2xl mb-1">{p.pos}</div>
              <div className="text-xl mb-1">{p.flag}</div>
              <div className={`font-bold text-sm ${p.pos === '🏆' ? 'text-gold' : 'text-white'}`}>{p.team}</div>
              <div className="text-[10px] text-gray-500 mt-1">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {matches.map(m => (
        <div key={m.id} className={`match-card bg-pitch-mid rounded-xl px-4 pt-3 pb-3 border ${
          m.status === 'played' ? 'border-white/10' : 'border-white/5'
        }`}>
          <ScoreBlock
            home={m.home} away={m.away}
            homeFlag={m.homeFlag} awayFlag={m.awayFlag}
            homeScore={m.homeScore} awayScore={m.awayScore}
            homePrediction={m.homePrediction} awayPrediction={m.awayPrediction}
            status={m.status} extra={m.extra}
          />
          {m.winner && m.status === 'upcoming' && (
            <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-white/5">
              <span className="text-[11px] text-gray-500">Avanza:</span>
              <span className="text-[11px] font-medium text-grass">{m.winnerFlag} {m.winner}</span>
            </div>
          )}
          {m.notes && <p className="text-[11px] text-gray-500 mt-1">{m.notes}</p>}
          {m.date && <p className="text-[11px] text-gray-600 mt-0.5">{m.date}</p>}
        </div>
      ))}
    </div>
  )
}

// ─── NEWS VIEW ──────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, string> = {
  lesion: 'bg-red-900/50 text-red-300',
  tarjeta: 'bg-yellow-900/40 text-yellow-300',
  resultado: 'bg-blue-900/40 text-blue-300',
  sorpresa: 'bg-purple-900/40 text-purple-300',
  estadistica: 'bg-teal-900/40 text-teal-300',
}
const TAG_ICONS: Record<string, string> = {
  lesion: '🩹', tarjeta: '🟨', resultado: '⚽', sorpresa: '⚡', estadistica: '📊'
}

function NewsView() {
  return (
    <div className="space-y-3">
      {news.map(item => (
        <div key={item.id} className="bg-pitch-mid rounded-xl p-4 border border-white/5">
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none mt-0.5">{TAG_ICONS[item.tag]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${TAG_STYLES[item.tag]}`}>
                  {item.tag}
                </span>
                <span className="text-[11px] text-gray-500">{item.date}</span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'groups',  label: 'Fase de grupos', icon: Users },
  { id: 'r32',     label: '16avos', icon: Zap },
  { id: 'r16',     label: '8avos', icon: Zap },
  { id: 'qf',      label: 'Cuartos', icon: Zap },
  { id: 'sf',      label: 'Semis', icon: Zap },
  { id: 'third',   label: '3er lugar', icon: Trophy },
  { id: 'final',   label: 'Final', icon: Trophy },
  { id: 'news',    label: 'Novedades', icon: TrendingUp },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('groups')
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)

  const handleSync = useCallback(async () => {
    setSyncing(true)
    await new Promise(r => setTimeout(r, 1200))
    setLastSync(new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }))
    setSyncing(false)
  }, [])

  const playedCount = groups.flatMap(g => g.matches).filter(m => m.status === 'played').length
  const totalGroupMatches = groups.flatMap(g => g.matches).length

  return (
    <div className="pitch-bg min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-pitch/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-display font-bold text-sm">26</div>
            <div>
              <h1 className="font-display text-lg font-bold text-white tracking-wide leading-none">MUNDIAL 2026</h1>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">Predicciones · Claude</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-[11px] text-gray-500">
                {lastSync ? `Sync: ${lastSync}` : `Actualizado: ${fmtDate(LAST_UPDATED)}`}
              </div>
              <div className="text-[11px] text-gold/70">{playedCount}/{totalGroupMatches} partidos grupo jugados</div>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 bg-gold hover:bg-gold-dim disabled:opacity-60 text-pitch font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw size={14} className={syncing ? 'spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync'}
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-5xl mx-auto px-4 pb-2 flex gap-4 text-[11px] text-gray-500 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"/>Francia — 🏆 pred.</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/>Marruecos — 🥈</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"/>Argentina — 🥉</span>
          <span className="flex items-center gap-1 text-red-400"><AlertCircle size={10}/>España en crisis (0–0 Cabo Verde)</span>
        </div>
      </header>

      {/* Tabs */}
      <nav className="sticky top-[88px] z-40 bg-pitch/90 backdrop-blur border-b border-white/5 overflow-x-auto scrollbar-hide">
        <div className="max-w-5xl mx-auto px-4 flex gap-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-gold tab-active'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'groups' && <GroupsView />}
        {activeTab === 'news' && <NewsView />}
        {['r32','r16','qf','sf','third','final'].includes(activeTab) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-gold" />
              <h2 className="font-display text-2xl font-bold text-white tracking-wide">
                {ROUND_LABELS[activeTab]}
              </h2>
              {activeTab !== 'final' && activeTab !== 'third' && (
                <span className="text-xs text-gray-500 bg-pitch-mid px-2 py-1 rounded-full">
                  {knockoutMatches.filter(m => m.round === activeTab).length} partidos
                </span>
              )}
            </div>
            <div className="bg-pitch-mid/40 rounded-xl p-3 border border-white/5 flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} className="text-gold/60 shrink-0" />
              <span>Los marcadores mostrados son <strong className="text-gold/80">predicciones</strong> — se actualizan con resultados reales al jugarse cada partido.</span>
            </div>
            <KnockoutView round={activeTab} />
            {/* Round navigation */}
            <div className="flex justify-between mt-4 pt-4 border-t border-white/5">
              {ROUND_ORDER.indexOf(activeTab) > 0 && (
                <button
                  onClick={() => setActiveTab(ROUND_ORDER[ROUND_ORDER.indexOf(activeTab) - 1])}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  ← {ROUND_LABELS[ROUND_ORDER[ROUND_ORDER.indexOf(activeTab) - 1]]}
                </button>
              )}
              <div className="flex-1" />
              {ROUND_ORDER.indexOf(activeTab) < ROUND_ORDER.length - 1 && (
                <button
                  onClick={() => setActiveTab(ROUND_ORDER[ROUND_ORDER.indexOf(activeTab) + 1])}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  {ROUND_LABELS[ROUND_ORDER[ROUND_ORDER.indexOf(activeTab) + 1]]} <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-8 py-6 text-center text-[11px] text-gray-600">
        <p>Mundial 2026 · Predicciones generadas por Claude · Actualización diaria 00:00 MT</p>
        <p className="mt-1">Para actualizar: edita <code className="bg-pitch-mid px-1 rounded">src/data/worldcup.ts</code> y despliega en Vercel</p>
      </footer>
    </div>
  )
}
