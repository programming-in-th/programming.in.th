import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

function useRequireAuth() {
  const { data: session, status } = useSession()

  const router = useRouter()

  // If not authenticated, redirect to login
  // Wait for loading to complete to prevent redirect flashing
  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Return null during loading to prevent flash of wrong content
  return status === 'loading' ? null : session
}

export default useRequireAuth
