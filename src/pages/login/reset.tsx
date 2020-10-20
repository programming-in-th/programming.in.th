import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Box, Divider } from '@chakra-ui/core'

import { useUser } from 'components/UserContext'
import { PageLayout } from 'components/Layout'
import { Reset } from 'components/auth/Reset'

const ResetPassword = () => {
  const [error, setError] = useState<string>('')
  const { user } = useUser()

  useEffect(() => {
    if (user.user !== null) {
      Router.push('/')
    }
  }, [user.user])

  return (
    <PageLayout>
      <div className="flex items-center justify-center flex-grow flex-col">
        <div className="text-4xl sm:text-5xl mb-4">Reset Password</div>
        <Box w="360px" maxW="90%">
          <Reset setErrorMessage={setError} />
        </Box>
        <div className="mt-4">
          You can also
          <Link href="/login">
            <a
              className="hover:underline ml-1 leading-6 text-gray-500"
              href="/login"
            >
              login
            </a>
          </Link>
        </div>
        <div className="text-red-500 mt-2">{error}</div>
      </div>
      <Divider m={0} />
      <div className="flex items-center justify-center p-8 h-24">
        <Link href="/signup">
          <a className="hover:underline leading-6 text-gray-500" href="/signup">
            Don't have an account? Sign Up
          </a>
        </Link>
      </div>
    </PageLayout>
  )
}

export default ResetPassword
