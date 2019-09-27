import React from 'react'
import H from 'history'
import styled from 'styled-components'
import { Table, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask } from '../redux/types/task'
import { CustomSpin } from '../components/Spin'

const TableWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 2%;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
`

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  onInitialLoad: () => void
}

interface ITasksPageState {}

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
        title: 'Problem ID',
        dataIndex: 'problem_id',
        defaultSortOrder: ['descend', 'ascend'],
        sorter: (a: any, b: any) => b.problem_id.length - a.problem_id.length
      },
      {
        title: 'Problem',
        dataIndex: 'title',
        defaultSortOrder: ['descend', 'ascend'],
        sorter: (a: any, b: any) => b.title.length - a.title.length
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
          onRow={(record: any) => {
            return {
              onClick: () => {
                this.props.history.push('/tasks/' + record.problem_id)
              }
            }
          }}
          scroll={{ x: 100 }}
          columns={columns}
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
      dispatch(actionCreators.loadTasksList(-1, -1, -1, []))
    }
  }
}

export const TasksPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent)
