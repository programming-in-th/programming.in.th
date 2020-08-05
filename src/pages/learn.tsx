import React from 'react'
import { Text, Flex } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'

const LearnPage = () => (
  <PageLayout>
    <Flex align="center" justify="center" flexGrow={1}>
      <Text fontSize="6xl" fontWeight="800" textAlign="center">
        Coming Soon
      </Text>
    </Flex>
  </PageLayout>
)

export default LearnPage
