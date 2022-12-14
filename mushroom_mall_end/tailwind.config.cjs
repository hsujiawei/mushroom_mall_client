/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'menu-common': '#78828a',
        'menu-selected': '#6777ef',
        'statistic': 'rgb(78,89,105)'
      },
      borderColor: {
        'menu-b-c': '#6777ef',

      },
      backgroundColor: {
        's-i': "rgba(162, 155, 254, 0.1)",
        'common': "#6777ef",
        'dark': '#001529'
      },
      boxShadow: {
        'around': "0 0 .1rem rgba(0, 0, 0, .25)"
      }
    },
  },
  plugins: [],
  important: true
}
