import React from 'react'
import firebase from 'firebase'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ISubmissions } from '../redux/types/submission'
import { SubmitPage } from '../components/tasks/Submit'
import { CustomSpin } from '../components/Spin'
import styled from 'styled-components'
import { Row, Col } from 'antd'

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 3%;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  margin-top: 24px;
  box-sizing: border-box;
  background-color: white;
`

interface ISubmissionDetail {
  onInitialLoad: (id: string) => void
  detail: ISubmissions
  match: any
  user: firebase.User
  status: 'LOADING' | 'SUCCESS' | null
}

class SubmissionDetailComponent extends React.Component<ISubmissionDetail> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
    setInterval(() => {
      this.props.onInitialLoad(this.props.match.params.id)
    }, 3000)
  }
  state = {
    step: 0
  }
  render() {
    if (this.props.status === 'LOADING' && this.state.step === 0) {
      this.setState({ step: 1 })
    }
    if (this.props.status === 'SUCCESS' && this.state.step === 1) {
      this.setState({ step: 2 })
    }
    if (this.state.step === 2) {
      return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={22} offset={1}>
            <Wrapper>
              <p>Problem ID: {this.props.detail.problem_id}</p>
              <p>Status: {this.props.detail.status}</p>
              <p>Points: {this.props.detail.points}</p>
              <p>Memory: {this.props.detail.memory} KB</p>
              <p>Time: {this.props.detail.time} second</p>
              <p>User: {this.props.detail.username}</p>
              <SubmitPage
                problem_id={this.props.detail.problem_id}
                code={this.props.detail.code}
                canSubmit={this.props.user.uid === this.props.detail.uid}
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
