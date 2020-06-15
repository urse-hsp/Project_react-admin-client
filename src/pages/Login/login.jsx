import React, { Component } from 'react'
import './login.less'
import logo from './images/logo512.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Item = Form.Item

// 输入验证规则
const loginRules = {
  userName: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入登录密码' },{ min : 4, mix: 12, message: '密码长度在4 - 12 位'}],
}
class Login extends Component {
  constructor (props) {
    super(props)
      this.state = {}
      console.log(this.props)
  }
  componentDidMount() {
 
  }
  onFinish = (values) => {
    console.log(values)
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
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
            <Item name="username" rules={loginRules.userName}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Item>
            <Form.Item name="password" rules={loginRules.password}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
// const WrapLogin = Form.useForm(Login)
export default Login
