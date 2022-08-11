import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入懒加载
import VueLazyLoad from 'vue3-lazy'

// 导入字体图标
import '../public/iconfont.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueLazyLoad,{
    loading: require("./assets/懒加载.gif")
})
app.mount('#app')



//  createApp(App).use(store).use(router).mount('#app')
