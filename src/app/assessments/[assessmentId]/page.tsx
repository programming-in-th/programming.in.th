import Link from 'next/link'
import { notFound } from 'next/navigation'

import AssessmentCard from '@/components/Assessment/AssessmentCard'
import { Unauthorized } from '@/components/Unauthorized'
import { MDXRemote } from '@/lib/mdx'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'
import { getSubmissionsAndCalculateScore } from '@/lib/server/assessment'
import { getServerUser } from '@/lib/session'
import { IAssessmentTask, IAssessmentwithTask } from '@/types/assessments'

const TaskCard = ({
  task,
  id,
  score
}: {
  task: IAssessmentTask
  id: string
  score: number
}) => {
  return (
    <Link
      href={`${id}/${task.id}`}
      className="flex w-full rounded-xl px-6 py-3 font-display shadow-md transition hover:shadow-lg dark:bg-slate-700"
    >
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
    </Link>
  )
}

export default async function Assessment(
  props: PageProps<'/assessments/[assessmentId]'>
) {
  const params = await props.params
  const { assessmentId } = params

  const user = await getServerUser()
  if (!user?.id) return <Unauthorized />

  const prismaAssessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      tasks: {
        select: {
          task: { select: { id: true, title: true, fullScore: true } }
        }
      }
    }
  })

  if (!prismaAssessment) return notFound()

  const assessment = {
    ...prismaAssessment,
    instruction: prismaAssessment.instruction
      ? await mdxToHtml(prismaAssessment.instruction)
      : null,
    tasks: prismaAssessment.tasks.map(edge => edge.task),
    open: prismaAssessment.open.toISOString(),
    close: prismaAssessment.close.toISOString()
  } satisfies IAssessmentwithTask

  const scores = await getSubmissionsAndCalculateScore(assessmentId, user.id)

  const solved = `${scores.filter(sc => sc.score === 100).length}/${
    scores.length
  }`

  const score = scores.reduce((acc, cur) => acc + cur.score, 0)

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col items-center space-y-1 py-10 text-gray-500 dark:text-gray-300">
        <p className="text-xl font-semibold">Assessments</p>
      </div>
      <div className="flex w-full max-w-4xl flex-col px-2">
        {assessment ? (
          <AssessmentCard
            assessment={assessment}
            solved={solved}
            score={score}
          />
        ) : (
          <div className="h-48 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-500" />
        )}

        {assessment.instruction && (
          <div className="prose mt-8 w-full max-w-none dark:text-gray-100">
            {typeof assessment.instruction === 'object' && (
              <MDXRemote {...assessment.instruction} />
            )}
          </div>
        )}

        <div className="mb-2 mt-10 flex justify-between px-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
            Problem Title
          </p>
          <p className="flex w-[8.5rem] justify-center text-sm font-medium text-gray-500 dark:text-gray-100">
            Score
          </p>
        </div>
        <div className="flex w-full flex-col space-y-2">
          {assessment?.tasks.map(task => {
            return (
              <TaskCard
                task={task}
                key={task.id}
                id={assessmentId}
                score={scores.filter(sc => sc.id === task.id)[0]?.score}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
