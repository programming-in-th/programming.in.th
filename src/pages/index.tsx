import React from 'react'
import { Flex, Heading } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'

export default () => (
  <PageLayout>
    <Flex align="center" justify="center" flexGrow={1}>
      <Heading fontSize={['2xl', '6xl']} fontWeight="800" textAlign="center">
        PROGRAMMING.IN.TH
      </Heading>
    </Flex>
  </PageLayout>
)
