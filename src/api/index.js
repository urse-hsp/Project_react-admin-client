/*包含 n 个接口请求函数的模块 每个函数返回 promise */
import http from './http'
// 登陆
export const reqLogin = (username, password) => http('/login', {
    username,
    password
}, 'POST')