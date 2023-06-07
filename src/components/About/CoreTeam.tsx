import { useState, useEffect } from 'react'
import axios from 'axios'

import { GithubMemberProps } from '@/types/GithubMemberProps'

import { CoreTeamCard } from '@/components/About/CoreTeamCard'

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
        <CoreTeamCard
          avatar_url={member.avatar_url}
          html_url={member.html_url}
          login={member.login}
          key={index}
        />
      ))}
    </div>
  )
}
