'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useSession } from 'next-auth/react'

import { MobileLinks } from '../Links/NavbarLinks'
import { SignoutButton } from '../SignoutButton'
import { PopoverButton } from '../useClientMirror'

export const MobileProfile = () => {
  const { data: session } = useSession()

  return (
    <div className="pb-6 pt-5">
      {session?.user && (
        <div className="flex items-center gap-4 p-4">
          <div>
            <Image
              src={session?.user.image ?? '/assets/img/profile/default.svg'}
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
        <div className="mt-6 flex flex-col gap-4 px-5">
          <PopoverButton as={Link} href="/user">
            <button className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700">
              User Settings
            </button>
          </PopoverButton>

          <SignoutButton className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700" />
        </div>
      ) : (
        <div className="mt-6 px-5">
          <PopoverButton as={Link} href="/login">
            <button className="block w-full rounded-md bg-gray-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700">
              Login
            </button>
          </PopoverButton>
        </div>
      )}
    </div>
  )
}
