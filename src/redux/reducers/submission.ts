import { AnyAction, Reducer } from 'redux'
import { ISubmissionsState } from '../types/submission'
import {
  REQUEST_SUBMISSIONS_LIST,
  RECEIVE_SUBMISSIONS_LIST
} from '../actions/submission'

const initialState: ISubmissionsState = {
  submissionsList: [],
  status: 'LOADING'
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ISubmissionsState => {
  switch (action.type) {
    case REQUEST_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        status: 'LOADING'
      })
    case RECEIVE_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        status: 'SUCCESS',
        submissionsList: action.submissionsList
      })
    default:
      return state
  }
}

export default reducer
