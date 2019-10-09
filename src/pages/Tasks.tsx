import React from 'react'
import H from 'history'
import { Table, Tag, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import styled from 'styled-components'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask } from '../redux/types/task'
import { WhiteContainerWrapper } from '../components/atomics'

const Search = Input.Search

const SearchWrapper = styled.div`
  margin-left: 20px;
`

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  currentPage: number
  currentPageSize: number
  setPage: (page: number, pageSize: number) => void
  onInitialLoad: () => void
}

interface ITaskPageState {
  taskList: ITask[]
  firstLoad: boolean
}

class TasksListComponent extends React.Component<
  ITasksPageProps,
  ITaskPageState
> {
  state = {
    taskList: [],
    firstLoad: false
  }

  handleClick = (task: string): void => {
    this.props.history.push('/tasks/' + task)
  }

  componentDidMount() {
    this.props.onInitialLoad()
  }

  componentDidUpdate() {
    if (this.props.taskList.length > 1 && !this.state.firstLoad)
      this.setState({ taskList: this.props.taskList, firstLoad: true })
  }

  columns = [
    {
      title: 'Problem ID',
      dataIndex: 'problem_id',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a: ITask, b: ITask) => b.problem_id.length - a.problem_id.length
    },
    {
      title: 'Problem',
      dataIndex: 'title',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a: ITask, b: ITask) => b.title.length - a.title.length
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a: ITask, b: ITask) => b.difficulty - a.difficulty
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

  CustomPagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    defaultCurrent: this.props.currentPage,
    defaultPageSize: this.props.currentPageSize,
    onChange: (page: number, pageSize: number | undefined) => {
      this.props.setPage(page, pageSize ? pageSize : 20)
    },
    onShowSizeChange: (page: number, pageSize: number | undefined) => {
      this.props.setPage(page, pageSize ? pageSize : 20)
    }
  }

  handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const filteredEvents = this.props.taskList.filter(
      ({ problem_id, title }) => {
        const textLowerCase = e.currentTarget.value.toLowerCase()
        title = title.toLowerCase()
        const statusProblemID = problem_id.toLowerCase().includes(textLowerCase)
        const statusTitle = title.toLowerCase().includes(textLowerCase)
        return statusProblemID || statusTitle
      }
    )

    this.setState({
      taskList: filteredEvents
    })
  }

  render() {
    return (
      <WhiteContainerWrapper>
        <SearchWrapper>
          Search:
          <Search
            placeholder="Enter Problem ID or Title"
            onChange={e => this.handleSearch(e)}
            style={{ width: 200, margin: 10 }}
          />
        </SearchWrapper>
        <Table
          onRow={(record: any) => {
            return {
              onClick: () => {
                this.props.history.push('/tasks/' + record.problem_id)
              }
            }
          }}
          scroll={{ x: 100 }}
          columns={this.columns}
          dataSource={this.state.taskList}
          loading={this.props.status === 'LOADING'}
          pagination={this.CustomPagination}
        />
      </WhiteContainerWrapper>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    tags: state.tasks.tags,
    taskList: state.tasks.taskList,
    status: state.tasks.status,
    currentPage: state.tasks.currentPage,
    currentPageSize: state.tasks.currentPageSize
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.loadTasksList(-1, -1, -1, []))
    },
    setPage: (page: number, pageSize: number) => {
      dispatch(actionCreators.setPage(page, pageSize))
    }
  }
}

export const TasksPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent)
