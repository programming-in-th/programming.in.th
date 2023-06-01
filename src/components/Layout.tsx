'use client'
import React, { useMemo } from 'react'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  const pathname = usePathname()

  const backgroundColor = useMemo(() => {
    const location = pathname?.split('/')[1]

    return `/${location}` === `/`
      ? 'bg-prog-gray-100 dark:bg-slate-900'
      : 'bg-white dark:bg-slate-800'
  }, [pathname])

  return (
    <div
      className={clsx('w-full overflow-hidden font-display', backgroundColor)}
    >
      <Head>
        <title>PROGRAMMING.IN.TH | β</title>
      </Head>
      {/* @ts-expect-error 🐐🐐🐐 */}
      <Nav />
      <main className="flex min-h-screen w-screen flex-col">{children}</main>
      {/* @ts-expect-error 🐐🐐🐐 */}
      <Footer />
    </div>
  )
}
