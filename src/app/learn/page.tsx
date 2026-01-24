import { Suspense } from 'react'

import { Metadata, type NextPage } from 'next'

import { LearnContent } from './LearnContent'
import { LearnSidebar } from './LearnSidebar'

export const metadata: Metadata = {
  title: 'Learn | programming.in.th'
}

const Learn: NextPage = () => {
  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-center pb-6 pt-6">
          <p className="text-3xl font-medium text-gray-500 dark:text-gray-100">
            Learn
          </p>
          <p className="text-md text-gray-500 dark:text-gray-300">
            Learn with programing.in.th
          </p>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          <Suspense>
            <LearnSidebar />
            <LearnContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Learn
