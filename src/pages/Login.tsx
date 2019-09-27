import React from 'react'
import { withRouter } from 'react-router'
import { Row, Col } from 'antd'
import H from 'history'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { LoginPage } from '../components/auth/Login'
import { AlreadyLoggedIn } from '../components/auth/Already'

const _Login = () => (
  <Container>
    <LoginPage></LoginPage>
  </Container>
)

export const Login = withRouter(_Login)
