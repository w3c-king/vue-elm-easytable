import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/index.js'

Vue.config.productionTip = false

// 引入饿啦么UI插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
