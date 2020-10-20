import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Flex, Link as ChakraLink } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'

export const TaskLayout = ({ type, metadata, children }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <PageLayout>
        <div className="flex my-8 flex-col flex-grow w-full max-w-full sm:max-w-6xl mx-auto">
          <div className="flex items-center justify-center flex-grow">
            <h2 className="font-bold leading-5 text-xl sm:text-4xl">
              Loading tasks...
            </h2>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (type === 'null') {
    return (
      <PageLayout>
        <div className="flex my-8 flex-col flex-grow w-full max-w-full sm:max-w-6xl mx-auto">
          <div className="flex items-center justify-center flex-grow">
            <h2 className="font-bold leading-5 text-xl sm:text-4xl">
              Task not found
            </h2>
          </div>
        </div>
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
            <h2 className="font-semibold text-xl sm:text-3xl">
              {metadata.title}
            </h2>
          </Flex>

          <Flex
            justify={['space-around', 'flex-start']}
            textAlign={['end', 'unset']}
            mx={[6, 0]}
            mt={[0, 2]}
            color="gray.500"
          >
            <Link href="/tasks/[...id]" as={`/tasks/${metadata.id}`} passHref>
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
              passHref
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
            <Link
              href="/tasks/[...id]"
              as={`/tasks/${metadata.id}/solution`}
              passHref
            >
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
