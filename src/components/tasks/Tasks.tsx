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
import { ColumnProps } from 'antd/lib/table'

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  onInitialLoad: () => void
}

interface ITasksPageState {}

const TableWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
  padding: 10px 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
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
        dataIndex: 'title',
        defaultSortOrder: ['descend', 'ascend'],
        sorter: (a: any, b: any) => b.title.length - a.title.length,
        width: 100,
        fixed: 'left'
      },
      {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        defaultSortOrder: ['descend', 'ascend'],
        sorter: (a: any, b: any) => b.difficulty - a.difficulty
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        render: (tags: Array<string>) => (
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
    ] as ColumnProps<{}>[]
    return (
      <TableWrapper>
        <Table
          columns={columns}
          scroll={{ x: 400 }}
          dataSource={this.props.taskList}
          loading={this.props.status === 'LOADING'}
        />
      </TableWrapper>
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
