import React from 'react'
import { Row, Col } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import axios from 'axios'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../redux/types/task'
import { SubmitPage } from '../components/tasks/Submit'
import { CustomSpin } from '../components/Spin'
import { ContainerWrapper, Padding } from '../components/atomics'

interface ITaskProps {
  task?: ITask
  status: string
  match: any
  user: firebase.User
  onInitialLoad: (id: string) => void
}

const Wrapper = styled.div`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
`

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

const FullSizePDFStyle = createGlobalStyle`
  embed {
    width: 100%!important;
  }
`

export class TaskDetailComponent extends React.Component<ITaskProps> {
  state = {
    problemStatement: ''
  }

  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
  }

  componentDidUpdate(prevProps: ITaskProps, prevState: {}) {
    if (prevProps.status !== this.props.status) {
      if (
        this.props.status === 'SUCCESS' &&
        this.state.problemStatement === ''
      ) {
        this.loadStatement()
      }
    }
  }

  loadStatement = () => {
    if (!this.props.task) return
    axios.get(this.props.task.url).then((res: any) => {
      this.setState({ problemStatement: res.data })
    })
  }

  render() {
    const template = { __html: this.state.problemStatement }

    if (
      this.props.task &&
      this.props.status === 'SUCCESS' &&
      this.state.problemStatement !== ''
    ) {
      return (
        <ContainerWrapper>
          <Padding>
            <Wrapper>
              <h1>{this.props.task.title}</h1>
              <p> Time Limit : {this.props.task.time_limit} second(s)</p>
              <p> Memory Limit : {this.props.task.memory_limit} MB(s)</p>

              <FullSizePDFStyle />
              <StatementComponent dangerouslySetInnerHTML={template} />
            </Wrapper>
          </Padding>
          <Padding>
            <Wrapper>
              <SubmitPage
                problem_id={this.props.match.params.id}
                canSubmit={this.props.user}
              />
            </Wrapper>
          </Padding>
        </ContainerWrapper>
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
