import React from 'react'
import Highlight, { Prism } from 'prism-react-renderer'

import { Flex, Box, Button, useClipboard } from '@chakra-ui/core'
;((typeof global !== 'undefined' ? global : window) as any).Prism = Prism

require('prismjs/components/prism-rust')

export interface CodeBlockProps {
  code: string
  language: string
}

export const Code = ({ code, language }: CodeBlockProps) => {
  const { onCopy, hasCopied } = useClipboard(code)

  return (
    <Box position="relative" zIndex={0}>
      <Highlight Prism={Prism} code={code} language={language as any}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <Flex
            as="pre"
            overflowY="auto"
            style={{ ...style }}
            fontSize="13.6px !important"
            className={`language-${language}`}
            w="100%"
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
      <Button
        size="sm"
        position="absolute"
        textTransform="uppercase"
        fontSize="xs"
        height="24px"
        top={4}
        right="1.25em"
        onClick={onCopy}
      >
        {hasCopied ? 'copied' : 'copy'}
      </Button>
    </Box>
  )
}
