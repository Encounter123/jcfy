<template>
	<view>
		<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }"></view>
		<view></view>
		<view class="loginBg1">
			<view class="loginBtn">
				<view><button class="loginWeChatBtn" lang="zh_CN" open-type="getUserInfo" @getuserinfo="wechatLogin">微信一键登录</button></view>
				<!-- <navigator url="login/login"> -->
					<view class="loginPhoneBtn" @click="toPhoneLogin"><text>手机号登录/注册</text></view>
				<!-- </navigator> -->
			</view>
		</view>

	</view>
</template>

<script>
import { UpdateByWx, ShopBannerList, LoginByWx } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';

export default {
	data() {
		return {
			imageURL: 'http://sjbz.fd.zol-img.com.cn/t_s1080x1920c/g3/M02/0E/0D/ChMlV17oT-6IZ0ZcACCEJ-b0kqYAAU0mQJzD-4AIIQ_684.jpg'
		};
	},
	methods: {
		wechatLogin(e) {
			let _this = this
			let status1 = e.detail.errMsg.indexOf('deny')
			let status2 = e.detail.errMsg.indexOf('fail')
			if (status1 == -1 && status2 == -1) {
				showLoading({title:'加载中...'})
				
				uni.login({
					provider: 'weixin',
					success: function(res) {
						LoginByWx({
							data: {
								code: res.code
							}
						}).then(res => {
							uni.setStorageSync('sessionToken', res.rows[0].token);
							UpdateByWx({
								data:{
									...e.detail.userInfo
								}
							}).then(res=>{
								if(res.code == 200){
									if(res.rows[0].position){
										uni.setStorageSync('userInformation',JSON.stringify(res.rows[0]))
										_this.$store.commit('setUserIdentity',res.rows[0].position==1?'Buyer':'Seller')
										switchTab('/pages/homePage/homePage')
									}else{
										navigateTo('/pages/signIn/registeredIdentity/registeredIdentity');
									}
								}else{
									showToast({title: res.msg, icon: 'none'})
								}
							})
						});
					}
				});
				
			}else{
				hideLoading()
				showToast({title:'登录失败！',icon:'none'})
			}

		},
		toPhoneLogin(){
			navigateTo('/pages/signIn/login/login')
		}
	},
	onLoad() {}
};
</script>

<style lang="less" scoped>
uni-page-body,html,body {
	height: 100%;
}
.loginBg {
	width: 100%;
	height: 100vh;
	position: relative;
}
.loginBg1 {
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0, 0, 0, 0.6);
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	.loginBtn {
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		margin-left: -47.5%;
		color: #fff;
		width: 100%;
		.loginPhoneBtn {
			width: 95%;
			border: 5rpx solid #fff;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			margin: 30rpx 0;
			border-radius: 10rpx;
			font-size: 30rpx;
		}
		.loginWeChatBtn {
			width: 95%;
			border: 5rpx solid #fff;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			margin: 20rpx 0;
			border-radius: 10rpx;
			font-size: 30rpx;
			background-color: rgba(0, 0, 0, 0.01);
			color: #fff;
		}
	}
}
</style>
