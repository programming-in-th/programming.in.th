import React from 'react'

import { UploadCode } from '../../Upload'
import { useStatus } from './useStatus'
import { useSubmit } from './useSubmit'

export const OutputOnly = ({ metadata }) => {
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
    <div className="mt-4 flex flex-col overflow-hidden border-b border-gray-200 p-4 shadow sm:rounded-lg">
      <p className="text-xl font-semibold">Submit</p>
      <div className="flex flex-col">
        <div>
          {metadata.fileName.map((name, i) => (
            <div className="mt-4" key={`submit-${metadata.id}-${name}`}>
              <p>File: {name}</p>

              <div className="mt-1 flex items-center align-baseline">
                <UploadCode
                  index={i}
                  codeFile={codeFile}
                  setCodeFile={setCodeFile}
                  onDrop={onDrop(i)}
                  multiple={false}
                />
                {codeFile[i] ? (
                  <p className="ml-4 text-sm">{codeFile[i]?.name}</p>
                ) : (
                  <p className="ml-4 text-sm">No file chosen</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button
            type="button"
            className="inline-flex w-48 items-center justify-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
