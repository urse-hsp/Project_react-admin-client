import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo512.png'
import { message } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'
// import { reqLogin } from '../../api/index'

// form表单逐渐
import FormMenu from './component/Form'
// api请求接口

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // login = async (username, password) => {
    //     const res = await reqLogin(username, password)
    //     if (res.status !== 0) {
    //         return message.error(res.msg)
    //     }
    //     message.success('登录成功')

    //     const user = res.data
    //     // 存到本地
    //     storageUtils.saveUser(user)
    //     // 自定义内容，保存在内存中
    //     memoryUtils.user = user
    //     this.props.history.replace('/home') // 返回没有路由历史
    //     // this.props.history.push('/')
    // }
    render() {
        // if (memoryUtils.user && memoryUtils.user._id) {
        //     return <Redirect to="/" />
        // }
        // 如果用户已经登陆, 自动跳转到管理界面
        const user = this.props.user
        if (user && user._id) {
            return <Redirect to="/home" />
        }
        console.log(user)
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="返回首页" />
                    <h1>react：后台管理系统</h1>
                </header>
                <section className="login-content">
                <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
                    <h2>用户登录</h2>
                    <FormMenu login={this.props.login} />
                </section>
            </div>
        )
    }
}

// export default Login
export default connect((state) => ({ user: state.user }), { login })(Login)
