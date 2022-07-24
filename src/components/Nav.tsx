import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/react'
import { Logo } from '@/vectors/Logo'
import Image from 'next/image'
import classNames from 'classnames'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Learn', href: '/learn' },
  { name: 'About', href: '/about' }
]

export const Nav = () => {
  const router = useRouter()

  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { data: session } = useSession()

  return (
    <Popover
      as="header"
      className={classNames('relative', location !== '' && 'shadow-sm')}
    >
      <div className="py-3">
        <nav
          className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-14"
          aria-label="Global"
        >
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" passHref>
                <a>
                  <Logo />
                </a>
              </Link>
              <div className="flex items-center -mr-2 md:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-transparent rounded-md focus-ring-inset hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
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
            <div className="items-center hidden space-x-8 md:ml-10 md:flex">
              {navigation.map(item => (
                <Link href={item.href} key={item.name} passHref>
                  <a
                    key={item.name}
                    className={`text-sm font-medium ${
                      `/${location}` == item.href
                        ? 'text-prog-primary-500 hover:text-blue-600'
                        : 'text-prog-gray-500 hover:text-gray-600'
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}

              <div className="pl-6">
                {session ? (
                  <Popover className="relative hidden py-1 md:block">
                    <Popover.Button className="flex items-center justify-center w-10 h-10 transition-colors bg-transparent rounded-full hover:bg-slate-300 hover:bg-opacity-50 active:ring-1 ring-slate-300">
                      <Image
                        src={
                          session.user.image ??
                          '/assets/img/profile/default.svg'
                        }
                        alt={session.user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-100 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel className="absolute z-50 mt-2 bg-white rounded-lg shadow-md right-2">
                        <div className="flex flex-col px-8 py-4 border-b border-gray-100 text-prog-gray-500">
                          <p className="font-medium">{session.user.name}</p>
                          <p className="font-light">{session.user.email}</p>
                        </div>

                        <div className="px-8 py-4">
                          <button
                            onClick={() => signOut()}
                            className="text-prog-gray-500 hover:text-gray-700"
                          >
                            Logout
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ) : (
                  <Link href="/login" passHref>
                    <a
                      className={`rounded-md shadow-md px-6 text-white bg-prog-primary-500 transition-colors hover:bg-prog-primary-600 py-2 text-base font-medium`}
                    >
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
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
                <Logo />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-transparent rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
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
              {session && (
                <div className="flex items-center gap-4 p-4">
                  <div>
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>

                  <div className="flex flex-col text-prog-gray-500">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="font-light">{session.user.email}</p>
                  </div>
                </div>
              )}
              <div className="px-2 space-y-1">
                {navigation.map(item => (
                  <Link href={item.href} key={item.name} passHref>
                    <a
                      key={item.name}
                      className={`font-sm block rounded-md px-3 py-2 text-base ${
                        `/${location}` == item.href
                          ? 'bg-gray-200 text-gray-700'
                          : 'text-gray-400'
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              {session ? (
                <div className="px-5 mt-6">
                  <button
                    onClick={() => signOut()}
                    className="block w-full px-4 py-3 font-medium text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-5 mt-6">
                  <Link href="/login" passHref>
                    <a className="block w-full px-4 py-3 font-medium text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-700">
                      Login
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
