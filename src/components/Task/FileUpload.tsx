import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { InboxInIcon } from '@heroicons/react/solid'
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
    <div className="relative w-full overflow-hidden">
      <div
        {...getRootProps()}
        className={clsx(
          'flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-6 text-gray-400 transition-colors',
          (isFocused || isDragAccept) && 'border-blue-300',
          fileRejected && 'border-red-400',
          isDragActive
            ? 'bg-slate-800 bg-opacity-50 backdrop-blur-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-600'
        )}
      >
        <input {...getInputProps()} />

        <InboxInIcon
          className={clsx(
            'h-10 w-10',
            isDragActive && 'animate-pulse text-white'
          )}
        />

        {isDragActive ? (
          <p className="animate-pulse text-xl font-semibold text-white">
            Drop your file here
          </p>
        ) : (
          <div className="text-center">
            {file ? (
              <>
                <p>{truncate(file.name, 32)}</p>
                <p>{formatBytes(file.size)}</p>
              </>
            ) : (
              <>
                <p>Upload a file or drag and drop</p>
                <p>.c .cpp .py .java .rs up to 4MB</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
