import React, { useState } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

import { transformStatus } from '../../utils/transform'
import { CodeDisplay } from '../../components/CodeEditor'
import { ContainerWrapper } from '../../design/Atomics'

import { NextPage } from 'next'
import firebase from '../../lib/firebase'
import { ISubmission } from '../../redux/types/submission'
import { PageLayout } from '../../components/Layout'

const { Option } = Select

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 3%;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
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

interface ISDInitialProps {
  rawDetail: ISubmission
}

const SubmissionDetail: NextPage<ISDInitialProps> = (
  props: ISDInitialProps
) => {
  const [theme, setTheme] = useState<string>('material')
  const detail = transformStatus(props.rawDetail)

  return (
    <PageLayout>
      <ContainerWrapper>
        <Wrapper>
          <div style={{ margin: '15px 0' }}>
            <h1>
              [{detail.problem_id}] {detail.problem_name}
            </h1>
            <p>Status: {detail.status}</p>
            <p>Points: {detail.points}</p>
            <p>Memory: {detail.memory} KB</p>
            <p>Time: {detail.time} second</p>
            <p>User: {detail.username}</p>
          </div>
          {detail.code !== '' ? (
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
                  mode: `${mapLanguage[detail.language]}`,
                  theme: `${theme}`,
                  lineNumbers: true,
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                  lineWrapping: true
                }}
                onBeforeChange={(editor, data, value) => {}}
                value={detail.code as string}
              />
            </React.Fragment>
          ) : (
            <h1>Code Hidden</h1>
          )}
        </Wrapper>
      </ContainerWrapper>
    </PageLayout>
  )
}

SubmissionDetail.getInitialProps = async ({ query }) => {
  const submissionID = query.id

  const response = await firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getDetailedSubmissionData')({ submission_id: submissionID })

  const currentSubmission = response.data

  if (currentSubmission) {
    const detail = {
      ...currentSubmission.metadata,
      submissionID,
      code: currentSubmission.code
    }

    return {
      rawDetail: detail
    }
  }
}

export default SubmissionDetail
