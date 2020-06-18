import React from 'react'

import { Form, Input, Select } from 'antd'

const FromItem = Form.Item
const Option = Select.Option

// const loginRules = {
//     userName: [{ required: true, whitespace: true, message: '必须输入用户名' }],
// }

const AddForm = (props) => {
    // const [form] = Form.useForm()
    const chengOption = () => {
        console.log(props)
    }
    const categorys = props.categorys
    return (
        <Form>
            <FromItem>
                <Select onChange={chengOption} name='userName'>
                    <Option value="0">一级分类</Option>
                    {categorys.map((c) => (
                        <Option value={c._id}>{c.name}</Option>
                    ))}
                </Select>
            </FromItem>

            <FromItem>
                <Input type="text" placeholder="请输入分类名称 " />
            </FromItem>
        </Form>
    )
}
export default AddForm
