import React from 'react'
import styled from 'styled-components'

import { Wrapper } from './Wrapper'
import { Submit } from './Submit'

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

export const Statement = ({ statementMetadata, statement, user }) => {
  return (
    <React.Fragment>
      <Wrapper>
        <h1>{statementMetadata?.title}</h1>
        <p> Time Limit : {statementMetadata?.time_limit} second(s)</p>
        <p> Memory Limit : {statementMetadata?.memory_limit} MB(s)</p>

        <StatementComponent dangerouslySetInnerHTML={{ __html: statement }} />
      </Wrapper>
      <Wrapper>
        <Submit
          problem_id={statementMetadata?.problem_id as string}
          canSubmit={user && !!user}
        />
      </Wrapper>
    </React.Fragment>
  )
}
