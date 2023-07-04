'use client'

import { useMemo } from 'react'

import Link from 'next/link'

import dayjs from 'dayjs'
import useSWR from 'swr'

import { IAdminAssessment } from '@/components/Admin/Assessments/EditAssessment/types'
import fetcher from '@/lib/fetcher'
import { IUser } from '@/types/users'
import { getDisplayNameFromGrader } from '@/utils/language'

interface ISubmission {
  id: number
  taskId: string
  score: number
  language: string
  time: string
  memory: string
  submittedAt: string
}

interface ITaskSubmission {
  id: string
  title: string
  score: number
  fullScore: number
  submissions: ISubmission[]
}

const SubmissionCard = ({
  submission,
  fullScore
}: {
  submission: ISubmission
  fullScore: number
}) => {
  const dt = new Date(submission.submittedAt)

  return (
    <div className="flex w-full items-center rounded-lg border border-gray-100 px-6 py-3 shadow-md dark:bg-slate-700">
      <div className="flex w-1/6 flex-col text-sm">
        <p className="font-medium text-gray-500 dark:text-white">
          {dayjs(dt).format('DD MMM YYYY')}
        </p>
        <p className="text-gray-400 dark:text-gray-300">
          {dayjs(dt).format('HH:mm:ss')}
        </p>
      </div>
      <div className="flex h-auto w-1/3 items-center justify-center px-6 text-sm">
        <div className="flex h-auto w-full flex-col items-center justify-around">
          <div className="relative h-full w-full">
            <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
            <div
              className={`absolute h-1.5 rounded-full ${
                submission.score === fullScore ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              style={{
                width: `${(submission.score / 100) * 100}%`
              }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-200">
            {submission.score} points
          </p>
        </div>
      </div>
      <p className="w-1/6 text-center text-sm font-medium text-gray-500 dark:text-white">
        {getDisplayNameFromGrader(submission.language)}
      </p>
      <p className="w-1/6 text-center text-sm font-medium text-gray-500 dark:text-white">
        {submission.time}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">ms</span>
      </p>
      <p className="w-1/6 text-center text-sm font-medium text-gray-500 dark:text-white">
        {submission.memory}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">kB</span>
      </p>
    </div>
  )
}

export default function IndividualSubmission({
  params
}: {
  params: { id: string; userId: string }
}) {
  const { id, userId } = params

  const { data: assessment } = useSWR<IAdminAssessment>(
    `/api/assessments/${id}`,
    fetcher
  )

  const { data: users } = useSWR<IUser[]>('/api/users', fetcher)

  const { data: submissions } = useSWR<{
    data: ISubmission[]
    nextCursor: number | null
  }>(
    `/api/submissions?filter=assessment&filter=user&userId=${userId}&assessmentId=${id}`,
    fetcher
  )

  const currentUser = useMemo<IUser | undefined>(() => {
    return users?.find(user => user.id === userId)
  }, [users, userId])

  console.log(
    submissions?.data
      .filter(submission => submission.taskId === '1')
      .map(submission => submission.score)
  )

  const taskSubmission = useMemo<ITaskSubmission[]>(() => {
    return (
      assessment?.tasks.map(task => ({
        id: task.id,
        title: task.title,
        score: Math.max(
          ...(submissions?.data
            .filter(submission => submission.taskId === task.id)
            .map(submission => submission.score) || []),
          0
        ),
        fullScore: task.fullScore,
        submissions:
          submissions?.data.filter(
            submission => submission.taskId === task.id
          ) || []
      })) || []
    )
  }, [assessment?.tasks, submissions?.data])

  return (
    <div className="flex w-full justify-center">
      <div className="relative mt-8 w-full max-w-6xl">
        <Link
          href={`/admin/assessments/${id}`}
          className="absolute -left-8 top-0"
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
              d="M9.70711 16.7071C9.31659 17.0976 8.68342 17.0976 8.2929 16.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L8.2929 3.29289C8.68342 2.90237 9.31659 2.90237 9.70712 3.29289C10.0976 3.68342 10.0976 4.31658 9.70712 4.70711L5.41422 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11L5.41422 11L9.70711 15.2929C10.0976 15.6834 10.0976 16.3166 9.70711 16.7071Z"
              fill="#64748B"
            />
          </svg>
        </Link>
        <div className="flex w-full flex-col">
          <div className="flex w-full space-x-2">
            <svg
              width="23"
              height="20"
              viewBox="0 0 23 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.5617 9.99998C17.5617 13.5346 14.6963 16.4 11.1617 16.4C7.62709 16.4 4.76172 13.5346 4.76172 9.99998C4.76172 6.46535 7.62709 3.59998 11.1617 3.59998C14.6963 3.59998 17.5617 6.46535 17.5617 9.99998ZM12.7617 7.59998C12.7617 8.48363 12.0454 9.19998 11.1617 9.19998C10.2781 9.19998 9.56171 8.48363 9.56171 7.59998C9.56171 6.71632 10.2781 5.99998 11.1617 5.99998C12.0454 5.99998 12.7617 6.71632 12.7617 7.59998ZM11.1616 10.8C9.54762 10.8 8.15687 11.7559 7.5247 13.1325C8.40493 14.1536 9.70783 14.8 11.1617 14.8C12.6155 14.8 13.9184 14.1536 14.7986 13.1326C14.1665 11.756 12.7757 10.8 11.1616 10.8Z"
                fill="#64748B"
              />
            </svg>
            {currentUser ? (
              <p className="text-sm text-gray-500">{currentUser.username}</p>
            ) : (
              <div className="h-5 w-40 animate-pulse rounded-md bg-gray-100 dark:bg-gray-500" />
            )}
          </div>
          <div className="mt-8 flex w-full flex-col divide-y">
            <div className="mb-1 flex w-full text-sm text-gray-300">
              <p className="w-1/2 px-4">Tasks</p>
              <p className="w-1/2 px-4">Submissions</p>
            </div>
            {taskSubmission.map(task => (
              <div className="flex w-full py-5 pl-4 text-sm" key={task.id}>
                <div className="flex w-1/2 justify-between pr-10">
                  <div className="flex w-full flex-col">
                    <p className="font-semibold text-gray-500">{task.title}</p>
                    <p className="text-xs text-gray-400">{task.id}</p>
                  </div>
                  <p className="text-xs text-gray-400">{`${task.score}/${task.fullScore}`}</p>
                </div>
                {task.submissions.length === 0 ? (
                  <div className="flex h-20 w-1/2 items-center justify-center rounded-md bg-gray-50">
                    <p className="text-gray-400">No submission for this task</p>
                  </div>
                ) : (
                  <div className="flex w-1/2 flex-col space-y-2">
                    {task.submissions.map(submission => (
                      <SubmissionCard
                        fullScore={task.fullScore}
                        key={`sub-${task.id}-${submission.id}`}
                        submission={submission}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
