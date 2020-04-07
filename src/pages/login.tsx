import React, { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { Box, Divider } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { EmailLogin } from '../components/auth/EmailLogin'
import { OAuthLogin } from '../components/auth/OAuthLogin'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/')
    }
  }, [user])

  return (
    <PageLayout>
      <Box h={550} width="100%" px={6} m="0px auto">
        <EmailLogin />
        <Divider></Divider>
        <OAuthLogin />
      </Box>
    </PageLayout>
  )
}
