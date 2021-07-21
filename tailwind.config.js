const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: true,
  },
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/**/*.ts', './src/**/*.tsx'],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    },
  },
  theme: {
    extend: {
      typography: (theme) => ({
        default: {
          css: {
            h1: {
              color: defaultTheme.colors.gray[900],
              fontWeight: '800',
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h2: {
              color: defaultTheme.colors.gray[900],
              fontWeight: '700',
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h3: {
              color: defaultTheme.colors.gray[900],
              fontWeight: '600',
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h4: {
              color: defaultTheme.colors.gray[900],
              fontWeight: '600',
              fontFamily: `${theme('fontFamily.display')}`,
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h2: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h3: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h4: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
          },
        },
        xl: {
          css: {
            h1: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h2: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h3: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
            h4: {
              fontFamily: `${theme('fontFamily.display')}`,
            },
          },
        },
      }),
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      display: [
        'Inter var',
        'SF Pro Display',
        'Sukhumvit Set',
        'Kanit',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-roman.var.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-italic.var.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Kanit',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: 'local("Kanit Regular"), local("Kanit-Regular"), url(https://fonts.gstatic.com/s/kanit/v7/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2) format("woff2")',
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Sukhumvit Set',
            fontDisplay: 'swap',
            src: "local('Sukhumvit Set')",
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
        },
      ])
    },
  ],
}
