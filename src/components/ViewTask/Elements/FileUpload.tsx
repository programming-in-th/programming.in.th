import { truncate } from '@/utilities/truncate'
import { InboxInIcon } from '@heroicons/react/solid'
import { Dispatch, FC, SetStateAction, useCallback, useRef } from 'react'

export const FileUpload: FC<{
  file: File
  setFile: Dispatch<SetStateAction<File>>
}> = ({ file, setFile }) => {
  const inputRef = useRef(null)

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
    <div className="overflow-hidden w-full">
      {/* add black bg on file hover */}
      <input
        type="file"
        id="file"
        ref={inputRef}
        className="hidden"
        onChange={e => {
          if (e.target.files.length > 0) {
            setFile(e.target.files[0])
          }
        }}
        accept=".cpp,.py,.java,.rs"
      />
      <button
        onClick={() => inputRef?.current?.click()}
        className="rounded-md w-full border border-dashed border-gray-400 text-gray-400 p-6 gap-2 flex flex-col justify-center items-center"
      >
        <InboxInIcon className="w-10 h-10" />

        {file ? (
          <>
            <div className="w-full">{truncate(file.name, 32)}</div>

            <p>{formatBytes(file.size)}</p>
          </>
        ) : (
          <>
            <div>Upload a file or drag and drop</div>

            <p>.CPP .PY .JAVA .RS up to 10MB</p>
          </>
        )}
      </button>
    </div>
  )
}
