import React, { useEffect } from 'react'
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone'
import { Button } from '@chakra-ui/core'

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
  }, [acceptedFiles])

  return (
    <Button {...getRootProps()} mt={2} size="xs">
      <input {...getInputProps()} />
      Upload
    </Button>
  )
}
