module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'no-mixed-spaces-and-tabs': 0, // disable rule
    'no-tabs': 0,
    'max-len': 'off',
    'react/function-component-definition': [2, {namedComponents: 'arrow-function'}],
    'linebreak-style': 0,
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-indent': ['off', 'tab'],
    'react/jsx-indent-props': ['off', 'tab'],
    'react/jsx-filename-extension': 0,
    'brace-style': ['error', 'stroustrup', {allowSingleLine: true}],
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 0,
    'no-shadow': 0,
    'jsx-a11y/no-autofocus': 0,
    'object-curly-newline': ['error', {
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 5,
      },
    }],
  },
};
