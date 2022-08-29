import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

function useRequireAdmin() {
  const { data: session } = useSession()

  const router = useRouter()

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!session && typeof session != 'undefined') {
      router.push(`/login`)
    } else if (session && !session.user.admin) {
      router.push(`/`)
    }
  }, [session, router])

  return session
}

export default useRequireAdmin
