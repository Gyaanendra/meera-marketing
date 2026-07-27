/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F1EEE4',
        raised: '#FFFFFF',
        ink: '#16171B',
        inksoft: '#52524C',
        line: '#D9D5C7',
        red: '#D6402C',
        redink: '#FFF6F2',
        cobalt: '#1F4EAD',
        ochre: '#E8A93B',
        inkbg: '#16171B',
        inkbgraised: '#202127',
        paper: '#F1EEE4',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
