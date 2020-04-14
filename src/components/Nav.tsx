import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Stack,
  Slide,
  theme
} from '@chakra-ui/core'
import { FiMenu, FiX } from 'react-icons/fi'

import firebase from '../lib/firebase'

import { useUser } from './UserContext'
import { useWindowWidth } from '../design/Responsive'

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
    <Link href={i.path} key={i.key}>
      <ChakraLink
        href={i.path}
        mt={[2, 0]}
        ml={[0, 6]}
        lineHeight="18px"
        color={pathname === i.path ? 'gray.800' : 'gray.500'}
      >
        {i.name}
      </ChakraLink>
    </Link>
  ))
}

export const Nav = () => {
  const [isNavOpen, setNavState] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    if (width > 480) {
      setNavState(true)
    }
  }, [width])

  const { user } = useUser()
  const router = useRouter()

  return (
    <Box as="header">
      <Box
        margin="0 auto"
        maxWidth={['100%', '480px', '700px', '768px', '1024px']}
        pt={4}
      >
        <Flex
          px={6}
          direction="row"
          justify="space-between"
          align="center"
          display={['flex', 'none']}
        >
          <Text fontWeight="800" color="black">
            PROGRAMMING.IN.TH
          </Text>

          {isNavOpen ? (
            <Box as={FiX} onClick={() => setNavState(false)} size={6}></Box>
          ) : (
            <Box as={FiMenu} onClick={() => setNavState(true)} size={6}></Box>
          )}
        </Flex>

        {isNavOpen && (
          <Flex
            as="nav"
            pr={[6, 0, 0, 0, 0]}
            direction={['column', 'row', 'row']}
            justify={['', 'space-between']}
            align={['flex-end', '']}
            fontWeight="500"
          >
            <Flex
              align={['flex-end', 'baseline']}
              justify="flex-end"
              direction={['column', 'row']}
              textAlign={['end', 'unset']}
            >
              <Text fontWeight="800" color="black" display={['none', 'unset']}>
                PROGRAMMING.IN.TH
              </Text>

              {generateMenuItems(leftMenu, router.pathname)}
            </Flex>

            <Box>
              {user === undefined ? null : user !== null ? (
                <Menu>
                  <MenuButton as={Box}>
                    <Stack isInline mt={[4, 0]}>
                      <Avatar
                        size="xs"
                        src={
                          user.photoURL === ''
                            ? '/assets/img/default-user.png'
                            : `${user.photoURL}`
                        }
                      />
                      <Text color="gray.500">{user?.displayName}</Text>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuDivider></MenuDivider>
                    <MenuItem onClick={() => firebase.auth().signOut()}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Flex
                  mt={[4, 0]}
                  align={['flex-end', 'baseline']}
                  direction={['column', 'row']}
                >
                  {generateMenuItems(rightMenu, router.pathname)}
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
