/* React */
import React from 'react'

/* React Util */
import { List } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/index'
import { TaskList } from '../store/types/task_list_types'

/* React Component */
import TaskListItem from '../components/Tasks/TaskItem'

/* Static */
import '../assets/css/taskList.css'
import '../assets/css/avatar.css'

interface ITasksPageProps {
  taskList: TaskList[]
  onInitialLoad: any
}

class Tasks extends React.Component<ITasksPageProps> {
  constructor(props: ITasksPageProps) {
    super(props)
    props.onInitialLoad()
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
