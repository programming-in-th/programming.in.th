import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import firebase from '../../lib/firebase'

import { useSelector } from 'react-redux'

import { ITask } from '../../redux/types/task'
import { Submit } from '../../components/tasks/Submit'
import { ContainerWrapper, Padding } from '../../design/atomics'
import { IAppState } from '../../redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageLayout } from '../../components/Layout'

const Wrapper = styled.div`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
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

interface IInitialTaskDetailProps {
  title: string
  timeLimit: number
  memoryLimit: number
  problemStatement: string
}

const TaskDetail: NextPage<IInitialTaskDetailProps> = (
  props: IInitialTaskDetailProps
) => {
  const router = useRouter()
  const user = useSelector((state: IAppState) => state.user.user)
  const template = { __html: props.problemStatement }

  const { id } = router.query

  return (
    <PageLayout>
      <ContainerWrapper>
        <Padding>
          <Wrapper>
            <h1>{props.title}</h1>
            <p> Time Limit : {props.timeLimit} second(s)</p>
            <p> Memory Limit : {props.memoryLimit} MB(s)</p>

            <StatementComponent dangerouslySetInnerHTML={template} />
          </Wrapper>
        </Padding>
        <Padding>
          <Wrapper>
            <Submit problem_id={id as string} canSubmit={!!user} />
          </Wrapper>
        </Padding>
      </ContainerWrapper>
    </PageLayout>
  )
}

TaskDetail.getInitialProps = async ({ query }) => {
  const taskId = query.id

  const response = await firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getProblemMetadata')({ problem_id: taskId })

  const currentTask = response.data as ITask

  const { title, time_limit, memory_limit } = currentTask
  if (currentTask) {
    const problemStatement = await axios.get(currentTask.url)
    return {
      title,
      timeLimit: time_limit,
      memoryLimit: memory_limit,
      problemStatement: problemStatement.data
    }
  }
}

export default TaskDetail
