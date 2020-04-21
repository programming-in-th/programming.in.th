import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Button, Select, Text } from '@chakra-ui/core'

import { useUser } from '../UserContext'

import firebase from '../../lib/firebase'
import { UploadCode } from '../Upload'

const languageData = [
  ['text/x-csrc', 'C / C++'],
  ['python', 'Python'],
  ['java', 'Java']
]

type TPlot = {
  [key: string]: string
}

const mapLanguage: TPlot = {
  'text/x-csrc': 'cpp',
  python: 'python'
}

interface ISubmitSetting {
  language: string
  hideCode: boolean
}

export const Submit = ({ problemID }) => {
  const { user } = useUser()

  const [setting, setSetting] = useState<ISubmitSetting>({
    language: 'text/x-csrc',
    hideCode: false
  })

  const [codeFile, setCodeFile] = useState<File[]>()
  const [codeValue, setCode] = useState<string>('')
  const [responseState, setResponse] = useState({
    data: undefined,
    status: 0
  })

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      setCode(reader.result as string)
      console.log(reader.result)
    }

    reader.readAsText(acceptedFiles[0])
  }, [])

  const submitCode = async (id: string, code: string, lang: string) => {
    if (!user) return

    const params = {
      id,
      code,
      lang
    }

    setResponse({
      ...responseState,
      status: -1
    })

    const response = await firebase
      .app()
      .functions('asia-east2')
      .httpsCallable('makeSubmission')(params)

    setResponse({
      data: response.data,
      status: 200
    })
  }

  const changeLanguage = (value: string) => {
    setSetting({ ...setting, language: value })
  }

  return (
    <Flex direction="column" px={4}>
      {codeFile && <Text>You are submitting - {codeFile[0]?.name}</Text>}
      <Flex align="baseline" mt={4}>
        <UploadCode setCodeFile={setCodeFile} onDrop={onDrop}></UploadCode>
        <Select
          ml={8}
          width="120px"
          defaultValue={languageData[0][0]}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            changeLanguage(event.target.value)
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
            submitCode(problemID, codeValue, mapLanguage[setting.language])
          }}
          isDisabled={user === null}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
