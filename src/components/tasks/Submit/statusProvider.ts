import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/core'

import { mutate } from 'swr'
import { useUser } from '../../UserContext'

export const statusProvider = ({
  metadata,
  status,
  submissionID,
  codeValue,
}) => {
  const toast = useToast()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (status === 'OK') {
      mutate(['getSubmission', submissionID], {
        username: user.username,
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
