import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Select, Skeleton } from 'antd'

import { transformStatus } from '../../utils/transform'
import { CodeDisplay } from '../../components/CodeEditor'
import { ContainerWrapper, Center } from '../../design/Atomics'

import { NextPage } from 'next'
import { PageLayout } from '../../components/Layout'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { fetchSubmissionData } from '../../utils/fetchSubmissionData'

const { Option } = Select

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 3%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin-top: 24px;
  box-sizing: border-box;
  background-color: white;
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
  const router = useRouter()
  const { id } = router.query

  const { data } = useSWR(`${id}`, fetchSubmissionData)

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
      <ContainerWrapper>
        <Wrapper>
          {data ? (
            <React.Fragment>
              <div style={{ margin: '15px 0' }}>
                <h1>
                  [{current.problem_id}] {current.problem_name}
                </h1>
                <p>Status: {current.status}</p>
                <p>Points: {current.points}</p>
                <p>Memory: {current.memory} KB</p>
                <p>Time: {current.time} second</p>
                <p>User: {current.username}</p>
              </div>
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
      </ContainerWrapper>
    </PageLayout>
  )
}

export default SubmissionDetail
