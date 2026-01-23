/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        squid: {
          pink: '#ED1B76',
          teal: '#00BFA6',
          dark: '#1A1A2E',
          darker: '#0F0F1A',
          gold: '#FFD93D',
        }
      },
      fontFamily: {
        game: ['Orbitron', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ED1B76, 0 0 10px #ED1B76' },
          '100%': { boxShadow: '0 0 20px #ED1B76, 0 0 30px #ED1B76' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
