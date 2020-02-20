import React, { useContext } from 'react'

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

export const useUser = () => useContext(UserStateContext)
