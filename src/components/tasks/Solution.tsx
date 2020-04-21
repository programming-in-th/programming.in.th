import React from 'react'
import Head from 'next/head'

import { Box, Heading, Flex } from '@chakra-ui/core'
import { MarkDownStyle } from '../../design'

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
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
          integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
          crossOrigin="anonymous"
        />
      </Head>
      <Box
        borderRadius={6}
        boxShadow="var(--shadow-xl)"
        p={4}
        mt={4}
        mx={[4, 'auto']}
        w={['100%', 1400]}
      >
        <MarkDownStyle>
          <div dangerouslySetInnerHTML={{ __html: solution }}></div>
        </MarkDownStyle>
      </Box>
    </React.Fragment>
  )
}
