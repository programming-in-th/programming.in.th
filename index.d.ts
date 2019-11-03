import 'next'
import { Store } from './src/lib/withRedux'

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.svg' {
  const content: any
  export default content
}

declare module 'next' {
  export interface NextPageContext {
    reduxStore: Store
  }
}