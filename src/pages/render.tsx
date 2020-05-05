import React, { useState, useEffect } from 'react'
import { renderMarkdown } from '../utils/renderMarkdown'
import { Textarea, Button, Box, Heading } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { Solution } from '../components/tasks/Solution'

export default () => {
  const [state, setState] = useState<boolean>(false)
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
      {state ? (
        <Solution solution={solution}></Solution>
      ) : (
        <Box p={[6, 0]} mx={[0, 'auto']} w={['100%', 800]}>
          <Textarea
            onChange={(event) => setInput(event.target.value)}
            h="400px"
          />
        </Box>
      )}
      <Button onClick={() => setState(!state)} mt={4} w="200px" mx="auto">
        {state ? 'Go back' : 'Compile'}
      </Button>
    </PageLayout>
  )
}
