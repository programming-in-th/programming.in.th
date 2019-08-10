import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import taskReducer from './reducers/task'
import userReducer from './reducers/user'
import { ITaskState } from './types/task'
import { IUserState } from './types/user'

export interface IAppState {
  tasks: ITaskState
  user: IUserState
}

export const rootReducer: Reducer = combineReducers<IAppState>({
  tasks: taskReducer,
  user: userReducer
})

export const store: Store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)
