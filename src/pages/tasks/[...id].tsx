import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Flex, Link as ChakraLink, Heading, Text } from '@chakra-ui/core'
import { mutate } from 'swr'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { PageLayout } from 'components/Layout'
import { Statement } from 'components/tasks/Statement'
import { Solution } from 'components/tasks/Solution'

import { renderMarkdown } from 'lib/renderMarkdown'

import db from 'lib/firebase-admin'

export default ({ type, metadata, id }) => {
  const router = useRouter()

  useEffect(() => {
    const key = `${config.baseURL}/getSubmissions?offset=0&username=&taskID=${metadata.id}`
    mutate(key, SWRfetch(key))
  }, [])

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

  if (type === 'null') {
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

  const category = metadata?.path.split('/')

  const RenderPage = () => {
    switch (type) {
      case 'statement':
        return <Statement metadata={metadata}></Statement>

      case 'solution':
        return <Solution solution={metadata.solution}></Solution>

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
        w={['100%', type === 'solution' ? 800 : 1200]}
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
            <Link href="/tasks/[...id]" as={`/tasks/${id}`}>
              <ChakraLink
                mt={[2, 0]}
                lineHeight="18px"
                color={type === 'statement' ? 'gray.800' : 'gray.500'}
              >
                Statement
              </ChakraLink>
            </Link>
            <ChakraLink
              mt={[2, 0]}
              ml={[0, 6]}
              lineHeight="18px"
              color={type === 'statistics' ? 'gray.800' : 'gray.500'}
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
            <Link href="/tasks/[...id]" as={`/tasks/${id}/solution`}>
              <ChakraLink
                mt={[2, 0]}
                ml={[0, 6]}
                lineHeight="18px"
                color={type === 'solution' ? 'gray.800' : 'gray.500'}
              >
                Solution
              </ChakraLink>
            </Link>
          </Flex>
        </Flex>
        <RenderPage />
      </Flex>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const paths = []

  for (const doc of taskDocs.docs) {
    const id = doc.id
    paths.push({ params: { id: [id] } })
    const solutionRes = await fetch(
      `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${id}.md`
    )

    if (solutionRes.status === 200) {
      paths.push({ params: { id: [id, 'solution'] } })
    }
  }

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let metadata: any = {}

  const path = params.id
  const id = path[0]

  const taskDoc = await db().doc(`tasks/${id}`).get()

  const exist = taskDoc.exists
  let type = exist === false ? 'null' : path[1] ? path[1] : 'statement'

  if (type === 'statement') {
    const data = taskDoc.data()
    if (data) {
      data.id = taskDoc.id
      metadata = data.visible ? data : {}
      if (data.visible === false) {
        type = 'null'
      }
    }
  }

  if (type === 'solution') {
    const solutionRes = await fetch(
      `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${metadata.id}.md`
    )

    if (solutionRes.status === 200) {
      const solution = await solutionRes.text()
      metadata.solution = await renderMarkdown(solution)
    } else {
      metadata.solution = null
    }
  }

  return {
    props: {
      type,
      metadata,
      id,
    },
    unstable_revalidate: 60,
  }
}
