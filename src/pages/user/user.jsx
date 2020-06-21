import React, { Component } from 'react'

// class User extends Component{
//     render() {
//         return (
//             <div>User</div>
//         )
//     }
// }
// export default User

import { Form, Input, Button, Select } from 'antd'

const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}

class Demo extends React.Component {
    formRef = React.createRef()

    onGenderChange = (value) => {
        this.formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        })
    }

    onFinish = (values) => {
        console.log(values)
    }

    onReset = () => {
        console.log(this.formRef)
        this.formRef.current.resetFields()
    }

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        })
    }
    click = () => {
        console.log(1)
        console.log(this.formRef)
    }

    render() {
        return (
            <div>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Select a option and change input text above" onChange={this.onGenderChange} allowClear>
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={this.onFill}>
                            Fill form
                        </Button>
                    </Form.Item>
                </Form>
                <div onClick={this.click}>123123</div>
            </div>
        )
    }
}
export default Demo
