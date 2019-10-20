import React from 'react'
import { Menu, Icon, Col, Row, Layout, Drawer } from 'antd'
import { NavLink } from 'react-router-dom'
import readingTime from 'reading-time'

import { LearnContent } from '../components/learn/LearnContent'
import { CustomSpin } from '../components/Spin'
import { responsive } from '../components/Responsive'
import { copyToClipboard } from '../utils/copyToClipBoard'

import * as actionCreators from '../redux/actions/index'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import styled from 'styled-components'

import { INode } from '../redux/types/learn'
import { IAppState } from '../redux'

const { SubMenu } = Menu
const { Content } = Layout

const DrawerMenu = styled.div`
  position: fixed;
  top: 144px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 0 4px 4px 0;

  @media ${responsive} {
    display: flex;
  }
`

const Clipboard = styled.p`
  margin-right: 5px;
  cursor: grab;
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 100px auto 70px;
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

interface ILearnProps {
  menu: INode[]
  match: any
  menuStatus: string
  idMap: Map<string, INode>
  currentContent: string[]
  currentContentStatus: string
  onInitialLoad: (article_id: string) => void
  onChangeArticle: (newArticle: INode | undefined) => void
}

interface ILearnState {
  visible: boolean
}

class Learn extends React.Component<ILearnProps, ILearnState> {
  state = {
    visible: false
  }

  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.article_id)
  }

  onItemClick = (node: any) => {
    this.props.onChangeArticle(this.props.idMap.get(node.article_id))
    this.onClose()
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  getArticleName = (nodes: INode[], id: string) => {
    const node = nodes.find(element => {
      if (element.article_id === id) {
        return true
      } else {
        return false
      }
    })

    if (node) {
      return node.name
    }
  }

  render() {
    const currentPath = this.props.match.url
    const nodes = this.props.menu
    const article_id = this.props.match.params.article_id

    return this.props.menuStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      <Layout style={{ backgroundColor: '#fafafa' }}>
        <DrawerMenu onClick={this.showDrawer}>
          <Icon type="menu" />
        </DrawerMenu>
        <Drawer
          placement="left"
          width={290}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ marginTop: '20px', padding: 0 }}
        >
          <SideMenu
            nodes={nodes}
            currentPath={currentPath}
            onClose={this.onClose}
            onItemClick={this.onItemClick}
          />
        </Drawer>
        <Content>
          <div>
            {article_id ? (
              <div>
                <Header>
                  <Heading>{this.getArticleName(nodes, article_id)}</Heading>
                  <SubTitle>
                    <Clipboard
                      onClick={() => copyToClipboard(window.location.href)}
                    >
                      Link
                    </Clipboard>
                    |{' '}
                    {this.props.currentContent &&
                      readingTime((this.props
                        .currentContent as unknown) as string).text}
                  </SubTitle>
                </Header>
                <Row>
                  <Col
                    lg={{ span: 12, offset: 6 }}
                    xs={{ span: 18, offset: 3 }}
                  >
                    <LearnContent
                      article_id={article_id}
                      currentContentStatus={this.props.currentContentStatus}
                      currentContent={this.props.currentContent}
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <br />
                <br />
                Welcome to Programming.in.th Tutorials, a comprehensive
                compilation of all the resources you need to succeed in learning
                algorithms, data structures and competitive programming!
              </div>
            )}
          </div>
        </Content>
      </Layout>
    )
  }
}

interface ISiderProps {
  currentPath: string
  nodes: any
  onClose: () => void
  onItemClick: (node: any) => void
}

const SideMenu: (props: ISiderProps) => any = props => {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[props.currentPath]}
      style={{ borderRight: 'none' }}
    >
      <Menu.Item key={'/learn'} onClick={props.onClose}>
        <NavLink to={'/learn'}>
          <Icon type="home" theme="filled" />
          Welcome!
        </NavLink>
      </Menu.Item>
      {props.nodes.map((node: INode) => {
        return node.type === 'section' ? (
          <SubMenu key={node.name} title={node.name}>
            {node.articles!.map((sub_node: INode) => {
              return (
                <Menu.Item
                  key={'/learn/' + sub_node.article_id}
                  onClick={() => props.onItemClick(sub_node)}
                >
                  <NavLink to={'/learn/' + sub_node.article_id}>
                    {sub_node.name}
                  </NavLink>
                </Menu.Item>
              )
            })}
          </SubMenu>
        ) : (
          <Menu.Item
            key={'/learn/' + node.article_id}
            onClick={() => props.onItemClick(node)}
          >
            <NavLink to={'/learn/' + node.article_id}>{node.name}</NavLink>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

const mapStateToProps: (state: IAppState) => any = state => {
  return {
    menu: state.learn.menu,
    menuStatus: state.learn.menuStatus,
    idMap: state.learn.idMap,
    currentContent: state.learn.currentContent,
    currentContentStatus: state.learn.currentContentStatus
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: (article_id: string) => {
      dispatch(actionCreators.loadMenu(article_id))
    },
    onChangeArticle: (newArticle: INode) => {
      dispatch(actionCreators.loadContent(newArticle.url!))
    }
  }
}

export const LearnPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Learn)
