import React from 'react'
import { Text, Flex } from '@chakra-ui/core'

import { PageLayout } from '../components/Layout'

export default () => (
  <PageLayout>
    <Flex align="center" justify="center" flexGrow={1}>
      <Text fontSize="6xl" fontWeight="800" textAlign="center">
        404 | Not Found
      </Text>
    </Flex>
  </PageLayout>
)
