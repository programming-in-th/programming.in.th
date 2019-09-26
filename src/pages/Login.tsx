import React from 'react'
import { withRouter } from 'react-router'
import { Row, Col } from 'antd'
import H from 'history'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { LoginPage } from '../components/auth/Login'
import { AlreadyLoggedIn } from '../components/auth/Already'

interface ILoginProps {
  history: H.History
  user?: firebase.User
}

const _Login = (props: ILoginProps) =>
  props.user ? (
    <AlreadyLoggedIn></AlreadyLoggedIn>
  ) : (
    <Row>
      <Col span={6} offset={9}>
        <div style={{ paddingTop: '64px' }}>
          <LoginPage history={props.history}></LoginPage>
        </div>
      </Col>
    </Row>
  )

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const Login = compose(
  withRouter,
  connect(mapStateToProps)
)(_Login) as any
