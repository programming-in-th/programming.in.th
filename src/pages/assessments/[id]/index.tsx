import { useMemo } from 'react'

import Link from 'next/link'
import { NextRouter, withRouter } from 'next/router'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import AssessmentCard from '@/components/Assessment/AssessmentCard'
import { PageLayout } from '@/components/Layout'
import fetcher from '@/lib/fetcher'
import { IAssessmentTask, IAssessmentwithTask } from '@/types/assessments'
import { Score } from '@/types/tasks'

const TaskCard = ({
  task,
  id,
  scores
}: {
  task: IAssessmentTask
  id: string
  scores: Score[]
}) => {
  const score = useMemo(
    () => (scores ? scores.find(item => item.taskId === task.id)?.max || 0 : 0),
    [scores, task.id]
  )
  return (
    <Link href={`${id}/${task.id}`} passHref>
      <a className="flex w-full rounded-xl px-6 py-3 font-display shadow-md transition hover:shadow-lg dark:bg-slate-700">
        <div className="flex w-full flex-col">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
            {task.title}
          </p>
          <p className="text-sm text-gray-400">{task.id}</p>
        </div>
        <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
          <div className="flex h-auto w-full flex-col items-center justify-around">
            <div className="relative h-full w-full">
              <div className="absolute h-1.5 w-full rounded-full bg-gray-200"></div>
              <div
                className="absolute h-1.5 rounded-full bg-blue-500"
                style={{
                  width: `${(score / task.fullScore) * 100}%`
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
              {score} points
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

const Assessments = ({ router }: { router: NextRouter }) => {
  const id = router.query.id as string

  const { status } = useSession()

  const { data: scores } = useSWR<Score[]>(
    status === 'authenticated' ? '/api/submissions/score' : null,
    fetcher
  )

  const { data: assessment } = useSWR<IAssessmentwithTask>(
    `/api/assessments/${id}`,
    fetcher
  )

  return (
    <PageLayout>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center space-y-1 py-10 text-gray-500 dark:text-gray-300">
          <p className="text-xl font-semibold">Assessments</p>
        </div>
        <div className="flex w-full max-w-4xl flex-col px-2">
          {assessment ? (
            <AssessmentCard assessment={assessment} />
          ) : (
            <div className="h-48 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-500" />
          )}
          <div className="mt-10 mb-2 flex justify-between px-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
              Problem Title
            </p>
            <p className="flex w-[8.5rem] justify-center text-sm font-medium text-gray-500 dark:text-gray-100">
              Score
            </p>
          </div>
          <div className="flex w-full flex-col space-y-2">
            {assessment?.tasks.map(task => {
              return scores ? (
                <TaskCard task={task} key={task.id} id={id} scores={scores} />
              ) : (
                <div className="h-16 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-500" />
              )
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default withRouter(Assessments)
