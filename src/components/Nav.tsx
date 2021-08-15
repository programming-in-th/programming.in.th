import React, { Fragment, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { useUser } from 'components/UserContext'

import firebase from 'lib/firebase'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Submissions', href: '/submissions' },
  { name: 'Learn', href: '/learn' },
]

export const Nav = () => {
  const router = useRouter()

  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { user, userDispatch } = useUser()

  return (
    <Popover as="header" className="relative">
      <div className="bg-white py-3">
        <nav
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-14"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:flex md:ml-10">
              {navigation.map((item) => (
                <Link href={item.href}>
                  <a
                    key={item.name}
                    className={`text-base font-medium hover:text-gray-600 ${
                      `/${location}` == item.href
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          {user.user ? (
            <div className="py-1 hidden md:block">
              <img
                className="inline-block h-8 w-8 rounded-full"
                src={
                  user.user.photoURL === ''
                    ? '/assets/img/default-user.png'
                    : `${user.user.photoURL}`
                }
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
              />
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/login">
                <a className="inline-flex items-center px-4 py-2 text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                  Login
                </a>
              </Link>
            </div>
          )}
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                  <span className="sr-only">Close menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link href={item.href}>
                    <a
                      key={item.name}
                      className={`block px-3 py-2 rounded-md text-base font-sm ${
                        `/${location}` == item.href
                          ? 'text-gray-700 bg-gray-200'
                          : 'text-gray-400'
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="mt-6 px-5">
                <Link href="/login">
                  <a className="block text-center w-full py-3 px-4 rounded-md shadow text-white font-medium bg-gray-600 hover:bg-gray-700">
                    Login
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
