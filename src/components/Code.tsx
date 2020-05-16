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
          {tokens.length > 1 && (
            <code>
              {tokens.map((line, i) => (
                <Box key={i + 'l'} color="gray.400" pr={2}>
                  {i + 1}{' '}
                </Box>
              ))}
            </code>
          )}
          <code className={`language-${language}`}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </Flex>
      )}
    </Highlight>
  )
}
