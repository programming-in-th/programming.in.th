/* React */
import React from 'react'

/* React Util */
import { Table, Tag } from 'antd'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/actions/index'
import { ITask } from '../../redux/types/task'

/* Static */
import styled from 'styled-components'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import H from 'history'

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  onInitialLoad: () => void
}

interface ITasksPageState {}

const MainTable = styled(Table)`
  width: 90%;
  margin-left: 5%;
`

class TasksListComponent extends React.Component<
  ITasksPageProps,
  ITasksPageState
> {
  handleClick = (task: string): void => {
    this.props.history.push('/tasks/' + task)
  }

  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const columns = [
      {
        title: 'Problem',
        dataIndex: 'title'
        // defaultSortOrder: ['descend', 'ascend'],
        // sorter: (a: any, b: any) => a.title.length - b.title.length,
      },
      {
        title: 'Difficulty',
        dataIndex: 'difficulty'
        // defaultSortOrder: ['descend', 'ascend'],
        // sorter: (a: any, b: any) => a.difficulty - b.difficulty,
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        render: (tags: any) => (
          <span>
            {tags.map((tag: string) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        )
      }
      // {
      //   title: 'Users solved',
      //   dataIndex: 'solve_count',
      //   defaultSortOrder: ['descend', 'ascend'],
      //   sorter: (a: ITask, b: ITask) => a.solve_count < b.solve_count,
      // }
    ]
    return (
      <MainTable
        columns={columns}
        dataSource={this.props.taskList}
        loading={this.props.status === 'LOADING'}
      />
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

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: () => {
      // TODO: load tags
      dispatch(actionCreators.loadTasksList(10, -1, -1, []))
    }
  }
}

export const TasksList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent)
