module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark'],
  },
  theme: {
    extend: {
      width: {
        screen: ['100vw', '100dvw'],
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
    },
  },
};
