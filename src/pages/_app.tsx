import App, { AppProps } from 'next/app'
import React from 'react'
import NProgress from 'nprogress'

import Router from 'next/router'
import { UserProvider } from '../components/UserContext'

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

class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    )
  }
}

export default MyApp
