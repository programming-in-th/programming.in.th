import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Flex, Link as ChakraLink, Heading, Text } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'
import { Statement } from 'components/tasks/Statement'
import { Solution } from 'components/tasks/Solution'

import { renderMarkdown } from 'lib/renderMarkdown'
import { isObjectEmpty } from 'utils/isEmpty'

import db from 'lib/firebase-admin'

type pageIndex = 'statement' | 'statistics' | 'solution'

export default ({ metadata, solution }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <PageLayout>
        <Flex
          my={8}
          direction="column"
          flexGrow={1}
          w={['100%', 1400]}
          mx="auto"
        >
          <Flex align="center" justify="center" flexGrow={1}>
            <Heading>Loading tasks...</Heading>
          </Flex>
        </Flex>
      </PageLayout>
    )
  }

  if (isObjectEmpty(metadata)) {
    return (
      <PageLayout>
        <Flex
          my={8}
          direction="column"
          flexGrow={1}
          w={['100%', 1400]}
          mx="auto"
        >
          <Flex align="center" justify="center" flexGrow={1}>
            <Heading>Task not found</Heading>
          </Flex>
        </Flex>
      </PageLayout>
    )
  }

  const [currentPage, setCurrentPage] = useState<pageIndex>('statement')

  const category = metadata?.path.split('/')

  const renderPage = (currentPage: pageIndex) => {
    switch (currentPage) {
      case 'statement':
        return <Statement metadata={metadata}></Statement>

      case 'solution':
        return <Solution solution={solution}></Solution>

      default:
        return <Statement metadata={metadata}></Statement>
    }
  }

  return (
    <PageLayout>
      <Flex
        my={8}
        direction="column"
        flexGrow={1}
        w={['100%', currentPage === 'solution' ? 800 : 1200]}
        mx="auto"
        transition="width 1s"
      >
        <Flex direction="column">
          <Flex align="baseline" mx={[6, 0]}>
            <Heading fontWeight="600" fontSize={['xl', '3xl']}>
              {metadata?.title}
            </Heading>
            <Text color="gray.600" ml={2}>
              by {category[1]}
            </Text>
          </Flex>

          <Flex
            justify={['space-between', 'flex-start']}
            textAlign={['end', 'unset']}
            mx={[6, 0]}
            mt={[0, 2]}
            color="gray.500"
          >
            <ChakraLink
              mt={[2, 0]}
              lineHeight="18px"
              color={currentPage === 'statement' ? 'gray.800' : 'gray.500'}
              onClick={() => setCurrentPage('statement')}
            >
              Statement
            </ChakraLink>
            <ChakraLink
              mt={[2, 0]}
              ml={[0, 6]}
              lineHeight="18px"
              color={currentPage === 'statistics' ? 'gray.800' : 'gray.500'}
              onClick={() => setCurrentPage('statistics')}
            >
              Statistics
            </ChakraLink>
            <Link
              href={{ pathname: '/submissions', query: { task: metadata.id } }}
            >
              <ChakraLink
                mt={[2, 0]}
                ml={[0, 6]}
                lineHeight="18px"
                href={`/submissions?task=${metadata.id}`}
              >
                Submissions
              </ChakraLink>
            </Link>
            <ChakraLink
              mt={[2, 0]}
              ml={[0, 6]}
              lineHeight="18px"
              color={currentPage === 'solution' ? 'gray.800' : 'gray.500'}
              onClick={() => setCurrentPage('solution')}
            >
              Solution
            </ChakraLink>
          </Flex>
        </Flex>
        {renderPage(currentPage)}
      </Flex>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const result: string[] = []

  for (const doc of taskDocs.docs) {
    result.push(doc.id)
  }

  return {
    paths: result.map((id: string) => {
      return { params: { id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  let metadata: any = {}

  const taskDoc = await db().doc(`tasks/${id}`).get()
  const data = taskDoc.data()

  if (data) {
    data.id = taskDoc.id
    metadata = data.visible ? data : {}
  }

  const solutionRes = await fetch(
    `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${metadata.id}.md`
  )

  let renderedSolution = null

  if (solutionRes.status === 200) {
    const solution = await solutionRes.text()
    renderedSolution = await renderMarkdown(solution)
  }

  return {
    props: {
      metadata,
      solution: renderedSolution,
    },
    unstable_revalidate: 60,
  }
}
