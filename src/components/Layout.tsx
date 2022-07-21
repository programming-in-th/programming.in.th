import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'
import { Loading } from './Loading'

export const PageLayout = ({ children }) => {
  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  const backgroundColor = useMemo(() => {
    switch (`/${location}`) {
      case '/':
        return '#F8FAFC'
      default:
        return '#FFFFFF'
    }
  }, [location])

  return (
    <div style={{ backgroundColor }} className="w-full font-display">
      <Nav />
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
