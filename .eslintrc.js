module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-empty': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off'
  },
};
