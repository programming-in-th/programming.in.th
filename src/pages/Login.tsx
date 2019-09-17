import React from 'react'
import { withRouter } from 'react-router'

import { LoginPage } from '../components/auth/Login'
import { Container } from '../components/auth/Style'

const _Login = () => (
  <Container>
    <LoginPage></LoginPage>
  </Container>
)

export const Login = withRouter(_Login)
