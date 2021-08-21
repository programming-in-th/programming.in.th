import React from 'react'

import { UploadCode } from '../../Upload'
import { useStatus } from './useStatus'
import { useSubmit } from './useSubmit'
import { config } from 'config'

export const Comm = ({ metadata }) => {
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
    <div className="flex flex-col mt-4 p-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <p className="font-semibold text-xl">Submit</p>
      <div className="flex flex-col">
        {metadata.fileName.map((name, i) => (
          <div className="mt-4" key={`submit-${metadata.id}-${name}`}>
            <p>File: {name}</p>
            <div className="flex align-baseline items-center mt-1">
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
      <div className="flex mt-4">
        <select
          className="block w-full pl-3 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          defaultValue={config.languageData[0][0]}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setLanguage(event.target.value)
          }
        >
          {config.languageData.map((data: string[]) => (
            <option
              key={`submit-lang-${metadata.id}-${data[0]}`}
              value={data[0]}
            >
              {data[1]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="w-48 ml-8 inline-flex items-center justify-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
