import React, { Component } from 'react'
import { Card, Select, Input, Button, Table,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/Link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index.js'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

class ProductHome extends Component {
    state = {
        products: [], // 商品的数组
        total: 0, //商品的总数量
        loading: false,
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 根据哪个字段搜索
    }
    initCplumns = () => {
        // 数据放到上面了
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'age',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥ ' + price,
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status===1 ? 2 : 1
                    console.log(product)
                    return (
                        <span>
                            <Button type="primary" onClick={this.UpdateStatus.bind(this,_id,newStatus)}>{status===1?'下架':'上架'}</Button>
                            <span>{status===1?'在售':'已下架'}</span>
                        </span>
                    )
                },
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={()=> this.props.history.push(`product/detail`,{product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                },
            },
        ]
    }
    // 获取页面请求
    getProducts = async (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        // 此处作为判断 一方法多用请求
        let result
        if (searchName) {
            result = await reqSearchProducts({
                pageNum,
                pageSize: PAGE_SIZE,
                searchName,
                searchType,
            })
        } else {
            // 一般分页请求
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        // const result = await reqProducts(pageNum, PAGE_SIZE)
        this.setState({ loading: false })
        if (result.status === 0) {
            // 取出数据，渲染
            const { total, list } = result.data
            this.setState({
                total,
                products: list,
            })
            console.log(result)
        }
    }
    UpdateStatus = async (_id,newStatus) =>{
        const res = await reqUpdateStatus(_id,newStatus)
        console.log(res)
        if (res.status === 0) {
            message.success('更新成功')
        }
        this.getProducts(this.pageNum)

    }
    componentWillMount() {
        this.initCplumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total, loading, searchName, searchType } = this.state
        const title = (
            <span>
                <Select value={searchType} style={{ width: 120 }} onChange={(value) => this.setState({ searchType: value })}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={(event) => this.setState({ searchName: event.target.value })} />
                <Button type="primary" onClick={() => this.getProducts(1)}>
                    搜索
                </Button>
            </span>
        )
        const extra = (
            <Button type="primary" 
                icon={<PlusOutlined />}
                onClick={()=> this.props.history.push(`/product/addupdate`)}
            >
                添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    // rowKey={}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts, //点击分页请求，返回的参数直接是函数的参数
                    }}
                />
            </Card>
        )
    }
}
export default ProductHome
