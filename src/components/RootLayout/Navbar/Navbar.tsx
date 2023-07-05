import { Fragment } from 'react'

import Link from 'next/link'

import { Logo, LogoDark } from '@/svg/Logo'

import { DesktopProfile } from './DesktopProfile'
import { MobileProfile } from './MobileProfile'
import { NavbarBox } from './NavbarBox'
import { DesktopLinks } from '../Links/NavbarLinks'
import { Transition, PopoverButton, PopoverPanel } from '../useClientMirror'

export const Navbar = () => {
  return (
    <NavbarBox>
      {/* Desktop */}
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
              <DesktopProfile />
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile */}
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

            <MobileProfile />
          </div>
        </PopoverPanel>
      </Transition>
    </NavbarBox>
  )
}
