import { Task } from '@prisma/client'
import { getFileExtension } from '@/utilities/getFileExtension'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
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

export const SubmitElement: FC<{ task: Task }> = ({ task }) => {
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
          language: getFileExtension(file.name)
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
    <div className="flex flex-col gap-6 w-full rounded-md shadow-md text-prog-gray-500">
      <div className="bg-white px-8 py-4">
        <div className="flex gap-4 justify-between items-center mb-6">
          <h2 className="text-lg">Submit</h2>
          <div className="flex gap-2 flex-wrap justify-end">
            {Languages.map(language => {
              return (
                <div
                  key={language.extension}
                  className={classNames(
                    'border text-sm rounded-md px-6 py-2',
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
          <pre className="text-sm h-96 overflow-auto w-full my-4 p-4 bg-slate-50 rounded-mg">
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
              'transition-colors border rounded-md px-8 py-2',
              file && fileText
                ? 'bg-prog-gray-500 hover:bg-gray-600 text-white'
                : 'bg-slate-50  text-gray-300 cursor-not-allowed'
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}