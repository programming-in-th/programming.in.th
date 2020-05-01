import React from 'react'
import { Flex, Button, Select, Text, Spinner, Box } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useSubmit } from './useSubmit'
import { languageData } from '.'
import { Loading } from './Loading'
import { Submitted } from './Submitted'
import { Error } from './Error'

export const Normal = ({ metadata }) => {
  const { user } = useUser()

  const {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status,
    submissionID
  } = useSubmit(metadata)

  switch (status) {
    case 'WAIT':
      return (
        <Flex direction="column" px={4}>
          <Flex align="baseline">
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
      )

    case 'LOADING':
      return <Loading></Loading>

    case 'OK':
      return <Submitted submissionID={submissionID}></Submitted>

    case 'ERROR':
      return <Error taskID={metadata.id}></Error>
  }
}
