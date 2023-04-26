import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React from 'react'
import NProgress from 'nprogress'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import UserProvider from 'components/UserContext'
import { Analytics } from '@vercel/analytics/react'


import { GlobalStyle } from 'design'
import { customTheme } from 'design/theme'

import 'assets/css/prism.css'

let timeout: any

const start = () => {
  timeout = setTimeout(NProgress.start, 300)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', done)
Router.events.on('routeChangeError', done)

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <UserProvider>
        <CSSReset />
        <GlobalStyle />
        <Component {...pageProps} />
        <Analytics />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
