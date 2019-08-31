/* React */
import React from 'react'
import ReactDOM from 'react-dom'

/* React Util */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

/* Pages */
import { Index } from './pages/Index'
import { TasksPage } from './pages/Tasks'
import { AuthPage } from './pages/Auth'
import { NotFound } from './pages/404'

/* React Component */
import { Nav } from './components/nav/Nav'

/* Static */
import './assets/css/init.css'
import './assets/css/main.css'
import './assets/material-icon/material-icons.css'
import './assets/css/responsive.css'
import firebase from 'firebase'

/* Redux */
import * as actionCreators from './redux/actions/index'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { firebaseConfig } from './config'

import { store } from './redux'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

const { Header, Content, Footer } = Layout

interface IRootProps {
  onInitialLoad: () => void
}
class Root extends React.Component<IRootProps> {
  componentDidMount() {
    this.props.onInitialLoad()
  }
  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Nav />
          </Header>
          <Content style={{ height: 'calc(100vh - 64px - 69px)' }}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route
                path="/tasks/:tab?"
                render={({ match, history }) => {
                  return <TasksPage match={match} history={history} />
                }}
              />
              <Route exact path="/login" component={AuthPage} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>IPST ©2019</Footer>
        </Layout>
      </Router>
    )
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.fetchUser())
    }
  }
}

const RootPage = connect(
  null,
  mapDispatchToProps
)(Root) as any

ReactDOM.render(
  <Provider store={store}>
    <RootPage />
  </Provider>,
  document.getElementById('react') as HTMLElement
)
