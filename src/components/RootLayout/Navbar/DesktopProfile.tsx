'use client'

import { Fragment } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Popover, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'

import { SignoutButton } from '../SignoutButton'

export const DesktopProfile = () => {
  const { status, data: session } = useSession()

  return (
    <div className="flex h-10 w-24 items-center space-x-4 pl-2">
      {status === 'loading' && (
        <div className="h-full w-full animate-pulse rounded-md bg-gray-400" />
      )}
      {status !== 'loading' &&
        (session?.user ? (
          <Popover className="relative hidden md:block">
            <Popover.Button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent ring-slate-300 transition-colors hover:bg-slate-300 hover:bg-opacity-50 active:ring-1">
              <Image
                src={session?.user.image ?? '/assets/img/profile/default.svg'}
                alt={session?.user.name ?? 'Default profile image'}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
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
              <Popover.Panel className="absolute right-2 z-50 mt-2 rounded-lg bg-white shadow-md dark:bg-slate-800">
                <div className="flex flex-col border-b border-gray-100 px-8 py-4 text-prog-gray-500 dark:border-slate-900 dark:text-gray-100">
                  <p className="font-medium">{session?.user.username}</p>
                  <p className="font-light">{session?.user.email}</p>
                </div>

                <div className="px-8 py-4">
                  <SignoutButton className="text-prog-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-400" />
                </div>
              </Popover.Panel>
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
  )
}
