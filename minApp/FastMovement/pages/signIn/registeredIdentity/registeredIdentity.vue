<template>
	<view>
		<scroll-view scroll-x="true" class="block" style="display: flex;flex-direction: row;">
			<block>
				<view class="loginBg1"></view>
				<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }">
					<view class="qiugouBtn"><view class="qiugouWithin">求购</view></view>
					<view class="gestureBox" v-show="gesture"><image src="../../../static/img/89135d002e9c4a872d1912d05c3cf9d.png" mode="" class="gesture"></image></view>
					<view class="submitBtn" @tap="submitBtn(3)">确定</view>
				</view>
				<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }">
					<view class="maishouBtn"><view class="maishouBtnBuyer">买手</view></view>
					<view class="submitBtn1" @tap="submitBtn(4)">确定</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import { UpdataUser, ShopBannerList } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js'

export default {
	data() {
		return {
			imageURL: 'http://sjbz.fd.zol-img.com.cn/t_s1080x1920c/g3/M02/0E/0D/ChMlV17oT-6IZ0ZcACCEJ-b0kqYAAU0mQJzD-4AIIQ_684.jpg',
			gesture: true,
			openId: ''
		};
	},
	methods: {
		init() {
			this.backgroundMap();
		},
		submitBtn(val) {
			showModal({
				title: '提示',
				content: '一经确定，无法再次修改用户身份'
			}).then(res=>{
				showToast({title:'啦啦啦啦', icon:'none'})
			}).catch(res=>{
				showToast({title:'0000', icon:'none'})
			})
			
			
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

							UpdataUser({
								data: {
									nickName: username,
									sex: gender,
									avatar: avatarUrl,
									loginIp: val,
									openId: that.openId
								}
							}).then(res=>{
								if (res.code == 200) {
									switchTab('/pages/homePage/homePage')
								}
							})
						}
					});
				}
			});
			this.gesture = false;
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res => {
				console.log(res)
				this.imageURL = res.rows[2].bannerImg;
			});
		}
	},
	onLoad(option) {
		this.openId = option.openId;
		this.init();
	}
};
</script>

<style lang="less">
uni-page-body,
html,
body {
	height: 100%;
}
.block {
	width: 100%;
	height: 100vh;
	white-space: nowrap;
}
.loginBg {
	width: 100%;
	height: 100%;
	display: inline-block;
	.qiugouBtn {
		color: #fff;
		position: absolute;
		z-index: 999;
		font-size: 35rpx;
		border: 7rpx solid #fff;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 50%;
		left: 50%;
		margin-top: -200rpx;
		margin-left: -200rpx;
		.qiugouWithin {
			border: 7rpx solid #fff;
			width: 306rpx;
			height: 306rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 306rpx;
		}
	}
	.gestureBox {
		position: absolute;
		z-index: 999;
		width: 130rpx;
		height: 170rpx;
		left: 50%;
		margin-left: -50rpx;
		bottom: 300rpx;
		.gesture {
			width: 100%;
			height: 100%;
		}
	}

	.submitBtn {
		position: absolute;
		z-index: 999;
		color: #fff;
		width: 80%;
		height: 90rpx;
		line-height: 90rpx;
		border: 7rpx solid #fff;
		text-align: center;
		border-radius: 10rpx;
		bottom: 100rpx;
		left: 50%;
		margin-left: -40%;
	}
	.submitBtn1 {
		position: absolute;
		z-index: 999;
		color: #fff;
		width: 80%;
		height: 90rpx;
		line-height: 90rpx;
		border: 7rpx solid #fff;
		text-align: center;
		border-radius: 10rpx;
		bottom: 100rpx;
		left: 150%;
		margin-left: -40%;
	}
	.maishouBtn {
		color: #fff;
		position: absolute;
		z-index: 999;
		font-size: 35rpx;
		border: 7rpx solid #fff;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 50%;
		margin-top: -200rpx;
		left: 150%;
		margin-left: -200rpx;
		.maishouBtnBuyer {
			border: 7rpx solid #fff;
			width: 306rpx;
			height: 306rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 306rpx;
		}
	}
}
.loginBg1 {
	width: 200%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	left: 0;
}
</style>
