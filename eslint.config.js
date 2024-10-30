import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default {
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended',
  ],
  files: ['**/*.{ts,tsx}'],
  parser: tsParser,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Add any additional rules here
  },
};