import useSWR from 'swr'

import AssessmentCard from '@/components/Assessment/AssessmentCard'
import { PageLayout } from '@/components/Layout'
import fetcher from '@/lib/fetcher'
import { IAssessment } from '@/types/assessments'

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
          <p className="text-sm">{`you have ${
            assessments?.length || 0
          } uncompleted assessments`}</p>
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
    </PageLayout>
  )
}

export default Assessments
