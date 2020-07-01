import React, { Component } from 'react'
import { Card, List } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
const Item = List.Item

class ProductDetail extends Component {
    state = {
        cName1: '', //一级分类
        cName2: '',
    }
    async componentDidMount() {
        // const {CategoryId, categoryId} = memoryUtils.product
        const { categoryId, pCategoryId } = memoryUtils.product
        if (pCategoryId === '0') {
            const res = await reqCategory(categoryId)
            const cName1 = res.data.name
            this.setState({ cName1 })
            console.log(res)
        } else {
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({ cName1, cName2 })
        }
    }
    /* 在卸载之前清除保存的数据 */
    componentWillUnmount() {
        memoryUtils.product = {}
    }
    render() {
        const { name, desc, detail, imgs, price } = memoryUtils.product
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <span>
                    <LeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
                </span>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className="left">商品分类:</span>
                        <span>
                            {/* {cname1} */}
                            {cName1 ? cName1 + ' --> ' + cName2 : ''}
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {imgs.map((img) => (
                                <img key={img} src={BASE_IMG_URL + img} className="productImg" alt="img" />
                            ))}
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
export default ProductDetail
