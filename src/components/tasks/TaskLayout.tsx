import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Flex, Link as ChakraLink, Heading, Text } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'

export const TaskLayout = ({ type, metadata, children }) => {
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

  if (type === 'null') {
    return (
      <PageLayout>
        <Flex
          mt={8}
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

  return (
    <PageLayout>
      <Flex
        mt={8}
        direction="column"
        w={[
          '100%',
          type === 'solution' ? 800 : type === 'submissions' ? 1000 : 1200,
        ]}
        mx="auto"
        transition="width 1s"
      >
        <Flex direction="column">
          <Flex align="baseline" mx={[6, 0]}>
            <Heading fontWeight="600" fontSize={['xl', '3xl']}>
              {metadata.title}
            </Heading>
            <Text color="gray.600" ml={2}>
              by {metadata.path ? metadata.path.split('/')[1] : ''}
            </Text>
          </Flex>

          <Flex
            justify={['space-around', 'flex-start']}
            textAlign={['end', 'unset']}
            mx={[6, 0]}
            mt={[0, 2]}
            color="gray.500"
          >
            <Link href="/tasks/[...id]" as={`/tasks/${metadata.id}`}>
              <ChakraLink
                mt={[2, 0]}
                lineHeight="18px"
                color={type === 'statement' ? 'gray.800' : 'gray.500'}
              >
                Statement
              </ChakraLink>
            </Link>
            <Link
              href="/tasks/[...id]"
              as={`/tasks/${metadata.id}/submissions`}
            >
              <ChakraLink
                mt={[2, 0]}
                ml={[0, 6]}
                lineHeight="18px"
                color={type === 'submissions' ? 'gray.800' : 'gray.500'}
              >
                Submissions
              </ChakraLink>
            </Link>
            <Link href="/tasks/[...id]" as={`/tasks/${metadata.id}/solution`}>
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
      </Flex>
      <Flex
        mb={8}
        w={[
          '100%',
          type === 'solution' ? 800 : type === 'submissions' ? 1000 : 1200,
        ]}
        direction="column"
        flexGrow={1}
        mx="auto"
      >
        {children}
      </Flex>
    </PageLayout>
  )
}
