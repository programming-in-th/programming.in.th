import React, { useState, useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import styled from 'styled-components'
import { Select, Skeleton, Spin } from 'antd'

import { transformStatus } from '../../utils/transform'

import { PageLayout } from '../../components/Layout'
import { fetchFromFirebase } from '../../utils/fetcher'
import { media } from '../../design/Responsive'

const CodeDisplay = dynamic(
  () => import('../../components/CodeEditor').then(mod => mod.CodeDisplay),
  {
    loading: () => <Spin />,
    ssr: false
  }
) as any

const { Option } = Select

const Wrapper = styled.div`
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border-radius: 8px;
  background-color: white;

  width: 70%;
  margin: 24px auto 24px auto;

  ${media('TABLET')} {
    width: calc(100% - 10px * 2);
  }
`

const Detail = styled.div`
  margin-bottom: 16px;
`

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
      <Wrapper>
        {data ? (
          <React.Fragment>
            <Detail>
              <h1>
                [{current.problem_id}] {current.problem_name}
              </h1>
              <p>Status: {current.status}</p>
              <p>Points: {current.points}</p>
              <p>Memory: {current.memory} KB</p>
              <p>Time: {current.time} second</p>
              <p>User: {current.username}</p>
            </Detail>
            {current.code !== '' ? (
              <React.Fragment>
                <Select
                  defaultValue={themeData[0][0]}
                  style={{ width: 120 }}
                  onChange={(val: string) => setTheme(val)}
                >
                  {themeData.map((data: string[]) => (
                    <Option key={data[0]}>{data[1]}</Option>
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
      </Wrapper>
    </PageLayout>
  )
}

export default SubmissionDetail
