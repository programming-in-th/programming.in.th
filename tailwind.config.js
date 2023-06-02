// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme')

/** @satisfies {import('tailwindcss').Config} */
const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        prog: {
          primary: {
            500: '#3584FB',
            600: '#3171D9'
          },
          gray: {
            100: '#F8FAFC',
            500: '#64748B'
          },
          white: {
            100: '#FFFFFF',
            500: '#F8FAFC'
          }
        }
      },
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
            },
            p: {
              fontFamily: `${theme('fontFamily.body')}`
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
            },
            p: {
              fontFamily: `${theme('fontFamily.body')}`
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
            },
            p: {
              fontFamily: `${theme('fontFamily.body')}`
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
      display: [
        'var(--font-inter)',
        'var(--font-noto-sans-thai)',
        'Inter var',
        'Noto Sans Thai',
        'SF Pro Display',
        ...defaultTheme.fontFamily.sans
      ],
      body: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif'
      ]
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

module.exports = config
