import { createStore } from 'redux'
import reducers from './reducers_old'

const initState = {
    floatingAction: false,
    user: {
      log: false,
      displayName: '',
      image: '',
      postOverlay: false,
      uid: undefined
    }
  },
  store = createStore(reducers, initState)

export default store
