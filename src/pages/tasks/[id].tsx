import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { useSelector } from 'react-redux'

import { Submit } from '../../components/tasks/Submit'
import { IAppState } from '../../redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageLayout } from '../../components/Layout'
import { Row, Col, Skeleton } from 'antd'
import useSWR from 'swr'

const Wrapper = styled.div`
  margin: 15px 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
`

const StatementComponent = styled.div`
  & table,
  table tbody tr,
  table tbody tr td,
  table tbody tr th {
    border: 1px solid black;
    border-collapse: collapse;
  }

  & table tbody tr td {
    font-family: consolas, 'courier new', courier, monospace;
    width: 40%;
    border: 1px solid gray;
    padding: 6px;
    vertical-align: top;
  }

  embed {
    width: 100% !important;
    margin-top: 20px;
  }
`

const TaskDetail: NextPage = () => {
  const router = useRouter()
  const user = useSelector((state: IAppState) => state.user.user)

  const { id } = router.query

  const { data: metadata } = useSWR(
    () =>
      'https://asia-east2-grader-ef0b5.cloudfunctions.net/getProblemMetadata?id=' +
      id,
    axios.get
  )

  const { data: statement } = useSWR(() => metadata.data.url, axios.get)

  return (
    <PageLayout>
      <Row>
        <Col lg={{ span: 17, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          <Wrapper>
            {metadata && statement ? (
              <React.Fragment>
                <h1>{metadata.data.title}</h1>
                <p> Time Limit : {metadata.data.time_limit} second(s)</p>
                <p> Memory Limit : {metadata.data.memory_limit} MB(s)</p>

                <StatementComponent
                  dangerouslySetInnerHTML={{ __html: statement.data }}
                />
              </React.Fragment>
            ) : (
              <Skeleton loading={true}></Skeleton>
            )}
          </Wrapper>
          <Wrapper>
            <Submit problem_id={id as string} canSubmit={!!user} />
          </Wrapper>
        </Col>
        <Col lg={{ span: 4, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          <Wrapper>
            <h1>Information</h1>
          </Wrapper>
          <Wrapper>
            <h1>Statistic</h1>
          </Wrapper>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default TaskDetail
