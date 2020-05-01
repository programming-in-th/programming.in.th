import React from 'react'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

import { Flex, Box, Link as ChakraLink, Text } from '@chakra-ui/core'

export const Error = ({ taskID }) => (
  <Flex align="center" justify="center" height="100%">
    <Box textAlign="center">
      <Box as={FaExclamationTriangle} size={24}></Box>
      <Text mt={2} fontSize="lg">
        An error occured
      </Text>
      <Link href={`/tasks/${taskID}`}>
        <ChakraLink href={`/tasks/${taskID}`}>Try again?</ChakraLink>
      </Link>
    </Box>
  </Flex>
)
