import Link from 'next/link'

import { CollaboratorCard } from '@/components/About/CollaboratorCard'
import { GithubMemberProps } from '@/types/GithubMemberProps'

export const Collaborator = ({
  collaborators
}: {
  collaborators: GithubMemberProps[]
}) => {
  if (collaborators && collaborators.length === 0) {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Collaborators</h1>
        <p className="text-xl text-gray-500 dark:text-gray-200">
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
          {collaborators &&
            collaborators.map((contributor, index) => (
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
