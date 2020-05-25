import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Button, Select, Text, useToast, Heading } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { config } from 'config'

export const Normal = ({ metadata }) => {
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
      <Flex align="baseline" mt={2}>
        <UploadCode
          index={0}
          codeFile={codeFile}
          setCodeFile={setCodeFile}
          onDrop={onDrop(0)}
          multiple={false}
        />
        {codeFile[0] ? (
          <Text ml={4} fontSize="sm">
            {codeFile[0]?.name}
          </Text>
        ) : (
          <Text ml={4} fontSize="sm">
            No file chosen
          </Text>
        )}
      </Flex>
      <Flex mt={4}>
        <Select
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
          isLoading={status === 'LOADING'}
          ml={8}
          size="sm"
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
