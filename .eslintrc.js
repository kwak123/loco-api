module.exports = {
  extends: "airbnb-base",
  rules: {
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 150 }],
    'brace-style': ['error', 'stroustrup'],
  },
};