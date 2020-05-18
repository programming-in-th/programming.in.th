import React, { useContext } from 'react'

type Theme = 'material' | 'monokai' | 'solarized'

export type User = {
  user: firebase.User | null | undefined
}
export interface Context {
  username: string
  admin: boolean
  codeTheme: Theme
}

export type UserState = User & Context

export const initialState: UserState = {
  user: undefined,
  username: '',
  admin: false,
  codeTheme: 'material',
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
    default:
      return state
  }
}

export const UserStateContext = React.createContext<UserState>(initialState)

export const useUser = () => useContext(UserStateContext)
