import { Suspense, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Task } from '@prisma/client'
import clsx from 'clsx'

import { getFileExtension } from '@/utils/getFileExtension'
import { getLanguageFromExtension, languageData } from '@/utils/language'

import { CodeSkeleton } from '../Code'
import { FileUpload } from './FileUpload'

const DynamicCode = dynamic(() => import('../Code'), {
  suspense: true,
  ssr: false
})

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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: task.id,
          code: [fileText],
          language: getLanguageFromExtension(getFileExtension(file.name))
        })
      })

      if (res.ok) {
        const resJson = await res.json()
        router.push(`/submissions/${resJson.id}`)
      } else {
        console.error(res)
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-md text-prog-gray-500 shadow-md dark:bg-slate-700 dark:text-gray-100">
      <div className="bg-white px-8 py-4 dark:bg-slate-700">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg ">Submit</h2>
          <div className="flex flex-wrap justify-end gap-2">
            {languageData.map(language => {
              return (
                <div
                  key={language[0]}
                  className={clsx(
                    'rounded-md border px-6 py-2 text-sm dark:border-slate-500',
                    file?.name?.toLowerCase()?.endsWith(language[0])
                      ? 'bg-prog-gray-500 text-white dark:bg-slate-700'
                      : 'border-gray-300 text-prog-gray-500 dark:text-slate-400'
                  )}
                >
                  {language[1]}
                </div>
              )
            })}
          </div>
        </div>

        <Suspense fallback={<CodeSkeleton />}>
          {file && fileText && (
            <DynamicCode
              code={fileText}
              language={getLanguageFromExtension(getFileExtension(file.name))}
            />
          )}
        </Suspense>

        <FileUpload file={file} setFile={setFile} />
      </div>

      <div className="bg-prog-gray-100 px-8 py-4 dark:bg-slate-700">
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className={clsx(
              'rounded-md border px-8 py-2 transition-colors dark:border-slate-600',
              file && fileText
                ? 'bg-prog-gray-500 text-white dark:hover:bg-slate-600'
                : 'cursor-not-allowed bg-slate-50 text-gray-300 dark:bg-slate-500'
            )}
            disabled={!file && !fileText}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
