import React from 'react'
import Head from 'next/head'

import { Box, Heading, Flex } from '@chakra-ui/core'
import { MarkDownStyle } from 'design'

export const Solution = ({ solution }) => {
  if (!solution) {
    return (
      <Flex align="center" justify="center" flexGrow={1}>
        <Heading>Solution does not exist!</Heading>
      </Flex>
    )
  }

  return (
    <React.Fragment>
      <Box p={[6, 0]} mt={[0, 4]} mx={[0, 'auto']} w={['100%', 800]}>
        <MarkDownStyle>
          <div dangerouslySetInnerHTML={{ __html: solution }}></div>
        </MarkDownStyle>
      </Box>
    </React.Fragment>
  )
}
