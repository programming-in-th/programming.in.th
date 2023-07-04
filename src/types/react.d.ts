import 'react'

declare module 'react' {
  interface CSSProperties {
    '--c'?: string
    '--p'?: number
  }
}
