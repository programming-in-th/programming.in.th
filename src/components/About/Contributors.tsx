import { useState, useEffect } from 'react'

import axios from 'axios'

import { ContributorCard } from '@/components/About/ContributorCard'
import { GithubMemberProps } from '@/types/GithubMemberProps'

export const Contributor = () => {
  const [coreTeam, setCoreTeam] = useState<GithubMemberProps[]>([])
  const [initializedCoreTeam, setInitializedCoreTeam] = useState<boolean>(false)
  const [contributors, setContributors] = useState<GithubMemberProps[]>([])
  const [initializedContributors, setInitializedContributors] =
    useState<boolean>(false)

  useEffect(() => {
    ;(async function fetchContributors() {
      if (!initializedCoreTeam) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/orgs/programming-in-th/public_members'
          )
          setCoreTeam(data)
        } catch (err) {
          console.log(err)
        }
      }
      setInitializedCoreTeam(true)
      if (!initializedContributors) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/repos/programming-in-th/programming.in.th/contributors'
          )

          setContributors(
            data.filter(value => !coreTeam.some(v => v.login === value.login))
          )
        } catch (err) {
          console.log(err)
        }
      }
      setInitializedContributors(true)
    })()
  }, [coreTeam, initializedContributors, initializedCoreTeam])

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Collaborator</h1>
      <div className="flex w-full justify-center">
        <div className="inline-block text-center">
          {contributors.map((contributor, index) => (
            <ContributorCard
              username={contributor.login}
              image={contributor.avatar_url}
              url={contributor.html_url}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
