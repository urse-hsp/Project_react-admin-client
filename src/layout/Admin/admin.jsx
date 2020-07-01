import React, { Component } from 'react'
// import memeoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import logo from '../../assets/images/logo512.png'

import './admin.less'
import Header from './component/Header'
import LeftNva from './component/LeftNva'
import { connect } from 'react-redux'

// 路由导入组件
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/index'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import NotFound from '../../pages/not-found/not-found'

const { Sider, Content, Footer } = Layout

const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
/*后台管理的路由组件*/

class Admin extends Component {
    state = {
        // 控制左侧导航缩小的布尔值
        collapsed: false,
    }
    // 控制左侧导航缩小的方法
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render() {
        const user = this.props.user
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="react后台" />
                            {!this.state.collapsed && <h1>后台管理系统</h1>}
                        </Link>
                    </div>
                    <LeftNva location={this.props.location}></LeftNva>
                </Sider>
                <Layout className="site-layout">
                    <Header toggle={this.toggle} collapsed={this.state.collapsed} location={this.props.location} history={this.props.history}></Header>
                    <Content className="site-layout-background" style={{ margin: '24px 16px' }}>
                        <Switch>
                            <Redirect exact from="/" to="/home" />
                            <Route path="/home" component={Home} />
                            <Route path="/category" component={Category} />
                            <Route path="/product" component={Product} />
                            <Route path="/role" component={Role} />
                            <Route path="/user" component={User} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect((state) => ({ user: state.user }), {})(Admin)
