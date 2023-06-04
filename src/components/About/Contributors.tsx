import { useState, useEffect } from 'react'

import axios from 'axios'

import { ContributorCard } from '@/components/About/ContributorCard'

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

export const Contributor = () => {
  const [contributors, setContributors] = useState<GithubMemberProps[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    ;(async function fetchAPI() {
      if (!initialized) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/repos/programming-in-th/programming.in.th/contributors'
          )

          setContributors(data)
        } catch (err) {
          console.log(err)
        }
      }
      setInitialized(true)
    })()
  }, [initialized])

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Contributors</h1>
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
