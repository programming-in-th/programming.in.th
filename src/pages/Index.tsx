import React from 'react'
import styled, { keyframes } from 'styled-components'

import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { DesktopOnly } from '../components/Responsive'

import TitleIllus from '../assets/svg/title.svg'
import ProblemIllus from '../assets/svg/problem.svg'
import LearnIllus from '../assets/svg/learn.svg'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 64px;

  @media (max-width: 768px) {
    display: block;
    margin: 32px;
  }
`

const MainContainer = styled(Container)`
  animation: ${fadeIn} 3s;
  min-height: calc(100vh - 64px);
  margin-top: 128px;
`

const Title = styled.h1`
  font-size: 42px;
  font-family: Montserrat;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`
const CustomLink = styled(Link)`
  font-size: 48px;
  font-family: Montserrat;
  font-weight: 800;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const SubTitle = styled.h2`
  margin-top: 16px;
  font-size: 24px;
  font-family: Montserrat;
  color: #262626;

  @media (max-width: 1020px) {
    font-size: 12px;
  }
`
const RightIllus = styled.div`
  min-width: 700px;
  padding-left: 64px;
`
const LeftIllus = styled.div`
  min-width: 700px;
  padding-right: 64px;
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
      <DesktopOnly>
        <RightIllus>
          <img src={TitleIllus} alt="Title"></img>
        </RightIllus>
      </DesktopOnly>
    </MainContainer>
    <Container>
      <DesktopOnly>
        <LeftIllus>
          <img src={ProblemIllus} alt="Problem"></img>
        </LeftIllus>
      </DesktopOnly>
      <div>
        <Title>
          With over 200 problems designed and curated by our specialists, we
          strive to deliver the most comprehensive learning experience possible.{' '}
          <CustomLink to="/tasks/0000">
            (Take me to my first problem!)
          </CustomLink>
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
          algorithmic problem-solving.{' '}
          <CustomLink to="/learn">(Start learning now!)</CustomLink>
        </Title>
        <SubTitle>
          Programming.in.th provides you with the fundamentals of algorithmic
          problem-solving, an important skill to differentiate yourself as a
          programmer in an increasingly technologically advanced world.
        </SubTitle>
      </div>
      <DesktopOnly>
        <RightIllus>
          <img src={LearnIllus} alt="Learn"></img>
        </RightIllus>
      </DesktopOnly>
    </Container>
    <Container>
      <div>
        <Title>Got a question? Ask away!</Title>
      </div>
    </Container>
  </React.Fragment>
)

export const Index = withRouter(_Index)
