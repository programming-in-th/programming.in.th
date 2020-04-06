import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  Link as ChakraLink
} from '@chakra-ui/core'

interface IMenu {
  key: string
  name: string
  path: string
}

const leftMenu: IMenu[] = [
  { key: 'home', name: 'Home', path: '/' },
  { key: 'tasks', name: 'Tasks', path: '/tasks' },
  { key: 'learn', name: 'Learn', path: '/learn' },
  { key: 'contests', name: 'Contests', path: '/contests' }
]

const rightMenu: IMenu[] = [
  { key: 'register', name: 'Register', path: '/register' },
  { key: 'login', name: 'Login', path: '/login' }
]

const generateMenuItems = (menu: IMenu[], pathname: string) => {
  return menu.map(i => (
    <ListItem
      ml={['0', '24px']}
      key={i.key}
      textAlign={['end', 'center']}
      display={['block', 'inline']}
    >
      <Link href={i.path}>
        <ChakraLink
          lineHeight="18px"
          color={pathname === i.path ? 'gray.800' : 'gray.500'}
        >
          {i.name}
        </ChakraLink>
      </Link>
    </ListItem>
  ))
}

export const Nav = () => {
  const router = useRouter()

  return (
    <Box as="header">
      <Box
        margin="0 auto"
        maxWidth={['100%', '480px', '700px', '768px', '1024px']}
        pt="16px"
      >
        <Flex
          as="nav"
          pr={['24px', '0px', '0px', '0px', '0px']}
          direction={['column', 'row', 'row']}
          justify={['', 'space-between']}
          align={['flex-end', '']}
          fontWeight="500"
        >
          <Box>
            <List>
              <ListItem
                textAlign={['end', 'unset']}
                display={['block', 'inline']}
              >
                <Text
                  fontWeight="800"
                  display={['block', 'inline']}
                  color="black"
                >
                  PROGRAMMING.IN.TH
                </Text>
              </ListItem>
              {generateMenuItems(leftMenu, router.pathname)}
            </List>
          </Box>

          <Box>
            <List>{generateMenuItems(rightMenu, router.pathname)}</List>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
