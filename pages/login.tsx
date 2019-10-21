import React from 'react'
import { PageLayout } from '../components/Layout'
import { LoginPage } from '../components/auth/Login'
import { Container } from '../components/auth/Style'

export default () => (
  <PageLayout>
    <Container>
      <LoginPage></LoginPage>
    </Container>
  </PageLayout>
)
