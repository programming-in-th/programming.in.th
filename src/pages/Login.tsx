import React from 'react'
import { withRouter } from 'react-router'

import { compose } from 'redux'
import { connect } from 'react-redux'
import H from 'history'

import { AlreadyLoggedIn } from '../components/auth/Already'
import { LoginPage } from '../components/auth/Login'
import { Container } from '../components/auth/Style'
import { IAppState } from '../redux'

interface ILoginProps {
  history: H.History
  user?: firebase.User
}

const _Login = (props: ILoginProps) =>
  props.user ? (
    <AlreadyLoggedIn></AlreadyLoggedIn>
  ) : (
    <Container>
      <LoginPage history={props.history}></LoginPage>
    </Container>
  )

const mapStateToProps: (state: IAppState) => any = state => {
  return {
    user: state.user.user
  }
}

export const Login = compose(
  withRouter,
  connect(mapStateToProps)
)(_Login) as any
