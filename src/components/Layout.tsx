import React from 'react'

import { useUser } from './UserContext'
import { Footer } from './Footer'
import { Nav } from './Nav'

export const PageLayout: React.FunctionComponent = (props) => {
  const { user } = useUser()

  return (
    <div
      className={`flex-col min-h-screen ${
        user.user === undefined ? 'hidden' : 'flex'
      }`}
    >
      <Nav />
      <div className="flex flex-auto flex-col">{props.children}</div>
      <Footer />
    </div>
  )
}
