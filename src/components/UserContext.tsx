import React, { useContext } from 'react'

export type UserState = typeof initialState

type ITheme = 'material' | 'monokai' | 'solarized'

export type IUser = {
  user: firebase.User | null | undefined
}
export interface IContext {
  username: string
  admin: boolean
  codeTheme: ITheme
}

export type IUserContext = IUser & IContext

export const initialState: IUserContext = {
  user: undefined,
  username: '',
  admin: false,
  codeTheme: 'material',
}

export type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: IUser
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: IContext
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

export const UserStateContext = React.createContext<IUserContext>(initialState)

export const useUser = () => useContext(UserStateContext)
