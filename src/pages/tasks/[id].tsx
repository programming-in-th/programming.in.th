import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../../lib/api'

import { Submit } from '../../components/tasks/Submit'
import { NextPage } from 'next'
import { PageLayout } from '../../components/Layout'
import { Radio, Row, Col, Skeleton } from 'antd'
import useSWR from 'swr'
import { useUser } from '../../components/UserContext'

import { MarkdownRenderer } from '../../components/tasks/MarkdownRenderer'
import Head from 'next/head'

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
  const { user } = useUser()

  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  const { data: metadata } = useSWR(
    () =>
      'https://asia-east2-grader-ef0b5.cloudfunctions.net/getProblemMetadata?id=' +
      id,
    api
  )

  const { data: statement } = useSWR(() => metadata.data.url, api)

  const { data: solutionMD, error } = useSWR(
    () =>
      'https://raw.githubusercontent.com/programming-in-th/solutions/master/md/' +
      metadata.data.problem_id +
      '.md',
    api
  )

  useEffect(() => {
    console.log(error)
    if (error) {
      console.log()
    }
  }, [error])

  const [state, setState] = useState<boolean>(true)

  const Statement = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  const Solution = () => {
    if (error) {
      return (
        <Wrapper>
          <h1>Solution does not exist!</h1>
        </Wrapper>
      )
    }

    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
            integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
            crossOrigin="anonymous"
          />
        </Head>
        <Wrapper>
          {metadata && statement && solutionMD.data ? (
            <React.Fragment>
              <h1>{metadata.data.title}</h1>
              <MarkdownRenderer content={solutionMD.data} />
            </React.Fragment>
          ) : (
            <Skeleton loading={true}></Skeleton>
          )}
        </Wrapper>
      </React.Fragment>
    )
  }

  return (
    <PageLayout>
      <Row>
        <Col lg={{ span: 17, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          {state ? <Statement /> : <Solution />}
        </Col>
        <Col lg={{ span: 4, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          <Wrapper>
            <h1>Information</h1>
            <Radio.Group
              defaultValue="statement"
              size="large"
              onChange={e => setState(e.target.value === 'statement')}
            >
              <Radio.Button value="statement">Statement</Radio.Button>
              <Radio.Button value="solution">Solution</Radio.Button>
            </Radio.Group>
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
