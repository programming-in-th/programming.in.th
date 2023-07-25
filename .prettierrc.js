// @ts-check

/** @satisfies {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  useTabs: false,
  trailingComma: 'none',
  tabWidth: 2,
  arrowParens: 'avoid'
}

module.exports = config
