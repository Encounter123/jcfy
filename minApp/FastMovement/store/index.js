//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({ //全局变量定义
	state: {
		isIphoneX: false,
		userIdentity: 'buyer',
		
		forcedLogin: false, //是否需要强制登录
		hasLogin: false,
		userName: "",
		userId: '',
		token: '',
		pointId: '',
	},
	mutations: {
		setIphoneX(state, parmas) {
			state.isIphoneX = parmas
		},
		setUserIdentity(state, parmas) {
			state.userIdentity = parmas
		},
		
		
		login(state, user) {
			state.userName = user.username || '';
			state.hasLogin = true;
			state.userId = user.id || '';
			state.token = user.token || '';
			state.pointId = user.pointId || '';
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.userId = '';
			state.token = '';
			state.pointId = '';
		}
	}
})
export default store
