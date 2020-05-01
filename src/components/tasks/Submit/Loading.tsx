import React from 'react'
import { Flex, Box, Spinner, Text } from '@chakra-ui/core'

export const Loading = () => (
  <Flex align="center" justify="center" height="100%">
    <Box textAlign="center">
      <Spinner size="xl"></Spinner>
      <Text mt={2}>Submitting</Text>
    </Box>
  </Flex>
)
