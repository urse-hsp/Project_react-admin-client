import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

const FormVerify = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    phone: [{ required: true, message: '请输入手机号' }],
    email: [{ required: true, message: '请输入邮箱' }],
    role_id: [{ required: true, message: '请选择角色' }],
}

/*
    添加/修改用户的form组件
 */
class UserForm extends PureComponent {
    static propTypes = {
        // setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
    }
    formRef = React.createRef()
    state = {
        user: {},
    }
    constructor(props) {
        super(props)
        const user = this.props.user || {}
        this.state = {
            user,
        }
    }
    showData = () => {
        const user = this.state.user
        this.formRef.current.setFieldsValue({
            username: user.username,
            password: user.password,
            phone: user.phone,
            email: user.email,
            role_id: user.role_id,
        })
    }

    componentDidMount() {
        this.showData()
        //2 子组件 componentDidMount 中接收 onRef 并把 this 传给父组件
        this.props.onRef(this)
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.user
        this.setState(
            {
                user: user
            },
            () => {
                this.showData()
            }
        )
    }
    render() {
        const { roles } = this.props
        const user = this.props.user || {}
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 }, // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} ref={this.formRef}>
                <Item name="username" label="用户名" rules={FormVerify.username}>
                    <Input placeholder="请输入用户名" />
                </Item>
                {user._id ? null : (
                    <Item name="password" label="密码" rules={FormVerify.password}>
                        <Input type="password" placeholder="请输入密码" />
                    </Item>
                )}
                <Item name="phone" label="手机号" rules={FormVerify.phone}>
                    <Input placeholder="请输入手机号" />
                </Item>
                <Item name="email" label="邮箱" rules={FormVerify.email}>
                    <Input placeholder="请输入邮箱" />
                </Item>
                <Item name="role_id" label="角色" rules={FormVerify.role_id}>
                    <Select>
                        {roles.map((role) => (
                            <Option key={role._id} value={role._id}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </Item>
            </Form>
        )
    }
}

export default UserForm
