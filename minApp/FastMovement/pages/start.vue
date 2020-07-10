<template>
	<view></view>
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

		//Buyer  Seller
		// this.$store.commit('setUserIdentity','Buyer')
		// console.log(this.UserIdentity)

		uni.login({
			provider: 'weixin',
			success: function(res) {
				console.log(res.code);

				LoginByWx({
					data: {
						code: res.code
					}
				}).then(res => {
					console.log(res);
					uni.setStorageSync('sessionToken', res.rows[0].token);
					uni.setStorageSync('userInformation', JSON.stringify(res.rows[0]));
					if (res.rows[0].position && res.rows[0].position > 0) {
						_this.$store.commit('setUserIdentity', res.rows[0].position == 1 ? 'Buyer' : 'Seller');
						switchTab('/pages/homePage/homePage');
					} else {
						redirectTo('/pages/signIn/signIn');
					}
				});
			}
		});
	}
};
</script>
