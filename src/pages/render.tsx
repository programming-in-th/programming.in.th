import React, { useState, useEffect } from 'react'
import { renderMarkdown } from '../utils/renderMarkdown'
import { Flex, Textarea, Box, Heading, Button } from '@chakra-ui/core'
import { PageLayout } from '../components/Layout'
import { Solution } from '../components/tasks/Solution'
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
      <Heading mx="auto" my={4}>
        Rendering
      </Heading>
      <Flex direction={['column', 'row']} height="100%" flexGrow={1} mx={10}>
        <Textarea
          onChange={(event) => setInput(event.target.value)}
          h="calc(100vh - 230px)"
          w="100%"
          mr={4}
        />
        <Box
          minW={['100%', 800]}
          maxHeight="calc(100vh - 230px)"
          overflow="scroll"
        >
          {input ? (
            <Solution solution={solution} />
          ) : (
            <Solution solution="Solution will show up here" />
          )}
        </Box>
      </Flex>
      <Button onClick={handleClick} borderRadius="0" h={20} fontSize="lg">
        Save Markdown
      </Button>
    </PageLayout>
  )
}
