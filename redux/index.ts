import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cacheEnhancer } from 'redux-cache'

import taskReducer from './reducers/task'
import userReducer from './reducers/user'
import submissionsReducer from './reducers/submission'
import learnReducer from './reducers/learn'

import { ITaskState } from './types/task'
import { IUserState } from './types/user'
import { ISubmissionsState } from './types/submission'
import { ILearnState } from './types/learn'

export interface IAppState {
  tasks: ITaskState
  user: IUserState
  submissions: ISubmissionsState
  learn: ILearnState
}

export const rootReducer: Reducer = combineReducers<IAppState>({
  tasks: taskReducer,
  user: userReducer,
  submissions: submissionsReducer,
  learn: learnReducer
})

const composeEnhancers = composeWithDevTools({})

export const initStore = (initialState: IAppState | {} = {}): Store =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), cacheEnhancer())
  )
