import { AnyAction } from 'redux'
import { TaskListState } from '../types/task_list_types'
import { LOAD_TAGS, REQUEST_TASKS, RECEIVE_TASKS } from '../actions/taskList'

const initialState: TaskListState = {
  taskList: [],
  tags: [],
  status: 'LOADING'
}

const reducer = (state = initialState, action: AnyAction): TaskListState => {
  switch (action.type) {
    case LOAD_TAGS:
      return Object.assign({}, state, {
        tags: action.tags
      })
    case REQUEST_TASKS:
      return Object.assign({}, state, {
        status: 'LOADING'
      })
    case RECEIVE_TASKS:
      return Object.assign({}, state, {
        status: 'SUCCESS',
        taskList: action.taskList
      })
    default:
      return state
  }
}

export default reducer
