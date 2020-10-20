import React, { useState } from 'react'
import { saveAs } from 'file-saver'

import { Textarea, Box, Button } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'
import { Solution } from 'components/tasks/Solution'
import { renderMarkdown } from 'lib/renderMarkdown'

const Render = () => {
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
      <div className="flex-col sm:flex-row justify-between mx-16">
        <div className="w-full my-4">
          <h2 className="font-bold leading-5 text-xl sm:text-4xl">Rendering</h2>
        </div>
        <div className="w-full mt-8">
          <Button onClick={refetch}>Compile</Button>
        </div>
      </div>
      <div className="flex-col sm:flex-row h-full flex-grow mx-10">
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
      </div>
      <Button onClick={genMarkdownFile} borderRadius="0" h={20} fontSize="lg">
        Save Markdown
      </Button>
    </PageLayout>
  )
}

export default Render
