module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:editorconfig/all'
  ],
  plugins: ['editorconfig'],
  // add your custom rules here
  rules: {
    semi: [2, "always"],
  },
};
