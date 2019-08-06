import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import taskReducer from './reducers/task'
import userReducer from './reducers/user'
import { composeWithDevTools } from 'redux-devtools-extension'

export const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer
})

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)
