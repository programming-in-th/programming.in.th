import { useEffect } from 'react'

import useSWR, { useSWRConfig } from 'swr'

import { IGeneralSubmission } from '@/types/submissions'

import {
  JUDGE_COMPLETED,
  JUDGE_ERROR,
  JUDGE_COMPILATION_ERROR
} from './constant'
import fetcher from './fetcher'

const useSubmissionData = (id: number) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<IGeneralSubmission>(
    `/api/submissions/${id}`,
    fetcher
  )

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_REALTIME_URL}?id=${id}`
    )

    eventSource.onmessage = event => {
      const data = JSON.parse(`${event.data}`)

      if (
        data.status === JUDGE_COMPLETED ||
        data.status === JUDGE_ERROR ||
        data.status === JUDGE_COMPILATION_ERROR
      ) {
        console.log('DONE mutate')
        mutate(`/api/submissions/${id}`)
        eventSource.close()
      }

      mutate(
        `/api/submissions/${id}`,
        async (submission: IGeneralSubmission) => {
          return Object.assign({}, submission, data)
        },
        {
          revalidate: false
        }
      )
    }

    return () => {
      eventSource.close()
    }
  }, [id, mutate])

  return { submission: data, isLoading: !error && !data, isError: error }
}

export default useSubmissionData
