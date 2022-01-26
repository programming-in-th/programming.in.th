import React from 'react'
import { SubmissionsList } from 'components/submissions/SubmissionsList'
import { PageLayout } from 'components/Layout'

const Submissions = () => {
  return (
    <PageLayout>
      <div className="flex flex-grow justify-center py-4">
        <div className="w-full max-w-4xl">
          <p className="text-3xl font-bold">Submissions</p>
          <SubmissionsList />
        </div>
      </div>
    </PageLayout>
  )
}

export default Submissions
