import React, { useState, useCallback } from 'react'
import { Flex, Button, Select, Text } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { submitCode } from './submitToFirebase'

const languageData = [
  ['c', 'C'],
  ['c++', 'C'],
  ['python', 'Python'],
  ['java', 'Java']
]

export const Submit = ({ problemID }) => {
  const { user } = useUser()

  const [language, setLanguage] = useState<string>('c++')

  const [codeFile, setCodeFile] = useState<File[]>()
  const [codeValue, setCode] = useState<string>('')
  const [responseStatus, setResponseStatus] = useState({
    status: 0
  })

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      setCode(reader.result as string)
    }

    reader.readAsText(acceptedFiles[0])
  }, [])

  return (
    <Flex direction="column" px={4}>
      {codeFile && <Text>You are submitting - {codeFile[0]?.name}</Text>}
      <Flex align="baseline" mt={4}>
        <UploadCode
          index={0}
          codeFile={codeFile}
          setCodeFile={setCodeFile}
          onDrop={onDrop}
          multiple={false}
        ></UploadCode>
        <Select
          ml={8}
          width="120px"
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
          width="200px"
          ml={8}
          onClick={() => {
            submitCode(
              problemID,
              [codeValue],
              language,
              user,
              setResponseStatus
            )
          }}
          isDisabled={user === null}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
