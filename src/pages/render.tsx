import React, { useState } from 'react'
import { saveAs } from 'file-saver'

import { Flex, Textarea, Box, Heading, Button } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'
import { Solution } from 'components/tasks/Solution'
import { renderMarkdown } from 'lib/renderMarkdown'

export default () => {
  const [solution, setSolution] = useState<string>('')
  const [input, setInput] = useState<string>('')

  const refetch = async () => {
    try {
      const sol = await renderMarkdown(input)
      setSolution(sol)
    } catch (err) {
      setSolution('Markdown Rendering Error')
    }
  }

  const genMarkdownFile = () => {
    var blob = new Blob([input], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'output.md')
  }

  return (
    <PageLayout>
      <Flex direction={['column', 'row']} justify="space-between" mx={16}>
        <Box w="100%" my={4}>
          <Heading>Rendering</Heading>
        </Box>
        <Box w="100%" mt={8}>
          <Button onClick={refetch}>Compile</Button>
        </Box>
      </Flex>
      <Flex direction={['column', 'row']} height="100%" flexGrow={1} mx={10}>
        <Textarea
          onChange={(event) => setInput(event.target.value)}
          h="calc(100vh - 230px)"
          w="100%"
        />
        <Box
          minW={['100%', 830]}
          maxHeight={['100%', 'calc(100vh - 230px)']}
          overflow="scroll"
        >
          {solution ? (
            <Solution solution={solution} />
          ) : (
            <Solution solution="Solution will show up here" />
          )}
        </Box>
      </Flex>
      <Button onClick={genMarkdownFile} borderRadius="0" h={20} fontSize="lg">
        Save Markdown
      </Button>
    </PageLayout>
  )
}
