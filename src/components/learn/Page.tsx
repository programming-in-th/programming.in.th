import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'

import { PageHeader } from 'antd'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { MDXProvider } from '@mdx-js/react'
import {
  P,
  H1,
  H2,
  H3,
  Ol,
  Ul,
  Table,
  Img,
  Em,
  Code,
  Blockquote
} from './elements'

import { media } from '../../design/Responsive'

import { PageLayout } from '../Layout'

export const LearnComponents = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  ol: Ol,
  ul: Ul,
  table: Table,
  img: Img,
  em: Em,
  pre: Code,
  blockquote: Blockquote
}

const Header = styled.header`
  position: sticky;
  top: 0px;
  background-color: white;

  z-index: 10;
  margin: 48px auto;
  padding-top: 16px;
  max-width: 100%;
  text-align: center;

  ${media('TABLET')} {
    margin: 50px auto 50px;
    padding: 0 40px;
    max-width: 100%;
  }

  @media (max-height: 700px) {
    margin: 48px auto;
  }
`

const Heading = styled.h1<{ scroll: number }>`
  font-size: ${props => Math.max(16, 40 - 3.2 * props.scroll)}px;
  margin-bottom: 25px;
  display: inline-block;
  font-weight: 600;
  line-height: 1.32;
  color: rgba(19, 20, 21, 0.3);
  /* transition: all 0.1s; */

  background-clip: text;
  -webkit-background-clip: text;

  background-image: ${props =>
    `linear-gradient(to right, #000 ${props.scroll}%, transparent ${props.scroll}%)`};

  ${media('TABLET')} {
    font-size: 32px;
  }
`

const SubTitle = styled.div`
  position: relative;
  display: flex;
  font-size: 18px;
  color: grey;
`

const Nav = styled.div`
  margin: 0 auto 20px;
  width: 70%;
`

const ContentWrapper = styled.div`
  margin: 0px auto 30px;
  max-width: 768px;

  ${media('TABLET')} {
    max-width: 100%;
    padding: 0px 20px 50px;
  }
`

interface IMeta {
  title: string
}

export const withContent = (meta: IMeta) => ({ children }) => {
  const router = useRouter()
  const [percentage, setPercentage] = useState(0)

  const handleScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      const target = document.documentElement || document.body
      const vh = target.clientHeight

      const percentage = (target.scrollTop / (target.scrollHeight - vh)) * 100
      setPercentage(percentage)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

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
      <PageLayout hideNav={true} bg="white">
        <Nav>
          <PageHeader
            onBack={() => router.push('/learn')}
            title="Back"
            subTitle="Go to all articles"
          />
        </Nav>
        <Header>
          <Heading scroll={percentage}>{meta.title}</Heading>
          <SubTitle>
            {/* <Clipboard onClick={() => copyToClipboard(window.location.href)}>
              Link
            </Clipboard> */}
          </SubTitle>
        </Header>
        <div>
          <ContentWrapper>
            <MDXProvider components={LearnComponents}>
              <article>{children}</article>
            </MDXProvider>
          </ContentWrapper>
        </div>
      </PageLayout>
    </React.Fragment>
  )
}
