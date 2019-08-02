import * as actionTypes from '../actions/task_list_action_types'
import { updateObject } from '../utility'
import { AnyAction } from 'redux'

const initialState = {
  taskList: [],
  tags: []
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.LOAD_TAGS:
      return updateObject(state, { tags: action.tags })
    case actionTypes.LOAD_TASKS:
      return updateObject(state, { taskList: action.taskList })
  }
  return state
}

export default reducer
