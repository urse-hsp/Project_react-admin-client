import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// item 二次拿出命名，可直接使用
const FromItem = Form.Item

function Validator(rule, value, callback) {
  const pwdReg = /^[a-zA-Z0-9_]+$/
  if (pwdReg.test(value)) {
    // return callback()
    return Promise.resolve()
  }
  // return callback(new Error('密码必须是英文、数组或下划线组成'))
  return Promise.reject("密码必须是英文、数组或下划线组成'")
}
// 输入验证规则
const loginRules = {
  userName: [
    { required: true, whitespace: true, message: '必须输入用户名' },
    { min: 4, message: '用户名必须大于 4 位' },
    { max: 12, message: '用户名必须小于 12 位' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成' },
  ],
  password: [{ required: true, message: '请输入登录密码' }, { min: 4, message: '密码必须大于 4 位' }, { max: 12, message: '密码必须大于 12 位' }, { validator: Validator }],
}
const FormMenu = (props) => {
  //直接在组件内部使用useForm（）;  得到强大的功能对象，form
  const [form] = Form.useForm()

  const onFinish = (values) => {
    form
      .validateFields()
      .then((value) => {
        props.login(values.username, values.password)
      })
      .catch((errorInfo) => {
        return message.error('登录失败')
      })
  }
  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <FromItem name="username" rules={loginRules.userName}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin"  autocomplete="off"/>
      </FromItem>
      <Form.Item name="password" rules={loginRules.password}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default FormMenu
