import React from 'react'
import { PageLayout } from '../components/Layout'
import { RegisterPage } from '../components/auth/Register'
import { Container } from '../components/auth/Style'
import { useSelector } from 'react-redux'
import { IAppState } from '../redux'
import { AlreadyLoggedIn } from '../components/auth/Already'

export default () => {
  const user = useSelector((state: IAppState) => state.user.user)

  return (
    <PageLayout>
      {user ? (
        <AlreadyLoggedIn></AlreadyLoggedIn>
      ) : (
        <Container>
          <RegisterPage></RegisterPage>
        </Container>
      )}
    </PageLayout>
  )
}
