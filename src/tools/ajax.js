// 这个文件时全局的ajax请求封装文件, 所有的ajax请求都要放在这个文件中执行

// 导入ajax请求插件 axios
import axios from "axios"

// 定义全局唯一的基础代理路径
var baseUrl = "/myShop"

// 封装一个通用的请求函数
function ajax_get(url, params={}){
    return new Promise(resolve=>{
        axios.get(url, { params }).then(res=>{
            resolve(res.data)
        })
    })
}


// 定义请求轮播图的函数
var getBanner = ()=> ajax_get(baseUrl + "/banner")

// 定义请求商品列表的函数
var getGoodList = params => ajax_get(baseUrl + "/goodList", params)

// 定义登录请求函数
var getLogin = params => ajax_get(baseUrl + "/login", params)

// 定义列表神分类请求
var getType  = params => ajax_get(baseUrl +"/getTypeOne",params)

// 定义注册请求
var getRegister  = params => ajax_get(baseUrl +"/register",params)

// 定义搜索商品请求
var getSearch = params => ajax_get(baseUrl +"/search",params)

//定义商品详情接口
var getDetail = params => ajax_get(baseUrl +"/detail",params)


// 同店相似商品推荐
var getSameList= params => ajax_get(baseUrl +"/sameList",params)


//定义添加购物车接口
var getShopList= params => ajax_get(baseUrl +"/add",params)

//定义获取购物车列表
var getShopWrap= params => ajax_get(baseUrl +"/shopList",params)

// 商品数量减少
var getRemove= params => ajax_get(baseUrl +"/remove",params)

// 导出封装的函数
// module.exports = {}    require()   node导入导出
// ES6模块化导出
// export default { }     import obj from "ajax.js"
export {
    getBanner,
    getGoodList,
    getLogin,
    getType,
    getRegister,
    getSearch,
    getDetail,
    getSameList,
    getShopList,
    getShopWrap,
    getRemove
}
// import {  } from "ajax.js" 导出时不加default, 导入就可以使用按需解构导入

