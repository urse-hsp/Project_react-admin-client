import React, { Component } from 'react'
import './index.less'

// 导航栏数据
import menuConfig from '../../../config/menuConfig'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import memoryUtils from '../../../utils/memoryUtils'

const { SubMenu } = Menu
/*左侧导航组件*/

// const suba = ''
export default class LeftNav extends Component {
    state = {
        collapsed: true,
        openKey: [],
    }
    /* 判断当前登陆用户对item是否有权限 */
    hasAuth = (item) => {
        const { key, isPublic } = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        /*
            1. 如果当前用户是admin
            2. 如果当前item是公开的
            3. 当前用户有此item的权限: key有没有menus中
        */
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) {
            // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find((child) => menus.indexOf(child.key) !== -1)
        }

        return false
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    //2 递归传递菜单数据
    // menuConfig = (MenuConfig) => {
    //     return MenuConfig.map((item) => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key} icon={<item.icon />}>
    //                     <Link to={item.key}>{item.title}</Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
    //                     {this.menuConfig(item.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    /*
  根据menu的数据数组生成对应的标签数组
  使用reduce() + 递归调用
  */
    getMenuNodes = (menuList) => {
        // 得到当前请求的路由路径
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {
                // 向pre添加<Menu.Item>
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.key} icon={<item.icon />}>
                            <Link to={item.key}>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.openKey = item.key
                    }
                    // 向pre添加<SubMenu>
                    pre.push(
                        <SubMenu
                            key={item.key}
                            icon={<item.icon />}
                            title={
                                <span>
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }

            return pre
        }, [])
    }

    //2 判断path 刷新不然列表缩进
    // menuConfig2 = (MenuConfig) => {
    //     const path = this.props.location.pathname
    //     MenuConfig.forEach((item) => {
    //         if (item.children) {
    //             item.children.forEach((items) => {
    //                 if (path.indexOf(items.key) !== -1) {
    //                     this.setState({ openKey: item.key })
    //                 }
    //             })
    //         }
    //     })
    // }
    componentWillMount() {
        // this.menuConfig2(menuConfig)
        this.menuNodes = this.getMenuNodes(menuConfig)
    }
    render() {
        const path = this.props.location.pathname
        return (
            <div className="left-nav">
                {/*  inlineCollapsed={this.state.collapsed}  */}
                <Menu defaultOpenKeys={[`${this.openKey}`]} mode="inline" theme="dark" selectedKeys={path}>
                    {/*2 {this.menuConfig(menuConfig)} */}
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
