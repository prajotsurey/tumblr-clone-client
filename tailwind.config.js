const plugin = require('tailwindcss/plugin')
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
        'overlayBackground': 'rgba(0, 25, 53, 0.95)',
      },
      width:{
        'centerFull': "990px",
        'dashboardProfile': '64px',
        'centerLeftMax': "625px",
        'centerLeftPostMax': "540px",
        'userFormWidth': '300px'
      },
      height:{
        'dashboardProfile': '64px',
      },
      maxWidth:{
        'centerLeftMax': "625px",
        'centerLeftPostMax': "540px",
        'headerMax': "1716px"
      },
      screens: {
        'large': '984px',
      },
    },
    fontFamily: {
      default: 'Favorit, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, "sans-serif"'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }) {
      const newUtilities = {
        '.menu-primary-enter': {
          position: 'absolute',
          transform: 'translateX(-100%)'
        },
        '.menu-primary-enter-active': {
          transform: 'translateX(0%)',
          transition: 'all 1s ease'
        },
        '.menu-primary-exit': {
          position: 'absolute',
        },
        '.menu-primary-exit-active': {
          transform: 'translateX(-100%)',
          transition: 'all 1s ease'
        },
        '.menu-secondary-enter': {
          position: 'absolute',
          transform: 'translateX(100%)'
        },
        '.menu-secondary-enter-active': {
          transform: 'translateX(0%)',
          transition: 'all 1s ease'
        },
        '.menu-secondary-exit': {
          position: 'absolute',
        },
        '.menu-secondary-exit-active': {
          transform: 'translateX(100%)',
          transition: 'all 1s ease'
        },
      }

      addComponents(newUtilities)
    })
  ],
}
