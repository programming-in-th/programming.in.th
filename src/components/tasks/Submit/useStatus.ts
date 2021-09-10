import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSWRConfig } from 'swr'
import { useAuth } from 'lib/auth'

export const useStatus = ({ metadata, status, submissionID, codeValue }) => {
  const { userData } = useAuth()
  const { mutate } = useSWRConfig()
  const router = useRouter()

  useEffect(() => {
    if (status === 'OK') {
      mutate(
        ['getSubmission', submissionID],
        {
          username: userData.username,
          task: metadata,
          code: codeValue,
        },
        false
      )

      router.push(`/submissions/${submissionID}`)
    } else if (status === 'ERROR') {
      // Handle error
    }
  }, [
    status,
    submissionID,
    codeValue,
    metadata,
    router,
    mutate,
    userData.username,
  ])
}
