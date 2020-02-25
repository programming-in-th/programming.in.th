import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useReducer, useEffect } from 'react'
import NProgress from 'nprogress'

import Router from 'next/router'
import { UserAction, UserStateContext } from '../components/UserContext'
import firebase from '../lib/firebase'
import user from './admin/user'
import { fetchFromFirebase } from '../utils/fetcher'

let timeout: number

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

export type UserState = typeof initialState
const initialState = { user: undefined, isAdmin: false }

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: action.payload.user
      })
    case 'RECEIVE_ADMIN':
      return Object.assign({}, state, {
        isAdmin: action.payload.isAdmin
      })
    default:
      return state
  }
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      userDispatch({
        type: 'RECEIVE_USER',
        payload: {
          user
        }
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetchFromFirebase('getIsAdmin')

      userDispatch({
        type: 'RECEIVE_ADMIN',
        payload: { isAdmin: response.data }
      })
    }

    fetchAdmin()
  }, [user])

  return (
    <UserStateContext.Provider value={userState}>
      <Component {...pageProps} />
    </UserStateContext.Provider>
  )
}

export default App
