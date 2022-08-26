import dayjs from 'dayjs'

import IsLink from '@/components/common/IsLink'
import { IAssessment } from '@/types/assessments'

const Card = ({
  assessment,
  isLink = false
}: {
  assessment: IAssessment
  isLink?: boolean
}) => (
  <IsLink
    href={`/assessments/${assessment.id}`}
    className="flex flex-col justify-between space-y-2 rounded-lg shadow-md dark:bg-slate-700"
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
        <p className="w-2/3">{assessment.description}</p>
      </div>
      <div className="flex w-full justify-between rounded-b-lg bg-gray-50 px-10 py-4 dark:bg-slate-600">
        <div className="flex h-auto flex-col justify-between">
          <p className="text-sm text-gray-400 dark:text-gray-300">{`Open: ${dayjs(
            assessment.open
          ).format('DD MMM YYYY HH:mm:ss')}`}</p>
          <p className="text-sm text-gray-400 dark:text-gray-300">{`Close: ${dayjs(
            assessment.close
          ).format('DD MMM YYYY HH:mm:ss')}`}</p>
        </div>
        <div className="flex divide-x">
          <div className="flex flex-col items-center px-4">
            <p className="text-sm text-gray-400 dark:text-gray-300">Solved</p>
            <p className="text-base text-gray-500 dark:text-white">9/11</p>
          </div>
          <div className="flex flex-col items-center pl-4">
            <p className="text-sm text-gray-400 dark:text-gray-300">Score</p>
            <p className="text-base text-gray-500 dark:text-white">9/100</p>
          </div>
        </div>
      </div>
    </>
  </IsLink>
)

export default Card
