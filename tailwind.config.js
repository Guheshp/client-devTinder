/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': ' linear-gradient(76deg, rgba(230,111,50,1) 0%, rgba(255,42,84,1) 22%, rgba(237,103,3,1) 100%);',
        "gradient": 'linear-gradient(90deg, #C6EA8D, #FE90AF)',
      },
      colors: {
        'orange': '#ff7849',
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require('daisyui'),],
}