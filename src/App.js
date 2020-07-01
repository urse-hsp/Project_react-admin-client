import React, { Component } from 'react'
// 主题自定义
import './App.less'
// 初始化样式
import './assets/css/reset.css'
// 引入路由
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import Login from './layout/Login/login'
import Admin from './layout/Admin/admin.jsx'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {/* react 顺序问题，我擦啦 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
export default App
