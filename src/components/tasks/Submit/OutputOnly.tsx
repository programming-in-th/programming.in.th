import React from 'react'
import { Flex, Button, Text, Box } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { Loading } from './Loading'
import { Submitted } from './Submitted'
import { Error } from './Error'

export const OutputOnly = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    status,
    submissionID
  } = useSubmit(metadata)

  switch (status) {
    case 'WAIT':
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

            <Button
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
      )

    case 'LOADING':
      return <Loading></Loading>

    case 'OK':
      return <Submitted submissionID={submissionID}></Submitted>

    case 'ERROR':
      return <Error taskID={metadata.id}></Error>
  }
}
