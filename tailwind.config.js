/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
       'banner': 'url("../../public/images/banner.png")'
      },
						colors: {
							"button": "#ED3237",
							"button-hover": "#db2e33",
							"menu-text": "#888888",
							"gradient": "#F8797C",
							"gradient2": "#ED3237",
							"footer": "#bfbfbf",
							"background": "#EBEBEB",
							"label": "#888888",
              "container": "#ED3237",
              "info": "#121111",
              "bord": "#A4A4A4",
              "inp": "#141414",
						},
    },
  },
		darkMode: "class",
  plugins: [],
}
