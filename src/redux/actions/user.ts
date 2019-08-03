import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'

export const fetchUser = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(receiveUser(user))
      } else {
        dispatch(receiveUser(null))
      }
    })
  }
}

export const RECEIVE_USER = 'RECEIVE_USER'
const receiveUser = (data: any) => {
  return {
    type: RECEIVE_USER,
    user: data
  }
}
