import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'
import { Loading } from './Loading'

import classNames from 'classnames'

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
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
