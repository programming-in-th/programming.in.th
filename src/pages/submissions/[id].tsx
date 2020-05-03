import React, { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import dynamic from 'next/dynamic'
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
  Button
} from '@chakra-ui/core'

import { useUser } from '../../components/UserContext'
import { PageLayout } from '../../components/Layout'
import { fetchFromFirebase } from '../../utils/fetcher'
import { IGroup } from '../../@types/group'
import { IStatus } from '../../@types/status'
import { Table, Th, Td, Tr } from '../../components/submissions/VerdictTable'

const CodeDisplay = dynamic(
  () => import('../../components/Code').then(mod => mod.CodeDisplay),
  {
    ssr: false
  }
) as any

type TPlot = {
  [key: string]: string
}

const mapLanguage: TPlot = {
  'c++': 'text/x-csrc',
  c: 'text/x-csrc',
  python: 'python'
}

const SubmissionDetail: NextPage = () => {
  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  const { data: submission } = useSWR(
    ['getDetailedSubmissionData', id],
    (type, id) => fetchFromFirebase(type, { submissionID: id })
  )

  const { codeTheme: theme } = useUser()

  const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0)

  return (
    <PageLayout>
      <Flex
        align="center"
        justify="center"
        width="100%"
        p={[4, 8]}
        flexGrow={1}
      >
        <Box
          borderRadius={6}
          width="1000px"
          maxWidth="100%"
          boxShadow="var(--shadow-md)"
          p={4}
        >
          {submission ? (
            <Box>
              <Box>
                <Heading fontSize="2xl">
                  [{submission.task.id}] {submission.task.title}
                </Heading>
                <Link href={`/tasks/${submission.task.id}`}>
                  <ChakraLink href={`/tasks/${submission.task.id}`}>
                    Statement
                  </ChakraLink>
                </Link>
                <p>Points: {submission.points}</p>
                <p>Submission time: {submission.humanTimestamp}</p>
                <p>User: {submission.username}</p>
              </Box>

              {submission.code !== '' ? (
                <React.Fragment>
                  <Box mt={4}>
                    {submission.task.type !== 'normal' &&
                      submission.task.fileName.map((name, index) => (
                        <Button
                          key="name"
                          onClick={() => setCurrentCodeIndex(index)}
                          ml={index > 0 ? 4 : 0}
                        >
                          {name}
                        </Button>
                      ))}
                  </Box>

                  <CodeDisplay
                    options={{
                      mode: `${mapLanguage[submission.language]}`,
                      theme: `${theme}`,
                      lineNumbers: true,
                      foldGutter: true,
                      gutters: [
                        'CodeMirror-linenumbers',
                        'CodeMirror-foldgutter'
                      ],
                      lineWrapping: true
                    }}
                    onBeforeChange={(editor, data, value) => {}}
                    value={submission.code[currentCodeIndex]}
                  />
                  {submission.groups && (
                    <Accordion defaultIndex={[]} allowMultiple>
                      {submission.groups.map((group: IGroup, index) => {
                        return (
                          <AccordionItem>
                            <AccordionHeader>
                              <Box flex="1" textAlign="left">
                                Subtasks #{index + 1} [{group.score}/
                                {group.fullScore}]
                              </Box>
                              <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4} overflow="scroll">
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
                                  {group.status.map(
                                    (status: IStatus, index) => (
                                      <Tr
                                        correct={status.verdict === 'Correct'}
                                      >
                                        <Td>{index + 1}</Td>
                                        <Td>{status.verdict}</Td>
                                        <Td>{status.time} ms</Td>
                                        <Td>{status.memory} kB</Td>
                                        <Td>{status.message}</Td>
                                      </Tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </AccordionPanel>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  )}
                </React.Fragment>
              ) : (
                <Heading>Code Hidden</Heading>
              )}
            </Box>
          ) : (
            <Box>
              <Skeleton height="20px" width="40%" my="10px" />
              <Skeleton height="20px" width="25%" my="10px" />
              <Skeleton height="20px" width="25%" my="10px" />
              <Skeleton height="20px" my="10px" />
              <Skeleton height="20px" width="90%" my="10px" />
            </Box>
          )}
        </Box>
      </Flex>
    </PageLayout>
  )
}

export default SubmissionDetail
