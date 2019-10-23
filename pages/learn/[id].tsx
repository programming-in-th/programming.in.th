import React from 'react'
import axios from 'axios'

import { Col, Row, PageHeader } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import firebase from '../../lib/firebase'

import { responsive } from '../../components/Responsive'
import { copyToClipboard } from '../../utils/copyToClipboard'

import { MarkDownStyle, GlobalStyle } from '../../components/Design'
import { CustomHead } from '../../components/Head'

import 'highlight.js/styles/atom-one-dark.css'

const Clipboard = styled.p`
  margin-right: 5px;
  cursor: grab;
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 60px auto 70px;
  max-width: 749px;

  @media screen and ${responsive} {
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

  @media screen and ${responsive} {
    font-size: 32px;
  }
`

const SubTitle = styled.div`
  position: relative;
  display: flex;
  font-size: 18px;
  color: grey;
`

const DefaultContent = styled.div`
  margin: 0 auto;
  max-width: 700px;
  margin-top: 120px;
  h1 {
    font-size: 48px;
  }
`

const Nav = styled.div`
  margin: 0 auto 20px;
  padding-top: 50px;
  width: 70%;
`

interface IInitailLearnProps {
  title: string
  readingTime: string
  content: string
}

const Learn: NextPage<IInitailLearnProps> = props => {
  const router = useRouter()
  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      <GlobalStyle />
      <CustomHead />
      <Nav>
        <PageHeader
          onBack={() => router.push('/learn')}
          title="Back"
          subTitle="Go to all articles"
        />
      </Nav>
      <Header>
        <Heading>{props.title}</Heading>
        <SubTitle>
          <Clipboard onClick={() => copyToClipboard(window.location.href)}>
            Link
          </Clipboard>
          | {props.readingTime}
        </SubTitle>
      </Header>
      <div>
        <Row>
          <Col lg={{ span: 12, offset: 6 }} xs={{ span: 18, offset: 3 }}>
            <MarkDownStyle>
              <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
            </MarkDownStyle>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Learn.getInitialProps = async ({ query, req }) => {
  const { id } = query

  if (req) {
    const unified = eval("require('unified')")
    const parse = eval("require('remark-parse')")
    const remark2rehype = eval("require('remark-rehype')")
    const math = eval("require('remark-math')")
    const katex = eval("require('rehype-katex')")
    const stringify = eval("require('rehype-stringify')")
    const highlight = eval("require('rehype-highlight')")
    const readingTime = eval("require('reading-time')")

    const processor = unified()
      .use(parse)
      .use(math)
      .use(remark2rehype)
      .use(katex)
      .use(highlight)
      .use(stringify)

    const response = await firebase
      .app()
      .functions('asia-east2')
      .httpsCallable('getArticleByID')({ article_id: id })

    const { name, url } = response.data

    const contentRes = await axios.get(url)

    const content = processor.processSync(contentRes.data).contents
    const readTime = readingTime(contentRes.data)

    return {
      title: name,
      readingTime: readTime.text,
      content: content
    }
  }
}

export default Learn
