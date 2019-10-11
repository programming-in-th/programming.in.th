import React from 'react'
import H from 'history'
import { Table, Tag, Input, Select, Slider, Switch, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask, ITaskPage } from '../redux/types/task'
import {
  WhiteContainerWrapper,
  FilterWrapper,
  SubFilterWrapper
} from '../components/atomics'
import { SliderValue } from 'antd/lib/slider'
import { IAppState } from '../redux'

const Search = Input.Search
const { Option } = Select

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  taskPage: ITaskPage
  history: H.History
  setPage: (page: ITaskPage) => void
  onInitialLoad: () => void
}

interface ITaskPageState {
  taskList: ITask[]
  tagList: Array<string>
  firstLoad: boolean
  taskPage: ITaskPage | undefined
}

class TasksListComponent extends React.Component<
  ITasksPageProps,
  ITaskPageState
> {
  state = {
    taskList: [],
    tagList: [],
    firstLoad: false,
    taskPage: undefined
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

    if (this.state.taskPage !== this.props.taskPage) {
      this.setState({ taskPage: this.props.taskPage })
      this.updateTask()
    }
  }

  updateTask = () => {
    const filteredEvents = this.props.taskList.filter(
      ({ problem_id, title, tags, difficulty }) => {
        const textLowerCase = this.props.taskPage.searchWord.toLowerCase()
        title = title.toLowerCase()
        const statusProblemID = problem_id.toLowerCase().includes(textLowerCase)
        const statusTitle = title.toLowerCase().includes(textLowerCase)
        let isTag = true
        this.props.taskPage.searchTag.forEach(
          value => (isTag = isTag && tags.includes(value))
        )

        const difficultyStatus =
          difficulty >= this.props.taskPage.searchDifficulty[0] &&
          difficulty <= this.props.taskPage.searchDifficulty[1]

        return (statusProblemID || statusTitle) && isTag && difficultyStatus
      }
    )
    this.setState({
      taskList: filteredEvents
    })
  }

  handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.setPage({
      ...this.props.taskPage,
      searchWord: e.currentTarget.value
    })
  }

  handleTag = (value: Array<string>) => {
    this.props.setPage({ ...this.props.taskPage, searchTag: value })
  }

  handleDifficulty = (value: SliderValue) => {
    this.props.setPage({
      ...this.props.taskPage,
      searchDifficulty: value as Array<number>
    })
  }

  handleHideTag = (check: boolean) => {
    this.props.setPage({
      ...this.props.taskPage,
      hideTag: check
    })
  }

  columnsHideTag = [
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
    }
  ]

  columnsTag = [
    ...this.columnsHideTag,
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
  ]

  CustomPagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    defaultCurrent: this.props.taskPage.currentPage,
    defaultPageSize: this.props.taskPage.currentPageSize,
    onChange: (currentPage: number, currentPageSize: number | undefined) => {
      this.props.setPage({
        ...this.props.taskPage,
        currentPage,
        currentPageSize
      })
    },
    onShowSizeChange: (
      currentPage: number,
      currentPageSize: number | undefined
    ) => {
      this.props.setPage({
        ...this.props.taskPage,
        currentPage,
        currentPageSize
      })
    }
  }

  tableConfig = {
    rowKey: (record: ITask) => record.problem_id,
    onRow: (record: ITask) => {
      return {
        onClick: () => {
          this.props.history.push('/tasks/' + record.problem_id)
        }
      }
    },
    scroll: { x: 100 },
    columns: (this.props.taskPage.hideTag
      ? this.columnsHideTag
      : this.columnsTag) as ColumnProps<ITask>[],
    loading: this.props.status === 'LOADING',
    pagination: this.CustomPagination
  }

  filterProps = {
    tagList: this.state.tagList,
    searchWord: this.props.taskPage.searchWord,
    searchTag: this.props.taskPage.searchTag as string[],
    hideTag: this.props.taskPage.hideTag,
    searchDifficulty: this.props.taskPage.searchDifficulty as number[],
    handleSearch: this.handleSearch,
    handleTag: this.handleTag,
    handleDifficulty: this.handleDifficulty,
    handleHideTag: this.handleHideTag
  }

  render() {
    return (
      <WhiteContainerWrapper>
        <FilterComponent {...this.filterProps} />
        <Table {...this.tableConfig} dataSource={this.state.taskList} />
      </WhiteContainerWrapper>
    )
  }
}

interface IFilter {
  tagList: string[]
  searchWord: string
  searchTag: string[]
  hideTag: boolean
  searchDifficulty: number[]
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void
  handleTag: (value: Array<string>) => void
  handleDifficulty: (value: SliderValue) => void
  handleHideTag: (check: boolean) => void
}

const FilterComponent = (props: IFilter) => {
  return (
    <FilterWrapper>
      <SubFilterWrapper>
        Search:
        <Search
          defaultValue={props.searchWord}
          placeholder="Enter Problem ID or Title"
          onChange={e => props.handleSearch(e)}
          style={{ width: 200, margin: 10 }}
        />
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Tag:</p>
        {'  '}
        <Select
          mode="multiple"
          style={{ width: '100%', marginLeft: '10px' }}
          placeholder="Please select"
          defaultValue={props.searchTag as Array<string>}
          onChange={props.handleTag}
          disabled={props.hideTag}
        >
          {props.tagList.map(value => {
            return <Option key={value}>{value}</Option>
          })}
        </Select>
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Difficulty:</p>
        {'  '}
        <Slider
          range
          min={0}
          max={10}
          style={{ width: '100%', marginLeft: '20px' }}
          defaultValue={props.searchDifficulty as SliderValue}
          onChange={props.handleDifficulty}
        />
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Hide Tag:</p>
        <Switch
          style={{ marginLeft: 10 }}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          defaultChecked={props.hideTag}
          onChange={props.handleHideTag}
        />
      </SubFilterWrapper>
    </FilterWrapper>
  )
}

const mapStateToProps: (state: IAppState) => any = state => {
  return {
    taskList: state.tasks.taskList,
    status: state.tasks.status,
    taskPage: state.tasks.taskPage
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.loadTasksList(-1, -1, -1, []))
    },
    setPage: (page: ITaskPage) => {
      dispatch(actionCreators.setTaskPageConfig(page))
    }
  }
}

export const TasksPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent)
