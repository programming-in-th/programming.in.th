import React from 'react'
import { Text, Flex } from '@chakra-ui/core'

import { PageLayout } from '../components/Layout'

export default () => (
  <PageLayout>
    <Flex align="center" justify="center" width="100%">
      <Text fontSize={['4xl', '6xl']} fontWeight="600" textAlign="center">
        404 | Not Found
      </Text>
    </Flex>
  </PageLayout>
)
