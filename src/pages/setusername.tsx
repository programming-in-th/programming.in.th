import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Text, Flex, Box } from '@chakra-ui/core'
import { PageLayout } from 'components/Layout'
import { SetUsernameComponent } from 'components/auth/SetUsername'
import { useAuth } from 'lib/auth'

// @TODO Remove this file and use new onboarding logic
const SetUsername = () => {
  const [error, setError] = useState<string>(' ')
  const { user } = useAuth()
  useEffect(() => {
    if (user === null) {
      Router.push('/')
    }
  }, [user])

  if (!user) {
    return (
      <PageLayout>
        <React.Fragment></React.Fragment>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1} flexDirection="column">
        <Text fontSize={['4xl', '5xl']} mb={4}>
          Set Username
        </Text>
        <Box w="360px" maxW="90%">
          <SetUsernameComponent setErrorMessage={setError} />
        </Box>
        <Text color="red.500" mt={2}>
          {error}
        </Text>
      </Flex>
    </PageLayout>
  )
}

export default SetUsername
