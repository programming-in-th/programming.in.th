import Image from 'next/image'
import Link from 'next/link'

import { FaGithub } from 'react-icons/fa'

import CoreTeamData from '@/data/CoreTeam.json'

export const CoreTeam = () => {
  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
      {CoreTeamData.map((member, index) => (
        <div key={index} className="my-4 flex w-1/4 flex-col">
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
              {member.name}
            </p>
            <Link href={`https://github.com/${member.github}`}>
              <FaGithub size={25} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
