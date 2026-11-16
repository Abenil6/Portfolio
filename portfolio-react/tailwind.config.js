/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slateTeal: {
          light: '#23495D',
          DEFAULT: '#193848',
          dark: '#122834',
          deep: '#0D1E28',
        },
        creamWhite: '#F8FAFC',
        paperBg: '#F3F5F7',
        pill: {
          coral: '#D93B57',
          cyan: '#4ECDC4',
          sky: '#60D5E8',
          amber: '#F59E0B',
          caramel: '#C16928',
          pink: '#F472B6',
          teal: '#2DD4BF',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px #0F172A',
        'hard': '3px 3px 0px #0F172A',
        'hard-lg': '5px 5px 0px #0F172A',
        'hard-xl': '8px 8px 0px #0F172A',
      },
    },
  },
  plugins: [],
}
