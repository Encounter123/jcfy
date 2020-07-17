//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({ //全局变量定义
	state: {
		isIphoneX: false
	},
	mutations: {
		setIphoneX(state, parmas) {
			state.isIphoneX = parmas
		}
		
	}
})
export default store
