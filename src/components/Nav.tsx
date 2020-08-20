import React, { useState } from 'react'
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
} from '@chakra-ui/core'
import { useWindowSize } from 'react-use'
import { FiMenu, FiX } from 'react-icons/fi'

import firebase from 'lib/firebase'

import { useUser } from './UserContext'

interface IMenu {
  key: string
  name: string
  path: string
}

const leftMenu: IMenu[] = [
  { key: 'home', name: 'Home', path: '/' },
  { key: 'tasks', name: 'Tasks', path: '/tasks' },
  { key: 'submissions', name: 'Submissions', path: '/submissions' },
  { key: 'learn', name: 'Learn', path: '/learn' },
]

const rightMenu: IMenu[] = [
  { key: 'signup', name: 'Sign Up', path: '/signup' },
  { key: 'login', name: 'Login', path: '/login' },
]

const generateMenuItems = (menu: IMenu[], pathname: string) => {
  const location = pathname.split('/')[1]

  return menu.map((i) => (
    <Link href={i.path} key={i.key}>
      <a
        className={`hover:underline mt-2 sm:mt-0 ml-0 sm:ml-6 leading-6 ${
          `/${location}` === i.path ? 'text-gray-800' : 'text-gray-500'
        }`}
        href={i.path}
      >
        {i.name}
      </a>
    </Link>
  ))
}

export const Nav = () => {
  const [isNavOpen, setNavState] = useState(false)
  const { width } = useWindowSize()

  const { user, loading, userDispatch } = useUser()
  const router = useRouter()

  return (
    <header>
      <div className="mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl py-4">
        <div className="flex sm:hidden px-6 flex-row justify-between items-center">
          <div className="font-extrabold text-black">PROGRAMMING.IN.TH</div>

          {isNavOpen ? (
            <div className="w-6 h-6" onClick={() => setNavState(false)}>
              <FiX />
            </div>
          ) : (
            <div className="w-6 h-6" onClick={() => setNavState(true)}>
              <FiMenu />
            </div>
          )}
        </div>

        {(isNavOpen || width > 480) && (
          <nav className="flex pr-6 sm:pr-0 flex-col sm:flex-row justify-start sm:justify-between items-end sm:items-start font-medium">
            <div className="flex items-end sm:items-baseline justify-end flex-col sm:flex-row text-right sm:text-left">
              <div className="font-extrabold text-black hidden sm:block">
                PROGRAMMING.IN.TH
              </div>

              {generateMenuItems(leftMenu, router.pathname)}
            </div>

            <div>
              {(user.user !== null && loading === true) ||
              user.user === undefined ? (
                <div className="flex mt-4 sm:mt-0 items-end sm:items-baseline flex-col sm:flex-row">
                  Loading...
                </div>
              ) : user.user !== null ? (
                <Menu>
                  <MenuButton as={Box}>
                    <Stack isInline mt={[4, 0]}>
                      <Avatar
                        size="xs"
                        src={
                          user.user.photoURL === ''
                            ? '/assets/img/default-user.png'
                            : `${user.user.photoURL}`
                        }
                      />
                      <Text color="gray.500">{user.username}</Text>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem onClick={() => router.push('/setusername')}>
                      Change Username
                    </MenuItem>
                    <MenuDivider></MenuDivider>
                    <MenuItem
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            userDispatch({
                              type: 'LOADING_START',
                            })
                          })
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <div className="flex mt-4 sm:mt-0 items-end sm:items-baseline flex-col sm:flex-row">
                  {generateMenuItems(rightMenu, router.pathname)}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
