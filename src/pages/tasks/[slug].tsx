import React, { useState } from 'react'
import { Radio, Row, Col } from 'antd'

import api from '../../lib/api'
import axios, { AxiosResponse } from 'axios'

import { PageLayout } from '../../components/Layout'
import { useUser } from '../../components/UserContext'

import 'highlight.js/styles/atom-one-dark.css'
import { renderMarkdown } from '../../utils/renderMarkdown'
import { Wrapper } from '../../components/tasks/Wrapper'
import { Statement } from '../../components/tasks/Statement'
import { Solution } from '../../components/tasks/Solution'
import { getProblemIDs } from '../../utils/getProblemIDs'

const TaskDetail = ({ statementMetadata, statement, solution }) => {
  const { user } = useUser()

  const [solutionState, setSolutionState] = useState<boolean>(true)

  return (
    <PageLayout>
      <Row>
        <Col lg={{ span: 17, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          {solutionState ? (
            <Statement
              statementMetadata={statementMetadata}
              statement={statement}
              user={user}
            />
          ) : (
            <Solution
              statementMetadata={statementMetadata}
              solution={solution}
            />
          )}
        </Col>
        <Col lg={{ span: 4, offset: 1 }} xs={{ span: 22, offset: 1 }}>
          <Wrapper>
            <Radio.Group
              defaultValue="statement"
              size="large"
              onChange={e => setSolutionState(e.target.value === 'statement')}
            >
              <Radio.Button value="statement">Statement</Radio.Button>
              <Radio.Button value="solution">Solution</Radio.Button>
            </Radio.Group>
          </Wrapper>
        </Col>
      </Row>
    </PageLayout>
  )
}

export async function unstable_getStaticPaths() {
  const paths = await getProblemIDs()

  return {
    paths
  }
}

export async function unstable_getStaticProps({ params: { slug } }) {
  const statementMetadata = await api.get(`/getProblemMetadata?id=${slug}`)
  const statement = await axios.get(statementMetadata.data.url)
  let solution: AxiosResponse<any>
  let renderedSolution: string

  try {
    solution = await axios.get(
      `https://raw.githubusercontent.com/programming-in-th/solutions/master/md/${statementMetadata.data.problem_id}.md`
    )
  } catch (e) {}

  if (solution) {
    renderedSolution = renderMarkdown(solution.data)
  }

  return {
    props: {
      statementMetadata: statementMetadata.data,
      statement: statement.data,
      solution: renderedSolution ? renderedSolution : undefined
    },
    revalidate: 10
  }
}

export default TaskDetail
