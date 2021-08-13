import React, { useContext, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from 'lib/firebase'
import { onetap } from 'lib/onetap'

import { Loading } from 'components/Loading'

type User = firebase.User | null

export interface Data {
  username: string
  admin: boolean
  passedTask: Object
}

type UserData = { user: User | undefined } & Data

interface UserState {
  user: UserData
  loading: boolean
}

type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: User
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: Data
    }
  | {
      type: 'LOADING_DONE'
    }
  | {
      type: 'LOADING_START'
    }

type userContext = UserState & { userDispatch: React.Dispatch<UserAction> }

const initialState: UserState = {
  user: {
    user: undefined,
    username: '',
    admin: false,
    passedTask: {},
  },
  loading: true,
}

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          user: action.payload,
        }),
      })
    case 'RECEIVE_CONTEXT':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          username: action.payload.username,
          admin: action.payload.admin,
          passedTask: action.payload.passedTask,
        }),
      })
    case 'LOADING_DONE':
      return Object.assign({}, state, {
        loading: false,
      })
    case 'LOADING_START':
      return Object.assign({}, state, {
        loading: true,
      })
    default:
      return state
  }
}

const UserStateContext = React.createContext<userContext>({
  ...initialState,
  userDispatch: null,
})

export const useUser = () => useContext(UserStateContext)

const userContextComp = ({ children }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user === null || user.emailVerified) {
        userDispatch({
          type: 'RECEIVE_USER',
          payload: user,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userState.user.user === null) {
      onetap()
      userDispatch({
        type: 'RECEIVE_CONTEXT',
        payload: initialState.user,
      })
    } else if (userState.user.user) {
      const unsubscribe = firebase
        .firestore()
        .doc(`users/${userState.user.user.uid}`)
        .onSnapshot((doc) => {
          userDispatch({
            type: 'RECEIVE_CONTEXT',
            payload: doc.data() as Data,
          })
          userDispatch({
            type: 'LOADING_DONE',
          })
        })
      return () => {
        unsubscribe()
      }
    }
  }, [userState.user.user])

  useEffect(() => {
    if (
      userState.user.user !== null &&
      userState.loading === false &&
      userState.user.username === ''
    ) {
      router.push('/setusername')
    }
  }, [userState, router.pathname])

  if (
    userState.user.user === undefined ||
    (userState.user.user !== null && userState.loading === true)
  ) {
    return <Loading />
  }

  return (
    <UserStateContext.Provider value={{ ...userState, userDispatch }}>
      {children}
    </UserStateContext.Provider>
  )
}

export default userContextComp
