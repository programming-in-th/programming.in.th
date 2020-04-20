import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Box, Text, Flex, Divider, Link as ChakraLink } from '@chakra-ui/core'

import { useUser } from '../../components/UserContext'
import { PageLayout } from '../../components/Layout'
import { Reset } from '../../components/auth/Reset'

export default () => {
  const [error, setError] = useState<string>('')
  const { user } = useUser()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/')
    }
  }, [user])

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1} flexDirection="column">
        <Text fontSize="5xl" mb={4}>
          Reset Password
        </Text>
        <Box w="360px" maxW="90%">
          <Reset setErrorMessage={setError} />
        </Box>
        <Text mt={4}>
          You can also
          <Link href="/login">
            <ChakraLink href="/login" ml={1} lineHeight="18px" color="gray.500">
              go to login
            </ChakraLink>
          </Link>
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
