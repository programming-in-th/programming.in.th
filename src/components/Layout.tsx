import React from 'react'

import { useUser } from './UserContext'
import { Flex } from '@chakra-ui/core'
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
      display={user === undefined ? 'none' : 'flex'}
    >
      <Nav></Nav>
      <Flex mt={'64px'} as="main" flex="auto">
        {props.children}
      </Flex>
      <Footer bg={props.bg}></Footer>
    </Flex>
  )
}

PageLayout.defaultProps = {
  hideNav: false
}
