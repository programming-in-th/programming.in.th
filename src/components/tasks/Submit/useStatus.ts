import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/core'

import { mutate } from 'swr'
import { useAuth } from 'lib/auth'

export const useStatus = ({ metadata, status, submissionID, codeValue }) => {
  const toast = useToast()
  const { userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === 'OK') {
      mutate(['getSubmission', submissionID], {
        username: userData.username,
        task: metadata,
        code: codeValue,
      })

      router.push('/submissions/[id]', `/submissions/${submissionID}`)
    } else if (status === 'ERROR') {
      toast({
        title: 'Error!',
        description: 'An unknown error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [status, submissionID])
}
