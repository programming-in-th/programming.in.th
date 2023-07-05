'use client'

import { useMemo } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from './links'

export const FooterLinks = () => {
  const pathname = usePathname()
  const location = useMemo(() => {
    return pathname.split('/')[1]
  }, [pathname])

  return (
    <>
      {links.map(item => (
        <Link
          href={item.href}
          key={item.name}
          className={`${
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
