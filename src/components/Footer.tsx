import React from 'react'
import { Box, Flex, Link, List, ListItem, Text } from '@chakra-ui/core'

export const Footer = ({ bg }) => (
  <Box bg={bg} as="footer" borderTop="1px solid #EDF2F7" color="gray.600">
    <Box margin="0 auto" p={6}>
      <Flex width="100%" direction={['column', 'row']} justify="space-around">
        <Box maxWidth={['100%', '25%']}>
          <Text fontWeight="800" color="gray.500">
            PROGRAMMING.IN.TH
          </Text>
          <Text fontFamily="heading">
            ยินดีต้อนรับสู่โปรแกรมมิ่งอินทีเอช ศูนย์รวมของโจทย์และเนื้อหาสำหรับ
            การเขียนโปรแกรมเพื่อการแข่งขัน และวิทยาการคอมพิวเตอร์
          </Text>

          <Box mt={2} display={['none', 'block']}>
            <Text fontSize="xs">
              © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
            </Text>
            <Text fontSize="xs">
              The source code for this website is available on{' '}
              <Link
                href="https://github.com/programming-in-th"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Text>
          </Box>
        </Box>

        <Box mt={[2, 0]}>
          <Text fontWeight="600">Resources</Text>
        </Box>

        <Box mt={[2, 0]}>
          <Text fontWeight="600">Archives</Text>
        </Box>

        <Box mt={[2, 0]}>
          <Text fontWeight="600">About</Text>
        </Box>

        <Box mt={[2, 0]}>
          <Text fontWeight="600">Contact</Text>
        </Box>
      </Flex>

      <Box fontSize="xs" textAlign="center" mt={4}>
        <Box mt={2} display={['block', 'none']}>
          <Text fontSize="xs">
            © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
          </Text>
          <Text fontSize="xs">
            The source code for this website is available on{' '}
            <Link
              href="https://github.com/programming-in-th"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Text>
        </Box>
        <Box mt={[2, 0]}>
          <Text>Made with ♥ by PROGRAMMING.IN.TH team</Text>
        </Box>
      </Box>
    </Box>
  </Box>
)
