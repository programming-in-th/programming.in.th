import { AnyAction, Reducer } from 'redux'
import { DEFAULT_KEY, generateCacheTTL } from 'redux-cache'
import { ITaskState } from '../types/task'
import {
  REQUEST_TASKS_LIST,
  RECEIVE_TASKS_LIST,
  SET_TASK_PAGE_CONFIG
} from '../actions/task'

const initialState: ITaskState = {
  cacheUntil: null,
  taskPage: {
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    searchTag: [],
    searchDifficulty: [0, 10],
    hideTag: true
  },
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
        [DEFAULT_KEY]: generateCacheTTL(),
        status: 'SUCCESS',
        taskList: action.taskList
      })
    case SET_TASK_PAGE_CONFIG:
      return Object.assign({}, state, {
        taskPage: action.taskPage
      })
    default:
      return state
  }
}

export default reducer
