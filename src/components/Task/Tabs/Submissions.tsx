import { Task } from '@prisma/client'

import { Card, Header } from '@/components/Submission/Card'
import useSubmissionList from '@/lib/useSubmissionList'

const SubmissionsTab = ({
  task,
  assessmentId
}: {
  task: Task
  assessmentId?: string
}) => {
  const { submissions, isLoadingMore, isReachingEnd, size, setSize } =
    useSubmissionList(task.id, assessmentId)

  return (
    <div className="flex flex-shrink flex-col">
      <Header isViewing />
      <div className="flex flex-col space-y-2 md:mt-2">
        {submissions.map(sub => (
          <Card key={sub.id} sub={sub} task={task} isViewing />
        ))}
      </div>
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore ? (
          <div className="mt-4 flex w-full justify-center">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : isReachingEnd ? (
          <></>
        ) : (
          <div className="mt-4 flex w-full items-center justify-center space-x-2 text-sm text-gray-400 dark:text-gray-300">
            <p>show more</p>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5 5L9 1" stroke="#94A3B8" />
            </svg>
          </div>
        )}
      </button>
    </div>
  )
}

export default SubmissionsTab
