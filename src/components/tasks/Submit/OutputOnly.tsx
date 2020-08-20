import React from 'react'
import { Button } from '@chakra-ui/core'

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
    <div className="flex flex-col mt-4 p-4 shadow">
      <div className="text-xl font-semibold">Submit</div>
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

        <Button
          size="sm"
          mt={4}
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
