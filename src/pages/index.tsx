import React from 'react'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { PageLayout } from '../components/Layout'

import styled, { keyframes } from 'styled-components'
import { DesktopOnly, media } from '../design/Responsive'
import { RegisterPage } from '../components/auth/Register'
import { StyledCard } from '../components/auth/Style'
import { Fonts } from '../design'
import { useUser } from '../components/UserContext'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 64px;

  ${media('TABLET')} {
    margin: 32px;
    flex-direction: column;
  }
`

const MainContainer = styled(Container)`
  animation: ${fadeIn} 1s cubic-bezier(0.39, 0.575, 0.565, 1);
  margin-top: 0;
  min-height: calc(100vh - 128px);

  ${media('IPAD_PRO')} {
    margin: 16px;
  }

  ${media('TABLET')} {
    min-height: unset;
  }
`

const Title = styled.h1<{ color?: string }>`
  font-size: 42px;
  font-family: Montserrat;
  font-weight: 800;
  display: inline;
  color: ${props => props.color || 'black'};

  ${media('PHABLET')} {
    font-size: 24px;
  }
`

const SubTitle = styled.h2`
  margin-top: 16px;
  font-size: 24px;
  font-family: ${Fonts.display};
  color: #262626;
`

const CustomLink = styled.a`
  font-size: 36px;
  font-family: Montserrat;
  font-weight: 800;
  text-decoration: none;
`

const RightIllus = styled.div`
  min-width: 55%;
  padding-left: 64px;
`

const LeftIllus = styled.div`
  min-width: 55%;
  padding-right: 64px;
`

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40%;
  padding-left: 64px;

  ${media('TABLET')} {
    min-width: 60vw;
    padding-left: 0;
  }

  ${media('PHONE')} {
    min-width: 50vw;
    padding: 0px;
    padding-top: 15px;
  }
`

export default () => {
  const { user } = useUser()
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
              เรามีโจทย์ตั้งแต่ระดับพื้นฐานที่สุดจนถึงระดับค่ายสสวทและผู้แทนประเทศ
              นอกจากนี้ยังมีบทความอีกมากมายที่คุณสามารถใช้เรียนรู้อัลกอริทึมและโครงสร้างข้อมูลต่าง
              ๆ ได้ ซึ่งมีความจำเป็นอย่างในการทำงานเป็นนักเขียนโปรแกรมระดับสูง
            </SubTitle>
          </div>
          {user ? (
            <RightIllus>
              <LazyLoadImage
                src="/assets/svg/title.svg"
                alt="title"
                threshold={1000}
              />
            </RightIllus>
          ) : (
            <RegisterWrapper>
              <StyledCard>
                <RegisterPage></RegisterPage>
              </StyledCard>
            </RegisterWrapper>
          )}
        </MainContainer>
        <DesktopOnly>
          <Container>
            <LeftIllus>
              <LazyLoadImage
                src="/assets/svg/problem.svg"
                alt="problem"
                threshold={1000}
              />
            </LeftIllus>
            <div>
              <Title>
                With over 400 problems designed and curated by our specialists,
                we strive to deliver the most comprehensive learning experience
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
            <RightIllus>
              <LazyLoadImage
                src="/assets/svg/learn.svg"
                alt="learn"
                threshold={1000}
              />
            </RightIllus>
          </Container>
          <Container>
            <div>
              <Title>Got a question? Ask away!</Title>
            </div>
          </Container>
        </DesktopOnly>
      </Wrapper>
    </PageLayout>
  )
}
