import { PageLayout } from '@/components/Layout'
import fetcher from '@/lib/fetcher'
import { IAssessment } from '@/types/assessments'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

const Card = (assessment: IAssessment & { index: number }) => (
  <Link href={`/assessments/${assessment.id}`}>
    <a className="flex flex-col justify-between space-y-2 rounded-lg shadow-md">
      <div className="flex w-full px-10 py-4">
        <div className="flex w-1/3 flex-col">
          <p className="text-xl text-gray-500">{assessment.name}</p>
          <p className="text-base text-gray-500">{`#${assessment.id}`}</p>
        </div>
        <p className="w-2/3">{assessment.description}</p>
      </div>
      <div className="flex w-full justify-between rounded-b-lg bg-gray-50 px-10 py-4">
        <div className="flex h-auto flex-col justify-between">
          <p className="text-sm text-gray-400">{`Open: ${dayjs(
            assessment.open
          ).format('DD MMM YYYY HH:mm:ss')}`}</p>
          <p className="text-sm text-gray-400">{`Close: ${dayjs(
            assessment.close
          ).format('DD MMM YYYY HH:mm:ss')}`}</p>
        </div>
        <div className="flex divide-x">
          <div className="flex flex-col items-center px-4">
            <p className="text-sm text-gray-400">Solved</p>
            <p className="text-base text-gray-500">9/11</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <p className="text-sm text-gray-400">Score</p>
            <p className="text-base text-gray-500">9/100</p>
          </div>
        </div>
      </div>
    </a>
  </Link>
)

const Assessments = () => {
  const { data: assessments } = useSWR<IAssessment[]>(
    '/api/assessments',
    fetcher
  )
  return (
    <PageLayout>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center space-y-1 py-10 text-gray-500 dark:text-gray-300">
          <p className="text-xl font-semibold">Assessments</p>
          <p className="text-sm">you have 4 uncompleted assessments</p>
        </div>
        <div className="flex w-full max-w-5xl flex-col space-y-1">
          {assessments?.map((assessment, index) => (
            <Card {...assessment} key={assessment.id} index={index} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default Assessments
