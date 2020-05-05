import React, { useState, useEffect } from 'react'
import { renderMarkdown } from '../utils/renderMarkdown'
import { Flex, Textarea, Button, Box, Heading } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { Solution } from '../components/tasks/Solution'

export default () => {
  const [solution, setSolution] = useState<string>('')
  const [input, setInput] = useState<string>('')
  useEffect(() => {
    const sol = renderMarkdown(input)
    setSolution(sol)
  }, [input])

  return (
    <PageLayout>
      <Heading mx="auto" my={6}>
        Rendering
      </Heading>
      <Flex direction={['column', 'row']} height="100%" flexGrow={1} mx={6}>
        <Textarea
          onChange={(event) => setInput(event.target.value)}
          h="700px"
          w="100%"
          mx={10}
        />
        <Box w={['100%', 800]}>
          {input ? (
            <Solution solution={solution}></Solution>
          ) : (
            <Solution solution="."></Solution>
          )}
        </Box>
      </Flex>
    </PageLayout>
  )
}
