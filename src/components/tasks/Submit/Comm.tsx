import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Button, Select, Text, Box, useToast } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { config } from '../../../config'

export const Comm = ({ metadata }) => {
  const toast = useToast()
  const { user } = useUser()
  const router = useRouter()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status,
    submissionID
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
        isClosable: true
      })
    }
  }, [status, submissionID])

  return (
    <Flex direction="column" px={4}>
      <Flex direction="column">
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

        <Flex>
          <Select
            mt={8}
            width="120px"
            size="sm"
            defaultValue={config.languageData[0][0]}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setLanguage(event.target.value)
            }
          >
            {config.languageData.map((data: string[]) => (
              <option key={data[0]} value={data[0]}>
                {data[1]}
              </option>
            ))}
          </Select>

          <Button
            ml={8}
            size="sm"
            mt={8}
            width="200px"
            onClick={submit}
            isDisabled={user === null}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
