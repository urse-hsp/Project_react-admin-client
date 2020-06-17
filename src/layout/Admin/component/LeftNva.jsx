import React, { Component } from 'react'
import './index.less'

// 导航栏数据
import menuConfig from '../../../config/menuConfig'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'


const { SubMenu } = Menu
/*左侧导航组件*/

export default class LeftNav extends Component {
  state = {
    collapsed: true,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  // 递归传递菜单数据
  menuConfig = (MenuConfig) => {
    return MenuConfig.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
            {this.menuConfig(item.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    return (
      <div className="left-nav">
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
          {this.menuConfig(menuConfig)}
        </Menu>
      </div>
    )
  }
}
