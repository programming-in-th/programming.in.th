import React, { Fragment, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Submissions', href: '/submissions' },
  { name: 'Learn', href: '/learn' }
]

export const Nav = () => {
  const router = useRouter()

  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Popover as="header" className="relative">
      <div className="bg-white py-3">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-14"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
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
            <div className="hidden space-x-8 md:ml-10 md:flex">
              {navigation.map(item => (
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
          {session ? (
            <div className="hidden py-1 md:block">
              <button
                onClick={() => signOut()}
                className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/login">
                <a className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700">
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
          className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <p className="font-extrabold">PROGRAMMING.IN.TH</p>
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
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
              <div className="space-y-1 px-2">
                {navigation.map(item => (
                  <Link href={item.href} key={item.name}>
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
              <div className="mt-6 px-5">
                <Link href="/login">
                  <a className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700">
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
