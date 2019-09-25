import React from 'react'
import { withRouter } from 'react-router'

import { RegisterPage } from '../components/auth/Register'
import { Row, Col } from 'antd'
import H from 'history'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AlreadyLoggedIn } from '../components/auth/Already'

interface IRegisterProps {
  history: H.History
  user?: firebase.User
}

const _Register = (props: IRegisterProps) =>
  props.user ? (
    <AlreadyLoggedIn></AlreadyLoggedIn>
  ) : (
    <Row>
      <Col span={6} offset={9}>
        <div style={{ paddingTop: '64px' }}>
          <RegisterPage history={props.history}></RegisterPage>
        </div>
      </Col>
    </Row>
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
