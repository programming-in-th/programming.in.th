import React from 'react'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../redux/types/task'
import { SubmitPage } from '../components/tasks/Submit'

interface ITaskProps {
  task?: ITask
  status: string
  match: any
  onInitialLoad: (id: string) => void
}

export class TaskDetailComponent extends React.Component<ITaskProps> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.id)
  }
  showError = () => {
    console.log(this.props.task)
  }
  render() {
    return (
      <React.Fragment>
        {/* {this.props.status === 'LOADING' ? (
          <div>LOADING</div>
        ) : (
          <div> */}
        {/* <Button onClick={this.showError}>show Log</Button> */}
        <SubmitPage problemID={this.props.match.params.id} />
        {/* </div>
        )} */}
      </React.Fragment>
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
