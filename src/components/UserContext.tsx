import React, { useReducer, useContext } from 'react'

type UserState = typeof initialState
type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: { user: firebase.User | null }
    }
  | {
      type: 'RECEIVE_ADMIN'
      payload: { isAdmin: boolean }
    }

const UserStateContext = React.createContext({
  user: undefined,
  isAdmin: false
})

const defaultDispatch: React.Dispatch<UserAction> = () => initialState

const UserStateDispatch = React.createContext(defaultDispatch)

const initialState = { user: undefined, isAdmin: false }

const reducer = (state: UserState, action: UserAction): UserState => {
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

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  return (
    <UserStateContext.Provider value={userState}>
      <UserStateDispatch.Provider value={userDispatch}>
        {children}
      </UserStateDispatch.Provider>
    </UserStateContext.Provider>
  )
}

export const useUser = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserStateDispatch)
