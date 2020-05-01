import React, { useContext } from 'react'

export type UserState = typeof initialState

type ITheme = 'material' | 'monokai' | 'solarized'

interface IContext {
  user: firebase.User | null | undefined
  displayName: string
  admin: boolean
  codeTheme: ITheme
}

export const initialState: IContext = {
  user: undefined,
  displayName: '',
  admin: false,
  codeTheme: 'material'
}

export type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: { user: firebase.User | null }
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: { displayName: string; admin: boolean; codeTheme: ITheme }
    }

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: action.payload.user
      })
    case 'RECEIVE_CONTEXT':
      return Object.assign({}, state, {
        displayName: action.payload.displayName,
        admin: action.payload.admin,
        codeTheme: action.payload.codeTheme
      })
    default:
      return state
  }
}

export const UserStateContext = React.createContext<IContext>(initialState)

export const useUser = () => useContext(UserStateContext)
