import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR, { useSWRPages } from 'swr'
import { Box, Flex, Button, Heading, Input, Text } from '@chakra-ui/core'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { ISubmissionList } from '../../@types/submission'

import { PageLayout } from 'components/Layout'
import { Td, Table, Th, Tr } from 'components/submissions/ListTable'

import { arrToObj } from 'utils/arrToObj'
import { insertQueryString } from 'utils/insertQueryString'

export default () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [task, setTask] = useState('')

  useEffect(() => {
    setUsername((router.query.username as string) || '')
    setTask((router.query.task as string) || '')
  }, [router.query])

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'submission',
    ({ offset, withSWR }) => {
      const { data: submissions } = withSWR(
        useSWR(
          `${config.baseURL}/getSubmissions?offset=${offset || 0}&username=${
            username || ''
          }&taskID=${task || ''}`,
          SWRfetch,
          { errorRetryCount: 3 }
        )
      )

      if (!submissions) {
        return (
          <Tr>
            <td colSpan={7}>
              <Text textAlign={['start', 'center']} p={4}>
                Loading...
              </Text>
            </td>
          </Tr>
        )
      }

      return submissions.map((submission: ISubmissionList) => (
        <React.Fragment key={submission.submissionID}>
          {submission ? (
            <Link href={`/submissions/${submission.submissionID}`}>
              <Tr>
                <Td>{submission.humanTimestamp}</Td>
                <Td>{submission.username}</Td>
                <Td>{submission.taskID}</Td>
                <Td>{submission.score}</Td>
                <Td>{arrToObj(config.languageData)[submission.language]}</Td>
                <Td>{submission.time}</Td>
                <Td>{submission.memory}</Td>
              </Tr>
            </Link>
          ) : (
            <Tr>
              <td colSpan={7}></td>
            </Tr>
          )}
        </React.Fragment>
      ))
    },
    ({ data: submissions }) => {
      return submissions && submissions.length
        ? submissions[submissions.length - 1].id + 1
        : null
    },
    [username, task, router]
  )

  return (
    <PageLayout>
      <Flex justify="center" flexGrow={1} p={4}>
        <Box maxW="100%">
          <Heading>Submissions</Heading>
          <Flex mt={4} maxW="100%" direction={['column', 'row']}>
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value)
                insertQueryString('username', event.target.value)
              }}
              value={username}
              placeholder="Username"
              width="200px"
            />
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTask(event.target.value)
                insertQueryString('task', event.target.value)
              }}
              value={task}
              placeholder="Task"
              width="200px"
              ml={[0, 4]}
              mt={[4, 0]}
            />
          </Flex>
          <Box
            mt={4}
            boxShadow="var(--shadow-default)"
            borderRadius={4}
            width="1000px"
            maxW="100%"
            overflowX="scroll"
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
