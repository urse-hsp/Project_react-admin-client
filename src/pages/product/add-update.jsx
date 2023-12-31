import React, { Component } from 'react'
import { Card, Form, Input, Cascader, message, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import RichTextEditor from './rich-text-editor'
import memoryUtils from '../../utils/memoryUtils'

import PicturesWall from './prctures-wall'
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
    goosClassify: [{ required: true, message: '请选择商品分类' }],
}

class ProductAddUpdate extends Component {
    formRef = React.createRef()
    state = {
        options: [],
        isUpdate: [],
        product: [],
    }
    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map((c) => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        const { isUpdate, product } = this
        const { pCategoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map((c) => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))

            // 找到当前商品对应的一级option对象
            const targetOption = options.find((option) => option.value === pCategoryId)

            // 关联对应的一级option上
            targetOption.children = childOptions
        }

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
        const { pCategoryId, categoryId } = this.product
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if (this.isUpdate) {
            // 商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        this.formRef.current.setFieldsValue({
            goodsName: this.product.name,
            goodsDescribe: this.product.desc,
            goodsPrice: this.product.price,
            goosClassify: categoryIds,
        })
    }

    componentWillMount() {
        // 取出携带的state
        const product = memoryUtils.product // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!product._id
        // 保存商品(如果没有, 保存是{})
        this.product = product || {}
    }

    // 两种验证表单方式：1 form.validateFields() 返回的promise对象，
    // 第二种，指定按钮 htmlType="button"  在Form上绑定表单 api  onFinish数据验证成功后返回数据 指定函数
    onFinish = async (values) => {
        console.log(values)
        const { goodsName, goodsDescribe, goodsPrice, goosClassify } = values
        let pCategoryId, categoryId
        if (goosClassify.length === 1) {
            pCategoryId = '0'
            categoryId = goosClassify[0]
        } else {
            pCategoryId = goosClassify[0]
            categoryId = goosClassify[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        const product = {
            name: goodsName,
            desc: goodsDescribe,
            price: goodsPrice,
            imgs,
            detail,
            pCategoryId,
            categoryId,
        }
        // 如果是更新, 需要添加_id
        if (this.isUpdate) {
            product._id = this.product._id
        }
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status === 0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
            this.props.history.goBack()
        } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        }
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
    /* 在卸载之前清除保存的数据 */
    componentWillUnmount() {
        memoryUtils.product = {}
    }
    render() {
        const { isUpdate, product } = this
        const imgs = product.imgs
        const title = (
            <span>
                <LinkButton>
                    <span>
                        <LeftOutlined style={{ fontSize: 20, marginRight: 15 }} onClick={() => this.props.history.goBack()} />
                    </span>
                    <span>{isUpdate ? '修改商品' : '添加商品'}</span>
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
                    <Item label="商品分类" name="goosClassify" rules={FormVerify.goosClassify}>
                        <Cascader options={this.state.options} loadData={this.loadData} changeOnSelect />
                    </Item>
                    <Item label="商品分类">
                        <PicturesWall ref={this.pw} imgs={imgs} />
                    </Item>
                    <Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editor} editor={product.detail} />
                    </Item>
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
