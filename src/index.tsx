import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Spin } from 'antd'

import { Index } from './pages/Index'
import { NotFound } from './pages/404'
import { LearnPage } from './pages/Learn'
import { TasksPage } from './pages/Tasks'
import { TaskDetailPage } from './pages/TaskDetail'
import { SubmissionsPage } from './pages/Submissions'
import { SubmissionDetailPage } from './pages/SubmissionDetail'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

import { Nav } from './components/nav/Nav'
import { SpinWrapper } from './components/SpinWrapper'

import './assets/css/init.css'
import './assets/css/main.css'
import './assets/material-icon/material-icons.css'
import './assets/css/responsive.css'

import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import * as actionCreators from './redux/actions/index'
import { firebaseConfig } from './config'
import { store } from './redux'

import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

const { Header, Content, Footer } = Layout

interface IRootProps {
  onInitialLoad: () => void
  user: any
  taskStatus: any
  submissionsListStatus: any
  submissionDetailStatus: any
}

const Root: React.FunctionComponent<IRootProps> = (props: IRootProps) => {
  useEffect(() => props.onInitialLoad(), [])

  return (
    <React.Fragment>
      {props.user === 'LOADING' ? (
        <SpinWrapper>
          <Spin tip="Loading..." size="large" />
        </SpinWrapper>
      ) : (
        <Router>
          <Layout>
            <Header
              style={{
                background: 'white',
                position: 'fixed',
                zIndex: 100,
                width: '100%'
              }}
            >
              <Nav />
            </Header>
            <Content style={{ marginTop: 64 }}>
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/tasks" component={TasksPage} />
                <Route exact path="/tasks/:id" component={TaskDetailPage} />
                <Route exact path="/submissions" component={SubmissionsPage} />
                <Route
                  exact
                  path="/submissions/:id"
                  component={SubmissionDetailPage}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/learn" component={LearnPage} />
                <Route exact path="/learn/:article_id" component={LearnPage} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>IPST ©2019</Footer>
          </Layout>
        </Router>
      )}
    </React.Fragment>
  )
}

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user,
    taskStatus: state.tasks.status,
    submissionsListStatus: state.submissions.submissionsListStatus,
    submissionDetailStatus: state.submissions.detailStatus
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
  mapStateToProps,
  mapDispatchToProps
)(Root) as any

ReactDOM.render(
  <Provider store={store}>
    <RootPage />
  </Provider>,
  document.getElementById('react') as HTMLElement
)
