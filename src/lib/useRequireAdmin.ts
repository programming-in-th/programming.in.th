import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

function useRequireAdmin() {
  const { data: session, status } = useSession()

  const router = useRouter()

  // Redirect based on auth status and admin role
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !session?.user.admin) {
      router.push('/')
    }
  }, [status, session, router])

  return session
}

export default useRequireAdmin
