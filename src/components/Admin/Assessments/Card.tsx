import { useState } from 'react'

import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'

import IsLink from '@/components/common/IsLink'
import { IAssessment } from '@/types/assessments'
import { IUser } from '@/types/users'

import EditAssessment from './EditAssessment/EditAssessment'
import VerifyDelete from './VerifyDelete'
import fetcher from '@/lib/fetcher'

const Card = ({
  assessment,
  isLink = false
}: {
  assessment: IAssessment
  isLink?: boolean
}) => {
  const { data: tasks } = useSWR<Task[]>('/api/tasks', fetcher)
  const { data: users } = useSWR<IUser[]>('/api/users', fetcher)

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  return (
    <IsLink
      className="flex flex-col justify-between space-y-2 rounded-lg border border-gray-100 shadow-md dark:border-none dark:bg-slate-700"
      href={`/admin/assessments/${assessment.id}`}
      isLink={isLink}
    >
      <>
        <div className="flex w-full px-10 py-6">
          <div className="flex w-1/3 flex-col">
            <p className="text-xl font-semibold leading-6 text-gray-500 dark:text-gray-200">
              {assessment.name}
            </p>
            <p className="pt-1 text-base text-gray-500 dark:text-gray-200">{`#${assessment.id}`}</p>
          </div>
          <p className="w-2/3 text-gray-500 dark:text-gray-200">
            {assessment.description}
          </p>
        </div>
        <div className="flex w-full justify-between rounded-b-lg bg-gray-50 px-10 py-4 dark:bg-slate-600">
          <div className="flex space-x-6">
            <div className="flex h-auto flex-col justify-between">
              <p className="text-sm text-gray-400 dark:text-gray-300">{`Open: ${dayjs(
                assessment.open
              ).format('DD MMM YYYY HH:mm:ss')}`}</p>
              <p className="text-sm text-gray-400 dark:text-gray-300">{`Close: ${dayjs(
                assessment.close
              ).format('DD MMM YYYY HH:mm:ss')}`}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
              type="button"
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                setOpenEdit(true)
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
                  fill="#94A3B8"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
                  fill="#94A3B8"
                />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                setOpenDelete(true)
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                  fill="#94A3B8"
                />
              </svg>
            </button>
          </div>
        </div>
        <VerifyDelete
          open={openDelete}
          setOpen={setOpenDelete}
          id={assessment.id}
          onDelete={async () => {
            await toast.promise(
              fetch(`/api/assessments/${assessment.id}`, { method: 'DELETE' }),
              {
                loading: 'Loading',
                success: 'Successfully Deleted',
                error: 'Delete Assessment Error'
              }
            )
            await mutate('/api/assessments')
          }}
        />
        <EditAssessment
          open={openEdit}
          setOpen={setOpenEdit}
          tasks={tasks || []}
          assessmentId={assessment.id}
          users={users || []}
        />
      </>
    </IsLink>
  )
}

export default Card
