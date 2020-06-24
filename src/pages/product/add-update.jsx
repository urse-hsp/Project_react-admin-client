import React, { Component } from 'react'
import { Card, List, Form, Input, Cascader, Upload, Modal, Button } from 'antd'
import { PlusOutlined, LeftOutlined } from '@ant-design/icons'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
// import { LeftOutlined } from '@ant-design/icons'
// import { BASE_IMG_URL } from '../../utils/constants'
// import { reqCategory } from '../../api/index'
import LinkButton from '../../components/Link-button'
const { Item } = Form
const { TextArea } = Input

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
}

const validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
        //   callback() // 验证通过
        return Promise.resolve()
    } else {
        // callback('价格必须大于0') // 验证没通过
        return Promise.reject('价格必须大于0')
    }
}

const FormVerify = {
    goodsName: [{ required: true, message: '必须输入商品名称' }],
    goodsDescribe: [{ required: true, message: '必须输入商品描述' }],
    goodsPrice: [{ required: true, message: '必须输入商品价格' }, { validator: validatePrice }],
}

class ProductAddUpdate extends Component {
    formRef = React.createRef()
    state = {
        options: [],
        isUpdate: [],
        product: [],
    }
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map((c) => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        // const { isUpdate, product } = this
        // const { pCategoryId } = product
        // if (isUpdate && pCategoryId !== '0') {
        //     // 获取对应的二级分类列表
        //     const subCategorys = await this.getCategorys(pCategoryId)
        //     // 生成二级下拉列表的options
        //     const childOptions = subCategorys.map((c) => ({
        //         value: c._id,
        //         label: c.name,
        //         isLeaf: true,
        //     }))

        //     // 找到当前商品对应的一级option对象
        //     const targetOption = options.find((option) => option.value === pCategoryId)

        //     // 关联对应的一级option上
        //     targetOption.children = childOptions
        // }

        // 更新options状态
        this.setState({
            options,
        })
    }

    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId) // {status: 0, data: categorys}
        if (result.status === 0) {
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                // 二级列表
                return categorys // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }
    componentDidMount() {
        this.getCategorys('0')
    }

    // 两种验证表单方式：1 form.validateFields() 返回的promise对象，
    // 第二种，指定按钮 htmlType="button"  在Form上绑定表单 api  onFinish数据验证成功后返回数据 指定函数
    onFinish = (values) => {
        console.log(values)
    }

    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[0]
        // 显示 loading 效果
        targetOption.loading = true
        // load options lazily 模拟异步获取数据
        const subCategorys = await this.getCategorys(targetOption.value)
        // 隐藏loading
        targetOption.loading = false
        // 二级分类数组有数据
        if (subCategorys && subCategorys.length > 0) {
            // 生成一个二级列表的options
            const childOptions = subCategorys.map((c) => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        } else {
            // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        this.setState({
            options: [...this.state.options],
        })
    }
    render() {
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
                <Form action="" {...layout} ref={this.formRef} onFinish={this.onFinish}>
                    <Item label="商品名称" name="goodsName" rules={FormVerify.goodsName}>
                        <Input placeholder="请输入商品名称" />
                    </Item>
                    <Item label="商品描述" name="goodsDescribe" rules={FormVerify.goodsDescribe}>
                        <TextArea rows={4} placeholder="请输入商品描述" />
                    </Item>
                    <Item label="商品价格" name="goodsPrice" rules={FormVerify.goodsPrice}>
                        <Input placeholder="请输入商品价格" type="number" addonAfter="元" />
                    </Item>
                    <Item label="商品分类">
                        <Cascader options={this.state.options} loadData={this.loadData} changeOnSelect />
                    </Item>
                    {/* <Item label="商品分类">
                        <div>商品图片</div>
                    </Item>
                    <Item label="商品分类">
                        <div>商品详情</div>
                    </Item> */}
                    <Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default ProductAddUpdate
