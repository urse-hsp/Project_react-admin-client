import React from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqDeleteImg } from '../../api/index'
import { BASE_IMG_URL } from '../../utils/constants'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '123',
        fileList: [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
    }
    constructor(props) {
        super(props)

        let fileList = []
        // 如果传入了imgs属性
        const { imgs } = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: BASE_IMG_URL + img,
            }))
        }
        // 初始化状态
        this.state = {
            previewVisible: false, // 标识是否显示大图预览Modal
            previewImage: '', // 大图的url
            fileList, // 所有已上传图片的数组
        }
    }
    getImgs = () => {
        return this.state.fileList.map((file) => file.name)
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    handleChange = async ({ file, fileList, event }) => {
        console.log(fileList)
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') {
            // 删除图片
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload action="/manage/img/upload" listType="picture-card" fileList={fileList} onPreview={this.handlePreview} onChange={this.handleChange} accept={'image/*'} name="image">
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
