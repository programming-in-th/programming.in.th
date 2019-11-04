import { AnyAction, Reducer } from 'redux'
import { RECEIVE_USER } from '../actions/user'
import { IUserState } from '../types/user'

const initialState: IUserState = {
  user: 'LOADING',
  admin: false
}

const reducer: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        user: action.user,
        admin: action.isAdmin
      })
    default:
      return state
  }
}

export default reducer
