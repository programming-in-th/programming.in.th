import Image from 'next/image'
import Link from 'next/link'

import { GitHubLogo } from '@/svg/Socials'

import { GitHubUser } from './types'

export const CoreTeamCard = (member: GitHubUser) => {
  return (
    <div className="my-4 flex w-1/2 flex-col sm:w-1/3 lg:w-1/4">
      <div className="relative h-[300px]">
        <Image
          alt={member.avatar_url}
          src={member.avatar_url}
          fill
          className="rounded-xl object-cover shadow-md"
        />
      </div>
      <div className="text-left">
        <p className="mt-2 text-xl font-bold text-gray-600 dark:text-white">
          {member.login}
        </p>
        <Link href={member.html_url}>
          <GitHubLogo className="text-[#64748B] dark:text-gray-100" />
        </Link>
      </div>
    </div>
  )
}
