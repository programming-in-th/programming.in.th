import React from 'react'
import { initStore } from '../redux'
import { AppContextType } from 'next/dist/next-server/lib/utils'

import { Store } from 'redux'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initStore()
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore()
  }

  return window[__NEXT_REDUX_STORE__]
}

export type Store = ReturnType<typeof getOrCreateStore>
type Props = { reduxStore: Store }

export function withRedux(App: React.ComponentClass<Props>) {
  return class AppWithRedux extends React.Component<Props> {
    private reduxStore: Store
    static async getInitialProps(appContext: AppContextType) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      const appCtx = appContext.ctx as any
      appCtx.reduxStore = reduxStore

      let appProps = {}
      if (typeof (App as any).getInitialProps === 'function') {
        appProps = await (App as any).getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props: any) {
      super(props)
      this.reduxStore = getOrCreateStore()
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
