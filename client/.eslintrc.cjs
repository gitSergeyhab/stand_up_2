module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    'airbnb',

    // 'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config'],
      },
    ],
    'no-return-assign': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/require-default-props': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    "camelcase": ["error", {"allow": [
      "show_name",
      "event_id",
      "comedian_id",
      "place_id",
      "language_id",
      "show_date",
      "event_date",
      "event_name",
      "event_name_en",
      "event_status",
      "comedian_nik",
      "comedian_nik_en",
      "comedian_first_name",
      "comedian_first_name_en",
      "comedian_second_name",
      "comedian_second_name_en",
      "comedian_last_name",
      "comedian_last_name_en",
      "comedian_city",
      "comedian_city_en",
      "country_id",
      "comedian_date_birth",
      "comedian_date_death",
      "place_name",
      "place_name_en",
      "place_city",
      "place_city_en",
      "place_date_founded",
      "place_date_closed",
      "place_description",
      "place_active",
      "no_name"
    ]}]
  },
};
