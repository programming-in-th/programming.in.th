import React from 'react'
import { Flex, Button, Select, Text, Box } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { languageData } from '.'

export const OutputOnly = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status
  } = useSubmit(metadata)

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
            defaultValue={languageData[0][0]}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setLanguage(event.target.value)
            }
          >
            {languageData.map((data: string[]) => (
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
