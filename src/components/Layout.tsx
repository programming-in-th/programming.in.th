import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const backgroundColor = useMemo(() => {
    switch (`/${location}`) {
      case '/':
        return '#F8FAFC'
      default:
        return '#FFFFFF'
    }
  }, [location])

  return (
    <div style={{ backgroundColor }} className="font-display w-full">
      <Nav />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </div>
  )
}
