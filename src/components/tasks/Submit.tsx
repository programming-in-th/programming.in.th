import React from 'react'
import { Row, Icon, Result, Button, Select } from 'antd'

import * as actionCreators from '../../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { Link } from 'react-router-dom'

import { Upload } from '../tasks/FileUploader'

import { Code } from '../Code'
import { openNotificationWithIcon } from '../Notification'

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
  code: string
  canSubmit: boolean
  errorSubmit: () => void
  reSubmit: () => void
  user: firebase.User
  submit: (
    uid: string,
    problem_id: string,
    code: string,
    language: string
  ) => void
  submission_uid: string
  submissionResponse: number
}

interface ISubmitState {
  language: string
  theme: string
  code: string
  uploadedCode: string
}

class SubmitComponent extends React.Component<ISubmitProps, ISubmitState> {
  state = {
    language: 'text/x-csrc',
    theme: 'material',
    code: '',
    uploadedCode: ''
  }

  componentDidMount() {
    this.setState({ code: this.props.code })
    this.props.reSubmit()
  }

  changeLanguage = (value: string) => {
    this.setState({ language: value })
  }

  changeEditor = (
    editor: CodeMirror.Editor,
    value: CodeMirror.EditorChange,
    code: string
  ) => {
    this.updateCode(code)
  }

  getCodeFromUpload = (code: string) => {
    this.setState({ uploadedCode: code, code })
  }

  updateCode = (code: string) => {
    this.setState({ code: code })
  }

  changeTheme = (value: string) => {
    this.setState({ theme: value })
  }

  submitCode = () => {
    const { user } = this.props

    if (!user) {
      this.props.errorSubmit()
      return
    }

    this.props.submit(
      user.uid,
      this.props.problem_id,
      this.state.code,
      mapLanguage[this.state.language]
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.props.submissionResponse === -1 ? (
          <Result
            status="success"
            icon={<Icon type="loading" />}
            title="Submiting"
          />
        ) : this.props.submissionResponse === 200 ? (
          <Result
            title="Submission Successful"
            status="success"
            extra={[
              <Link to={'/submissions/' + this.props.submission_uid}>
                <Button type="primary">View Submission</Button>
              </Link>,
              <Button onClick={this.props.reSubmit}>Resubmit</Button>
            ]}
          />
        ) : this.props.submissionResponse !== 0 ? (
          <Result
            status="error"
            title="Submission Failed"
            extra={[<Button onClick={this.props.reSubmit}>Resubmit</Button>]}
          />
        ) : (
          <React.Fragment>
            <h1>Submit Code</h1>
            <Row>
              <Select
                defaultValue={languageData[0][0]}
                style={{ width: 120 }}
                onChange={this.changeLanguage}
              >
                {languageData.map((data: any) => (
                  <Option key={data[0]}>{data[1]}</Option>
                ))}
              </Select>
              <Select
                defaultValue={themeData[0][0]}
                style={{ width: 120 }}
                onChange={this.changeTheme}
              >
                {themeData.map((data: any) => (
                  <Option key={data[0]}>{data[1]}</Option>
                ))}
              </Select>
              <Upload getCodeFromUpload={this.getCodeFromUpload}></Upload>
            </Row>
            <Row>
              <Code
                options={{
                  mode: `${this.state.language}`,
                  theme: `${this.state.theme}`,
                  lineNumbers: true,
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                  lineWrapping: true
                }}
                onChange={this.changeEditor}
                value={this.state.uploadedCode}
              />
              <Button
                type="primary"
                onClick={this.submitCode}
                disabled={!this.props.canSubmit}
              >
                Submit
              </Button>
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    submissionResponse: state.submissions.submissionResponse,
    submission_uid: state.submissions.submission_uid,
    user: state.user.user
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    submit: (
      uid: string,
      problem_id: string,
      code: string,
      language: string
    ) => {
      console.log(uid, problem_id, code, language)
      dispatch(actionCreators.makeSubmission(uid, problem_id, code, language))
    },
    reSubmit: () => dispatch(actionCreators.resubmitSubmission()),
    errorSubmit: () => dispatch(actionCreators.errorSubmit())
  }
}

export const SubmitPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitComponent) as any
