import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR, { useSWRPages, cache, mutate } from 'swr'
import { Box, Flex, Button, Heading, Input, Text } from '@chakra-ui/core'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'
import { fetchFromFirebase } from 'utils/fetcher'

import { ISubmissionList } from '../../@types/submission'

import { PageLayout } from 'components/Layout'
import { TaskLayout } from 'components/tasks/TaskLayout'
import { Td, Table, Th, Tr, TdHide } from 'components/submissions/ListTable'

import { arrToObj } from 'utils/arrToObj'
import { insertQueryString } from 'utils/insertQueryString'
import { isObjectEmpty } from 'utils/isEmpty'

export default () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [task, setTask] = useState('')
  const [onTask, setOnTask] = useState('')

  useEffect(() => {
    setUsername((router.query.username as string) || '')
    setTask((router.query.task as string) || '')
    setOnTask((router.query.onTask as string) || '')
  }, [router.query])

  const SubmissionsList = useCallback(() => {
    const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
      `submission-${username}-${task}`,
      ({ offset, withSWR }) => {
        const { data: submissions } = withSWR(
          useSWR(
            `${config.baseURL}/getSubmissions?offset=${
              offset || 0
            }&username=${username}&taskID=${task}`,
            SWRfetch
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

        const { results } = submissions

        return results.map((submission: ISubmissionList) => {
          if (
            !(
              isObjectEmpty(submission) ||
              cache.has(['getSubmission', submission.submissionID])
            )
          ) {
            cache.set(['getSubmission', submission.submissionID], null)
            mutate(
              ['getSubmission', submission.submissionID],
              fetchFromFirebase('getSubmission', {
                submissionID: submission.submissionID,
              })
            )
          }
          return (
            <React.Fragment key={submission.submissionID}>
              {isObjectEmpty(submission) ? (
                <Tr>
                  <TdHide colSpan={7} />
                </Tr>
              ) : (
                <Link
                  href="/submissions/[id]"
                  as={`/submissions/${submission.submissionID}`}
                >
                  <Tr>
                    <Td>{submission.humanTimestamp}</Td>
                    <Td>{submission.username}</Td>
                    <Td>{submission.taskID}</Td>
                    <Td>{submission.score}</Td>
                    <Td>
                      {arrToObj(config.languageData)[submission.language]}
                    </Td>
                    <Td>{submission.time}</Td>
                    <Td>{submission.memory}</Td>
                  </Tr>
                </Link>
              )}
            </React.Fragment>
          )
        })
      },
      ({ data: submissions }) => {
        if (submissions.next) {
          const key = `${config.baseURL}/getSubmissions?offset=${submissions.next}&username=${username}&taskID=${task}`
          mutate(key, SWRfetch(key))
        }
        return submissions.next
      },
      []
    )

    return (
      <React.Fragment>
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
          {isReachingEnd ? 'No more submission' : 'Load more'}
        </Button>
      </React.Fragment>
    )
  }, [username, task])

  const ChildSubmission = () => {
    return (
      <React.Fragment>
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
          {onTask !== 'true' && (
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
          )}
        </Flex>
        <SubmissionsList />
      </React.Fragment>
    )
  }

  return onTask === 'true' ? (
    <TaskLayout
      type="submissions"
      metadata={{ id: task, title: 'A+B Problem', path: '/00' }}
    >
      <ChildSubmission />
    </TaskLayout>
  ) : (
    <PageLayout>
      <Flex justify="center" flexGrow={1} p={4}>
        <Box maxW="100%">
          <Heading>Submissions</Heading>
          <ChildSubmission />
        </Box>
      </Flex>
    </PageLayout>
  )
}
