module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // Añadimos node: true para tener acceso a global
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-undef': 'off', // Desactivamos la regla no-undef para permitir el uso de global
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.jsx', '**/__tests__/**/*.js'],
      env: {
        jest: true,
      },
      globals: {
        global: 'readonly',
      },
    },
  ],
};
