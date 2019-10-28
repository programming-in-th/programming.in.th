import React from 'react'
import { useSelector } from 'react-redux'

import { PageLayout } from '../components/Layout'
import { LoginPage } from '../components/auth/Login'
import { Container } from '../components/auth/Style'
import { AlreadyLoggedIn } from '../components/auth/Already'

import { IAppState } from '../redux'

export default () => {
  const user = useSelector((state: IAppState) => state.user.user)

  return (
    <PageLayout>
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
