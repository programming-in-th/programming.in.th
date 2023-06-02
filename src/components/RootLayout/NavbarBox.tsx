'use client'

import { FC, PropsWithChildren } from 'react'

import { Popover } from '@headlessui/react'
import clsx from 'clsx'

import { useLocation } from '@/lib/useLocation'

/**
 * Style Navbar with bottom shadow on all pages except root
 */
export const NavbarBox: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  return (
    <Popover
      as="header"
      className={clsx('relative', location !== '' && 'shadow-sm')}
    >
      {children}
    </Popover>
  )
}
