/*包含 n 个接口请求函数的模块 每个函数返回 promise */
import http from './http'
// import jsonp from 'jsonp'
// 登陆
export const reqLogin = (username, password) =>
  http(
    '/login',
    {
      username,
      password,
    },
    'POST'
  )
// const BASE = 'http://localhost:5000'
const BASE = ''

/*通过 jsonp 请求获取天气信息 */
// export function reqWeather(city) {
//     const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4 9MVra6urFRGOT9s8UBWr2`
//     return new Promise((resolve, reject) => {
//         jsonp(url, {
//             param: 'callback'
//         }, (error, response) => {
//             if (!error && response.status == 'success') {
//                 const {
//                     dayPictureUrl,
//                     weather
//                 } = response.results[0].weather_data[0]
//                 resolve({
//                     dayPictureUrl, weather
//                 })
//             } else {
//                 alert('获取天气信息失败')
//             }
//         })
//     })
// }

// 获取一级或某个二级分类列表
// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => http(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => http(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => http(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

