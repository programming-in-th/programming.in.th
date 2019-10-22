import 'next'
import { Store } from './lib/withRedux'

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'

declare module 'next' {
  export interface NextPageContext {
    reduxStore: Store
  }
}
