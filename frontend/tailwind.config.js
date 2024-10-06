/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#35373e',
        'off-white': '#f3f3f3',
        'dark-grey': '#95999b',
        green: '#23af4b',
        yellow: '#f3aa27',
        brown: '#825f2f',
        'light-grey': '#c0c1c2',
        beige: '#f5d29f',
        'rose-brown': '#cfa088',
        'pastel-grey': '#d4caba',
      },
    },
  },
  plugins: [],
};
