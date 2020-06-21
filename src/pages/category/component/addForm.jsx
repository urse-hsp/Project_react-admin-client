import React from 'react'

import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import './index.less'

const FromItem = Form.Item
const Option = Select.Option

const loginRules = {
    classifyName: [{ required: true, whitespace: true, message: '必须输入用户名' }],
}

class AddForm extends React.Component {
    formRef = React.createRef()
    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        categorys: PropTypes.array.isRequired, // 一级分类的数组
        parentId: PropTypes.string.isRequired, // 父分类的ID
    }
    componentWillMount() {
        this.props.setForm(this.formRef)
    }
    render() {
        const categorys = this.props.categorys
        const parentId = this.props.parentId
        return (
            <Form ref={this.formRef}>
                <FromItem label="所属分类：" name="classifyID">
                    <Select onChange={this.chengOption} defaultValue={parentId} name="userName">
                        <Option value="0" key="0">
                            一级分类
                        </Option>
                        {categorys.map((c) => (
                            <Option value={c._id} key={c._id}>
                                {c.name}
                            </Option>
                        ))}
                    </Select>
                </FromItem>

                <FromItem label="分类名称：" name="classifyName2" rules={loginRules.classifyName}>
                    <Input type="text" placeholder="请输入分类名称 "/>
                </FromItem>
            </Form>
        )
    }
}
export default AddForm
