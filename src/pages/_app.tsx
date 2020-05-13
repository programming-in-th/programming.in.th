import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React, { useReducer, useEffect } from 'react'
import NProgress from 'nprogress'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import firebase from 'lib/firebase'
import {
  UserState,
  initialState,
  reducer,
  UserAction,
  UserStateContext,
  IContext,
} from 'components/UserContext'
import { onetap } from 'components/auth/onetap'

import { GlobalStyle } from 'design'
import { customTheme } from 'design/theme'

import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material.css'
import 'codemirror/addon/fold/foldgutter.css'

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
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user === null || user.emailVerified) {
        userDispatch({
          type: 'RECEIVE_USER',
          payload: {
            user,
          },
        })
        if (user) {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot((doc) => {
              const data = doc.data() as IContext
              if (data) userDispatch({ type: 'RECEIVE_CONTEXT', payload: data })
            })
        } else {
          userDispatch({ type: 'RECEIVE_CONTEXT', payload: initialState })
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userState.user === null) {
      onetap()
    }
  }, [userState.user])

  return (
    <ThemeProvider theme={customTheme}>
      <UserStateContext.Provider value={userState}>
        <CSSReset />
        <GlobalStyle />
        <Component {...pageProps} />
      </UserStateContext.Provider>
    </ThemeProvider>
  )
}

export default App
