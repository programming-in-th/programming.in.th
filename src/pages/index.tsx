import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PageLayout } from 'components/Layout'

const Index = () => {
  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="flex h-screen items-center justify-center">
        {session ? (
          <div>
            Signed in as {session.user.email} <br />
          </div>
        ) : (
          <div>
            Not signed in <br />
          </div>
        )}
        <p className="text-6xl">PROGRAMMING.IN.TH</p>
      </div>
    </PageLayout>
  )
}

export default Index
