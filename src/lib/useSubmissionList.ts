import useSWRInfinite from 'swr/infinite'

import { IGeneralSubmission } from '@/types/submissions'

import fetcher from './fetcher'

const PAGE_SIZE = 10

const getKey = (pageIndex, previousPageData, taskId) => {
  // reached the end
  if (previousPageData && !previousPageData.data) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0)
    return `/api/submissions?limit=10&filter=task&taskId=${taskId}`

  // add the cursor to the API endpoint
  return `/api/submissions?cursor=${previousPageData.nextCursor}&limit=10&filter=task&taskId=${taskId}`
}

// get submission list from server with infinite loading
const useSubmissionList = (taskId: string) => {
  const {
    data: rawData,
    error,
    mutate,
    size,
    setSize,
    isValidating
  } = useSWRInfinite(
    (index, previousPageData) => getKey(index, previousPageData, taskId),
    fetcher
  )

  const data = rawData ? rawData.map(data => data.data) : []
  const submissions = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  return {
    submissions,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    setSize,
    mutate,
    size
  }
}

export default useSubmissionList
