<template>
	<view>

	</view>
</template>
<script>
import { LoginByWx } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '../common/toast';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '../common/navigation.js';

export default {
	data() {
		return {
			options: {}
		};
	},
	methods: {},
	onLoad(options) {
		showLoading({ title: '加载中，请稍等...' });
		let _this = this;

		let userInformation = uni.getStorageSync('userInformation')?JSON.parse(uni.getStorageSync('userInformation')) : {}
		if(userInformation.position){
			
			switchTab('/pages/arrival/arrival');
		}else{
			
			redirectTo('/pages/signIn/signIn');
		}

	}
};
</script>
