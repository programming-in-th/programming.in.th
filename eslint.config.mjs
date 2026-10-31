// @ts-check
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  globalIgnores([
    'build',
    'out',
    'coverage',
    'playwright-report',
    'test-results',
    'src/prisma'
  ]),
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  // eslint-config-next already registers the react and import plugins, so
  // only their rules are added here.
  {
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules
    }
  },
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next', group: 'external', position: 'before' },
            { pattern: 'next/*', group: 'external', position: 'before' }
          ],
          pathGroupsExcludedImportTypes: ['react', 'next', 'next/*'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/no-cycle': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'unused-imports/no-unused-imports': 'warn',
      'react/no-unescaped-entities': 'off',
      // React Compiler rules new in react-hooks v7; existing code predates them.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/use-memo': 'warn'
    }
  },
  {
    files: ['**/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' }
  },
  {
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' }
  },
  prettierRecommended,
  { rules: { 'prettier/prettier': 'warn' } }
])
