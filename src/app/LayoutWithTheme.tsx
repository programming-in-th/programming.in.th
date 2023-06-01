'use client'

import { FC, PropsWithChildren } from 'react'

import { usePathname } from 'next/navigation'

import clsx from 'clsx'

export const LayoutWithTheme: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'w-full overflow-hidden font-display',
        pathname === '/'
          ? 'bg-prog-gray-100 dark:bg-slate-900'
          : 'bg-white dark:bg-slate-800'
      )}
    >
      {children}
    </div>
  )
}
