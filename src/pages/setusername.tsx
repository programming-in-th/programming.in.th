import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Box } from '@chakra-ui/core'
import { PageLayout } from 'components/Layout'
import { SetUsernameComponent } from 'components/auth/SetUsername'
import { useUser } from 'components/UserContext'

// @TODO Remove this file and use new onboarding logic
const SetUsername = () => {
  const [error, setError] = useState<string>(' ')
  const { user } = useUser()
  useEffect(() => {
    if (user.user === null) {
      Router.push('/')
    }
  }, [user.user])

  if (!user.user) {
    return (
      <PageLayout>
        <React.Fragment></React.Fragment>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center flex-grow flex-col">
        <div className="text-4xl sm:text-5xl mb-4">Set Username</div>
        <Box w="360px" maxW="90%">
          <SetUsernameComponent setErrorMessage={setError} />
        </Box>
        <div className="text-red-500 mt-2">{error}</div>
      </div>
    </PageLayout>
  )
}

export default SetUsername
