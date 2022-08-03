import React, { useMemo } from 'react'

import { useRouter } from 'next/router'

import classNames from 'classnames'
import { useSession } from 'next-auth/react'

import { Footer } from './Footer'
import { Loading } from './Loading'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { status } = useSession()

  const backgroundColor = useMemo(() => {
    switch (`/${location}`) {
      case '/':
        return 'bg-prog-gray-100'
      default:
        return 'bg-white'
    }
  }, [location])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <div className={classNames('w-full font-display', backgroundColor)}>
      <Nav />
      <main className="flex min-h-screen w-screen flex-col">{children}</main>
      <Footer />
    </div>
  )
}
