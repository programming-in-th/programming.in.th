import React from 'react'
import { Flex, Button, Select, Text, Heading } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { config } from 'config'

export const Normal = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status,
  } = useSubmit(metadata)

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
