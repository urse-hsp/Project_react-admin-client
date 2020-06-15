import React, { Component } from 'react'
import './login.less'
import logo from './images/logo512.png'

// form表单逐渐
import FormMenu from './component/Form'

import { reqLogin } from '../../api/index'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() { }

  login = async (username, password) => { 
    console.log('发送登陆的 ajax 请求', username, password) 
    const result = await reqLogin(username, password) 
    console.log('login()', result) 
  }
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>react：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <FormMenu login={this.login}/>
        </section>
      </div>
    )
  }
}

export default Login