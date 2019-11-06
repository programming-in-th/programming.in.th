import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import { Navigator } from './Nav'
import { GlobalStyle } from '../design'

import { CustomSpin } from '../components/Spin'
import firebase from '../lib/firebase'
import { useUser, useUserDispatch } from './UserContext'

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
  const dispatch = useUserDispatch()
  const user = useUser()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch({
        type: 'RECEIVE_USER',
        payload: {
          user
        }
      })
    })
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getIsAdmin')({})

      dispatch({ type: 'RECEIVE_ADMIN', payload: { isAdmin: response.data } })
    }

    console.log(user)
    fetchAdmin()
  }, [user])

  // Waiting for dashboard implementation, so we use this as placeholder
  if (user.user === undefined) {
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
