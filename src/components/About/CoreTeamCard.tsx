import Image from 'next/image'
import Link from 'next/link'

import { GitHubLogo } from '@/svg/Socials'

interface CoreTeamCardProps {
  avatar_url: string
  html_url: string
  login: string
  key: number
}

export const CoreTeamCard = (member: CoreTeamCardProps) => {
  return (
    <div className="my-4 flex w-1/4 flex-col">
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
