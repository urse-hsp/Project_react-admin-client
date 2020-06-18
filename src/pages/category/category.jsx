import React, { Component } from 'react'
import './index.less'
import { Card, Table, Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api/index'
import LinkButton from '../../components/Link-button'

import AddFrom from './component/addForm'

class Category extends Component {
    state = {
        // 一级分类列表
        categorys: [], //一级列表
        loading: false,
        subCategorys: [], //子分类列表
        parentId: '0',
        parentName: '',
        showStatus: 0, // 表示添加 更新的确认框。0都不显示。1表示显示添加，2显示更新
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                key: 'parentId',
                render: (category) => (
                    <span>
                        <LinkButton style={{ marginRight: 16 }} onClick={this.showUpdate}>
                            修改分类
                        </LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={this.showSubCategorys.bind(this, category)}>查看子分类</LinkButton> : null}
                    </span>
                ),
            },
        ]
    }
    getCategorys = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
        const { data: res } = await reqCategorys(parentId)
        this.setState({ loading: false })
        if (parentId === '0') {
            return this.setState({ categorys: res })
        }
        this.setState({ subCategorys: res })
    }

    showSubCategorys = (category) => {
        // 更新状态
        this.setState(
            {
                parentId: category._id,
                parentName: category.name,
            },
            () => {
                // 在状态更新且重新render()后执行
                console.log(this.state.parentId) // '0'
                // 获取二级分类列表显示
                this.getCategorys()
            }
        )
        // setState()不能立即获取最新的状态: 因为setState()是异步更新状态的
        // console.log('parentId', this.state.parentId) // '0'
    }

    // // 返回一级列表
    showCategorys = () => {
        // 更新为显示一列表的状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: [],
        })
    }
    // 关闭对话框
    handleCancel = () => {
        this.setState({ showStatus: 0 })
    }
    // 显示添加对话框
    shiwAdd = () => {
        this.setState({ showStatus: 1 })
    }
    showUpdate = () => {
        this.setState({ showStatus: 2 })
    }
    // 添加分类
    addCategory = () => {}
    // 更新分类
    updataCategory = () => {}
    render() {
        const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state
        const title =
            parentId === '0' ? (
                '一级分类列表'
            ) : (
                <span>
                    <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                    <span> &gt; </span>
                    <span>{parentName}</span>
                </span>
            )
        const extra = (
            <Button type="primary" onClick={this.shiwAdd}>
                <PlusOutlined />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} bordered={true} loading={loading} />
                <Modal title="添加分类" visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddFrom categorys={categorys}></AddFrom>
                </Modal>
                <Modal title="更新分类" visible={showStatus === 2} onOk={this.updataCategory} onCancel={this.handleCancel}>
                    <div>更像</div>
                </Modal>
            </Card>
        )
    }
}
export default Category
