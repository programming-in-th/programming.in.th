import React from 'react'
import { PageLayout } from '../components/Layout'
import { RegisterPage } from '../components/auth/Register'
import { Container, AuthContainer } from '../components/auth/Common'
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
          <AuthContainer>
            <RegisterPage></RegisterPage>
          </AuthContainer>
        </Container>
      )}
    </PageLayout>
  )
}
