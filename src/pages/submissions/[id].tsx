import React, { useState, useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import useSWR from 'swr'

import {
  Skeleton,
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/core'
import { FaRedo } from 'react-icons/fa'

import { PageLayout } from 'components/Layout'
import { Table, Th, Td, Tr } from 'components/submissions/VerdictTable'
import { Code } from 'components/Code'

import { useUser } from 'components/UserContext'

import firebase from 'lib/firebase'

import { fetchFromFirebase } from 'utils/fetcher'
import { getTimestamp } from 'utils/getTimestamp'

import { IGroup } from '../../@types/group'
import { IStatus } from '../../@types/status'
import { ISubmission } from '../../@types/submission'
import { isObjectEmpty } from 'utils/isEmpty'

import { config } from 'config'

const SubmissionDetail: NextPage = () => {
  const mapLanguage = useMemo(() => {
    return config.languageData.reduce(
      (o, item) => Object.assign(o, { [item[0]]: item[2] }),
      {}
    )
  }, [])

  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  const { data: submission, mutate } = useSWR<ISubmission>(
    ['getSubmission', id],
    (type, id) => fetchFromFirebase(type, { submissionID: id })
  )

  const { user } = useUser()

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .doc(`submissions/${id}`)
      .onSnapshot((doc) => {
        const data = doc.data()
        mutate(async (oldSubmission: ISubmission) => {
          return { ...oldSubmission, ...data }
        })
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0)

  if (isObjectEmpty(submission)) {
    return (
      <PageLayout>
        <Flex
          align="center"
          justify="center"
          width="100%"
          p={[4, 8]}
          flexGrow={1}
        >
          <Heading>Submission doesn't exist</Heading>
        </Flex>
      </PageLayout>
    )
  }

  const rejudgeSubmission = async () => {
    await fetchFromFirebase('rejudgeSubmission', { submissionID: id })
  }

  return (
    <PageLayout>
      <Flex align="top" justify="center" width="100%" p={[4, 8]}>
        <Box
          borderRadius={6}
          width="1000px"
          maxWidth="100%"
          boxShadow="var(--shadow-md)"
          p={4}
        >
          {submission && submission.task && submission.status ? (
            <Box>
              <Box>
                <Flex align="center" justify="space-between">
                  <Heading fontSize="2xl">
                    [{submission.task.id}] {submission.task.title}
                  </Heading>
                  {user.admin && (
                    <IconButton
                      aria-label="rejudge"
                      icon={FaRedo}
                      onClick={() => rejudgeSubmission()}
                    />
                  )}
                </Flex>
                <Link
                  href="/tasks/[...id]"
                  as={`/tasks/${submission.task.id}`}
                  passHref
                >
                  <ChakraLink color="teal.600">Statement</ChakraLink>
                </Link>
                <Box mt={2}>
                  <Text fontWeight={600}>Status: {submission.status}</Text>
                  <Text>
                    Score: {submission.score}/{submission.fullScore}
                  </Text>
                  <Text>Time: {submission.time} ms</Text>
                  <Text>Memory: {submission.memory} KB</Text>
                  <Text>
                    Submitted at: {getTimestamp(submission.timestamp)}
                  </Text>
                  <Text>User: {submission.username}</Text>
                </Box>
              </Box>

              <Box mt={4}>
                {submission.task.type !== 'normal' &&
                  submission.task.fileName.map((name, index) => (
                    <Button
                      key={name}
                      onClick={() => setCurrentCodeIndex(index)}
                      ml={index > 0 ? 4 : 0}
                      size="sm"
                    >
                      {name}
                    </Button>
                  ))}
              </Box>
              <Box mt={4}>
                <Code
                  code={submission.code[currentCodeIndex]}
                  language={mapLanguage[submission.language]}
                />
              </Box>
              {submission.groups && (
                <Accordion defaultIndex={[]} allowMultiple>
                  {submission.groups.map((group: IGroup, index) => {
                    return (
                      <AccordionItem key={index}>
                        <AccordionHeader>
                          <Box flex="1" textAlign="left">
                            Subtasks #{index + 1} [{group.score}/
                            {group.fullScore}]
                          </Box>
                          <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel pb={4} overflow="auto">
                          <Table>
                            <thead>
                              <tr>
                                <Th>#</Th>
                                <Th>Verdict</Th>
                                <Th>Time</Th>
                                <Th>Memory</Th>
                                <Th>Message</Th>
                              </tr>
                            </thead>

                            <tbody>
                              {group.status.map((status: IStatus, index) => (
                                <Tr
                                  correct={status.verdict === 'Correct'}
                                  key={index}
                                >
                                  <Td>{index + 1}</Td>
                                  <Td>{status.verdict}</Td>
                                  <Td>{status.time} ms</Td>
                                  <Td>{status.memory} kB</Td>
                                  <Td>{status.message}</Td>
                                </Tr>
                              ))}
                            </tbody>
                          </Table>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              )}
            </Box>
          ) : (
            <Box>
              <Skeleton height="25px" width="40%" />
              <Skeleton height="14px" width="10%" mt="10px" />
              <Skeleton height="14px" width="10%" mt="20px" />
              <Skeleton height="14px" width="10%" mt="10px" />
              <Skeleton height="14px" width="20%" mt="10px" />
              <Skeleton height="14px" width="40%" mt="10px" />
              <Skeleton height="14px" width="15%" mt="10px" />
              <Skeleton height="600px" mt="20px" />
            </Box>
          )}
        </Box>
      </Flex>
    </PageLayout>
  )
}

export default SubmissionDetail
