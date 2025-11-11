import {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  MutableRefObject
} from 'react'

import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

import { TaskModel } from '@/prisma/models'
import getFilePath from '@/utils/getFilePath'
import uploadFile from '@/utils/uploadFile'

export interface IAssessmentForm {
  id: string
  title: string
  fullScore: number
  private: 'true' | 'false'
  type: 'NORMAL' | 'COMMUNICATION' | 'OUTPUT_ONLY'
  statement: string
  categoryId: string
  tags: string[]
}

interface ISubmitContext {
  register: UseFormRegister<IAssessmentForm> | undefined
  handleSubmit: () => Promise<void>
  inputRef: MutableRefObject<HTMLInputElement | null>
  setSingleFile: (value: boolean) => void
  isSubmitting: boolean
  displayFiles: IDisplayFile[]
  task: TaskModel | undefined
  singleFile: boolean
  closedBar: () => void
  changeFile: (files: File[]) => void
  showSelectFile: () => void
}

interface IUploadUrl {
  url: string
  path: string
}

export interface IDisplayFile {
  path: string
  type: string
  fileSize: number
  percentage: number
}

const Context = createContext<ISubmitContext>({
  register: undefined,
  handleSubmit: () => Promise.resolve(),
  inputRef: { current: null },
  setSingleFile: () => {
    // do nothing
  },
  isSubmitting: false,
  displayFiles: [],
  task: undefined,
  singleFile: false,
  closedBar: () => {
    // do nothing
  },
  changeFile: (_files: File[]) => {
    // do nothing
  },
  showSelectFile: () => {
    // do nothing
  }
})

export const SubmitContext: React.FC<{
  task: TaskModel | undefined
  children?: React.ReactNode
  closedBar: () => void
}> = ({ children, task, closedBar }) => {
  // hooks
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [singleFile, setSingleFile] = useState<boolean>(false)
  const [displayFiles, setDisplayFiles] = useState<IDisplayFile[]>([])
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { register, handleSubmit } = useForm<IAssessmentForm>({
    defaultValues: {
      id: task?.id || '',
      title: task?.title || '',
      fullScore: task?.fullScore || 100,
      private: task ? (task.private ? 'true' : 'false') : 'true',
      type: task?.type || 'NORMAL',
      statement: task?.statement || 'PDF',
      categoryId: task?.categoryId || '',
      tags: []
    }
  })

  useEffect(() => {
    if (files.length > 0) {
      setDisplayFiles(
        files.map(file => ({
          path: getFilePath(file).path,
          type: file.type,
          fileSize: file.size,
          percentage: 0
        }))
      )
    }
  }, [files])

  // useEffect

  useEffect(() => {
    if (inputRef && inputRef.current) {
      if (singleFile) {
        inputRef.current.removeAttribute('directory')
        inputRef.current.removeAttribute('webkitdirectory')
        inputRef.current.removeAttribute('multiple')
      } else {
        inputRef.current.setAttribute('directory', '')
        inputRef.current.setAttribute('webkitdirectory', '')
        inputRef.current.setAttribute('multiple', '')
      }
    }
  }, [inputRef, singleFile])

  // functions

  const changeFile = (files: File[]) => {
    setFiles(files)
  }

  const showSelectFile = () => {
    if (inputRef) {
      inputRef.current?.click()
    }
  }

  const submitTaskToDatabase = async (data: IAssessmentForm) => {
    return await toast.promise(
      fetch(task ? `/api/tasks/${task.id}` : '/api/tasks', {
        method: task ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          private: data.private === 'true',
          files: files?.map(f => getFilePath(f))
        })
      }).then(res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      }),
      {
        loading: 'Submitting...',
        success: `Successfully ${task ? 'updated' : 'created'} a task`,
        error: (err: Error) => `${err}`
      }
    )
  }

  const uploadTestcases = async (results: IUploadUrl[]) => {
    for (const i in files) {
      const file = files[i]
      const result = results.find(r => r.path === getFilePath(file).path)
      if (!result) continue
      await uploadFile(
        result.url,
        file,
        getFilePath(file).type,
        (p: number) => {
          setDisplayFiles(prev =>
            prev.map(f =>
              f.path === getFilePath(file).path ? { ...f, percentage: p } : f
            )
          )
        }
      )
    }
  }

  const onSubmit: SubmitHandler<IAssessmentForm> = async data => {
    setIsSubmitting(true)
    try {
      const result = await submitTaskToDatabase(data)
      if (files.length > 0) {
        await uploadTestcases(result)
      }
      closedBar()
      mutate('/api/tasks')
      mutate(`/api/tasks/${task?.id}`)
      if (files.length > 0) {
        await toast.promise(
          fetch(`/api/tasks/${data.id}/status`, { method: 'PATCH' }),
          {
            loading: 'Sending Pull Signal...',
            success: `Successfully sent pull signal`,
            error: (err: Error) => `${err}`
          }
        )
      }
    } catch {
      // do nothing
    }
    setIsSubmitting(false)
  }

  return (
    <Context.Provider
      value={{
        register,
        handleSubmit: handleSubmit(onSubmit),
        inputRef,
        setSingleFile,
        isSubmitting,
        displayFiles,
        task,
        singleFile,
        closedBar,
        changeFile,
        showSelectFile
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSubmit = () => useContext(Context)
