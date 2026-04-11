/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        cream: '#faf5f0',
        blush: '#f8e8e0',
        sage: {
          50: '#f0f5f0',
          100: '#dce8dc',
          200: '#b8d1b8',
          300: '#8fb98f',
          400: '#6a9e6a',
          500: '#4d824d',
          600: '#3d673d',
        },
        lavender: {
          50: '#f5f0fa',
          100: '#e8ddf5',
          200: '#d4bceb',
          300: '#bb94dd',
          400: '#a06dce',
          500: '#8b4fc4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
