import React from 'react'
import { Flex, Button, Select, Text, Box, Heading } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { statusProvider } from './statusProvider'
import { useSubmit } from './useSubmit'
import { config } from 'config'

export const Comm = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status,
    submissionID,
    codeValue,
  } = useSubmit(metadata)

  statusProvider({ metadata, status, submissionID, codeValue })

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
    </Flex>
  )
}
