import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'

class Role extends Component {
    state = {
        roles: [], // 所以角色的列表
        role: {}, // 选中的role
        isShowAdd: false, // 显示添加界面
        isShowAuth: false,
    }
    constructor(props) {
        super(props)
        this.auth = React.createRef()
    }
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time),
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate,
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles,
            })
        }
    }
    onRow = (role) => {
        return {
            onClick: (event) => {
                console.log(role)
                this.setState({
                    role,
                })
            },
        }
    }
    // 添加角色
    addRole = () => {
        this.form.current
            .validateFields()
            .then(async (values) => {
                const { name } = values
                this.form.current.resetFields()
                const result = await reqAddRole(name)
                if (result.status === 0) {
                    message.success('添加角色成功')
                    // this.getRoles()
                    // 新产生的角色
                    const role = result.data
                    // 更新roles状态
                    /*const roles = this.state.roles
                        roles.push(role)
                        this.setState({
                        roles
                    })*/
                    // 更新roles状态: 基于原本状态数据更新
                    this.setState((state) => ({
                        isShowAdd: false,
                        roles: [...state.roles, role],
                    }))
                } else {
                    message.error('添加角色失败')
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo)
            })
    }
    updataRole = async () => {
        const role = this.state.role
        const menus = this.auth.current.getMenus()
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        // 请求更新
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            // this.getRoles()
            // 如果当前更新的是自己角色的权限, 强制退出
            this.setState({ isShowAuth: false })
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户角色权限成功')
            } else {
                message.success('设置角色权限成功')
                // this.setState({
                //     roles: [...this.state.roles],
                // })
            }
        }
    }

    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role, isShowAdd, isShowAuth } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
                    创建角色
                </Button>{' '}
                &nbsp;&nbsp;
                <Button type="primary" disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>
                    设置角色权限
                </Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5 }}
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.form.current.resetFields()
                    }}
                >
                    <AddForm setForm={(form) => (this.form = form)} />
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updataRole}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                    }}
                >
                    <AuthForm role={role} ref={this.auth} />
                </Modal>
            </Card>
        )
    }
}
export default Role
