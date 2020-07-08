import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { cache, useSWRInfinite } from 'swr'
import { Box, Flex, Button, Input } from '@chakra-ui/core'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { ISubmissionList } from '../../@types/submission'

import { Td, Table, Th, Tr, TdHide } from 'components/submissions/ListTable'

import { arrToObj } from 'utils/arrToObj'
import { insertQueryString } from 'utils/insertQueryString'
import { isObjectEmpty } from 'utils/isEmpty'
import { getTimestamp } from 'utils/getTimestamp'

export const SubmissionsList = ({ id: taskFrom }) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [task, setTask] = useState('')

  useEffect(() => {
    setUsername((router.query.username as string) || '')
    if (taskFrom === undefined) {
      setTask((router.query.task as string) || '')
    }
  }, [router.query])

  useEffect(() => {
    if (taskFrom) {
      setTask(taskFrom)
    }
  }, [])

  const Submissions = () => {
    const pageSize = 10
    const preload = 1
    const { data, error, size, setSize } = useSWRInfinite(
      (index, previousData) => {
        return `${config.baseURL}/getSubmissions?limit=${pageSize}&next=${
          previousData ? previousData.next : ''
        }&username=${username}&taskID=${task}`
      },
      SWRfetch
    )

    const [key, setKey] = useState<string>('')
    const [ipage, setIpage] = useState<number>(0)

    useEffect(() => {
      if (data) {
        const _key = `pagination@${username}-${task}`
        if (key !== _key) {
          setKey(_key)
          if (!cache.has(_key)) {
            cache.set(_key, 1)
          }
          const pageLength = cache.get(_key)
          if (size !== pageLength + preload) {
            setSize((size) => pageLength + preload)
          }
          setIpage(pageLength)
        }
      }
    }, [data])

    const isLoadingInitialData = !data && !error
    const isLoadingMore =
      isLoadingInitialData || (data && typeof data[ipage - 1] === 'undefined')
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.next === null)
    const isReachingEndF = isEmpty || (data && data[ipage - 1]?.next === null)

    return (
      <React.Fragment>
        <Box
          mt={4}
          boxShadow="var(--shadow-default)"
          borderRadius={4}
          width="1000px"
          maxW="100%"
          overflowX="auto"
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

            <tbody>
              {data &&
                data
                  .slice(0, ipage)
                  .map(
                    (submissions: {
                      data: ISubmissionList[]
                      next: string
                    }) => {
                      return submissions.data.map(
                        (submission: ISubmissionList) => {
                          const TdLink = ({ children }) => {
                            return (
                              <Td>
                                <Link
                                  href="/submissions/[id]"
                                  as={`/submissions/${submission.submissionID}`}
                                >
                                  <a>
                                    <Box h="100%" w="100%" padding="8px 16px">
                                      {children}
                                    </Box>
                                  </a>
                                </Link>
                              </Td>
                            )
                          }
                          return (
                            <React.Fragment key={submission.submissionID}>
                              {isObjectEmpty(submission) ? (
                                <Tr>
                                  <TdHide colSpan={7} />
                                </Tr>
                              ) : (
                                <Tr>
                                  <TdLink>
                                    {getTimestamp(submission.timestamp)}
                                  </TdLink>
                                  <TdLink>{submission.username}</TdLink>
                                  <TdLink>{submission.taskID}</TdLink>
                                  <TdLink>{submission.score}</TdLink>
                                  <TdLink>
                                    {
                                      arrToObj(config.languageData)[
                                        submission.language
                                      ]
                                    }
                                  </TdLink>
                                  <TdLink>{submission.time}</TdLink>
                                  <TdLink>{submission.memory}</TdLink>
                                </Tr>
                              )}
                            </React.Fragment>
                          )
                        }
                      )
                    }
                  )}
            </tbody>
          </Table>
        </Box>
        <Button
          onClick={() => {
            if (!isReachingEnd) {
              setSize((size) => size + 1)
            }
            if (!isReachingEndF) {
              cache.set(key, cache.get(key) + 1)
              setIpage(cache.get(key))
            }
          }}
          isLoading={isLoadingMore}
          isDisabled={isReachingEndF || isLoadingMore}
          mt={4}
          width="100%"
        >
          {isReachingEndF ? 'No more submission' : 'Load more'}
        </Button>
      </React.Fragment>
    )
  }

  return (
    <Flex px={4} mt={4} direction="column">
      <Flex maxW="100%" direction={['column', 'row']}>
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value)
            insertQueryString('username', event.target.value)
          }}
          value={username}
          placeholder="Username"
          width="200px"
        />
        {taskFrom === undefined && (
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

      <Submissions />
    </Flex>
  )
}
