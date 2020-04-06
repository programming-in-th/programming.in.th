import React, { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { Box } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { EmailLogin } from '../components/auth/EmailLogin'
import { OAuthLogin } from '../components/auth/OAuthLogin'

export default () => {
  return (
    <PageLayout>
      <Box h={500} px={6} m="0 auto">
        <EmailLogin />
        <OAuthLogin />
      </Box>
    </PageLayout>
  )
}
