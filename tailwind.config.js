/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#7c6ff0',
          700: '#5b4fcf',
          900: '#3b2f78',
        },
        brand: {
          bg: '#f4f5fb',
          panel: '#ffffff',
          border: '#ececf4',
          text: '#2c2a3d',
          muted: '#8b889c',
          green: '#22b573',
          amber: '#f0a83c',
          blue: '#4f6ef7',
        }
      }
    },
  },
  plugins: [],
}