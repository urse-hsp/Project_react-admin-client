import React, { Component } from 'react'
import './index.less'

// 导航栏数据
import menuConfig from '../../../config/menuConfig'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const { SubMenu } = Menu
/*左侧导航组件*/

// const suba = ''
export default class LeftNav extends Component {
    state = {
        collapsed: true,
        openKey: [],
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
    menuConfig2 = (MenuConfig) => {
        const path = this.props.location.pathname
        MenuConfig.forEach((item) => {
            if (item.children) {
                item.children.forEach((items) => {
                    if (path.indexOf(items.key)!==- 1) {
                        this.setState({ openKey: item.key })
                    }
                })
            }
        })
    }
    componentWillMount() {
        this.menuConfig2(menuConfig)
    }
    render() {
        const path = this.props.location.pathname
        return (
            <div className="left-nav">
                <Menu defaultOpenKeys={[`${this.state.openKey}`]} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed} selectedKeys={path}>
                    {this.menuConfig(menuConfig)}
                </Menu>
            </div>
        )
    }
}
