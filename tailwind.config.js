module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tumblrGreen': '#00cf35',
        'tumblrBlue':'#00b8ff',
        'tumblrBackground': "#001935",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
