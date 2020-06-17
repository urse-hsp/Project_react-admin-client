import React, { Component } from 'react'

import { Form, Input, Select } from 'antd'

const Item = Form.Item
const Option  = Select.Option

export default class AddForm extends Component{
    render(){
        return(
            <Form>
                <Item>
                <Select>
                    <Option></Option>
                </Select>
                </Item>
                
                <input type="text" placeholder="请输入分类名称 "/>
            </Form>
        )
    }
}