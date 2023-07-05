import { ReactNode } from 'react'

import { Forbidden } from '@/components/Forbidden'
import { Unauthorized } from '@/components/Unauthorized'
import { getServerUser } from '@/lib/session'

export default async function AdminAuthenticate({
  children
}: {
  children: ReactNode
}) {
  const user = await getServerUser()

  if (!user) {
    return <Unauthorized />
  }

  if (!user.admin) {
    return <Forbidden />
  }

  return <>{children}</>
}
