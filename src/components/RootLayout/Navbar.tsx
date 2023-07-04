'use client'

import { Fragment } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useSession } from 'next-auth/react'

import { Logo, LogoDark } from '@/svg/Logo'

import { DesktopLinks, MobileLinks } from './Links/NavbarLinks'
import { NavbarBox } from './NavbarBox'
import { SignoutButton } from './SignoutButton'
import {
  Popover,
  Transition,
  PopoverButton,
  PopoverPanel
} from './useClientMirror'

export const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <NavbarBox>
      <div className="py-3">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-14"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center justify-between">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/" className="dark:hidden">
                <Logo />
              </Link>
              <Link href="/" className="hidden dark:block">
                <LogoDark />
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <PopoverButton className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white dark:text-white">
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
                </PopoverButton>
              </div>
            </div>
            <div className="hidden items-center space-x-8 md:ml-10 md:flex">
              <DesktopLinks />
              <div className="flex h-10 w-24 items-center space-x-4 pl-2">
                {status === 'loading' && (
                  <div className="h-full w-full animate-pulse rounded-md bg-gray-400" />
                )}
                {status !== 'loading' &&
                  (session?.user ? (
                    <Popover className="relative hidden md:block">
                      <PopoverButton className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent ring-slate-300 transition-colors hover:bg-slate-300 hover:bg-opacity-50 active:ring-1">
                        <Image
                          src={
                            session?.user.image ??
                            '/assets/img/profile/default.svg'
                          }
                          alt={session?.user.name ?? 'Default profile image'}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                          style={{
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                        />
                      </PopoverButton>

                      <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <PopoverPanel className="absolute right-2 z-50 mt-2 rounded-lg bg-white shadow-md dark:bg-slate-800">
                          <div className="flex flex-col border-b border-gray-100 px-8 py-4 text-prog-gray-500 dark:border-slate-900 dark:text-gray-100">
                            <p className="font-medium">
                              {session?.user.username}
                            </p>
                            <p className="font-light">{session?.user.email}</p>
                          </div>

                          <div className="px-8 py-4">
                            <SignoutButton className="text-prog-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-400" />
                          </div>
                        </PopoverPanel>
                      </Transition>
                    </Popover>
                  ) : (
                    <Link
                      href="/login"
                      className="rounded-md bg-prog-primary-500 px-6 py-2 text-base font-medium text-white shadow-md transition-colors hover:bg-prog-primary-600"
                    >
                      Login
                    </Link>
                  ))}
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
        <PopoverPanel
          focus
          className="absolute inset-x-0 top-0 z-50 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 dark:bg-slate-800 dark:drop-shadow-2xl">
            <div className="flex items-center justify-between px-5 pt-4">
              <div className="dark:hidden">
                <Logo />
              </div>
              <div className="hidden dark:block">
                <LogoDark />
              </div>
              <div className="-mr-2">
                <PopoverButton className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600 dark:text-gray-100">
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
                </PopoverButton>
              </div>
            </div>
            <div className="pb-6 pt-5">
              {session?.user && (
                <div className="flex items-center gap-4 p-4">
                  <div>
                    <Image
                      src={
                        session?.user.image ?? '/assets/img/profile/default.svg'
                      }
                      alt={session?.user.name ?? 'Default profile image'}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                      style={{
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>

                  <div className="flex flex-col text-prog-gray-500 dark:text-gray-100">
                    <p className="font-medium">{session?.user.name}</p>
                    <p className="font-light">{session?.user.email}</p>
                  </div>
                </div>
              )}
              <div className="space-y-1 px-2">
                <MobileLinks />
              </div>
              {session?.user ? (
                <div className="mt-6 px-5">
                  <SignoutButton className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700" />
                </div>
              ) : (
                <div className="mt-6 px-5">
                  <Link
                    href="/login"
                    className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </NavbarBox>
  )
}
