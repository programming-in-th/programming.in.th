import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout } from 'antd'

import { Navigator } from '../components/Nav'
import { GlobalStyle } from '../components/Design'

import * as actionCreators from '../redux/actions'
import { CustomHead } from './Head'

const { Content, Footer } = Layout

const CustomLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #fafafa;
`

export const PageLayout: React.FunctionComponent = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionCreators.fetchUser())
  })

  return (
    <React.Fragment>
      <CustomHead />
      <CustomLayout>
        <GlobalStyle />
        <Navigator />
        <Content style={{ marginTop: 64 }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#fafafa' }}>
          IPST ©2019 | Contribution: All the source code for this website is
          available on{' '}
          <a
            href="https://github.com/programming-in-th/programming.in.th"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Footer>
      </CustomLayout>
    </React.Fragment>
  )
}
