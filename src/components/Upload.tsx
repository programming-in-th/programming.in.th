import React, { useEffect } from 'react'
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone'
interface IUploadCode {
  index: number
  codeFile: File[]
  setCodeFile: React.Dispatch<React.SetStateAction<File[]>>
  onDrop<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ): void
  multiple: boolean
}

export const UploadCode = (props: IUploadCode) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: props.multiple,
  })

  useEffect(() => {
    const temp = [...props.codeFile]
    temp[props.index] = acceptedFiles[0]
    props.setCodeFile(temp)
  }, [acceptedFiles, props])

  return (
    <button
      type="button"
      {...getRootProps()}
      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <input {...getInputProps()} />
      Upload
    </button>
  )
}
