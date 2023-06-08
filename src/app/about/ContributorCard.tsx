import Image from 'next/image'
import Link from 'next/link'

import { GitHubUser } from './types'

export const ContributorCard = ({
  login,
  avatar_url,
  html_url
}: GitHubUser) => {
  return (
    <div className="m-2 inline-block rounded-lg bg-white p-2 shadow-md hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700">
      <Link
        className="no-underline"
        target="_blank"
        rel="noopener noreferrer"
        href={html_url}
      >
        <div className="flex flex-row items-center">
          <div className="relative">
            <Image
              alt={login}
              className="mr-3 rounded-full object-cover"
              width={30}
              height={30}
              src={avatar_url}
            />
          </div>
          <p className="text-xl">{login}</p>
        </div>
      </Link>
    </div>
  )
}
