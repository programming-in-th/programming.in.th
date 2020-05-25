import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Box, Text, Flex, Divider, Link as ChakraLink } from '@chakra-ui/core'

import { useUser } from 'components/UserContext'
import { PageLayout } from 'components/Layout'
import { EmailLogin } from 'components/auth/EmailLogin'
import { OAuthLogin } from 'components/auth/OAuthLogin'

export default () => {
  const [loginMethod, setLoginMethod] = useState<boolean>(true)
  const [error, setError] = useState<string>(' ')
  const { user } = useUser()

  useEffect(() => {
    if (user.user !== null) {
      Router.push('/')
    }
  }, [user.user])

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1} flexDirection="column">
        <Text />
        <Text fontSize={['4xl', '5xl']} mb={4}>
          Log in
        </Text>
        <Box w="360px" maxW="90%">
          {loginMethod ? (
            <OAuthLogin setErrorMessage={setError} />
          ) : (
            <EmailLogin setErrorMessage={setError} />
          )}
        </Box>
        <Text mt={4}>
          You can also
          <ChakraLink
            ml={1}
            lineHeight="18px"
            color="gray.500"
            onClick={() => {
              setLoginMethod(!loginMethod)
              setError(' ')
            }}
          >
            {loginMethod ? 'continue with email' : 'continue with OAuth'}
          </ChakraLink>
        </Text>
        <Text color="red.500" mt={2}>
          {error}
        </Text>
      </Flex>
      <Divider m={0} />

      <Flex
        display="flex"
        align="center"
        justifyContent="center"
        p={8}
        height={100}
      >
        <Link href="/signup">
          <ChakraLink href="/signup" lineHeight="18px" color="gray.500">
            Don't have an account? Sign Up
          </ChakraLink>
        </Link>
      </Flex>
    </PageLayout>
  )
}
