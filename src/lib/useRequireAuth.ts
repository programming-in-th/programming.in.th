import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

function useRequireAuth() {
  const { data: session, status } = useSession()

  const router = useRouter()
  // If not authenticated, redirect to login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  return session
}

export default useRequireAuth
