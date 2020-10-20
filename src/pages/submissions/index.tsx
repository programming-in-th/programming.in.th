import React from 'react'

import { SubmissionsList } from 'components/submissions/SubmissionsList'
import { PageLayout } from 'components/Layout'

const Submissions = () => {
  return (
    <PageLayout>
      <div className="flex justify-center flex-grow py-4">
        <div className="max-w-full">
          <h2 className="px-4 font-bold leading-5 text-xl sm:text-4xl">
            Submissions
          </h2>
          <SubmissionsList id={undefined} />
        </div>
      </div>
    </PageLayout>
  )
}

export default Submissions
