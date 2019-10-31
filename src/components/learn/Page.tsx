import React from 'react'
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

import { Col, Row, PageHeader } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { responsive } from '../../design/Responsive'
import { copyToClipboard } from '../../utils/copyToClipboard'

import { PageLayout } from '../Layout'
import Head from 'next/head'

const Components = {
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

const Clipboard = styled.p`
  margin-right: 5px;
  cursor: grab;
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 60px auto 70px;
  padding-left: 68px;
  max-width: 749px;

  @media screen and (${responsive}) {
    margin: 50px auto 50px;
    padding: 0 40px;
    max-width: 100%;
  }

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`

const Heading = styled.h1`
  font-size: 48px;
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  @media screen and (${responsive}) {
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

interface IMeta {
  title: string
}

interface IInitailLearnProps {
  children: React.ReactNode
  meta: IMeta
}

export const Learn: NextPage<IInitailLearnProps> = props => {
  const router = useRouter()
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
      <PageLayout hideNav={true}>
        <Nav>
          <PageHeader
            onBack={() => router.push('/learn')}
            title="Back"
            subTitle="Go to all articles"
          />
        </Nav>
        <Header>
          <Heading>{props.meta.title}</Heading>
          <SubTitle>
            <Clipboard onClick={() => copyToClipboard(window.location.href)}>
              Link
            </Clipboard>
          </SubTitle>
        </Header>
        <div>
          <Row>
            <Col lg={{ span: 12, offset: 6 }} xs={{ span: 18, offset: 3 }}>
              <MDXProvider components={Components}>
                <article>{props.children}</article>
              </MDXProvider>
            </Col>
          </Row>
        </div>
      </PageLayout>
    </React.Fragment>
  )
}
