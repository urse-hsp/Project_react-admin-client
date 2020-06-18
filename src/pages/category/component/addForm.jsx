import React from 'react'

import { Form, Input, Select } from 'antd'

const FromItem = Form.Item
const Option = Select.Option

// const loginRules = {
//     userName: [{ required: true, whitespace: true, message: '必须输入用户名' }],
// }

const AddForm = (props) => {
    const [form] = Form.useForm()
    const chengOption = () => {
        var data = form.getFieldValue('classifyName')
        console.log(data)
    }
    const categorys = props.categorys
    return (
        <Form>
            <FromItem
               label="所属分类："
               name = "classify"
            >
                <Select onChange={chengOption} name='userName'>
                    <Option value="0">一级分类</Option>
                    {categorys.map((c) => (
                        <Option value={c._id}>{c.name}</Option>
                    ))}
                </Select>
            </FromItem>

            <FromItem
                label="分类名称："
                name='classifyName'
            >
                <Input type="text" placeholder="请输入分类名称 " />
            </FromItem>
        </Form>
    )
}
export default AddForm
