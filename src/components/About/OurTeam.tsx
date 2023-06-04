import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import axios from 'axios'
import { FaGithub } from 'react-icons/fa'

interface GithubMemberProps {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  contributions: number
}

export const OurTeam = () => {
  const [members, setMembers] = useState<GithubMemberProps[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    ;(async function fetchAPI() {
      if (!initialized) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/repos/programming-in-th/programming.in.th/contributors'
          )

          setMembers(data)
        } catch (err) {
          console.log(err)
        }
      }
      setInitialized(true)
    })()
  }, [initialized])

  return (
    <section className="min-h-screen w-full bg-gray-50 dark:bg-slate-700">
      <h1 className="mt-20 text-2xl font-bold text-gray-600 dark:text-white">
        Our team
      </h1>
      <p className="text-gray-500 dark:text-gray-200">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
        {members
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((member, index) => (
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
                <Link href={`https://github.com/${member.login}`}>
                  <FaGithub size={25} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
