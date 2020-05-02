import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { fetch } from '../../lib/fetch'
import { Box, Flex, Button, Heading, Input, Text } from '@chakra-ui/core'
import useSWR, { useSWRPages } from 'swr'
import { config } from '../../config'

import { PageLayout } from '../../components/Layout'
import { Td, Table, Th, Tr } from '../../components/submissions/ListTable'
import { ISubmissionList } from '../../@types/submission'

export default () => {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [task, setTask] = useState('')

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'submission',
    ({ offset, withSWR }) => {
      const { data: submissions } = withSWR(
        useSWR(
          `${config.baseURL}/getSubmissions?offset=${offset ||
            0}&displayName=${displayName || ''}&taskID=${task || ''}`,
          fetch,
          { errorRetryCount: 3 }
        )
      )

      if (!submissions) {
        return (
          <Tr>
            <td colSpan={7}>
              <Text textAlign="center" p={4}>
                Loading...
              </Text>
            </td>
          </Tr>
        )
      }

      return submissions.map((submission: ISubmissionList) => (
        <Tr
          onClick={() => router.push(`/submissions/${submission.submissionID}`)}
        >
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
    [displayName, task, router]
  )

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1} p={4}>
        <Box>
          <Heading>Submissions</Heading>
          <Flex mt={4}>
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(event.target.value)
              }
              placeholder="Username"
              width="200px"
            />
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTask(event.target.value)
              }
              placeholder="Task"
              width="200px"
              ml={4}
            />
          </Flex>
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
