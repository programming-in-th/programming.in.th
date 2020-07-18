import React, { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Box, Flex, Text, Link as ChakraLink, Divider } from '@chakra-ui/core'

import { useUser } from 'components/UserContext'
import { PageLayout } from 'components/Layout'
import { Signup } from 'components/auth/Signup'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    if (user.user !== null) {
      Router.push('/')
    }
  }, [user.user])

  return (
    <PageLayout>
      <Flex
        align="center"
        justify="center"
        flexGrow={1}
        flexDirection="column"
        mt={4}
      >
        <Text fontSize={['4xl', '5xl']}>Sign Up</Text>
        <Box w="360px" maxW="90%">
          <Signup />
        </Box>
      </Flex>
      <Divider m={0} />

      <Flex
        display="flex"
        align="center"
        justifyContent="center"
        p={8}
        height={100}
      >
        <Link href="/login">
          <ChakraLink href="/login" lineHeight="18px" color="gray.500">
            Have an account? Login
          </ChakraLink>
        </Link>
      </Flex>
    </PageLayout>
  )
}
