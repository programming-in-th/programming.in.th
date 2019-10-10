import React from 'react'
import H from 'history'
import { Table, Tag, Input, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import styled from 'styled-components'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask } from '../redux/types/task'
import { WhiteContainerWrapper } from '../components/atomics'

const Search = Input.Search
const { Option } = Select

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
  searchWord: string
  tagList: Array<string>
  searchTag: Array<string>
}

class TasksListComponent extends React.Component<
  ITasksPageProps,
  ITaskPageState
> {
  state = {
    taskList: [],
    firstLoad: false,
    searchWord: '',
    tagList: [],
    searchTag: []
  }

  componentDidMount() {
    this.props.onInitialLoad()
  }

  componentDidUpdate() {
    if (this.props.taskList.length > 1 && !this.state.firstLoad) {
      this.setState({ taskList: this.props.taskList, firstLoad: true })
      let tagNow: Array<string> = []
      this.props.taskList.forEach(val => {
        val.tags.forEach(tag => {
          tagNow.push(tag)
        })
      })
      this.setState({ tagList: Array.from(new Set(tagNow)) })
    }
  }

  columns = [
    {
      title: 'Problem ID',
      dataIndex: 'problem_id',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a: ITask, b: ITask) => a.problem_id.localeCompare(b.problem_id)
    },
    {
      title: 'Problem',
      dataIndex: 'title',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a: ITask, b: ITask) => a.title.localeCompare(b.title)
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

  updateTask = () => {
    console.log(this.state.searchTag)
    const filteredEvents = this.props.taskList.filter(
      ({ problem_id, title, tags }) => {
        const textLowerCase = this.state.searchWord.toLowerCase()
        title = title.toLowerCase()
        const statusProblemID = problem_id.toLowerCase().includes(textLowerCase)
        const statusTitle = title.toLowerCase().includes(textLowerCase)
        let isTag = true
        this.state.searchTag.forEach(
          value => (isTag = isTag && tags.includes(value))
        )
        return (statusProblemID || statusTitle) && isTag
      }
    )
    this.setState({
      taskList: filteredEvents
    })
  }

  handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchWord: e.currentTarget.value })
    this.updateTask()
  }

  handleTag = async (e: Array<string>) => {
    console.log(e)
    const setStateAsync = (updater: any) =>
      new Promise(resolve => this.setState(updater, resolve))
    await setStateAsync((state: any) => ({
      searchTag: e
    }))
    this.updateTask()
  }

  render() {
    const tagArray = Array.from(this.state.tagList)
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
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={this.handleTag}
        >
          {tagArray.map(value => {
            return <Option key={value}>{value}</Option>
          })}
        </Select>
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
