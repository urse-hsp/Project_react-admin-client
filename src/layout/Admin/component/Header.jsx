import React, { Component } from 'react'
import './index.less'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Modal } from 'antd'
import { connect } from 'react-redux'
// import menuConfig from '../../../config/menuConfig'
// import { reqWeather } from '../../../api/index'
import { formateDate } from '../../../utils/dateUtils'
// import memoryUtils from '../../../utils/memoryUtils'
// import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/Link-button'
import { logout } from '../../../redux/actions'
const { Header } = Layout

/*左侧导航组件
 */
class TopHeader extends Component {
    state = {
        intervalId: null,
        sysTime: formateDate(Date.now()),
        Title: '',
        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/duoyun.png',
        // // 天气图片的 url
        weather: '多云转阴',
    }

    // /*启动循环定时器, 每隔 1s 更新一次 sysTime */
    getSysTime = () => {
        this.intervalId = setInterval(() => {
            this.setState({
                sysTime: formateDate(Date.now()),
            })
        }, 1000)
    }
    // /*退出登陆 */
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                console.log('OK')
                // // 移除保存的 user
                // storageUtils.removeUser()
                // memoryUtils.user = {}

                this.props.logout()
                // 跳转到 login
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    /*根据请求的 path 得到对应的标题 */
    // getTitle = (path, MenuConfig) => {
    //     let title = ''
    //     MenuConfig.forEach((menu) => {
    //         if (menu.key === path) {
    //             title = menu.title
    //         } else if (menu.children) {
    //             menu.children.forEach((item) => {
    //                 if (path.indexOf(item.key) === 0) {
    //                     title = item.title
    //                 }
    //             })
    //         }
    //     })
    //     return title
    // }

    componentDidMount() {
        this.getSysTime()
    }
    toggle = () => {
        this.props.toggle()
    }
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { sysTime, dayPictureUrl, weather } = this.state
        // // 得到当前用户
        const user = this.props.user.username
        // 得到对应的标题
        // const title = this.getTitle(this.props.location.pathname, menuConfig)
        const title = this.props.headTitle
        return (
            <Header className="site-layout-background header" style={{ padding: 0 }}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
                <div className="headerWrap">
                    <div className="header-top">
                        <span>欢迎, {user}</span> <LinkButton onClick={this.logout}>退出</LinkButton>
                    </div>
                    <div className="header-bottom">
                        <div className="header-bottom-left">{title}</div>
                        <div className="header-bottom-right">
                            <span>{sysTime}</span>
                            <img src={dayPictureUrl} alt="weather" />
                            <span>{weather}</span>
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}

// export default TopHeader

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
// export default connect((state) => ({ user: state.user }), { setHeadTitle })(TopHeader)
export default connect(
    state => ({headTitle: state.headTitle, user: state.user}),
    {logout}
  )(TopHeader)
