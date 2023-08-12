/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E9FBF6',
          100: '#CFF7EB',
          200: '#9AEFD5',
          300: '#4BE2B5',
          400: '#20CA97',
          500: '#1CAE81',
          600: '#199E76',
          700: '#168866',
          800: '#127255',
          900: '#0D4F3B',
          950: '#09392B',
        },
      },
    },
  },
}

module.exports = config
