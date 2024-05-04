'use client'

import useSWR from 'swr'

import AssessmentCard from '@/components/Assessment/AssessmentCard'
import fetcher from '@/lib/fetcher'
import { IAssessment } from '@/types/assessments'

export default function Assessments() {
  const { data: assessments, isLoading } = useSWR<IAssessment[]>(
    '/api/assessments',
    fetcher
  )

  return (
    <>
      <head>
        <title>Assesments | programming.in.th</title>
      </head>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center space-y-1 py-10 text-gray-500 dark:text-gray-300">
          <p className="text-xl font-semibold">Assessments</p>
          <p className="text-sm">
            {isLoading
              ? 'Loading...'
              : `You have ${assessments?.length || 0} uncompleted assessments`}
          </p>
        </div>
        <div className="flex w-full max-w-4xl flex-col space-y-1">
          {assessments?.map(assessment => (
            <AssessmentCard
              assessment={assessment}
              key={assessment.id}
              isLink
            />
          ))}
        </div>
      </div>
    </>
  )
}
