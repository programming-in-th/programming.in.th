import React, { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { Box } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { Signup } from '../components/auth/Signup'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/')
    }
  }, [user])

  return (
    <PageLayout>
      <Box h={550} w={650} px={6} mx="auto" mt={8}>
        <Signup />
      </Box>
    </PageLayout>
  )
}
