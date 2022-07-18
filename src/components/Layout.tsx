import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  const { pathname } = useRouter()

  const backgroundColor = useMemo(() => {
    switch (pathname) {
      case '/':
        return '#F8FAFC'
      default:
        return '#FFFFFF'
    }
  }, [pathname])

  return (
    <div style={{ backgroundColor }} className="font-display w-full">
      <Nav />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </div>
  )
}
