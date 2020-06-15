import React, { Component } from 'react'
// 主题自定义
import './App.less'
// 初始化样式
import './assets/css/reset.css'
// 引入路由
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/Login/login'
import Admin from './pages/Admin/admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Admin}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App
