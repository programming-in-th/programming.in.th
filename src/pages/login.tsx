import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Box, Text, Flex, Divider, Link as ChakraLink } from '@chakra-ui/core'

import { useUser } from '../components/UserContext'
import { PageLayout } from '../components/Layout'
import { EmailLogin } from '../components/auth/EmailLogin'
import { OAuthLogin } from '../components/auth/OAuthLogin'

export default () => {
  const [loginMethod, setLoginMethod] = useState<boolean>(true)
  const [error, setError] = useState<string>(null)
  const { user } = useUser()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/')
    }
  }, [user])

  return (
    <PageLayout>
      <Flex align="center" justifyContent="center" flexGrow={1}>
        <Box width={320} textAlign="center">
          <Text fontSize="5xl" mb={6}>
            Log in
          </Text>

          {loginMethod ? (
            <OAuthLogin setErrorMessage={setError} />
          ) : (
            <EmailLogin setErrorMessage={setError} />
          )}

          <Text mt={6}>
            You can also
            <ChakraLink
              ml={1}
              lineHeight="18px"
              color="gray.500"
              onClick={() => {
                setLoginMethod(!loginMethod)
                setError(null)
              }}
            >
              {loginMethod ? 'continue with email' : 'continue with OAuth'}
            </ChakraLink>
          </Text>

          <Text color="red.500" mt={4}>
            {error}
          </Text>
        </Box>
      </Flex>

      <Divider m={0}></Divider>

      <Flex
        display="flex"
        align="center"
        justifyContent="center"
        p={8}
        height={100}
      >
        <Link href="/register">
          <ChakraLink href="/register" lineHeight="18px" color="gray.500">
            Don't have an account? Sign Up
          </ChakraLink>
        </Link>
      </Flex>
    </PageLayout>
  )
}
