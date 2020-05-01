import React from 'react'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa'

import { Flex, Box, Link as ChakraLink, Text } from '@chakra-ui/core'

export const Submitted = ({ submissionID }) => (
  <Flex align="center" justify="center" height="100%">
    <Box textAlign="center">
      <Box as={FaCheck} size={24}></Box>
      <Text mt={2} fontSize="lg">
        Your submission ID is{' '}
        <Link href={`/submissions/${submissionID}`}>
          <ChakraLink href={`/submissions/${submissionID}`}>
            #{submissionID}
          </ChakraLink>
        </Link>
      </Text>
    </Box>
  </Flex>
)
