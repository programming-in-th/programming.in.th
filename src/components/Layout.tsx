import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Layout } from 'antd'

import { Navigator } from './Nav'
import { GlobalStyle } from '../design'

import { IAppState } from '../redux'
import * as actionCreators from '../redux/actions'
import { CustomHead } from './head'
import { CustomSpin } from '../components/Spin'
import firebase from '../lib/firebase'

const { Content, Footer } = Layout

const CustomLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #fafafa;
`

interface IPageLayoutProps {
  hideNav?: boolean
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  const dispatch = useDispatch()
  firebase.auth().onAuthStateChanged(user => {
    dispatch(actionCreators.fetchUser(user))
  })
  const user = useSelector((state: IAppState) => state.user.user)
  if (user === 'LOADING') {
    return <CustomSpin></CustomSpin>
  }
  return (
    <React.Fragment>
      <CustomLayout>
        <GlobalStyle />
        <Navigator hidden={props.hideNav} />
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

PageLayout.defaultProps = {
  hideNav: false
}
