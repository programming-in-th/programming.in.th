import React from 'react'
import { Heading } from '@chakra-ui/core'

import { SubmissionsList } from 'components/submissions/SubmissionsList'
import { PageLayout } from 'components/Layout'

const Submissions = () => {
  return (
    <PageLayout>
      <div className="flex justify-center flex-grow py-4">
        <div className="max-w-full">
          <Heading px={4}>Submissions</Heading>
          <SubmissionsList id={undefined} />
        </div>
      </div>
    </PageLayout>
  )
}

export default Submissions
