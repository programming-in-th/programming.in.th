import { AnyAction, Reducer } from 'redux'
import { ISubmissionsState } from '../types/submission'
import {
  REQUEST_SUBMISSIONS_LIST,
  RECEIVE_SUBMISSIONS_LIST,
  REQUEST_DETAIL,
  RECEIVE_DETAIL,
  REQUEST_MAKE_SUBMISSION,
  RECEIVE_MAKE_SUBMISSION
} from '../actions/submission'

const initialState: ISubmissionsState = {
  submissionsList: [],
  submissionsListStatus: 'LOADING',
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
        submissionsListStatus: 'LOADING'
      })
    case RECEIVE_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        submissionsListStatus: 'SUCCESS',
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
    case REQUEST_MAKE_SUBMISSION:
      return Object.assign({}, state, {
        submissionResponse: action.submissionResponse
      })
    case RECEIVE_MAKE_SUBMISSION:
      return Object.assign({}, state, {
        submissionResponse: action.submissionResponse
      })
    default:
      return state
  }
}

export default reducer
