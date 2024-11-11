import { ESLint } from 'eslint';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],   // Target TypeScript files
    ignores: ['node_modules', 'dist'], // Ignore unnecessary folders
    languageOptions: {
      parser: eslintParser,          // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',  // Path to your TypeScript config
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,  // Import TypeScript ESLint plugin
      prettier: prettierPlugin,           // Import Prettier plugin
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // ESLint core rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],

      // Prettier-related rules
      'prettier/prettier': 'error',  // Show Prettier formatting issues as ESLint errors
    },
  },
  // Optional: Override for JavaScript files if using both TypeScript and JavaScript
  {
    files: ['**/*.js'],
    rules: {
      'no-console': 'warn',  // Warn on console.log in JavaScript files
    },
  },
];