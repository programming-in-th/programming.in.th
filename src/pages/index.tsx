import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Img from 'react-image'

import { PageLayout } from '../components/Layout'

import styled, { keyframes } from 'styled-components'
import { DesktopOnly } from '../design/Responsive'
import { RegisterPage } from '../components/auth/Register'
import { IAppState } from '../redux'
import { StyledCard } from '../components/auth/Style'
import { CustomSpin } from '../components/Spin'
import { Fonts } from '../design'

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
  align-items: center;
  justify-content: space-around;
  margin: 64px;

  @media (max-width: 768px) {
    display: block;
    margin: 32px;
  }
`

const MainContainer = styled(Container)`
  animation: ${fadeIn} 3s;
  margin-top: 0;
  min-height: calc(100vh - 128px);

  @media (max-width: 812px) {
    min-height: unset;
  }
`

const Title = styled.h1<{ color?: string }>`
  font-size: 42px;
  font-family: Montserrat;
  font-weight: 800;
  display: inline;
  color: ${props => props.color || 'black'};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const CustomLink = styled.a`
  font-size: 36px;
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
  font-family: ${Fonts.display};
  color: #262626;

  @media (max-width: 1020px) {
    font-size: 12px;
  }
`

const RightIllus = styled.div`
  min-width: 55%;
  padding-left: 64px;
`

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40%;
  padding-left: 64px;
`

const LeftIllus = styled.div`
  min-width: 55%;
  padding-right: 64px;
`

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const ImgPlaceholder = styled.div`
  height: 100%;
  width: 100%;
`

export default () => {
  const user = useSelector((state: IAppState) => state.user.user)

  return (
    <PageLayout>
      <Wrapper id="scrolling-container">
        <MainContainer>
          <div>
            <Title>
              "Bad programmers worry about the code. Good programmers worry
              about
            </Title>
            <Title color="#5D5CFF"> data structures </Title>{' '}
            <Title>and their relationships" — Linus Torvalds</Title>
            <SubTitle>
              ยินดีต้อนรับเข้าสู่ programming.in.th!
              โจทย์ของเรามีตั้งแต่ระดับพิ้นฐานที่สุดจนถึงระดับค่ายสสวทและผู้แทนประเทศ
              นอกจากนี้ยังมีบทความอีกมากมายที่คุณสามารถใช้เรียนรู้อัลกอริทึมและโครงสร้างข้อมูลต่างๆได้
              ซึ่งมีความจำเป็นอย่างในการทำงานเป็นนักเขียนโปรแกรมระดับสูง
            </SubTitle>
          </div>
          <DesktopOnly>
            {user ? (
              <RightIllus>
                <Img
                  src="/svg/title.svg"
                  alt="title"
                  loader={<ImgPlaceholder></ImgPlaceholder>}
                ></Img>
              </RightIllus>
            ) : (
              <RegisterWrapper>
                <StyledCard>
                  <RegisterPage></RegisterPage>
                </StyledCard>
              </RegisterWrapper>
            )}
          </DesktopOnly>
        </MainContainer>
        <Container>
          <DesktopOnly>
            <LeftIllus>
              <Img
                src="/svg/problem.svg"
                alt="problem"
                loader={<ImgPlaceholder></ImgPlaceholder>}
              ></Img>
            </LeftIllus>
          </DesktopOnly>
          <div>
            <Title>
              With over 400 problems designed and curated by our specialists, we
              strive to deliver the most comprehensive learning experience
              possible.{' '}
            </Title>
            <Link href="/tasks/0000">
              <CustomLink>(Take me to my first problem!)</CustomLink>
            </Link>
          </div>
        </Container>
        <Container>
          <div>
            <Title>
              Our learning resources contain all the content you need to excel
              at algorithmic problem-solving.{' '}
              <Link href="/learn">
                <CustomLink>(Start learning now!)</CustomLink>
              </Link>
            </Title>
          </div>
          <DesktopOnly>
            <RightIllus>
              <Img
                src="/svg/learn.svg"
                alt="learn"
                loader={<ImgPlaceholder></ImgPlaceholder>}
              ></Img>
            </RightIllus>
          </DesktopOnly>
        </Container>
        <Container>
          <div>
            <Title>Got a question? Ask away!</Title>
          </div>
        </Container>
      </Wrapper>
    </PageLayout>
  )
}
