import { theme } from '@chakra-ui/core'

export const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading:
      'Inter, SF Pro Display, Sukhumvit Set, Kanit, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    body:
      'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
}
