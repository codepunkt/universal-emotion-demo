module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      generators: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.css', '.styl'],
      },
    },
  },
  globals: {},
  rules: {
    'no-unused-vars': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
  },
}
