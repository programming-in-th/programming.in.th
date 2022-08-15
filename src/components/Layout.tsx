import React, { useMemo } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'

import { Footer } from './Footer'
import { Loading } from './Loading'
import { Nav } from './Nav'
import Head from 'next/head'

export const PageLayout = ({ children }) => {
  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { status } = useSession()

  const backgroundColor = useMemo(() => {
    switch (`/${location}`) {
      case '/':
        return 'bg-prog-gray-100 dark:bg-slate-900'
      default:
        return 'bg-white dark:bg-slate-800'
    }
  }, [location])

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
