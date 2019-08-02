import * as actionTypes from '../actions/taskListActionType'
import { AnyAction } from 'redux'
import { TaskListState } from '../types/task_list_types'

const initialState: TaskListState = {
  taskList: [],
  tags: []
}

const reducer = (state = initialState, action: AnyAction): TaskListState => {
  switch (action.type) {
    case actionTypes.LOAD_TAGS:
      return { ...state, ...{ tags: action.tags } }
    case actionTypes.LOAD_TASKS:
      return { ...state, ...{ taskList: action.taskList } }
    default:
      return state
  }
}

export default reducer
