import React from 'react'

import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
