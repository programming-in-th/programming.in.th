import classNames from 'classnames'
import { FC, useCallback, useEffect, useState } from 'react'
import { FileUpload } from './FileUpload'

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
            <button
              className={classNames(
                'border rounded-md px-8 py-2',
                file?.name?.endsWith('.cpp')
                  ? 'bg-prog-gray-500 text-white'
                  : 'border-gray-300 text-prog-gray-500'
              )}
            >
              C++
            </button>
            <button
              className={classNames(
                'border rounded-md px-8 py-2',
                file?.name?.endsWith('.py')
                  ? 'bg-prog-gray-500 text-white'
                  : 'border-gray-300 text-prog-gray-500'
              )}
            >
              Python
            </button>
            <button
              className={classNames(
                'border rounded-md px-8 py-2',
                file?.name?.endsWith('.java')
                  ? 'bg-prog-gray-500 text-white'
                  : 'border-gray-300 text-prog-gray-500'
              )}
            >
              Java
            </button>
            <button
              className={classNames(
                'border rounded-md px-8 py-2',
                file?.name?.endsWith('.rs')
                  ? 'bg-prog-gray-500 text-white'
                  : 'border-gray-300 text-prog-gray-500'
              )}
            >
              Rust
            </button>
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
