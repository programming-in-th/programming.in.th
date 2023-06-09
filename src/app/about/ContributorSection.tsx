import Link from 'next/link'

import { ContributorCard } from './ContributorCard'
import { Contributor } from './types'

export const ContributorSection = ({
  contributors
}: {
  contributors: Contributor[]
}) => {
  if (contributors.length === 0) {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Contributors</h1>
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
      <h1 className="text-2xl font-bold text-gray-600 dark:text-white">
        Contributors
      </h1>
      <div className="flex w-full justify-center">
        <div className="inline-block text-center">
          {contributors.map(
            (contributor, index) =>
              contributor.login &&
              contributor.avatar_url &&
              contributor.html_url && (
                <ContributorCard
                  key={index}
                  login={contributor.login}
                  avatar_url={contributor.avatar_url}
                  html_url={contributor.html_url}
                />
              )
          )}
        </div>
      </div>
    </div>
  )
}
