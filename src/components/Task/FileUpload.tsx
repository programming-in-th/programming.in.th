import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'

import { formatBytes as formatBytesFunc } from '@/utils/formatSize'
import { getFileExtension } from '@/utils/getFileExtension'
import { truncate } from '@/utils/truncate'

const ACCEPTED_LANGUAGES = ['.cpp', '.py', '.java', '.rs', '.c']

export const FileUpload = ({
  file,
  setFile
}: {
  file: File | undefined
  setFile: Dispatch<SetStateAction<File | undefined>>
}) => {
  const [fileRejected, setFileRejected] = useState(false)

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragActive } =
    useDropzone({
      accept: {
        'text/*': ACCEPTED_LANGUAGES
      },
      validator: currentFile => {
        const extension = getFileExtension(currentFile?.name ?? '')

        if (ACCEPTED_LANGUAGES.includes('.' + extension)) {
          return null
        } else {
          return {
            code: 'wrong-file-extension',
            message:
              'Only files with the extension .c .cpp .py .java .rs are accepted'
          }
        }
      },
      onDropAccepted(acceptedFiles, _event) {
        if (acceptedFiles.length > 0) {
          setFileRejected(false)
          setFile(acceptedFiles[0])
        }
      },
      onDropRejected(_rejectedFiles, _event) {
        setFileRejected(true)
      }
    })

  const formatBytes = useCallback(formatBytesFunc, [file])

  return (
    <div className="relative overflow-hidden">
      <div
        {...getRootProps()}
        className={clsx(
          'flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-2 text-gray-400 transition-colors',
          (isFocused || isDragAccept) && 'border-blue-300',
          fileRejected && 'border-red-400',
          isDragActive
            ? 'bg-slate-800 bg-opacity-50 backdrop-blur-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-600'
        )}
      >
        <input {...getInputProps()} />

        <InboxArrowDownIcon
          className={clsx(
            'h-4 w-4',
            isDragActive && 'animate-pulse text-white'
          )}
        />

        {isDragActive ? (
          <p className="animate-pulse text-xl font-semibold text-white">
            Upload
          </p>
        ) : (
          <div className="text-center">
            {file ? (
              <p>
                {truncate(file.name, 16)} ({formatBytes(file.size)})
              </p>
            ) : (
              <p>Upload</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
