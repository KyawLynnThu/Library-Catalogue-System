module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:import/recommended'],
    overrides: [
      {
        env: {
          node: true,
        },
        plugins: ['node','prettier'],
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'no-unreachable': 'off',
      'no-console': 'off',
      "import/order": [
        "error",
        {
          "alphabetize": { "order": "asc", "caseInsensitive": true },
          "newlines-between": "always",
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
        }
      ]
    },
  };