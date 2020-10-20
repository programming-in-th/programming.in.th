import React from 'react'
import { Button, Select } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useStatus } from './useStatus'
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
    submissionID,
    codeValue,
  } = useSubmit(metadata)

  useStatus({ metadata, status, submissionID, codeValue })

  return (
    <div className="flex flex-col mt-4 p-4 shadow">
      <div className="text-xl font-semibold">Submit</div>
      <div className="flex items-baseline mt-2">
        <UploadCode
          index={0}
          codeFile={codeFile}
          setCodeFile={setCodeFile}
          onDrop={onDrop(0)}
          multiple={false}
        />
        {codeFile[0] !== undefined ? (
          <div className="ml-4 text-sm">{codeFile[0].name}</div>
        ) : (
          <div className="ml-4 text-sm">No file chosen</div>
        )}
      </div>
      <div className="flex mt-4">
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
      </div>
    </div>
  )
}
