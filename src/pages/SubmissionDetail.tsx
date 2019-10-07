import React from 'react'
import styled from 'styled-components'

import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import * as actionCreators from '../redux/actions/index'
import { ISubmissions } from '../redux/types/submission'
import { CustomSpin } from '../components/Spin'

import { Code } from '../components/Code'
import { Row, Col, Select } from 'antd'

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
  detail: ISubmissions
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
    const { detail } = this.props

    if (this.props.status === 'SUCCESS') {
      return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={22} offset={1}>
            <Wrapper>
              <p>Problem ID: {detail.problem_id}</p>
              <p>Status: {detail.status}</p>
              <p>Points: {detail.points}</p>
              <p>Memory: {detail.memory} KB(s)</p>
              <p>Time: {detail.time} second(s)</p>
              <p>User: {detail.username}</p>
              <Select
                defaultValue={themeData[0][0]}
                style={{ width: 120 }}
                onChange={this.changeTheme}
              >
                {themeData.map((data: any) => (
                  <Option key={data[0]}>{data[1]}</Option>
                ))}
              </Select>
              <Code
                options={{
                  mode: `${mapLanguage[detail.language]}`,
                  theme: `${this.state.theme}`,
                  lineNumbers: true,
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                  lineWrapping: true
                }}
                value={detail.code}
              />
            </Wrapper>
          </Col>
        </Row>
      )
    }
    return <CustomSpin />
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    detail: state.submissions.detail,
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
