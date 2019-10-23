import React, { useState, useEffect } from 'react'
import { Table, Input, Switch, Icon, message } from 'antd'

import { ISubmissionPage, ISubmission } from '../redux/types/submission'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import {
  WhiteContainerWrapper,
  FilterWrapper,
  SubFilterWrapper
} from '../components/atomics'
import { ColumnProps } from 'antd/lib/table'
import { IAppState } from '../redux'
import { useRouter } from 'next/router'
import { PageLayout } from '../components/Layout'

const Search = Input.Search

export default () => {
  const [submissionsListState, setSubmissionsListState] = useState<
    ISubmission[]
  >([])
  const [firstLoad, setFirstLoad] = useState<boolean>(false)
  const [submissionPageState, setSubmissionPageState] = useState<
    ISubmissionPage | undefined
  >(undefined)
  const submissionsList = useSelector(
    (state: IAppState) => state.submissions.submissionsList
  )
  const submissionsPage = useSelector(
    (state: IAppState) => state.submissions.submissionsPage
  )
  const submissionsListStatus = useSelector(
    (state: IAppState) => state.submissions.submissionsListStatus
  )
  const user = useSelector((state: IAppState) => state.user.user)

  const dispatch = useDispatch()
  const router = useRouter()

  const setPage = (setting: ISubmissionPage) => {
    dispatch(actionCreators.setSubPageConfig(setting))
  }
  const onInitialLoad = () => {
    dispatch(actionCreators.loadSubmissionsList())
  }
  useEffect(() => {
    onInitialLoad()
    updateTask()
  }, [])
  useEffect(() => {
    if (submissionsList.length > 1 && !firstLoad) {
      setSubmissionsListState(submissionsList as ISubmission[])
      setFirstLoad(true)
    }

    if (submissionPageState !== submissionsPage) {
      setSubmissionPageState(submissionsPage)
      updateTask()
    }
  })
  const updateTask = () => {
    const filteredEvents = submissionsList.filter(
      ({ problem_id, username, points }) => {
        const textLowerCase = submissionsPage.searchWord.toLowerCase()
        username = username.toLowerCase()
        const statusProblemID = problem_id.toLowerCase().includes(textLowerCase)
        const statusUser = username.toLowerCase().includes(textLowerCase)
        let pointFilter = true

        if (submissionsPage.pointFilter) {
          pointFilter = points === 100
        }

        return (statusProblemID || statusUser) && pointFilter
      }
    )
    setSubmissionsListState(filteredEvents)
  }
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
          loading={submissionsListStatus === 'LOADING'}
          pagination={CustomPagination}
          scroll={{ x: 100 }}
          rowKey={(record: ISubmission) => record.submission_id}
          onRow={(record: ISubmission) => {
            return {
              onClick: () => {
                let status = false
                if (user && user !== 'LOADING')
                  if (user.uid === record.uid) status = true
                if (!record.hideCode || status) {
                  router.push('/submissions/' + record.problem_id)
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
