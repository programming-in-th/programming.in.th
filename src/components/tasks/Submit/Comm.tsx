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
    <div className="mt-4 flex flex-col overflow-hidden border-b border-gray-200 p-4 shadow sm:rounded-lg">
      <p className="text-xl font-semibold">Submit</p>
      <div className="flex flex-col">
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
      <div className="mt-4 flex">
        <select
          className="block w-full rounded-md border border-gray-300 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
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
          className="ml-8 inline-flex w-48 items-center justify-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
