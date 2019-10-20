import React from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

import { INode } from '../../redux/types/learn'

const { SubMenu } = Menu

interface ISiderProps {
  currentPath: string
  nodes: any
  onClose: () => void
  onItemClick: (node: any) => void
}

export const SideMenu: (props: ISiderProps) => any = props => {
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
