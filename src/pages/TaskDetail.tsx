import React from 'react'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../redux/types/task'
import { SubmitPage } from '../components/tasks/Submit'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import { CustomSpin } from '../components/Spin'

interface ITaskProps {
  task?: ITask
  status: string
  match: any
  user: firebase.User
  onInitialLoad: (id: string) => void
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 3%;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  margin-top: 24px;
  box-sizing: border-box;
  background-color: white;
`

const BlankComponent = (height: any) => {
  const BlankWrapper = styled.div`
    width: 100%;
    ${height};
    padding: 20px 15%;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    margin-top: 24px;
    background-color: white;
  `
  return <BlankWrapper />
}

const StatementComponent = styled.div`
  & table,
  table tbody tr,
  table tbody tr td,
  table tbody tr th {
    border: 1px solid black;
    border-collapse: collapse;
  }
  & table tbody tr td {
    font-family: consolas, 'courier new', courier, monospace;
    width: 40%;
    border: 1px solid gray;
    padding: 6px;
    vertical-align: top;
  }
`

export class TaskDetailComponent extends React.Component<ITaskProps> {
  state = {
    problemStatement: '',
    isInit: false
  }

  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
    this.setState({ problemStatement: '' })
  }

  loadStatement = () => {
    if (!this.props.task) return
    axios.get(this.props.task.url).then((res: any) => {
      this.setState({ problemStatement: res.data })
    })
  }

  render() {
    const template = { __html: this.state.problemStatement }
    if (this.props.status === 'LOADING' && this.state.isInit === false) {
      this.setState({ isInit: true })
    }

    if (
      this.props.status === 'SUCCESS' &&
      this.state.isInit &&
      this.state.problemStatement === ''
    ) {
      this.loadStatement()
    }

    if (
      this.props.task &&
      this.props.status === 'SUCCESS' &&
      this.state.problemStatement !== ''
    ) {
      return (
        <div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={22} offset={1}>
              <Wrapper>
                <h1>{this.props.task.title}</h1>
                <p> Time Limit : {this.props.task.time_limit} second(s)</p>
                <p> Memory Limit : {this.props.task.memory_limit} MB(s)</p>
                <StatementComponent dangerouslySetInnerHTML={template} />
              </Wrapper>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={22} offset={1}>
              <Wrapper style={{ height: '440px' }}>
                <SubmitPage
                  problem_id={this.props.match.params.id}
                  canSubmit={this.props.user}
                />
              </Wrapper>
            </Col>
          </Row>
        </div>
      )
    }

    return <CustomSpin />
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    task: state.tasks.currentTask,
    status: state.tasks.status,
    user: state.user.user
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: (id: string): void => {
      dispatch(actionCreators.loadTask(id))
    }
  }
}

export const TaskDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetailComponent) as any
