/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				midnight: '#192e41',
				dark: '#05263b',
				grotto: '#0d659d',
				misty: '#bbc8de'
			},
		},
	},
	plugins: [],
};
