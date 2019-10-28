import App, { AppProps } from 'next/app'
import React from 'react'
import { withRedux, Store } from '../lib/withRedux'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import 'antd/dist/antd.css'

import Router from 'next/router'

let timeout: number

const start = () => {
  timeout = setTimeout(NProgress.start, 100)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', done)
Router.events.on('routeChangeError', done)

interface Props {
  reduxStore: Store
}

export default withRedux(
  class MyApp extends App<Props & AppProps> {
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
