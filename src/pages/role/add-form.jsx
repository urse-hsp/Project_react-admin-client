import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item

const FormVerify = {
    goodsName: [{ required: true, message: '请输入角色名称' }],
}

/* 添加分类的form组件 */
class AddForm extends Component {
    formRef = React.createRef()
    // static propTypes = {
    //     setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    // }
    componentWillMount() {
        this.props.setForm(this.formRef)
    }

    render() {
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 }, // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        return (
            <Form ref={this.formRef}>
                <Item label="角色名称" {...formItemLayout} name="name" rules={FormVerify.goodsName}>
                    <Input placeholder="请输入角色名称" />
                </Item>
            </Form>
        )
    }
}

export default AddForm
