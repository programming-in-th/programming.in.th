import { AnyAction, Reducer } from 'redux'
import { ILearnState, INode } from '../types/learn'
import {
  REQUEST_CONTENT,
  REQUEST_MENU,
  RECEIVE_CONTENT,
  RECEIVE_MENU,
  STORE_MAP
} from '../actions/learn'

const initialState: ILearnState = {
  menuStatus: 'LOADING',
  currentContentStatus: null,

  menu: undefined,
  currentContent: undefined,

  idMap: new Map<string, INode>()
}

const reducer: Reducer = (
  state = initialState,
  action: AnyAction
): ILearnState => {
  switch (action.type) {
    case REQUEST_MENU:
      return Object.assign({}, state, {
        menuStatus: 'LOADING'
      })
    case RECEIVE_MENU:
      return Object.assign({}, state, {
        menuStatus: 'SUCCESS',
        menu: action.menu
      })
    case REQUEST_CONTENT:
      return Object.assign({}, state, {
        currentContentStatus: 'LOADING'
      })
    case RECEIVE_CONTENT:
      return Object.assign({}, state, {
        currentContentStatus: 'SUCCESS',
        currentContent: action.currentContent
      })
    case STORE_MAP:
      return Object.assign({}, state, {
        idMap: action.mapToStore
      })
    default:
      return state
  }
}

export default reducer
