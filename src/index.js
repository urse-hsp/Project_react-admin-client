import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
    Provider
} from 'react-redux'
import store from './redux/store'

// import storageUtils from './utils/storageUtils'
// import memoryUtils from './utils/memoryUtils'
// // 如果 local 中保存了 user, 将 user 保存到内存中
// const user = storageUtils.getUser()
// if (user && user._id) {
//     memoryUtils.user = user
// }

// 将App组件标签渲染到index页面的div上
ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
), document.getElementById('root'))