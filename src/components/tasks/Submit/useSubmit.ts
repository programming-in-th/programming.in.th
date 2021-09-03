import { useState } from 'react'
import { submitCode } from './submitToFirebase'
import { ITask } from '../../../@types/task'
import { config } from 'config'
import { useAuth } from 'lib/auth'

export type status = 'WAIT' | 'LOADING' | 'OK' | 'ERROR'

export const useSubmit = (metadata: ITask) => {
  const { user } = useAuth()

  const [language, setLanguage] = useState<string>(config.languageData[0][0])
  const [codeFile, setCodeFile] = useState<File[]>([])
  const [codeValue, setCode] = useState<string[]>([])
  const [status, setStatus] = useState<status>()
  const [submissionID, setSubmissionID] = useState<string>()

  const onDrop = (index: number) => (acceptedFiles) => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const temp = [...codeValue]
      temp[index] = reader.result as string
      setCode(temp)
    }

    reader.readAsText(acceptedFiles[0])
  }

  const submit = () =>
    submitCode(
      metadata.id,
      codeValue,
      language,
      user,
      setStatus,
      setSubmissionID
    )

  return {
    submit,
    codeFile,
    setCodeFile,
    onDrop,
    setLanguage,
    status,
    submissionID,
    codeValue,
  }
}
