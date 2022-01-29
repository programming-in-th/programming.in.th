import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PageLayout } from 'components/Layout'

const Index = () => {
  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-6xl">PROGRAMMING.IN.TH</p>
        {session ? (
          <div>
            Signed in as {session.user.name} <br />
          </div>
        ) : (
          <div>
            Not signed in <br />
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default Index
