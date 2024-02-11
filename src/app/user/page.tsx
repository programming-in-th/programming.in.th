import { Metadata } from 'next'

import { LoginGitHub } from '@/components/Login/GitHub'
import { LoginGoogle } from '@/components/Login/Google'
import { Unauthorized } from '@/components/Unauthorized'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

import { DisplayName } from './DisplayName'

export const metadata: Metadata = {
  title: 'User Dashboard - programming.in.th'
}

export default async function User() {
  const user = await getServerUser()

  if (!user || !user.id) return <Unauthorized />

  const pUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id
    },
    include: {
      accounts: true
    }
  })

  const linkedToGoogle = pUser.accounts.some(
    account => account.provider === 'google'
  )

  const linkedToGitHub = pUser.accounts.some(
    account => account.provider === 'github'
  )

  return (
    <div className="flex min-h-screen flex-col justify-center gap-8 pb-44 sm:px-6 lg:px-8">
      <h2 className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500 dark:text-prog-gray-100">
        User Dashboard
      </h2>

      <DisplayName initialName={user.name ?? ''} />

      <div className="px-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col gap-6 bg-white px-4 py-2 dark:bg-slate-800 sm:rounded-lg sm:px-10">
          <LoginGoogle type={linkedToGoogle ? 'linked' : 'link'} />
          <LoginGitHub type={linkedToGitHub ? 'linked' : 'link'} />
        </div>
      </div>
    </div>
  )
}
