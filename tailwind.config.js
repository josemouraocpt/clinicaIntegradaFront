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
        'banner': 'url("../../public/images/banner.png")',
								"gradient": 'linear-gradient(to right, #ED3237, #F8797C , #ED3237)',
      },
						colors: {
							"button": "#ED3237",
							"menu-text": "#888888",
							"gradient": "#F8797C",
							"gradient2": "#ED3237",
							"footer": "#373435",
						},
    },
  },
  plugins: [],
}
