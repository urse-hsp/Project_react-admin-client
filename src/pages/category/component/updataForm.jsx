import React from 'react'
// import PropTypes from 'prop-types'

import { Form, Input } from 'antd'
import './index.less'
// import { compose } from 'redux'

const FromItem = Form.Item

const loginRules = {
    classifyName: [{ required: true, whitespace: true, message: '必须输入修改名称' }],
}

class AddForm extends React.Component {
    formRef = React.createRef()

    // static propTypes = {
    //     categoryName: PropTypes.string.isRequired,
    // }
    componentWillMount() {
        this.props.setForm(this.formRef)
    }
    // componentDidMount() {
    //     console.log(this.props)
    //     this.formRef.current.setFieldsValue({
    //         classifyName: this.props.categoryName,
    //     })
    // }
    // componentWillUpdate() {
    //     console.log(this.props)
    //     this.formRef.current.setFieldsValue({
    //         classifyName: this.props.categoryName,
    //     })
    // }
    render() {
        // this.formRef.current.setFieldsValue({
        //     classifyName: this.props.categoryName,
        // })
        return (
            <Form ref={this.formRef}>
                <FromItem label="分类名称：" name="classifyName" rules={loginRules.classifyName}>
                    <Input type="text" placeholder="请输入分类名称 " />
                </FromItem>
            </Form>
        )
    }
}
export default AddForm
