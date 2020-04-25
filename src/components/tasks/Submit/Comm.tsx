import React, { useState, useCallback, useEffect } from 'react'
import { Flex, Button, Select, Text, Box } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { submitCode } from './submitToFirebase'

const languageData = [
  ['c', 'C'],
  ['c++', 'C++'],
  ['python', 'Python'],
  ['java', 'Java']
]

export const Submit = ({ problemID, metadata }) => {
  const { user } = useUser()

  const [language, setLanguage] = useState<string>('c++')

  const [codeFile, setCodeFile] = useState<File[]>([])
  const [codeValue, setCode] = useState<string[]>([])
  const [responseStatus, setResponseStatus] = useState({
    status: 0
  })

  const onDrop = index =>
    useCallback(acceptedFiles => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const temp = codeValue
        temp[index] = reader.result as string
        setCode(temp)
      }

      reader.readAsText(acceptedFiles[0])
    }, [])

  return (
    <Flex direction="column" px={4}>
      <Flex direction="column">
        <Box>
          {metadata.fileName.map((name, i) => (
            <Box key={name}>
              <Text>{name}</Text>
              <UploadCode
                index={i}
                codeFile={codeFile}
                setCodeFile={setCodeFile}
                onDrop={onDrop(i)}
                multiple={false}
              />
              <Text>You are submitting - {codeFile[i]?.name}</Text>
            </Box>
          ))}
        </Box>

        <Select
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
          onClick={() => {
            submitCode(problemID, codeValue, language, user, setResponseStatus)
          }}
          isDisabled={user === null}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
