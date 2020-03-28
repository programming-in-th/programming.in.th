import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Table, Tag, Collapse } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { SliderValue } from 'antd/lib/slider'
import { PaginationConfig } from 'antd/lib/pagination'

import api from '../../lib/api'

import { DesktopOnly, MobileOnly } from '../../design/Responsive'
import { FilterComponent, IFilter } from '../../components/tasks/Filter'

import { WhiteContainerWrapper } from '../../design/Atomics'
import { PageLayout } from '../../components/Layout'
import { ITask } from '../../@types/task'
import { GetStaticProps } from 'next'

const { Panel } = Collapse

interface ITaskPage {
  currentPage: number
  currentPageSize: number | undefined
  searchWord: string
  searchTag: ReadonlyArray<string>
  searchDifficulty: ReadonlyArray<number>
  hideTag: boolean
}

export default ({ tasks }) => {
  const [taskListState, setTaskListState] = useState<ITask[]>([])
  const [tagListState, setTagListState] = useState<string[]>([])
  const [taskPage, setTaskPage] = useState<ITaskPage>({
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    searchTag: [],
    searchDifficulty: [0, 10],
    hideTag: true
  })

  const router = useRouter()

  const setPage: (page: ITaskPage) => void = page => {
    setTaskPage(page)
  }

  useEffect(() => {
    const updateTask = () => {
      if (tasks) {
        const filteredEvents = tasks.filter(
          ({ problem_id, title, tags, difficulty }) => {
            const textLowerCase = taskPage.searchWord.toLowerCase()
            title = title.toLowerCase()
            const statusProblemID = problem_id
              .toLowerCase()
              .includes(textLowerCase)
            const statusTitle = title.toLowerCase().includes(textLowerCase)
            let isTag = true

            taskPage.searchTag.forEach(
              value => (isTag = isTag && tags.includes(value))
            )

            const difficultyStatus =
              difficulty >= taskPage.searchDifficulty[0] &&
              difficulty <= taskPage.searchDifficulty[1]

            return (statusProblemID || statusTitle) && isTag && difficultyStatus
          }
        )

        setTaskListState(filteredEvents)
      }
    }

    updateTask()
  }, [taskPage, tasks])

  useEffect(() => {
    let tagNow: string[] = []
    if (tasks) {
      tasks.forEach(val => {
        val.tags.forEach(tag => {
          tagNow.push(tag)
        })
      })
    }

    setTagListState(Array.from(new Set(tagNow)))
  }, [tasks])

  const handleSearch: (e: React.FormEvent<HTMLInputElement>) => void = e => {
    setPage({
      ...taskPage,
      searchWord: e.currentTarget.value
    })
  }

  const handleTag: (value: string[]) => void = value => {
    setPage({ ...taskPage, searchTag: value })
  }

  const handleDifficulty: (value: SliderValue) => void = value => {
    setPage({
      ...taskPage,
      searchDifficulty: value as number[]
    })
  }

  const handleHideTag: (check: boolean) => void = check => {
    setPage({
      ...taskPage,
      hideTag: check
    })
  }

  const columnsHideTag: ColumnProps<ITask>[] = [
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

  const columnsTag: ColumnProps<ITask>[] = [
    ...columnsHideTag,
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

  const CustomPagination: PaginationConfig = {
    showQuickJumper: true,
    showSizeChanger: true,
    defaultCurrent: taskPage.currentPage,
    defaultPageSize: taskPage.currentPageSize,
    onChange: (currentPage: number, currentPageSize: number | undefined) => {
      setPage({
        ...taskPage,
        currentPage,
        currentPageSize
      })
    },
    onShowSizeChange: (
      currentPage: number,
      currentPageSize: number | undefined
    ) => {
      setPage({
        ...taskPage,
        currentPage,
        currentPageSize
      })
    }
  }

  const tableConfig = {
    rowKey: (record: ITask) => record.problem_id,
    onRow: (record: ITask) => {
      return {
        onClick: () => {
          router.push('/tasks/' + record.problem_id)
        }
      }
    },
    scroll: { x: 100 },
    columns: (taskPage.hideTag ? columnsHideTag : columnsTag) as ColumnProps<
      ITask
    >[],
    pagination: CustomPagination,
    dataSource: taskListState
  }

  const filterProps: IFilter = {
    searchWord: taskPage.searchWord,
    tagList: tagListState,
    searchTag: taskPage.searchTag as string[],
    hideTag: taskPage.hideTag,
    searchDifficulty: taskPage.searchDifficulty as number[],
    handleSearch: handleSearch,
    handleTag: handleTag,
    handleDifficulty: handleDifficulty,
    handleHideTag: handleHideTag
  }

  return (
    <React.Fragment>
      <PageLayout>
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
      </PageLayout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tasks = await api.get('/getAllTasks')

  return {
    props: {
      tasks: tasks.data
    },
    revalidate: 10
  }
}
