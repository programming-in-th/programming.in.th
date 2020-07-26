import React, { useEffect } from 'react'
import { Box, Button } from '@chakra-ui/core'

import { useUser } from '../../UserContext'
import { useSubmit } from './useSubmit'

import { Controlled as CodeMirror } from 'react-codemirror2'

export const Submit = ({ metadata }) => {
  const { user } = useUser()
  const { submit, setCode, codeValue, status } = useSubmit(metadata)

  useEffect(() => {
    setCode([''])
  }, [])

  const changeEditor = (editor: any, value: any, code: string) => {
    setCode([code])
  }

  return (
    <Box p={[6, 0]} mt={[0, 4]} mx={[0, 'auto']} w={['100%', 600]}>
      <CodeMirror
        options={{
          mode: 'text/x-csrc',
          theme: 'material',
          lineNumbers: true,
          autoCloseBrackets: true,
        }}
        onBeforeChange={changeEditor}
        value={codeValue[0]}
      />
      <Button
        isLoading={status === 'LOADING'}
        onClick={submit}
        isDisabled={user.user === null}
      >
        Submit
      </Button>
    </Box>
  )
}
