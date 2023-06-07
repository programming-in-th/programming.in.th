import { useState, useEffect } from 'react'

import axios from 'axios'
import Link from 'next/link'

import { CollaboratorCard } from '@/components/About/CollaboratorCard'
import { GithubMemberProps } from '@/types/GithubMemberProps'

export const Collaborator = () => {
  const [coreTeam, setCoreTeam] = useState<GithubMemberProps[]>([])
  const [initializedCoreTeam, setInitializedCoreTeam] = useState<boolean>(false)
  const [collaborators, setCollaborators] = useState<GithubMemberProps[]>([])
  const [initializedCollaborators, setInitializedCollaborators] =
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
      if (!initializedCollaborators) {
        try {
          const { data }: { data: GithubMemberProps[] } = await axios.get(
            'https://api.github.com/repos/programming-in-th/programming.in.th/contributors'
          )

          setCollaborators(
            data.filter(value => !coreTeam.some(v => v.login === value.login))
          )
        } catch (err) {
          console.log(err)
        }
      }
      setInitializedCollaborators(true)
    })()
  }, [coreTeam, initializedCollaborators, initializedCoreTeam])

  if (collaborators.length === 0) {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Collaborators</h1>
        <p className="text-gray-500 dark:text-gray-200">
          สามารถร่วมพัฒนาได้ที่{' '}
          <span>
            <Link href="https://github.com/programming-in-th/programming.in.th">
              github.com/programming-in-th/programming.in.th
            </Link>
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Collaborators</h1>
      <div className="flex w-full justify-center">
        <div className="inline-block text-center">
          {collaborators.map((contributor, index) => (
            <CollaboratorCard
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
