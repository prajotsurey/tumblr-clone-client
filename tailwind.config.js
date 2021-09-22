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
      },
      width:{
        'centerFull': "990px",
        'dashboardProfile': '64px',
      },
      height:{
        'dashboardProfile': '64px',
      },
      maxWidth:{
        'centerLeftMax': "625px",
        'centerLeftPostMax': "540px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
