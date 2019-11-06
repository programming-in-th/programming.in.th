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

import userReducer from './reducers/user'

import { IUserState } from './types/user'

export interface IAppState {
  user: IUserState
}

export const rootReducer: Reducer = combineReducers<IAppState>({
  user: userReducer
})

const composeEnhancers = composeWithDevTools({})

export const initStore = (initialState: IAppState | {} = {}): Store =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), cacheEnhancer())
  )
