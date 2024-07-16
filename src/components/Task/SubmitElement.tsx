'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Task } from '@prisma/client'
import clsx from 'clsx'
import { mutate } from 'swr'

import { getFileExtension } from '@/utils/getFileExtension'
import { getLanguageFromExtension, languageData } from '@/utils/language'

import { FileUpload } from './FileUpload'
import CodeEditor from '../CodeEditor'

export const SubmitElement = ({
  task,
  assessmentId
}: {
  task: Task
  assessmentId?: string
}) => {
  const [file, setFile] = useState<File>()
  const [currentLanguage, setCurrentLanguage] = useState<string>('')
  const [fileText, setFileText] = useState<string>()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (file) {
      setCurrentLanguage(getLanguageFromExtension(getFileExtension(file.name)))
      file.text().then(value => setFileText(value))
    }
  }, [file])

  const onSubmit = async () => {
    if (fileText) {
      setSubmitted(true)
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: task.id,
          code: [fileText],
          language: currentLanguage,
          ...(assessmentId && { assessmentId })
        })
      })

      if (res.ok) {
        const resJson = await res.json()
        mutate(`/api/submissions/${resJson.id}`, resJson)
        router.push(`/submissions/${resJson.id}`)
      } else {
        setSubmitted(false)
        console.error(res)
      }
    }
  }

  return (
    <div className="flex w-full flex-col rounded-md text-prog-gray-500 shadow-md dark:bg-slate-700 dark:text-gray-100">
      <div className="bg-white px-8 py-4 dark:bg-slate-700">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg">Submit</h2>
          <div className="flex flex-wrap justify-end gap-2">
            {languageData.map(language => {
              return (
                <div
                  key={language[2]}
                  className={clsx(
                    'cursor-pointer rounded-md border px-6 py-2 text-sm dark:border-slate-500',
                    currentLanguage === language[2]
                      ? 'bg-prog-gray-500 text-white dark:bg-slate-700'
                      : 'border-gray-300 text-prog-gray-500 dark:text-slate-400'
                  )}
                  onClick={() => setCurrentLanguage(language[2])}
                >
                  {language[1]}
                </div>
              )
            })}
          </div>
        </div>

        <CodeEditor setValue={setFileText} value={fileText} height="32rem" />
      </div>

      <div className="bg-prog-gray-100 px-8 py-4 dark:bg-slate-700">
        <div className="flex justify-between">
          <FileUpload file={file} setFile={setFile} />
          <button
            onClick={onSubmit}
            className={clsx(
              'flex w-32 items-center justify-center rounded-md border px-8 py-2 transition-colors dark:border-slate-600',
              fileText && currentLanguage !== ''
                ? 'bg-prog-gray-500 text-white dark:hover:bg-slate-600'
                : 'cursor-not-allowed bg-slate-50 text-gray-300 dark:bg-slate-500'
            )}
            disabled={!fileText || currentLanguage === '' || submitted}
          >
            {submitted ? (
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>Submit</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
