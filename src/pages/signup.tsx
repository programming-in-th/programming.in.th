import React, { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Box, Divider } from '@chakra-ui/core'

import { useUser } from 'components/UserContext'
import { PageLayout } from 'components/Layout'
import { Signup } from 'components/auth/Signup'

const SignUp = () => {
  const { user } = useUser()

  useEffect(() => {
    if (user.user !== null) {
      Router.push('/')
    }
  }, [user.user])

  return (
    <PageLayout>
      <div className="flex items-center justify-center flex-grow flex-col mt-4">
        <div className="text-4xl sm:text-5xl">Sign Up</div>
        <Box w="360px" maxW="90%">
          <Signup />
        </Box>
      </div>
      <Divider m={0} />

      <div className="flex items-center justify-center p-8 h-24">
        <Link href="/login">
          <a className="hover:underline leading-5 text-gray-500" href="/login">
            Have an account? Login
          </a>
        </Link>
      </div>
    </PageLayout>
  )
}

export default SignUp
