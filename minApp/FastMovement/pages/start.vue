<template>
	<view></view>
</template>
<script>
	import { Login } from '@/api/api.js'
	import { hideLoading, showLoading, showModal, showToast } from '../common/toast'
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '../common/navigation.js'


	export default {
		data() {
			return {
				options: {},
			}
		},
		methods: {
		},
		onLoad(options) {
			showLoading({title:'加载中，请稍等...'})
			redirectTo('/pages/signIn/signIn')
			// switchTab('/pages/package')
			// switchTab('/pages/user')
			
			// uni.login({
			// 	provider: 'weixin',
			// 	success: function (res) {
			// 		Login({
			// 			method: 'get',
			// 			data: {
			// 				code: res.code
			// 			}
			// 		}).then(res=>{
			// 			uni.setStorageSync('sessionToken',res.token)
			// 			uni.setStorageSync('userId',res.user.id)
			// 		})
			// 	}
			// })
			
			
		},
		
	}
</script>