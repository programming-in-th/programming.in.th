import React from 'react'
import styled from 'styled-components'
import { Layout as AntLayout } from 'antd'

import { Navigator } from './Nav'
import { useUser } from './UserContext'

const { Content: AntContent, Footer: AntFooter } = AntLayout

const Layout = styled(AntLayout)<{ bg?: string; loading?: boolean }>`
  min-height: 100vh;
  background-color: ${props => (props.bg ? props.bg : '#fafafa')};
  display: ${props => (props.loading ? 'none' : 'flex')};
`

const Footer = styled(AntFooter)<{ bg?: string }>`
  text-align: center;
  background-color: ${props => (props.bg ? props.bg : '#fafafa')};
`

const Content = styled(AntContent)`
  margin-top: 64px;
`

interface IPageLayoutProps {
  hideNav?: boolean
  bg?: string
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  const { user } = useUser()

  return (
    <Layout bg={props.bg} loading={user === undefined}>
      {!props.hideNav && <Navigator />}
      <Content style={{ marginTop: 64 }}>{props.children}</Content>
      <Footer bg={props.bg}>
        IPST ©2019-{new Date().getFullYear()} | Contribution: All the source
        code for this website is available on{' '}
        <a
          href="https://github.com/programming-in-th/programming.in.th"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Footer>
    </Layout>
  )
}

PageLayout.defaultProps = {
  hideNav: false
}
