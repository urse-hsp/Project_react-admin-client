import React from 'react'

import { Form, Input, Select } from 'antd'
import './index.less'

const FromItem = Form.Item
const Option = Select.Option

const loginRules = {
    classifyName: [{ required: true, whitespace: true, message: '必须输入用户名' }],
}

const AddForm = (props) => {
    const [form] = Form.useForm()
    const chengOption = (value) => {
        // var data = form.getFieldValue('classifyName')
        console.log(value)
    }
    const changValue = (e) => {
        console.log()
    }
    const categorys = props.categorys
    return (
        <Form>
            <FromItem label="所属分类：" name="classify" rules={loginRules.classifyName}>
                <Select onChange={chengOption} name="userName">
                    <Option value="0">一级分类</Option>
                    {categorys.map((c) => (
                        <Option value={c._id}>{c.name}</Option>
                    ))}
                </Select>
            </FromItem>

            <FromItem label="分类名称：" name="classifyName" rules={loginRules.classifyName}>
                <Input type="text" placeholder="请输入分类名称 " />
            </FromItem>
        </Form>
    )
}
export default AddForm
