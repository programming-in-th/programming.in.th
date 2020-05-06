import React, { useState, useEffect } from 'react'
import { renderMarkdown } from '../utils/renderMarkdown'
import { Flex, Textarea, Box, Heading, Button } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { Solution } from '../components/tasks/Solution'
import { fetch } from '../lib/fetch'
import { saveAs } from 'file-saver'

export default () => {
  const [solution, setSolution] = useState<string>('')
  const [input, setInput] = useState<string>('')
  useEffect(() => {
    try {
      const sol = renderMarkdown(input)
      setSolution(sol)
    } catch (err) {
      setSolution('Markdown Rendering Error')
    }
  }, [input])

  const handleClick = () => {
    var blob = new Blob([input], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'output.md')
  }

  return (
    <PageLayout>
      <Heading mx="auto" my={6}>
        Rendering
      </Heading>
      <Flex direction={['column', 'row']} height="100%" flexGrow={1} mx={6}>
        <Textarea
          onChange={(event) => setInput(event.target.value)}
          minHeight="700px"
          w="100%"
          mx={[0, 10]}
        />
        <Box w={['100%', 800]}>
          {input ? (
            <Solution solution={solution}></Solution>
          ) : (
            <Solution solution="Solution will show up here"></Solution>
          )}
        </Box>
      </Flex>
      <Button onClick={handleClick} borderRadius="0" variantColor="green">
        Save Markdown
      </Button>
    </PageLayout>
  )
}
