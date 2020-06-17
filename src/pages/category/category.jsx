import React, { Component } from 'react'
import './index.less'
import { Card, Table, Button, Icon, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api/index'

import AddFrom from './component/addForm'

class Category extends Component {
    state = {
        // 一级分类列表
        categorys: [], //一级列表
        loading: false,
        subCategorys: [], //子分类列表
        parentId: '0',
        parentName: '',
        showStatus: 0 // 表示添加 更新的确认框。0都不显示。1表示显示添加，2显示更新
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
                        <a style={{ marginRight: 16 }} onClick={this.showUpdate}>修改分类</a>
                        {this.state.parentId === '0' ? <a onClick={this.showSubCategorys.bind(this, category)}>查看子分类</a> : null}
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
        console.log()
        this.setState({
            parentId: category._v,
            parentName: category.name,
        })
        this.getCategorys()

        //   parentId
    }
    // // 返回一级列表
    showCategorys = () => {
        this.setState({
            parentId: '',
            parentName: '',
            subCategorys: [],
        })
        this.getCategorys()
    }
    // 关闭对话框
    handleCancel = () =>{
        this.setState({showStatus: 0})
    }
    // 显示添加对话框
    shiwAdd = () =>{
        this.setState({showStatus: 1})
    }
    showUpdate = ()=> {
        this.setState({showStatus: 2})
    }
    // 添加分类
    addCategory = () => {

    }
    // 更新分类
    updataCategory = () =>{

    }
    render() {
        const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state
        const title =
            parentId === '0' ? (
                '一级分类列表'
            ) : (
                    <span>
                        <a onClick={this.showCategorys}>一级分类列表</a>
                        <span> > </span>
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
                <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} bordered={true} loading={loading} />;
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddFrom></AddFrom>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updataCategory}
                    onCancel={this.handleCancel}
                >
                     <div>更像</div>
                </Modal>
            </Card>
        )
    }
}
export default Category
