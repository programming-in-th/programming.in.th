import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Task } from '@prisma/client'
import classNames from 'classnames'

import { getLanguage } from '@/utils/getFileExtension'

import { FileUpload } from './FileUpload'

const Languages = [
  {
    title: 'C++',
    extension: '.cpp'
  },
  {
    title: 'Python',
    extension: '.py'
  },
  {
    title: 'Java',
    extension: '.java'
  },
  {
    title: 'Rust',
    extension: '.rs'
  }
]

export const SubmitElement = ({ task }: { task: Task }) => {
  const [file, setFile] = useState<File>()
  const [fileText, setFileText] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    if (file) {
      file.text().then(value => setFileText(value))
    }
  }, [file])

  const onSubmit = async () => {
    if (file && fileText) {
      const res = await fetch('/api/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: task.id,
          code: [fileText],
          language: getLanguage(file.name)
        })
      })

      if (res.ok) {
        const resJson = await res.json()
        router.push(`/submissions/${resJson.id}`)
      } else {
        // log error
        console.error(res)
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-md text-prog-gray-500 shadow-md">
      <div className="bg-white px-8 py-4">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg">Submit</h2>
          <div className="flex flex-wrap justify-end gap-2">
            {Languages.map(language => {
              return (
                <div
                  key={language.extension}
                  className={classNames(
                    'rounded-md border px-6 py-2 text-sm',
                    file?.name?.toLowerCase()?.endsWith(language.extension)
                      ? 'bg-prog-gray-500 text-white'
                      : 'border-gray-300 text-prog-gray-500'
                  )}
                >
                  {language.title}
                </div>
              )
            })}
          </div>
        </div>

        {file && (
          <pre className="rounded-mg my-4 h-96 w-full overflow-auto bg-slate-50 p-4 text-sm">
            {fileText}
          </pre>
        )}

        <FileUpload file={file} setFile={setFile} />
      </div>

      <div className="bg-prog-gray-100 px-8 py-4">
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className={classNames(
              'rounded-md border px-8 py-2 transition-colors',
              file && fileText
                ? 'bg-prog-gray-500 text-white hover:bg-gray-600'
                : 'cursor-not-allowed  bg-slate-50 text-gray-300'
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
