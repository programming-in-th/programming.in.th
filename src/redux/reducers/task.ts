import { AnyAction, Reducer } from 'redux'
import { ITaskState } from '../types/task'
import {
  LOAD_TAGS,
  REQUEST_TASKS_LIST,
  RECEIVE_TASKS_LIST,
  REQUEST_TASK,
  RECEIVE_TASK,
  RECEIVE_PAGE
} from '../actions/task'

const initialState: ITaskState = {
  currentPage: 1,
  currentPageSize: 10,
  currentTask: null,
  taskList: [],
  tags: [],
  status: null
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ITaskState => {
  switch (action.type) {
    case LOAD_TAGS:
      return Object.assign({}, state, {
        tags: action.tags
      })
    case REQUEST_TASKS_LIST:
      return Object.assign({}, state, {
        status: 'LOADING'
      })
    case RECEIVE_TASKS_LIST:
      return Object.assign({}, state, {
        status: 'SUCCESS',
        taskList: action.taskList
      })
    case REQUEST_TASK:
      return Object.assign({}, state, {
        status: 'LOADING'
      })
    case RECEIVE_TASK:
      return Object.assign({}, state, {
        status: 'SUCCESS',
        currentTask: action.currentTask
      })
    case RECEIVE_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage,
        currentPageSize: action.currentPageSize
      })
    default:
      return state
  }
}

export default reducer
