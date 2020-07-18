import React from 'react'

import { useUser } from './UserContext'
import { Flex, Divider, Box, Link as ChakraLink, Text } from '@chakra-ui/core'
import { Footer } from './Footer'
import { Nav } from './Nav'

interface IPageLayoutProps {
  hideNav?: boolean
  bg?: string
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  const { user } = useUser()

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      bg={props.bg}
      display={user.user === undefined ? 'none' : 'flex'}
    >
      <Box width="100%" backgroundColor="black">
        <Box
          maxWidth={['100%', '480px', '700px', '768px', '1024px']}
          color="white"
          backgroundColor="black"
          margin="0 auto"
          py={4}
        >
          <Text margin="0 auto" fontWeight="600">
            Switch to old version at{' '}
            <ChakraLink
              href="https://old.programming.in.th"
              target="_blank"
              rel="noreferrer noopener"
            >
              old.programming.in.th
            </ChakraLink>
          </Text>
        </Box>
      </Box>

      <Nav></Nav>
      <Divider m={0}></Divider>
      <Flex as="main" flex="auto" direction="column" minH="calc(100vh - 56px)">
        {props.children}
      </Flex>
      <Footer bg={props.bg}></Footer>
    </Flex>
  )
}

PageLayout.defaultProps = {
  hideNav: false,
}
