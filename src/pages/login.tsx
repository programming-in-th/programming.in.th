import React, { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { PageLayout } from '../components/Layout'
import { LoginPage } from '../components/auth/Login'

export default () => {
  const { user } = useUser()
  useEffect(() => {
    console.log(user)
    if (user) {
      Router.push('/')
    }
  }, [])

  return (
    <PageLayout>
      <LoginPage />
    </PageLayout>
  )
}
