const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          'Sukhumvit Set',
          'Kanit',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
