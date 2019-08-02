/* React */
import React from 'react'
import ReactDOM from 'react-dom'

/* React Util */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { blue } from '@material-ui/core/colors'

/* Pages */
import { Index } from './pages/Index'
import { TasksPage } from './pages/Tasks'
import { Login } from './pages/Login'
import { NotFound } from './pages/404'

/* React Component */
import { Nav } from './components/Nav/Nav'

/* Static */
import './assets/css/init.css'
import './assets/css/main.css'
import './assets/material-icon/material-icons.css'
import './assets/css/responsive.css'
import firebase from 'firebase'

/* Redux */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import taskListReducer from './store/reducers/task_list'
import { Provider } from 'react-redux'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyCjd-glhd1Rl_QJUfLp4w2zxEB94bhIsJE',
    authDomain: 'grader-ef0b5.firebaseapp.com',
    databaseURL: 'https://grader-ef0b5.firebaseio.com',
    projectId: 'grader-ef0b5',
    storageBucket: 'grader-ef0b5.appspot.com',
    messagingSenderId: '408883593148',
    appId: '1:408883593148:web:7e080f677cb99238'
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#fafafa'
    }
  },
  typography: {
    // useNextVariants: true,
    // TODO: fix typography
  }
})

const rootReducer = combineReducers({
  tasks: taskListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const Root = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/tasks" component={TasksPage} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </MuiThemeProvider>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('react')
)
