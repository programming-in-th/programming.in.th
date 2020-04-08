import React, { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { Box, Button } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { EmailLogin } from '../components/auth/EmailLogin'
import { OAuthLogin } from '../components/auth/OAuthLogin'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { Register } from '../components/auth/Register'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/')
    }
  }, [user])

  return (
    <PageLayout>
      <Box h={550} w={650} px={6} m="0 auto">
        <Register />
      </Box>
    </PageLayout>
  )
}
