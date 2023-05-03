import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import UserProvider from 'components/UserContext'
import * as gtag from 'lib/gtag'

import { GlobalStyle } from 'design'
import { customTheme } from 'design/theme'

import 'assets/css/prism.css'
import { Toaster, toast } from 'react-hot-toast'

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
  useEffect(() => {
    toast(
      (t) => (
        <span>
          ทดลองใช้งานเว็บใหม่ได้ที่{' '}
          <b>
            <a
              href="https://staging.programming.in.th"
              target="_blank"
              // style="color: #0089c7;text-decoration: underline; text-decoration-color: #a2dffb;"
            >
              staging.programming.in.th
            </a>
          </b>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              marginLeft: '20px',
              border: '2px solid black',
              borderRadius: '5px',
              padding: '5px',
              borderColor: '#e7e7e7',
            }}
          >
            Dismiss
          </button>
        </span>
      ),
      {
        duration: 15000,
      }
    )
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <UserProvider>
        <CSSReset />
        <GlobalStyle />
        <Toaster />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
