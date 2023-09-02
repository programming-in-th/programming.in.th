'use client'

import Link from 'next/link'

import { useLocation } from '@/lib/useLocation'

import { links } from './links'
import { PopoverButton } from '../useClientMirror'

export const DesktopLinks = () => {
  const location = useLocation()

  return (
    <>
      {links.map(item => (
        <Link
          href={item.href}
          key={item.name}
          className={`text-sm font-medium ${
            `/${location}` == item.href
              ? 'text-prog-primary-500 hover:text-blue-600'
              : 'text-prog-gray-500 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}

export const MobileLinks = () => {
  const location = useLocation()

  return (
    <>
      {links.map(item => (
        <PopoverButton
          as={Link}
          href={item.href}
          key={item.name}
          className={`font-sm block rounded-md px-5 py-2 text-base ${
            `/${location}` == item.href
              ? 'bg-gray-200 text-gray-700 dark:bg-slate-500 dark:text-prog-gray-100'
              : 'text-gray-400 dark:text-gray-300'
          }`}
        >
          {item.name}
        </PopoverButton>
      ))}
    </>
  )
}
