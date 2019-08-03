/* React */
import React from 'react'

/* React Util */
import { List } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { TaskList } from '../redux/types/task'

/* React Component */
import TaskListItem from '../components/tasks/TaskItem'

/* Static */
import '../assets/css/taskList.css'
import '../assets/css/avatar.css'

interface ITasksPageProps {
  taskList: TaskList[]
  onInitialLoad: () => void
}

class Tasks extends React.Component<ITasksPageProps> {
  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const listItems = this.props.taskList
      ? this.props.taskList.map(task => {
          return (
            <TaskListItem
              title={task.title}
              difficulty={task.difficulty}
              tags={task.tags}
            />
          )
        })
      : []

    return (
      <div id="task-list-wrapper">
        <List component="nav">{listItems}</List>
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    tags: state.tasks.tags,
    taskList: state.tasks.taskList
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
