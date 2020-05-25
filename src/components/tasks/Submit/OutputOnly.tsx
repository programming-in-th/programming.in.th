import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Flex, Button, Text, Box, useToast, Heading } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'

export const OutputOnly = ({ metadata }) => {
  const toast = useToast()
  const { user } = useUser()
  const router = useRouter()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    status,
    submissionID,
  } = useSubmit(metadata)

  useEffect(() => {
    if (status === 'OK') {
      router.push(`/submissions/${submissionID}`)
    } else if (status === 'ERROR') {
      toast({
        title: 'Error!',
        description: 'An unknown error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [status, submissionID])

  return (
    <Flex direction="column" mt={4} p={4} boxShadow="var(--shadow-default)">
      <Heading fontSize="xl" fontWeight="600">
        Submit
      </Heading>
      <Flex direction="column" mt={2}>
        <Box>
          {metadata.fileName.map((name, i) => (
            <Box key={name} mt={i === 0 ? 0 : 8}>
              <Text>File: {name}</Text>
              <Flex align="baseline">
                <UploadCode
                  index={i}
                  codeFile={codeFile}
                  setCodeFile={setCodeFile}
                  onDrop={onDrop(i)}
                  multiple={false}
                />
                {codeFile[i] ? (
                  <Text ml={4} fontSize="sm">
                    {codeFile[i]?.name}
                  </Text>
                ) : (
                  <Text ml={4} fontSize="sm">
                    No file chosen
                  </Text>
                )}
              </Flex>
            </Box>
          ))}
        </Box>

        <Button
          size="sm"
          mt={4}
          width="200px"
          onClick={submit}
          isDisabled={user.user === null}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
