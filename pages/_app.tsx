import { AppProps } from 'next/app'
import React from 'react'
import { withRedux, Store } from '../lib/withRedux'
import { Provider } from 'react-redux'

interface Props {
  reduxStore: Store
}

export default withRedux(
  class MyApp extends React.Component<Props & AppProps> {
    render() {
      const { Component, pageProps, reduxStore } = this.props
      return (
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      )
    }
  }
)
