import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { IAppState } from '..'
import { ISubmissions } from '../types/submission'

export const loadSubmissionsList = (limit: number) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestSubmissions())
    try {
      const url = `https://asia-east2-grader-ef0b5.cloudfunctions.net/api/getRecentSubmissions?limit=${
        limit ? limit : '-1'
      }`
      const response = (await axios.get(url)).data
      dispatch(receiveSubmissions(response))
    } catch (error) {
      console.log(error)
    }
  }
}

export const REQUEST_SUBMISSIONS_LIST = 'REQUEST_SUBMISSIONS_LIST'
const requestSubmissions = () => {
  return {
    type: REQUEST_SUBMISSIONS_LIST
  }
}

export const RECEIVE_SUBMISSIONS_LIST = 'RECEIVE_SUBMISSIONS_LIST'
const receiveSubmissions = (data: ISubmissions[]) => {
  return {
    type: RECEIVE_SUBMISSIONS_LIST,
    submissionsList: data
  }
}
