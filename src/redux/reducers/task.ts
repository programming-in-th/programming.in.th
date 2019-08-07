import { AnyAction, Reducer } from 'redux'
import { ITaskState } from '../types/task'
import {
  LOAD_TAGS,
  REQUEST_TASKS_LIST,
  RECEIVE_TASKS_LIST,
  LOAD_CURRENT_TASK
} from '../actions/task'

const initialState: ITaskState = {
  currentTask: null,
  taskList: [],
  tags: [],
  status: 'LOADING'
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
    case LOAD_CURRENT_TASK:
      return Object.assign({}, state, {
        currentTask: action.currentTask
      })
    default:
      return state
  }
}

export default reducer
