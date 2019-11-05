import { AnyAction, Reducer } from 'redux'
import { ITaskState } from '../types/task'
import { SET_TASK_PAGE_CONFIG } from '../actions/task'

const initialState: ITaskState = {
  taskPage: {
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    searchTag: [],
    searchDifficulty: [0, 10],
    hideTag: true
  }
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ITaskState => {
  switch (action.type) {
    case SET_TASK_PAGE_CONFIG:
      return Object.assign({}, state, {
        taskPage: action.taskPage
      })
    default:
      return state
  }
}

export default reducer
