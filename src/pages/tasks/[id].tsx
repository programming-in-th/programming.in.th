import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import { Flex, Link as ChakraLink, Heading, Text } from '@chakra-ui/core'

import fetch from 'isomorphic-unfetch'

import { PageLayout } from '../../components/Layout'
import { Statement } from '../../components/tasks/Statement'
import { Solution } from '../../components/tasks/Solution'

import { getProblemIDs } from '../../utils/getProblemIDs'
import { renderMarkdown } from '../../utils/renderMarkdown'
import { useRouter } from 'next/router'

type pageIndex = 'statement' | 'statistics' | 'submissions' | 'solution'

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

  const [currentPage, setCurrentPage] = useState<pageIndex>('statement')

  const category = metadata.path.split('/')

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
      <Flex my={8} direction="column" flexGrow={1} w={['100%', 1400]} mx="auto">
        <Flex direction="column">
          <Flex align="baseline" mx={[6, 0]}>
            <Heading fontWeight="600" fontSize="3xl">
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

            <ChakraLink
              mt={[2, 0]}
              ml={[0, 6]}
              lineHeight="18px"
              color={currentPage === 'submissions' ? 'gray.800' : 'gray.500'}
              onClick={() => setCurrentPage('submissions')}
            >
              Submissions
            </ChakraLink>

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
  const paths = await getProblemIDs()

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const metadata = await fetch(
    `https://asia-east2-proginth.cloudfunctions.net/getProblemMetadata?id=${id}`
  ).then(o => o.json())

  let solution: string

  try {
    solution = await fetch(
      `https://raw.githubusercontent.com/programming-in-th/solutions/master/md/${metadata.id}.md`
    ).then(o => o.text())
  } catch (_) {}

  let renderedSolution: string

  if (solution) {
    renderedSolution = renderMarkdown(solution)
  }

  return {
    props: {
      metadata,
      solution: renderedSolution ? renderedSolution : null
    },
    revalidate: 60 * 60
  }
}
