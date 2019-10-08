import React from 'react'
import styled from 'styled-components'

import { withRouter } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 64px;
  margin-top: 146px;
`

const Title = styled.h1`
  font-size: 48px;
  font-family: Montserrat;
  font-weight: 800;
`

const SubTitle = styled.h2`
  margin-top: 16px;
  font-size: 24px;
  font-family: Montserrat;
  color: #262626;
`
export const _Index: React.FunctionComponent = () => (
  <React.Fragment>
    <Container>
      <div>
        <Title>
          "Bad programmers worry about the code. Good programmers worry about
          data structures and their relationships" — Linus Torvalds.
        </Title>
        <SubTitle>
          Programming.in.th provides you with the fundamentals of algorithmic
          problem-solving, an important skill to differentiate yourself as a
          programmer in an increasingly technologically advanced world.
        </SubTitle>
      </div>
      <div style={{ minWidth: '543px' }}></div>
    </Container>
  </React.Fragment>
)

export const Index = withRouter(_Index)
