import React from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import H from 'history'

import { AlreadyLoggedIn } from '../components/auth/Already'

import { RegisterPage } from '../components/auth/Register'
import { Container } from '../components/auth/Style'

interface IRegisterProps {
  history: H.History
  user?: firebase.User
}

const _Register = (props: IRegisterProps) =>
  props.user ? (
    <AlreadyLoggedIn></AlreadyLoggedIn>
  ) : (
    <Container>
      <RegisterPage history={props.history}></RegisterPage>
    </Container>
  )

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const Register = compose(
  withRouter,
  connect(mapStateToProps)
)(_Register) as any
