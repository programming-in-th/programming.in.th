const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '800',
              fontFamily: `${theme('fontFamily.display')}`
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
              fontFamily: `${theme('fontFamily.display')}`
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontFamily: `${theme('fontFamily.display')}`
            },
            h4: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontFamily: `${theme('fontFamily.display')}`
            }
          }
        },
        lg: {
          css: {
            h1: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h2: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h3: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h4: {
              fontFamily: `${theme('fontFamily.display')}`
            }
          }
        },
        xl: {
          css: {
            h1: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h2: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h3: {
              fontFamily: `${theme('fontFamily.display')}`
            },
            h4: {
              fontFamily: `${theme('fontFamily.display')}`
            }
          }
        }
      })
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      display: [
        'Inter var',
        'SF Pro Display',
        'Noto Sans Thai',
        ...defaultTheme.fontFamily.sans
      ]
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
