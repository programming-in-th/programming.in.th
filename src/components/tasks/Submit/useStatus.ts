import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { mutate } from 'swr'
import { useAuth } from 'lib/auth'

export const useStatus = ({ metadata, status, submissionID, codeValue }) => {
  const { userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === 'OK') {
      mutate(['getSubmission', submissionID], {
        username: userData?.username,
        task: metadata,
        code: codeValue,
      })

      router.push('/submissions/[id]', `/submissions/${submissionID}`)
    } else if (status === 'ERROR') {
      // Handle error
    }
  }, [status, submissionID, codeValue, metadata, router, userData?.username])
}
