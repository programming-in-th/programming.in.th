import React from 'react'
import { Button, Select } from '@chakra-ui/core'

import { useUser } from '../../UserContext'

import { UploadCode } from '../../Upload'
import { useStatus } from './useStatus'
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

  useStatus({ metadata, status, submissionID, codeValue })

  return (
    <div className="flex flex-col mt-4 p-4 shadow">
      <div className="font-semibold text-xl">Submit</div>
      <div className="flex flex-col mt-2">
        <div>
          {metadata.fileName.map((name, i) => (
            <div className={i === 0 ? 'mt-0' : 'mt-8'} key={name}>
              <div>File: {name}</div>
              <div className="items-baseline">
                <UploadCode
                  index={i}
                  codeFile={codeFile}
                  setCodeFile={setCodeFile}
                  onDrop={onDrop(i)}
                  multiple={false}
                />
                {codeFile[i] ? (
                  <div className="ml-4 text-sm">{codeFile[i]?.name}</div>
                ) : (
                  <div className="ml-4 text-sm">No file chosen</div>
                )}
              </div>
            </div>
          ))}
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
    </div>
  )
}
