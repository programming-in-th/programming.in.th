import React from 'react'
import styled from '@emotion/styled'
import { Flex, Box, Text, Link } from '@chakra-ui/core'

import { Normal } from './Submit/Normal'
import { Comm } from './Submit/Comm'
import { OutputOnly } from './Submit/OutputOnly'

import { ITask } from '../../@types/task'

const PDF = styled.object`
  width: 100%;
  height: 100%;
`

export const Statement = ({ metadata }) => {
  const renderSubmit = (metadata: ITask) => {
    switch (metadata.type) {
      case 'normal':
        return <Normal metadata={metadata}></Normal>

      case 'communication':
        return <Comm metadata={metadata}></Comm>

      case 'output-only':
        return <OutputOnly metadata={metadata}></OutputOnly>
    }
  }

  return (
    <Flex direction={['column', 'row']} height="100%" flexGrow={1}>
      <Flex mt={4} mx={[4, 0]} flex="2 1 50%" direction="column">
        <Box height="100%">
          <PDF
            data={`https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/${metadata?.id}.pdf`}
          >
            <Text>
              Your browser doesn't support embed PDF viewer please{' '}
              <Link
                isExternal
                href={`https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/${metadata?.id}.pdf`}
                rel="noopener noreferrer"
                target="_blank"
                color="teal.600"
              >
                download Statement
              </Link>
            </Text>
          </PDF>
        </Box>
      </Flex>

      <Flex mt={4} mx={[4, 0]} flex="2 1 50%" direction="column">
        {renderSubmit(metadata)}
      </Flex>
    </Flex>
  )
}
