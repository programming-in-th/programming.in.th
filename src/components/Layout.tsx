import React, { useState } from 'react'

import { useUser } from './UserContext'
import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout = ({ children }) => {
  const { user } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col min-h-screen">
        <Nav />
        {children}
      </main>
      <Footer />
    </div>
  )
}
