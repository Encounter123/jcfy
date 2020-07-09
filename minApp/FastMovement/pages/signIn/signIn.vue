<template>
	<view>
		<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }"></view>
		<view></view>
		<view class="loginBg1">
			<view class="loginBtn">
				<view><button class="loginWeChatBtn" open-type="getUserInfo" @getuserinfo="wechatLogin">微信一键登录</button></view>
				<navigator url="login/login">
					<view class="loginPhoneBtn"><text>手机号登录/注册</text></view>
				</navigator>
			</view>
		</view>

		<common-footer></common-footer>
	</view>
</template>

<script>
import { LoginByWx, ShopBannerList } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';

export default {
	data() {
		return {
			imageURL: 'http://sjbz.fd.zol-img.com.cn/t_s1080x1920c/g3/M02/0E/0D/ChMlV17oT-6IZ0ZcACCEJ-b0kqYAAU0mQJzD-4AIIQ_684.jpg',
			authorizationLogin: false
		};
	},
	methods: {
		init() {
			this.backgroundMap();
		},
		wechatLogin() {
			var that = this;
			// 获取用户名  获取性别 获取头像 获取js_code去换取后台返回的openID
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let js_code = loginRes.code; //js_code可以给后台获取unionID或openID作为用户标识
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							//infoRes里面有用户信息需要的话可以取一下
							let username = infoRes.userInfo.nickName; //用户名
							let gender = infoRes.userInfo.gender; //用户性别
							let avatarUrl = infoRes.userInfo.avatarUrl; //头像
							let formdata = { code: js_code, username: username, sex: gender, avatarUrl: avatarUrl };
							// #ifdef MP-WEIXIN
							uni.getSetting({
								success(res) {
									console.log('授权：', res);
									if (!res.authSetting['scope.userInfo']) {
										//这里调用授权
										console.log('当前未授权');
									} else {
										//用户已经授权过了
										console.log('当前已授权');
										// 弹出正在登录的弹框
										showLoading({ title: '正在登录···', icon: 'none' });
										// 判断已授权调取接口并获取openId
										LoginByWx({
											data: {
												code: js_code
											}
										}).then(res => {
											if (res.code == 202) {
												// 登录成功后判断是否是第一次注册  如果是弹出选择身份页面
												navigateTo('/pages/signIn/registeredIdentity/registeredIdentity?openId=' + res.data.rows[0].openId);
											} else if (res.code == 201) {
												switchTab('/pages/homePage/homePage');
											}
										});
									}
								}
							});
						}
					});
				}
			});

			//#endif
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res => {
				console.log(res);
				this.imageURL = res.rows[2].bannerImg;
			});
		}
	},
	onLoad() {
		this.init();
	}
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
