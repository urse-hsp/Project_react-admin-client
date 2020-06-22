import React, { Component } from 'react'
import { Card, List, Form, Input, Cascader, Upload, Modal, Button } from 'antd'
import { PlusOutlined, LeftOutlined } from '@ant-design/icons'
// import { LeftOutlined } from '@ant-design/icons'
// import { BASE_IMG_URL } from '../../utils/constants'
// import { reqCategory } from '../../api/index'
import LinkButton from '../../components/Link-button'
import { FormInstance } from 'antd/lib/form'
const { Item } = Form
const { TextArea } = Input

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
}
// class ProductAddUpdate extends Component {
//     formRef = React.createRef()
//     componentWillMount() {
//         console.log(this.formRef)
//     }
//     render() {
//         const title = (
//             <span>
//                 <LinkButton>
//                     <span>
//                         <LeftOutlined style={{ fontSize: 20, marginRight: 15 }} />
//                     </span>
//                     <span>添加商品</span>
//                 </LinkButton>
//             </span>
//         )
//         return (
//             <Card title={title}>
//                 <Form action="" {...layout}>
//                     <Item label="商品名称">
//                         <Input placeholder="请输入商品名称" />
//                     </Item>
//                     <Item label="商品描述">
//                         <TextArea rows={4} placeholder="请输入商品描述" />
//                     </Item>
//                     <Item label="商品描述">
//                         <Input placeholder="请输入商品价格" type="number" addonAfter="元" />
//                     </Item>
//                     <Item label="商品分类">
//                         <div>商品分类</div>
//                     </Item>
//                     <Item label="商品分类">
//                         <div>商品图片</div>
//                     </Item>
//                     <Item label="商品分类">
//                         <div>商品详情</div>
//                     </Item>
//                     <Item label="商品分类">
//                         <Button>提交</Button>
//                     </Item>
//                 </Form>
//             </Card>
//         )
//     }
// }
// export default ProductAddUpdate

const ProductAddUpdate = (props) => {
    const [form] = Form.useForm()
    console.log(props)
    console.log(form)
    const title = () => (
        <span>
            <LinkButton>
                <span>
                    <LeftOutlined style={{ fontSize: 20, marginRight: 15 }} />
                </span>
                <span>添加商品</span>
            </LinkButton>
        </span>
    )

    return (
        <Card title={title}>
            <Form action="" {...layout} form={form} >
                <Item label="商品名称" name="goodsName" rules={[{ required: true }]}>
                    <Input placeholder="请输入商品名称" />
                </Item>
                <Item label="商品描述">
                    <TextArea rows={4} placeholder="请输入商品描述" />
                </Item>
                <Item label="商品描述">
                    <Input placeholder="请输入商品价格" type="number" addonAfter="元" />
                </Item>
                <Item label="商品分类">
                    <div>商品分类</div>
                </Item>
                <Item label="商品分类">
                    <div>商品图片</div>
                </Item>
                <Item label="商品分类">
                    <div>商品详情</div>
                </Item>
                <Item label="商品分类">
                    <Button>提交</Button>
                </Item>
            </Form>
        </Card>
    )
}
export default ProductAddUpdate
