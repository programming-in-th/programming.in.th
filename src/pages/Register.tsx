import React from 'react'
import { withRouter } from 'react-router'

import { RegisterPage } from '../components/auth/Register'
import { Container } from '../components/auth/Style'

const _Register = () => (
  <Container>
    <RegisterPage></RegisterPage>
  </Container>
)

export const Register = withRouter(_Register)
