import React from 'react'

import { Form, Input } from 'antd'
import './index.less'

const FromItem = Form.Item

const loginRules = {
    classifyName: [{ required: true, whitespace: true, message: '必须输入修改名称' }],
}

const AddForm = (props) => {
    console.log(props.showUpdataName)
    const [form] = Form.useForm()

    const value = props.showUpdataName
    console.log(value)
    return (
        <Form>
            <FromItem label="分类名称：" name="classifyName" rules={loginRules.classifyName}>
                <Input type="text" placeholder="请输入分类名称 " value='123'/>
            </FromItem>
        </Form>
    )
}
export default AddForm
