import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/core'

import { SubmissionsList } from 'components/submissions/SubmissionsList'
import { PageLayout } from 'components/Layout'

export default () => {
  return (
    <PageLayout>
      <Flex justify="center" flexGrow={1} p={4}>
        <Box maxW="100%">
          <Heading>Submissions</Heading>
          <SubmissionsList taskFrom={undefined} />
        </Box>
      </Flex>
    </PageLayout>
  )
}
