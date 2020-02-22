import React from 'react'

import { PageLayout } from '../components/Layout'
import { LoginPage } from '../components/auth/Login'
import { Container } from '../components/auth/Common'
import { AlreadyLoggedIn } from '../components/auth/Already'

import { useUser } from '../components/UserContext'

export default () => {
  const { user } = useUser()

  return (
    <PageLayout bg="white">
      {user ? (
        <AlreadyLoggedIn></AlreadyLoggedIn>
      ) : (
        <Container>
          <LoginPage></LoginPage>
        </Container>
      )}
    </PageLayout>
  )
}
