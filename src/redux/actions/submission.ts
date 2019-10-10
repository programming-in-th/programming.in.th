import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { IAppState } from '..'
import { ISubmission, ISubmissionPage } from '../types/submission'
import firebase from 'firebase/app'

export const loadSubmissionsList = () => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestSubmissions())
    try {
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getRecentSubmissions')({})
      dispatch(receiveSubmissions(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const loadDetail = (submission_id: string) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestDetail())
    try {
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getDetailedSubmissionData')({
        submission_id: submission_id
      })

      const submission_data: ISubmission = {
        ...response.data.metadata,
        submission_id: submission_id,
        code: response.data.code
      }

      dispatch(receiveDetail(submission_data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const makeSubmission = (
  uid: string,
  problem_id: string,
  code: string,
  language: string
) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestMakeSubmission())

    try {
      const params = {
        uid: uid,
        problem_id: problem_id,
        code: code,
        language: language
      }

      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('makeSubmission')(params)

      dispatch(receiveMakeSubmission(200, response.data))
    } catch (error) {
      console.log(error)
      dispatch(receiveMakeSubmission(error.code, ''))
    }
  }
}

export const REQUEST_DETAIL = 'REQUEST_DETAIL'
const requestDetail = () => {
  return {
    type: REQUEST_DETAIL
  }
}

export const RECEIVE_DETAIL = 'RECEIVE_DETAIL'
const receiveDetail = (data: ISubmission) => {
  return {
    type: RECEIVE_DETAIL,
    detail: data
  }
}

export const REQUEST_SUBMISSIONS_LIST = 'REQUEST_SUBMISSIONS_LIST'
const requestSubmissions = () => {
  return {
    type: REQUEST_SUBMISSIONS_LIST
  }
}

export const RECEIVE_SUBMISSIONS_LIST = 'RECEIVE_SUBMISSIONS_LIST'
const receiveSubmissions = (data: ISubmission[]) => {
  return {
    type: RECEIVE_SUBMISSIONS_LIST,
    submissionsList: data
  }
}

export const REQUEST_MAKE_SUBMISSION = 'REQUEST_MAKE_SUBMISSION'
const requestMakeSubmission = () => {
  return {
    type: REQUEST_MAKE_SUBMISSION,
    submissionResponse: -1
  }
}

export const RECEIVE_MAKE_SUBMISSION = 'RECEIVE_MAKE_SUBMISSION'
const receiveMakeSubmission = (data: number, response: string) => {
  return {
    type: RECEIVE_MAKE_SUBMISSION,
    currentSubmissionUID: response,
    submissionResponse: data,
    detail: response
  }
}

export const RESUBMIT_SUBMISSION = 'RESUBMIT_SUBMISSION'
export const resubmitSubmission = () => {
  return {
    type: RESUBMIT_SUBMISSION
  }
}

export const ERROR_SUBMIT = 'ERROR_SUBMIT'
export const errorSubmit = () => {
  return {
    type: ERROR_SUBMIT
  }
}

export const RESET_CURRENT_SUBMISSION = 'RESET_CURRENT_SUBMISSION'
export const resetCurrentSubmission = () => {
  return {
    type: RESET_CURRENT_SUBMISSION
  }
}

export const SET_PAGE_CONFIG = 'SET_PAGE_CONFIG'
export const setPageConfig = (setting: ISubmissionPage) => {
  return {
    type: SET_PAGE_CONFIG,
    submissionsPage: setting
  }
}
