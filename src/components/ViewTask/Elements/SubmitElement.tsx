import classNames from 'classnames'
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

export const SubmitElement: FC = () => {
  const [file, setFile] = useState<File>()
  const [fileText, setFileText] = useState<string>()

  useEffect(() => {
    if (file) {
      file.text().then(value => setFileText(value))
    }
  }, [file])

  const onSubmit = () => {
    // submit to grader
  }

  return (
    <div className="flex flex-col gap-6 w-full rounded-md shadow-md text-prog-gray-500">
      <div className="bg-white px-8 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg">Submit</h2>
          <div className="flex gap-2 ">
            {Languages.map(language => {
              return (
                <button
                  key={language.extension}
                  className={classNames(
                    'border rounded-md px-8 py-2',
                    file?.name?.toLowerCase()?.endsWith(language.extension)
                      ? 'bg-prog-gray-500 text-white'
                      : 'border-gray-300 text-prog-gray-500'
                  )}
                >
                  {language.title}
                </button>
              )
            })}
          </div>
        </div>

        {file && (
          <pre className="text-sm my-4 p-4 bg-slate-50 rounded-mg">
            {fileText}
          </pre>
        )}

        <FileUpload file={file} setFile={setFile} />
      </div>

      <div className="bg-prog-gray-100 px-8 py-4">
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-prog-gray-500 transition-colors hover:bg-gray-600 border text-white rounded-md px-8 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
