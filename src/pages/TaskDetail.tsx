import React from 'react'
import Paper from '@material-ui/core/Paper'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../redux/types/task'

interface ITaskProps {
  id: string
  task?: ITask
  onInitialLoad: (id: string) => void
}

export class TaskDetailComponent extends React.Component<ITaskProps> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.id)
  }

  render() {
    return (
      <div className="task-wrapper">
        <Paper>Hi</Paper>
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    task: state.tasks.currentTask
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
