const colors = require("tailwindcss/colors");
// ...
module.export = {
  darkMode: false,
};
module.exports = {
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral
      }
    }
  },

  plugins: [
    require('@tailwindcss/line-clamp')
    // ...
  ]
};
