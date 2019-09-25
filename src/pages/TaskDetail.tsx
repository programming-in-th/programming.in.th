import React from 'react'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../redux/types/task'
import { SubmitPage } from '../components/tasks/Submit'
import { Row, Col } from 'antd'
import styled from 'styled-components'

interface ITaskProps {
  task?: ITask
  status: string
  match: any
  onInitialLoad: (id: string) => void
}

const BlankComponent = (height: any) => {
  const BlankWrapper = styled.div`
    width: 100%;
    ${height};
    padding: 10px 20px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    margin-top: 20px;
    background-color: white;
  `
  return <BlankWrapper />
}

export class TaskDetailComponent extends React.Component<ITaskProps> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
  }
  render() {
    return (
      <Row gutter={16}>
        <Col span={1} />
        <Col span={16}>
          <BlankComponent height="600px" />
          <BlankComponent height="350px" />
          {/* <SubmitPage problemID={this.props.match.params.id} /> */}
        </Col>
        <Col span={6}>
          <BlankComponent height="300px" />
          <BlankComponent height="250px" />
        </Col>
        <Col span={1} />
      </Row>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
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
