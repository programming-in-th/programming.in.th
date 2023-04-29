import useSWR from 'swr'

import { IGeneralSubmission } from '@/types/submissions'

import {
  JUDGE_COMPLETED,
  JUDGE_ERROR,
  JUDGE_COMPILATION_ERROR
} from './constant'
import fetcher from './fetcher'

export const useSSESubmissionData = (id: number) => {
  const { data, error, mutate } = useSWR<IGeneralSubmission>(
    `/api/submissions/${id}`,
    fetcher
  )

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_REALTIME_URL}?id=${id}`
  //   )

  //   eventSource.onmessage = event => {
  //     const realtimeData = JSON.parse(`${event.data}`)

  //     if (
  //       realtimeData.status === JUDGE_COMPLETED ||
  //       realtimeData.status === JUDGE_ERROR ||
  //       realtimeData.status === JUDGE_COMPILATION_ERROR
  //     ) {
  //       mutate()
  //       eventSource.close()
  //     } else {
  //       mutate(
  //         async submission => {
  //           return submission
  //             ? Object.assign({}, submission, realtimeData)
  //             : submission
  //         },
  //         {
  //           revalidate: false
  //         }
  //       )
  //     }
  //   }

  //   return () => {
  //     eventSource.close()
  //   }
  // }, [id, mutate])

  return {
    submission: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export const useShortPollingSubmissionData = (id: number) => {
  const { data, error } = useSWR<IGeneralSubmission>(
    `/api/submissions/${id}`,
    fetcher
  )

  const { data: updates } = useSWR<
    Pick<IGeneralSubmission, 'groups' | 'id' | 'score' | 'status'>
  >(`/api/submissions/${id}/realtime`, fetcher, {
    refreshInterval: data => {
      if (
        data?.status === JUDGE_COMPLETED ||
        data?.status === JUDGE_ERROR ||
        data?.status === JUDGE_COMPILATION_ERROR
      ) {
        return 0
      }

      return 1500
    }
  })

  return {
    submission: { ...data, ...updates } as IGeneralSubmission,
    isLoading: !error && !data,
    isError: error
  }
}
