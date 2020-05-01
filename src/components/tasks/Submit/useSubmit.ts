import { useCallback, useState } from 'react'
import { useUser } from '../../UserContext'
import { submitCode } from './submitToFirebase'
import { ITask } from '../../../@types/task'

export type status = 'WAIT' | 'LOADING' | 'OK' | 'ERROR'

export const useSubmit = (metadata: ITask) => {
  const { user } = useUser()

  const [language, setLanguage] = useState<string>('c++')
  const [codeFile, setCodeFile] = useState<File[]>([])
  const [codeValue, setCode] = useState<string[]>([])
  const [status, setStatus] = useState<status>()

  const onDrop = (index: number) =>
    useCallback(
      acceptedFiles => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const temp = [...codeValue]
          temp[index] = reader.result as string
          setCode(temp)
        }

        reader.readAsText(acceptedFiles[0])
      },
      [codeValue]
    )

  const submit = () =>
    submitCode(metadata.id, codeValue, language, user, setStatus)

  return { submit, codeFile, setCodeFile, onDrop, setLanguage, status }
}
