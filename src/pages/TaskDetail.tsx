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

// const __html = require('https://raw.githubusercontent.com/programming-in-th/legacy_statement/master/2040.html');

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
    console.log(this.props.task.url)
    axios.get(this.props.task.url).then((res: any) => {
      console.log(res.data)
      this.setState({ problemStatement: res.data })
    })
  }
  render() {
    const template = { __html: this.state.problemStatement }
    if (this.props.status === 'LOADING' && this.state.isInit === false)
      this.setState({ isInit: true })
    if (
      this.props.status === 'SUCCESS' &&
      this.state.isInit &&
      this.state.problemStatement === ''
    )
      this.loadStatement()
    if (
      this.props.task &&
      this.props.status === 'SUCCESS' &&
      this.state.problemStatement !== ''
    )
      return (
        <Row gutter={24}>
          <Col span={1} />
          <Col span={22}>
            {/* <BlankComponent height="600px" /> */}
            <Wrapper>
              <h1>{this.props.task.title}</h1>
              <p> time limit : {this.props.task.time_limit} second </p>
              <p> memory limit : {this.props.task.memory_limit} MB </p>
              <StatementComponent dangerouslySetInnerHTML={template} />
            </Wrapper>
            <Wrapper style={{ height: '440px' }}>
              <SubmitPage problemID={this.props.match.params.id} />
            </Wrapper>
          </Col>
          {/* <Col span={6}>
            <BlankComponent height="300px" />
            <BlankComponent height="250px" />
          </Col> */}
          <Col span={1} />
        </Row>
      )
    return <CustomSpin />
  }
}

const mapStateToProps: (state: any) => any = state => {
  console.log(state.tasks)
  return {
    task: state.tasks.currentTask,
    status: state.tasks.status
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
