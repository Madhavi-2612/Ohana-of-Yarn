/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7fc',
          100: '#ddeef9',
          200: '#b8dcf4',
          300: '#83c4ec',
          400: '#4da8e0',
          500: '#2e8ecc',
          600: '#2072ad',
          700: '#1b5c8c',
          800: '#1a4e74',
          900: '#184261',
        },
        cream: '#faf6f0',
        blush: '#f0e4d4',
        sage: {
          50: '#fdf8f2',
          100: '#f7ecd8',
          200: '#eed6af',
          300: '#e2b97e',
          400: '#d69e57',
          500: '#c4883d',
          600: '#a87032',
        },
        lavender: {
          50: '#faf3f4',
          100: '#f5e4e7',
          200: '#edccd1',
          300: '#e0a6ae',
          400: '#cf7a86',
          500: '#b85466',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        cursive: ['Satisfy', 'cursive'],
      },
    },
  },
  plugins: [],
};
