import React from 'react'
import Highlight, { Prism } from 'prism-react-renderer'

import { Flex, Box } from '@chakra-ui/core'

export interface CodeBlockProps {
  code: string
  language: 'c' | 'cpp' | 'python'
}

export const Code = ({ code, language }: CodeBlockProps) => {
  return (
    <Highlight Prism={Prism} code={code} language={language as any}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <Flex
          as="pre"
          overflowY="auto"
          style={{ ...style }}
          fontSize="13.6px !important"
          className={`language-${language}`}
        >
          <code className={`language-${language}`}>
            {tokens.map((line, i) => (
              <Box
                as="tr"
                key={i}
                {...getLineProps({ line, key: i })}
                display="table-row"
              >
                <Box
                  as="td"
                  key={i + 'l'}
                  color="gray.400"
                  pr={2}
                  width={8}
                  display="table-cell"
                  userSelect="none"
                >
                  {i + 1}
                </Box>
                <Box display="table-cell" as="td">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </Box>
              </Box>
            ))}
          </code>
        </Flex>
      )}
    </Highlight>
  )
}
