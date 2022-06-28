import React from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </div>
  )
}
