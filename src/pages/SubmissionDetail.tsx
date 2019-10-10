import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import * as actionCreators from '../redux/actions/index'
import { ISubmission } from '../redux/types/submission'
import { CustomSpin } from '../components/Spin'
import { transformStatus } from '../utils/transform'
import { CodeDisplay } from '../components/Code'
import { ContainerWrapper } from '../components/atomics'

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

interface ISubmissionDetail {
  onInitialLoad: (id: string) => void
  resetCurrentSubmissionUID: () => void
  currentSubmissionUID: string
  detail: ISubmission
  match: any
  user: firebase.User
  status: 'LOADING' | 'SUCCESS' | null
}

class SubmissionDetailComponent extends React.Component<ISubmissionDetail> {
  state = {
    theme: 'material'
  }

  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
  }

  changeTheme = (value: string) => {
    this.setState({ theme: value })
  }

  render() {
    if (this.props.status === 'SUCCESS') {
      return (
        <ContainerWrapper>
          <Wrapper>
            <div style={{ margin: '15px 0' }}>
              <p>Status: {this.props.detail.status}</p>
              <p>Points: {this.props.detail.points}</p>
              <p>Memory: {this.props.detail.memory} KB</p>
              <p>Time: {this.props.detail.time} second</p>
              <p>User: {this.props.detail.username}</p>
            </div>
            <Select
              defaultValue={themeData[0][0]}
              style={{ width: 120 }}
              onChange={this.changeTheme}
            >
              {themeData.map((data: any) => (
                <Option key={data[0]}>{data[1]}</Option>
              ))}
            </Select>
            <CodeDisplay
              options={{
                mode: `${mapLanguage[this.props.detail.language]}`,
                theme: `${this.state.theme}`,
                lineNumbers: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                lineWrapping: true
              }}
              onBeforeChange={(editor, data, value) => {}}
              value={this.props.detail.code as string}
            />
          </Wrapper>
        </ContainerWrapper>
      )
    }
    return <CustomSpin />
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    detail: transformStatus(state.submissions.detail),
    status: state.submissions.detailStatus,
    user: state.user.user
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: (submission_id: string) => {
      dispatch(actionCreators.loadDetail(submission_id))
    }
  }
}

export const SubmissionDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionDetailComponent) as any
