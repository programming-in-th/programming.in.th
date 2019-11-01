import React, { useState } from 'react'
import Link from 'next/link'
import { Row, Icon, Result, Button, Select, Switch } from 'antd'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../redux/actions/index'

import { SubFilterWrapper } from '../../design/atomics'

import { Upload } from '../upload'

import { Code } from '../CodeEditor'
import { IAppState } from '../../redux'

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 1020px) {
    display: block;
  }
`

const { Option } = Select

const languageData = [['text/x-csrc', 'C / C++'], ['python', 'Python']]

type TPlot = {
  [key: string]: string
}

const mapLanguage: TPlot = {
  'text/x-csrc': 'cpp',
  python: 'python'
}

const themeData = [
  ['material', 'Material'],
  ['monokai', 'Monokai'],
  ['solarized', 'Solarized Light']
]

interface ISubmitProps {
  problem_id: string
  canSubmit: boolean
}

interface ISubmitProps {
  problem_id: string
  canSubmit: boolean
}

interface ISubmitSetting {
  language: string
  theme: string
  hideCode: boolean
}

export const Submit: React.FunctionComponent<ISubmitProps> = (
  props: ISubmitProps
) => {
  const [setting, setSetting] = useState<ISubmitSetting>({
    language: 'text/x-csrc',
    theme: 'material',
    hideCode: true
  })

  const [codeValue, setCode] = useState<string>('')
  const [codeFromUpload, setCodeFromUpload] = useState<string>('')

  const dispatch = useDispatch()

  const submissionResponse = useSelector(
    (state: IAppState) => state.submissions.submissionResponse
  )
  const submissionUID = useSelector(
    (state: IAppState) => state.submissions.submission_uid
  )
  const user = useSelector(
    (state: IAppState) => state.user.user
  ) as firebase.User

  const changeLanguage = (value: string) => {
    setSetting({ ...setting, language: value })
  }

  const changeEditor = (
    editor: CodeMirror.Editor,
    value: CodeMirror.EditorChange,
    code: string
  ) => {
    updateCode(code)
  }

  const getCodeFromUpload = (code: string) => {
    setCodeFromUpload(code)
  }

  const updateCode = (code: string) => {
    setCode(code)
  }

  const changeTheme = (value: string) => {
    setSetting({ ...setting, theme: value })
  }

  const handleHideCode = (value: boolean) => {
    setSetting({ ...setting, hideCode: value })
  }

  const submitCode = () => {
    if (!user) {
      dispatch(actionCreators.errorSubmit())
      return
    }

    dispatch(
      actionCreators.makeSubmission(
        user.uid,
        props.problem_id,
        codeValue,
        mapLanguage[setting.language],
        setting.hideCode
      )
    )
  }

  const reSubmit = () => {
    dispatch(actionCreators.resubmitSubmission())
  }

  return (
    <React.Fragment>
      {submissionResponse === -1 ? (
        <Result
          status="success"
          icon={<Icon type="loading" />}
          title="Submiting"
        />
      ) : submissionResponse === 200 ? (
        <Result
          title="Submission Successful"
          status="success"
          extra={[
            <Link href={'/submissions/' + submissionUID}>
              <Button type="primary">View Submission</Button>
            </Link>,
            <Button onClick={reSubmit}>Resubmit</Button>
          ]}
        />
      ) : submissionResponse !== 0 ? (
        <Result
          status="error"
          title="Submission Failed"
          extra={[<Button onClick={reSubmit}>Resubmit</Button>]}
        />
      ) : (
        <React.Fragment>
          <h1 style={{ marginBottom: 15 }}>Submit Code</h1>
          <OptionsWrapper>
            <SubFilterWrapper>
              <Select
                defaultValue={languageData[0][0]}
                style={{ width: 120 }}
                onChange={changeLanguage}
              >
                {languageData.map((data: any) => (
                  <Option key={data[0]}>{data[1]}</Option>
                ))}
              </Select>
            </SubFilterWrapper>
            <SubFilterWrapper>
              <Select
                defaultValue={themeData[0][0]}
                style={{ width: 120 }}
                onChange={changeTheme}
              >
                {themeData.map((data: any) => (
                  <Option key={data[0]}>{data[1]}</Option>
                ))}
              </Select>
            </SubFilterWrapper>
            <SubFilterWrapper>
              <Upload getCodeFromUpload={getCodeFromUpload}></Upload>
            </SubFilterWrapper>
            <SubFilterWrapper>
              <p>Hide Code: </p>
              <Switch
                style={{ marginLeft: 10 }}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked={setting.hideCode}
                onChange={handleHideCode}
              />
            </SubFilterWrapper>
          </OptionsWrapper>
          <Row>
            <Code
              options={{
                mode: `${setting.language}`,
                theme: `${setting.theme}`,
                lineNumbers: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                lineWrapping: true
              }}
              onChange={changeEditor}
              value={codeFromUpload}
            />
            <Button
              type="primary"
              onClick={submitCode}
              disabled={!props.canSubmit}
            >
              Submit
            </Button>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
