import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

function useRequireAdmin() {
  const { data: session, status } = useSession()

  const router = useRouter()

  // Redirect based on auth status and admin role
  // Wait for loading to complete to prevent redirect flashing
  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !session?.user.admin) {
      router.push('/')
    }
  }, [status, session, router])

  // Return null during loading to prevent flash of wrong content
  return status === 'loading' ? null : session
}

export default useRequireAdmin
