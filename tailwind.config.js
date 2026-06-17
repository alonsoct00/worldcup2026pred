/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: '#0a1628',
        'pitch-mid': '#0f2040',
        'pitch-light': '#162d55',
        gold: '#f5c842',
        'gold-dim': '#c9a22e',
        grass: '#1db954',
        'grass-dim': '#169440',
        red: '#e63946',
        draw: '#4a90d9',
        pending: '#6b7280',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
