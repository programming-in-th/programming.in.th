import App, { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import 'antd/dist/antd.css'

import Router from 'next/router'
import { initStore } from '../redux'

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

const reduxStore = initStore()
class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp
