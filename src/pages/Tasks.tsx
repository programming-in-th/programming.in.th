import React from 'react'
import H from 'history'
import { Table, Tag, Collapse } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import { SliderValue } from 'antd/lib/slider'
import { PaginationConfig } from 'antd/lib/pagination'

import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask, ITaskPage } from '../redux/types/task'
import { DesktopOnly, MobileOnly } from '../components/Responsive'
import { FilterComponent, IFilter } from '../components/tasks/Filter'

import { WhiteContainerWrapper } from '../components/atomics'
import { IAppState } from '../redux'

const { Panel } = Collapse

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
  tagList: string[]
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
    this.updateTask()
  }

  componentDidUpdate() {
    if (this.props.taskList.length > 1 && !this.state.firstLoad) {
      this.setState({ taskList: this.props.taskList, firstLoad: true })
      let tagNow: string[] = []
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

  updateTask: () => void = () => {
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

  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void = e => {
    this.props.setPage({
      ...this.props.taskPage,
      searchWord: e.currentTarget.value
    })
  }

  handleTag: (value: string[]) => void = value => {
    this.props.setPage({ ...this.props.taskPage, searchTag: value })
  }

  handleDifficulty: (value: SliderValue) => void = value => {
    this.props.setPage({
      ...this.props.taskPage,
      searchDifficulty: value as number[]
    })
  }

  handleHideTag: (check: boolean) => void = check => {
    this.props.setPage({
      ...this.props.taskPage,
      hideTag: check
    })
  }

  columnsHideTag: ColumnProps<ITask>[] = [
    {
      title: 'Problem ID',
      dataIndex: 'problem_id',
      defaultSortOrder: 'ascend',
      sorter: (a: ITask, b: ITask) => a.problem_id.localeCompare(b.problem_id)
    },
    {
      title: 'Problem',
      dataIndex: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a: ITask, b: ITask) => a.title.localeCompare(b.title)
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      defaultSortOrder: 'ascend',
      sorter: (a: ITask, b: ITask) => b.difficulty - a.difficulty
    },
    {
      title: 'Source',
      dataIndex: 'source'
    }
  ]

  columnsTag: ColumnProps<ITask>[] = [
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

  CustomPagination: PaginationConfig = {
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

  render() {
    const tableConfig: TableProps<ITask> = {
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
      pagination: this.CustomPagination,
      dataSource: this.state.taskList,
      loading: this.state.firstLoad ? false : this.props.status === 'LOADING'
    }

    const filterProps: IFilter = {
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

    return (
      <WhiteContainerWrapper>
        <DesktopOnly>
          <FilterComponent {...filterProps} />
        </DesktopOnly>
        <MobileOnly>
          <Collapse bordered={false}>
            <Panel key="1" header="Filter">
              <FilterComponent {...filterProps} />
            </Panel>
          </Collapse>
        </MobileOnly>
        <Table {...tableConfig} />
      </WhiteContainerWrapper>
    )
  }
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
