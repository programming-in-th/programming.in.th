import { AnyAction, Reducer } from 'redux'
import { ISubmissionsState } from '../types/submission'
import {
  REQUEST_SUBMISSIONS_LIST,
  RECEIVE_SUBMISSIONS_LIST,
  REQUEST_DETAIL,
  RECEIVE_DETAIL,
  REQUEST_MAKE_SUBMISSION,
  RECEIVE_MAKE_SUBMISSION,
  RESUBMIT_SUBMISSION,
  ERROR_SUBMIT,
  RESET_CURRENT_SUBMISSION,
  SET_PAGE_CONFIG
} from '../actions/submission'

const initialState: ISubmissionsState = {
  submissionsList: [],
  submissionsListStatus: 'LOADING',
  detail: undefined,
  detailStatus: 'LOADING',
  currentSubmissionUID: undefined,
  submission_uid: undefined,
  submissionResponse: 0,
  submissionsPage: {
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    pointFilter: false
  }
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
        submissionResponse: action.submissionResponse,
        submission_uid: action.detail,
        currentSubmissionUID: action.currentSubmissionUID
      })
    case RESUBMIT_SUBMISSION:
      return Object.assign({}, state, {
        submissionResponse: 0
      })
    case ERROR_SUBMIT:
      return Object.assign({}, state, {
        submissionResponse: -2
      })
    case RESET_CURRENT_SUBMISSION:
      return Object.assign({}, state, {
        currentSubmissionUID: undefined
      })
    case SET_PAGE_CONFIG:
      return Object.assign({}, state, {
        submissionsPage: action.submissionsPage
      })
    default:
      return state
  }
}

export default reducer
