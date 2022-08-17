import React, { useMemo } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'

import { Footer } from './Footer'
import { Loading } from './Loading'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  const router = useRouter()

  const { status } = useSession()

  const backgroundColor = useMemo(() => {
    const location = router.pathname.split('/')[1]

    return `/${location}` === `/`
      ? 'bg-prog-gray-100 dark:bg-slate-900'
      : 'bg-white dark:bg-slate-800'
  }, [location, router])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <div className={clsx('w-full font-display', backgroundColor)}>
      <Head>
        <title>PROGRAMMING.IN.TH | β</title>
      </Head>
      <Nav />
      <main className="flex min-h-screen w-screen flex-col">{children}</main>
      <Footer />
    </div>
  )
}
