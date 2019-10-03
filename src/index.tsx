import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import firebase from 'firebase/app'
import 'firebase/functions'
import styled, { createGlobalStyle } from 'styled-components'

import { Index } from './pages/Index'
import { NotFound } from './pages/404'
import { LearnPage } from './pages/Learn'
import { TasksPage } from './pages/Tasks'
import { TaskDetailPage } from './pages/TaskDetail'
import { SubmissionsPage } from './pages/Submissions'
import { SubmissionDetailPage } from './pages/SubmissionDetail'
import { SettingPage } from './pages/Setting'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Nav } from './components/nav/Nav'
import { CustomSpin } from './components/Spin'

import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import * as actionCreators from './redux/actions/index'
import { firebaseConfig } from './config'
import { store } from './redux'

import './assets/css/init.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

const GlobalStyle = createGlobalStyle`
  #root {
    width: 1020px;
    margin-left: auto;
    margin-right: auto;
  }

  .divider {
    margin-top: 25px;
    padding: 7px 0;
    color: var(--info);

    p {
      font-size: 24px;
      font-weight: bolder;
    }
}
`

const { Header, Content, Footer } = Layout

const CustomLayout = styled(Layout)`
  min-height: 100vh;
`

interface IRootProps {
  onInitialLoad: () => void
  user: 'LOADING' | firebase.User | null
  taskStatus: any
  submissionsListStatus: any
  submissionDetailStatus: any
}

class Root extends React.Component<IRootProps, {}> {
  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user === 'LOADING' ? (
          <CustomSpin />
        ) : (
          <Router>
            <CustomLayout>
              <GlobalStyle />
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
                  <Route
                    exact
                    path="/submissions"
                    component={SubmissionsPage}
                  />
                  <Route
                    exact
                    path="/submissions/:id"
                    component={SubmissionDetailPage}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/learn" component={LearnPage} />
                  <Route
                    exact
                    path="/learn/:article_id"
                    component={LearnPage}
                  />
                  <Route exact path="/setting" component={SettingPage} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>IPST ©2019</Footer>
            </CustomLayout>
          </Router>
        )}
      </React.Fragment>
    )
  }
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
