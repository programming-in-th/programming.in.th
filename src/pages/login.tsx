import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useUser } from '../components/UserContext'
import { Box, Text, Flex, Divider, Link as ChakraLink } from '@chakra-ui/core'
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
      <Box w="100%" mx="auto" mb={-8} mt={-2}>
        <Flex
          minH={['calc(100vh - 185px)', 'calc(100vh - 165px)']}
          w={320}
          minW="auto"
          direction="column"
          display="flex"
          align="center"
          justifyContent="center"
          mx="auto"
        >
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
        </Flex>
        <Divider mb={['50px', 0]} mt={0}></Divider>
        <Flex display="flex" align="center" justifyContent="center" h={100}>
          <Link href="/register">
            <ChakraLink href="/register" lineHeight="18px" color="gray.500">
              Don't have an account? Sign Up
            </ChakraLink>
          </Link>
        </Flex>
      </Box>
    </PageLayout>
  )
}
