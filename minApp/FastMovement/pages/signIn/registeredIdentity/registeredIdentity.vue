<template>
	<view>
		<scroll-view scroll-x="true" class="block" style="display: flex;flex-direction: row;">
			<block>
				<view class="loginBg1"></view>
				<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }">
					<view class="qiugouBtn"><view class="qiugouWithin">求购</view></view>
					<view class="gestureBox" v-show="gesture"><image src="../../../static/img/89135d002e9c4a872d1912d05c3cf9d.png" mode="" class="gesture"></image></view>
					<view @click="submitBtn(1)" class="submitBtn">确定</view>
				</view>
				<view class="loginBg" :style="{ backgroundImage: 'url(' + imageURL + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }">
					<view class="maishouBtn"><view class="maishouBtnBuyer">买手</view></view>
					<view @click="submitBtn(2)" class="submitBtn1">确定</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import { ChosePosition, ShopBannerList } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js'

export default {
	data() {
		return {
			imageURL: 'http://sjbz.fd.zol-img.com.cn/t_s1080x1920c/g3/M02/0E/0D/ChMlV17oT-6IZ0ZcACCEJ-b0kqYAAU0mQJzD-4AIIQ_684.jpg',
			gesture: true
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
				this.submitUser(val)
			})
		},
		//确定用户身份
		
		submitUser(val){
			ChosePosition({
				header: {
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					position: val
				}
			}).then(res=>{
				if(res.code==200){
					uni.setStorageSync('userInformation',JSON.stringify(res.rows[0]))
					this.$store.commit('setUserIdentity',val==1?'Buyer':'Seller')
					switchTab('/pages/homePage/homePage')
				}else{
					showToast({title: res.msg,icon:'none'})
				}
			})
			
			
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
	onLoad(options) {
		console.log(options)
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
		background: transparent;
		margin-left: -40%;
	}
	.submitBtn1 {
		background: transparent;
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
