import { AnyAction, Reducer } from 'redux'
import { ISubmissionsState, ISubmissions } from '../types/submission'
import {
  REQUEST_SUBMISSIONS_LIST,
  RECEIVE_SUBMISSIONS_LIST,
  REQUEST_DETAIL,
  RECEIVE_DETAIL
} from '../actions/submission'

const initialState: ISubmissionsState = {
  submissionsList: [],
  submissionListStatus: 'LOADING',
  detail: undefined,
  detailStatus: 'LOADING'
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ISubmissionsState => {
  switch (action.type) {
    case REQUEST_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        submissionListStatus: 'LOADING'
      })
    case RECEIVE_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        submissionListStatus: 'SUCCESS',
        submissionsList: action.submissionsList
      })
    case REQUEST_DETAIL:
      return Object.assign({}, state, {
        detailStatus: 'LOADING'
      })
    case RECEIVE_DETAIL:
      return Object.assign({}, state, {
        detailStatus: 'SUCCESS',
        detail: action.detail
      })
    default:
      return state
  }
}

export default reducer
