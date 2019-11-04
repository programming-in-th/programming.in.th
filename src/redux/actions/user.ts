import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import firebase from '../../lib/firebase'

export const fetchUser = (user: firebase.User | null) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getIsAdmin')({})
      dispatch(receiveUser(user, response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const RECEIVE_USER = 'RECEIVE_USER'
const receiveUser = (data: firebase.User | null, isAdmin: boolean) => {
  return {
    type: RECEIVE_USER,
    user: data,
    isAdmin: isAdmin
  }
}
