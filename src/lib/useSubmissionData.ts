import { useEffect } from 'react'

import useSWR from 'swr'

import { IGeneralSubmission } from '@/types/submissions'

import {
  JUDGE_COMPLETED,
  JUDGE_ERROR,
  JUDGE_COMPILATION_ERROR
} from './constant'
import fetcher from './fetcher'

const useSubmissionData = (id: number) => {
  const { data, error, mutate } = useSWR<IGeneralSubmission>(
    `/api/submissions/${id}`,
    fetcher
  )

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_REALTIME_URL}?id=${id}`
    )

    eventSource.onmessage = event => {
      const realtimeData = JSON.parse(`${event.data}`)

      if (
        realtimeData.status === JUDGE_COMPLETED ||
        realtimeData.status === JUDGE_ERROR ||
        realtimeData.status === JUDGE_COMPILATION_ERROR
      ) {
        mutate()
        eventSource.close()
      } else {
        mutate(
          async submission => {
            return submission
              ? Object.assign({}, submission, realtimeData)
              : submission
          },
          {
            revalidate: false
          }
        )
      }
    }

    return () => {
      eventSource.close()
    }
  }, [id, mutate])

  return { submission: data, isLoading: !error && !data, isError: error }
}

export default useSubmissionData
