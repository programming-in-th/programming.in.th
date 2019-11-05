import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { IAppState } from '..'
import firebase from '../../lib/firebase'
import { ISubmissionPage } from '../types/submission'

export const makeSubmission = (
  uid: string,
  problem_id: string,
  code: string,
  language: string,
  hideCode: boolean
) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestMakeSubmission())
    try {
      const params = {
        uid,
        problem_id,
        code,
        language,
        hideCode
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

export const SET_SUB_PAGE_CONFIG = 'SET_SUB_PAGE_CONFIG'
export const setSubPageConfig = (setting: ISubmissionPage) => {
  return {
    type: SET_SUB_PAGE_CONFIG,
    submissionsPage: setting
  }
}
