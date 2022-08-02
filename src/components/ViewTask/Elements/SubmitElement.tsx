import { Task } from '@prisma/client'
import { getLanguage } from '@/utils/getFileExtension'
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
    <div className="flex flex-col w-full gap-6 rounded-md shadow-md text-prog-gray-500">
      <div className="px-8 py-4 bg-white">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-lg">Submit</h2>
          <div className="flex flex-wrap justify-end gap-2">
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
          <pre className="w-full p-4 my-4 overflow-auto text-sm h-96 bg-slate-50 rounded-mg">
            {fileText}
          </pre>
        )}

        <FileUpload file={file} setFile={setFile} />
      </div>

      <div className="px-8 py-4 bg-prog-gray-100">
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
