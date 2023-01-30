/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'helve': ['Helvetica', 'Arial', 'sans-serif'],
      'open': ['Open sans', 'sans-serif'],
    },
  },
  plugins: [],
}
