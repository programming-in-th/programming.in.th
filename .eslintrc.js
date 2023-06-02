// @ts-check

/** @satisfies {import('eslint').Linter.Config} */
const config = {
  root: true,
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    // TODO หยุดเกียน
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    'prettier/prettier': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'next/*',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react', 'next', 'next/*'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    // TODO remove unused vars pls bruh
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}

module.exports = config
