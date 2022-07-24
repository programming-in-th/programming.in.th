import { getFileExtension } from '@/utilities/getFileExtension'
import { truncate } from '@/utilities/truncate'
import { InboxInIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState
} from 'react'
import { useDropzone } from 'react-dropzone'

export const FileUpload: FC<{
  file: File
  setFile: Dispatch<SetStateAction<File>>
}> = ({ file, setFile }) => {
  const [fileRejected, setFileRejected] = useState(false)

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragActive } =
    useDropzone({
      validator: currentFile => {
        const extension = getFileExtension(currentFile?.name ?? '')

        if (['.cpp', '.py', '.java', '.rs'].includes(extension)) {
          return null
        } else {
          return {
            code: 'wrong-file-extension',
            message:
              'Only files with the extension .cpp .py .java .rs are accepted'
          }
        }
      },
      onDropAccepted(acceptedFiles, event) {
        if (acceptedFiles.length > 0) {
          setFileRejected(false)
          setFile(acceptedFiles[0])
        }
      },
      onDropRejected(fileRejections, event) {
        setFileRejected(true)
      }
    })

  const formatBytes = useCallback(
    (bytes, decimals = 2) => {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    [file]
  )

  return (
    <div className="overflow-hidden relative w-full">
      <div
        {...getRootProps()}
        className={classNames(
          'rounded-md w-full border cursor-pointer h-48 border-dashed transition-colors border-gray-400 text-gray-400 p-6 gap-2 flex flex-col justify-center items-center',
          (isFocused || isDragAccept) && 'border-prog-primary-500',
          fileRejected && 'border-red-400',
          isDragActive
            ? 'bg-slate-800 bg-opacity-50 backdrop-blur-sm'
            : 'hover:bg-slate-50'
        )}
      >
        <input {...getInputProps()} />

        <InboxInIcon
          className={classNames(
            'w-10 h-10',
            isDragActive && 'text-white animate-pulse'
          )}
        />

        {isDragActive ? (
          <p className="font-semibold text-white text-xl animate-pulse">
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
                <p>.CPP .PY .JAVA .RS up to 10MB</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
