import React from 'react'
import { Text, Flex } from '@chakra-ui/core'

import { PageLayout } from '../components/Layout'

export default () => (
  <PageLayout>
    <Flex align="center" justify="center" width="100%">
      <Text fontSize="6xl" fontWeight="800" textAlign="center">
        TASKS
      </Text>
    </Flex>
  </PageLayout>
)
