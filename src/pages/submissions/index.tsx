import React, { useState, useEffect } from 'react'
import { Table, Input, Switch, Icon, message } from 'antd'
import useSWR from 'swr'
import axios from 'axios'

import {
  WhiteContainerWrapper,
  FilterWrapper,
  SubFilterWrapper
} from '../../design/Atomics'
import { ColumnProps } from 'antd/lib/table'
import { useRouter } from 'next/router'
import { PageLayout } from '../../components/Layout'
import { useUser } from '../../components/UserContext'

const Search = Input.Search

interface ISubmissionPage {
  currentPage: number
  currentPageSize: number | undefined
  searchWord: string
  pointFilter: boolean
}

interface ISubmission {
  uid: string
  submission_id: string
  username: string
  problem_id: string
  problem_name: string
  language: string
  status: string
  points: number
  time: number
  memory: number
  timestamp: Date
  humanTimestamp: string
  code?: string
  hideCode: boolean
}

export default () => {
  const { data } = useSWR(
    'https://asia-east2-grader-ef0b5.cloudfunctions.net/getRecentSubmissions',
    axios
  )

  const [submissionsListState, setSubmissionsListState] = useState<
    ISubmission[]
  >([])

  const [submissionsPage, setSubmissionsPage] = useState<ISubmissionPage>({
    currentPage: 1,
    currentPageSize: 20,
    searchWord: '',
    pointFilter: false
  })

  const { user, isAdmin } = useUser()
  const router = useRouter()

  const setPage = (setting: ISubmissionPage) => {
    setSubmissionsPage(setting)
  }

  useEffect(() => {
    const updateTask = () => {
      if (data) {
        const filteredEvents = data.data.filter(
          ({ problem_id, username, points }) => {
            const textLowerCase = submissionsPage.searchWord.toLowerCase()

            const statusProblemID = problem_id
              .toLowerCase()
              .includes(textLowerCase)
            const statusUser = username.toLowerCase().includes(textLowerCase)

            let pointFilter = true

            if (submissionsPage.pointFilter) {
              pointFilter = points >= 100
            }

            return (statusProblemID || statusUser) && pointFilter
          }
        )

        setSubmissionsListState(filteredEvents)
      }
    }

    updateTask()
  }, [data, submissionsPage])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setPage({
      ...submissionsPage,
      searchWord: e.currentTarget.value
    })
  }

  const handlePointFilter = (check: boolean) => {
    setPage({
      ...submissionsPage,
      pointFilter: check
    })
  }

  const CustomPagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    defaultCurrent: submissionsPage.currentPage,
    defaultPageSize: submissionsPage.currentPageSize,
    onChange: (currentPage: number, currentPageSize: number | undefined) => {
      setPage({
        ...submissionsPage,
        currentPage,
        currentPageSize
      })
    },
    onShowSizeChange: (
      currentPage: number,
      currentPageSize: number | undefined
    ) => {
      setPage({
        ...submissionsPage,
        currentPage,
        currentPageSize
      })
    }
  }

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'humanTimestamp'
    },
    {
      title: 'User',
      dataIndex: 'username',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Problem',
      dataIndex: 'problem_name',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Language',
      dataIndex: 'language',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Points',
      dataIndex: 'points'
    },
    {
      title: 'Time (s)',
      dataIndex: 'time'
    },
    {
      dataIndex: 'memory',
      title: 'Memory (KB)'
    }
  ]

  return (
    <PageLayout>
      <WhiteContainerWrapper>
        <FilterWrapper>
          <SubFilterWrapper>
            Search:
            <Search
              defaultValue={submissionsPage.searchWord}
              placeholder="Enter Problem ID or User"
              onChange={e => handleSearch(e)}
              style={{ width: 200, margin: 10 }}
            />
          </SubFilterWrapper>
          <SubFilterWrapper>
            <p>Points Filter: </p>
            <Switch
              style={{ marginLeft: 10 }}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={submissionsPage.pointFilter}
              onChange={handlePointFilter}
            />
          </SubFilterWrapper>
        </FilterWrapper>
        <Table
          dataSource={submissionsListState}
          columns={columns as ColumnProps<ISubmission>[]}
          loading={!data}
          pagination={CustomPagination}
          scroll={{ x: 850 }}
          rowKey={(record: ISubmission) => record.submission_id}
          onRow={(record: ISubmission) => {
            return {
              onClick: () => {
                let status = false
                if (user && user !== 'LOADING')
                  if (user.uid === record.uid) status = true
                if (!record.hideCode || status || isAdmin) {
                  router.push('/submissions/' + record.submission_id)
                } else {
                  message.error('Access Denied')
                }
              }
            }
          }}
        />
      </WhiteContainerWrapper>
    </PageLayout>
  )
}
