import React from 'react'
import { fetch } from '../../lib/fetch'
import { Box, Flex, Button, Heading } from '@chakra-ui/core'
import useSWR, { useSWRPages } from 'swr'
import { config } from '../../config'

import { PageLayout } from '../../components/Layout'
import { Td, Table, Th, Tr } from '../../components/submissions/ListTable'
import { ISubmissionList } from '../../@types/submission'

export default () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'submission',
    ({ offset, withSWR }) => {
      const { data: submissions } = withSWR(
        useSWR(`${config.baseURL}/getSubmissions?offset=${offset || 0}`, fetch)
      )

      if (!submissions) {
        return null
      }

      return submissions.map((submission: ISubmissionList) => (
        <Tr>
          <Td>{submission.humanTimestamp}</Td>
          <Td>{submission.username}</Td>
          <Td>{submission.taskTitle}</Td>
          <Td>{submission.points}</Td>
          <Td>{submission.language}</Td>
          <Td>{submission.time}</Td>
          <Td>{submission.memory}</Td>
        </Tr>
      ))
    },
    ({ data: submissions }) => {
      return submissions && submissions.length
        ? submissions[submissions.length - 1].id + 1
        : null
    },
    []
  )

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1} p={4}>
        <Box>
          <Heading>Submissions</Heading>
          <Box
            mt={4}
            boxShadow="var(--shadow-default)"
            borderRadius={4}
            width="1000px"
            borderBottom="1px solid #E2E8F0"
          >
            <Table>
              <thead>
                <tr>
                  <Th>SUBMISSION TIME</Th>
                  <Th>USERNAME</Th>
                  <Th>TASK</Th>
                  <Th>POINTS</Th>
                  <Th>LANGUAGE</Th>
                  <Th>TIME</Th>
                  <Th>MEMORY</Th>
                </tr>
              </thead>

              <tbody>{pages}</tbody>
            </Table>
          </Box>
          <Button
            onClick={loadMore}
            isLoading={isLoadingMore}
            isDisabled={isReachingEnd || isLoadingMore}
            mt={4}
            width="100%"
          >
            {isLoadingMore
              ? '. . .'
              : isReachingEnd
              ? 'No more submission'
              : 'Load more'}
          </Button>
        </Box>
      </Flex>
    </PageLayout>
  )
}
