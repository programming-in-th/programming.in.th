import React, { useContext } from 'react'

export type UserState = typeof initialState
export type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: { user: firebase.User | null }
    }
  | {
      type: 'RECEIVE_ADMIN'
      payload: { isAdmin: boolean }
    }

export const UserStateContext = React.createContext({
  user: undefined,
  isAdmin: false
})

export const initialState = { user: undefined, isAdmin: false }

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

export const useUser = () => useContext(UserStateContext)
