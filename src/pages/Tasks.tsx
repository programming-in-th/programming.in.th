/* React */
import React from 'react'

/* React Util */
import { List, CircularProgress } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { TaskList } from '../redux/types/task'

/* React Component */
import { TaskItem } from '../components/tasks/TaskItem'
import { Task } from '../components/tasks/Task'

/* Static */
import '../assets/css/taskList.css'
import '../assets/css/avatar.css'

interface ITasksPageProps {
  taskList: TaskList[]
  status: string
  onInitialLoad: () => void
}

interface ITasksPageState {
  currentTask: string
}

class Tasks extends React.Component<ITasksPageProps, ITasksPageState> {
  state: ITasksPageState = {
    currentTask: ''
  }

  handleClick = (task: string): void => {
    this.setState({ currentTask: task })
    console.log(task)
  }

  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const listItems = this.props.taskList
      ? this.props.taskList.map(task => {
          return (
            <TaskItem
              key={task.title}
              title={task.title}
              difficulty={task.difficulty}
              tags={task.tags}
              onClick={() => this.handleClick(task.title)}
            />
          )
        })
      : []

    return (
      <div>
        {this.props.status === 'LOADING' ? (
          <div id="loading">
            <CircularProgress />
          </div>
        ) : this.state.currentTask !== '' ? (
          <Task></Task>
        ) : (
          <div id="task-list-wrapper">
            <List component="nav">{listItems}</List>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    tags: state.tasks.tags,
    taskList: state.tasks.taskList,
    status: state.tasks.status
  }
}

const mapDispatchToProps: (dispatch: any) => any = dispatch => {
  return {
    onInitialLoad: () => {
      // TODO: load tags
      dispatch(actionCreators.loadTasks(-1, -1, []))
    }
  }
}

export const TasksPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)
