import React, { Fragment, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'

import { useAuth } from 'lib/auth'

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

  const { user, signout } = useAuth()

  return (
    <Popover as="header" className="relative">
      <div className="py-3 bg-white">
        <nav
          className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-14"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              <div className="flex items-center -mr-2 md:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
                <Link href={item.href} key={item.name}>
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
          {user ? (
            <div className="hidden py-1 md:block">
              <Image
                width="32px"
                height="32px"
                className="inline-block w-8 h-8 rounded-full"
                src={
                  user.photoURL === ''
                    ? '/assets/img/default-user.png'
                    : `${user.photoURL}`
                }
                alt="User Image"
                onClick={signout}
              />
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/login">
                <a className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
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
          className="absolute inset-x-0 top-0 p-2 transition origin-top transform md:hidden"
        >
          <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                  <span className="sr-only">Close menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
                  <Link href={item.href} key={item.name}>
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
              <div className="px-5 mt-6">
                <Link href="/login">
                  <a className="block w-full px-4 py-3 font-medium text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-700">
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
