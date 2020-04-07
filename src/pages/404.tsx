import React from 'react'
import { Text, Flex } from '@chakra-ui/core'

import { PageLayout } from '../components/Layout'

export default () => (
  <PageLayout>
    <Flex align="center" justify="center" width="100%">
      <Text fontSize={['36px', '72px']} fontWeight="800" textAlign="center">
        404 | Not found
      </Text>
    </Flex>
  </PageLayout>
)
