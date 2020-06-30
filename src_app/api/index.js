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


// 获取一个分类
export const reqCategory = (categoryId) => http(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => http(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => http(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => http(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 删除指定名称的图片
export const reqDeleteImg = (name) => http(BASE + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => http(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')



// 获取所有角色的列表
export const reqRoles = () => http(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => http(BASE + '/manage/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => http(BASE + '/manage/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => http(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => http(BASE + '/manage/user/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => http(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
