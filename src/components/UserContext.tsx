import React, { useContext, useReducer, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { fetchFromFirebase } from 'utils/fetcher'
import firebase from 'firebase'
import { onetap } from './auth/onetap'

type Theme = 'material' | 'monokai' | 'solarized'

export type User = {
  user: firebase.User | null | undefined
}
export interface Context {
  username: string
  admin: boolean
  codeTheme: Theme
}

export type UserState = User & Context & { loading: boolean }

export const initialState: UserState = {
  user: undefined,
  username: '',
  admin: false,
  codeTheme: 'material',
  loading: true,
}

export type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: User
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: Context
    }
  | {
      type: 'LOADING_DONE'
    }

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: action.payload.user,
      })
    case 'RECEIVE_CONTEXT':
      return Object.assign({}, state, {
        username: action.payload.username,
        admin: action.payload.admin,
        codeTheme: action.payload.codeTheme,
      })
    case 'LOADING_DONE':
      return Object.assign({}, state, {
        loading: false,
      })
    default:
      return state
  }
}

export const UserStateContext = React.createContext<UserState>(initialState)

export const useUser = () => useContext(UserStateContext)

export default function UserContextComp({ children }) {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  const { data: userContext } = useSWR('getUserContext', fetchFromFirebase, {
    refreshInterval: 1000 * 60,
  })

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user === null || user.emailVerified) {
        userDispatch({
          type: 'RECEIVE_USER',
          payload: {
            user,
          },
        })

        mutate('getUserContext')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userContext) {
      userDispatch({
        type: 'RECEIVE_CONTEXT',
        payload: userContext,
      })
    }
  }, [userContext])

  useEffect(() => {
    if (userState.user === null) {
      onetap()
    }
  }, [userState.user])

  return (
    <UserStateContext.Provider value={userState}>
      {children}
    </UserStateContext.Provider>
  )
}
