import { AnyAction } from 'redux'
import { RECEIVE_USER } from '../actions/user'

const initialState = {
  user: null
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}

export default reducer
