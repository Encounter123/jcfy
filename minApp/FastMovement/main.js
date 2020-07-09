import Vue from 'vue'
import App from './App'
import store from './store' //导入
import apiReq from './util.js'

Vue.prototype.$apiReq = apiReq
Vue.prototype.$store = store  //挂在vue实例上
Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue({
	store, //store  对象
    ...App
})
app.$mount()
