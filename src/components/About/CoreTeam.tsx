import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import axios from 'axios'

import { FaGithub } from 'react-icons/fa'

import { GithubMemberProps } from '@/types/GithubMemberProps'

export const CoreTeam = () => {
  const [coreTeam, setCoreTeam] = useState<GithubMemberProps[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    ;(async function fetchAPI() {
      if (!initialized) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/orgs/programming-in-th/public_members'
          )

          setCoreTeam(data)
        } catch (err) {
          console.log(err)
        }
      }
      setInitialized(true)
    })()
  }, [initialized])

  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
      {coreTeam.map((member, index) => (
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
              {member.login}
            </p>
            <Link href={member.html_url}>
              <FaGithub size={25} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
