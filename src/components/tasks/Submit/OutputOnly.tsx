import React from 'react'
import { Flex, Button, Text, Box, Heading } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useStatus } from './useStatus'
import { useSubmit } from './useSubmit'

export const OutputOnly = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    status,
    submissionID,
    codeValue,
  } = useSubmit(metadata)

  useStatus({ metadata, status, submissionID, codeValue })

  return (
    <div className="flex flex-col mt-4 p-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <p className="font-semibold text-xl">Submit</p>
      <div className="flex flex-col">
        <div>
          {metadata.fileName.map((name, i) => (
            <div className="mt-4">
              <p>File: {name}</p>

              <div className="flex align-baseline items-center mt-1">
                <UploadCode
                  index={i}
                  codeFile={codeFile}
                  setCodeFile={setCodeFile}
                  onDrop={onDrop(i)}
                  multiple={false}
                />
                {codeFile[i] ? (
                  <p className="ml-4 text-sm">{codeFile[i]?.name}</p>
                ) : (
                  <p className="ml-4 text-sm">No file chosen</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center mt-4">
          <button
            type="button"
            className="w-48 inline-flex items-center justify-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )

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
