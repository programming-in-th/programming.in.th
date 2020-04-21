import React, { useEffect } from 'react'
import { useDropzone, DropEvent } from 'react-dropzone'
import { Button } from '@chakra-ui/core'

interface IUploadCode {
  setCodeFile: React.Dispatch<React.SetStateAction<File[]>>
  onDrop<T extends File>(
    acceptedFiles: T[],
    rejectedFiles: T[],
    event: DropEvent
  ): void
}

export const UploadCode = (props: IUploadCode) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: false
  })

  useEffect(() => {
    props.setCodeFile(acceptedFiles)
  }, [acceptedFiles])

  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      Upload
    </Button>
  )
}
