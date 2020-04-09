import React, { useState, useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import styled from '@emotion/styled'
import {
  Spinner,
  Select,
  Skeleton,
  Box,
  Flex,
  Heading,
  Link as ChakraLink
} from '@chakra-ui/core'

import { transformStatus } from '../../utils/transform'

import { PageLayout } from '../../components/Layout'
import { fetchFromFirebase } from '../../utils/fetcher'
import Link from 'next/link'

const CodeDisplay = dynamic(
  () => import('../../components/Code').then(mod => mod.CodeDisplay),
  {
    loading: () => <Spinner />,
    ssr: false
  }
) as any

const themeData = [
  ['material', 'Material'],
  ['monokai', 'Monokai'],
  ['solarized', 'Solarized Light']
]

type TPlot = {
  [key: string]: string
}

const mapLanguage: TPlot = {
  cpp: 'text/x-csrc',
  python: 'python'
}

const SubmissionDetail: NextPage = () => {
  const [current, setCurrent] = useState<any>({})

  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  const param = useMemo(() => ({ submission_id: id }), [id])
  const { data } = useSWR(
    ['getDetailedSubmissionData', param],
    fetchFromFirebase
  )

  useEffect(() => {
    if (data) {
      const rawDetail = {
        ...data.data.metadata,
        code: data.data.code
      }

      setCurrent(transformStatus(rawDetail))
    }
  }, [data])

  const [theme, setTheme] = useState<string>('material')

  return (
    <PageLayout>
      <Flex align="center" justify="center" width="100%" p={[4, 0]}>
        <Box
          borderRadius={6}
          width="1000px"
          maxWidth="100%"
          boxShadow="var(--shadow-md)"
          p={4}
        >
          {data ? (
            <React.Fragment>
              <Box>
                <Heading fontSize="2xl">
                  [{current.problem_id}] {current.problem_name}
                </Heading>
                <Link href={`/tasks/${current.problem_id}`}>
                  <ChakraLink href={`/tasks/${current.problem_id}`}>
                    Statement
                  </ChakraLink>
                </Link>
                <p>Status: {current.status}</p>
                <p>Points: {current.points}</p>
                <p>Memory: {current.memory} KB</p>
                <p>Time: {current.time} second</p>
                <p>User: {current.username}</p>
              </Box>
              {current.code !== '' ? (
                <React.Fragment>
                  <Select
                    mt={4}
                    width="120px"
                    defaultValue={themeData[0][0]}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setTheme(event.target.value)
                    }
                  >
                    {themeData.map((data: string[]) => (
                      <option key={data[0]} value={data[0]}>
                        {data[1]}
                      </option>
                    ))}
                  </Select>
                  <CodeDisplay
                    options={{
                      mode: `${mapLanguage[current.language]}`,
                      theme: `${theme}`,
                      lineNumbers: true,
                      foldGutter: true,
                      gutters: [
                        'CodeMirror-linenumbers',
                        'CodeMirror-foldgutter'
                      ],
                      lineWrapping: true
                    }}
                    onBeforeChange={(editor, data, value) => {}}
                    value={current.code as string}
                  />
                </React.Fragment>
              ) : (
                <h1>Code Hidden</h1>
              )}
            </React.Fragment>
          ) : (
            <Skeleton></Skeleton>
          )}
        </Box>
      </Flex>
    </PageLayout>
  )
}

export default SubmissionDetail
