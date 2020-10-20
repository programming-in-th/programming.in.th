import React from 'react'

import { useUser } from './UserContext'
import { Footer } from './Footer'
import { Nav } from './Nav'

import { Flex, Divider } from '@chakra-ui/core'

export const PageLayout: React.FunctionComponent = (props) => {
  const { user } = useUser()

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      display={user.user === undefined ? 'none' : 'flex'}
    >
      <Nav />
      <Divider m={0} />
      <Flex as="main" flex="auto" direction="column" minH="calc(100vh - 56px)">
        {props.children}
      </Flex>
      <Footer />
    </Flex>
  )
}
