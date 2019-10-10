import { AnyAction, Reducer } from 'redux'
import { ITaskState } from '../types/task'
import {
  REQUEST_TASKS_LIST,
  RECEIVE_TASKS_LIST,
  REQUEST_TASK,
  RECEIVE_TASK,
  RECEIVE_PAGE
} from '../actions/task'

const initialState: ITaskState = {
  taskPage: {
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    searchTag: [],
    searchDifficulty: [0, 10],
    hideTag: true
  },
  currentTask: null,
  taskList: [],
  status: null
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ITaskState => {
  switch (action.type) {
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
        taskPage: action.taskPage
      })
    default:
      return state
  }
}

export default reducer
