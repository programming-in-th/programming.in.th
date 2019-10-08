import React from 'react'
import styled, { keyframes } from 'styled-components'

import { withRouter } from 'react-router'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
  animation: ${fadeIn} 3s;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 64px;
  margin-top: 128px;

  @media (max-width: 768px) {
    display: block;
    margin: 32px;
  }
`

const MainContainer = styled(Container)`
  min-height: calc(100vh - 64px);
`

const Title = styled.h1`
  font-size: 48px;
  font-family: Montserrat;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const SubTitle = styled.h2`
  margin-top: 16px;
  font-size: 24px;
  font-family: Montserrat;
  color: #262626;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`
export const _Index: React.FunctionComponent = () => (
  <React.Fragment>
    <MainContainer>
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
    </MainContainer>
    <Container>
      <div style={{ minWidth: '543px' }}></div>
      <div>
        <Title>
          With over 200 problems designed and curated by our specialists, we
          strive to deliver the most comprehensive learning experience possible.
          (Take me to my first problem!)
        </Title>
        <SubTitle>
          Programming.in.th provides you with the fundamentals of algorithmic
          problem-solving, an important skill to differentiate yourself as a
          programmer in an increasingly technologically advanced world.
        </SubTitle>
      </div>
    </Container>
    <Container>
      <div>
        <Title>
          Our learning resources contain all the content you need to excel at
          algorithmic problem-solving. (Start learning now!)
        </Title>
        <SubTitle>
          Programming.in.th provides you with the fundamentals of algorithmic
          problem-solving, an important skill to differentiate yourself as a
          programmer in an increasingly technologically advanced world.
        </SubTitle>
      </div>
      <div style={{ minWidth: '543px' }}></div>
    </Container>
    <Container>
      <div>
        <Title>Got a question? Ask away!</Title>
      </div>
    </Container>
  </React.Fragment>
)

export const Index = withRouter(_Index)
