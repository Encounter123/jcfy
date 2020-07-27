<template>
	<view>
		<view class="personalBg">
			<view class="personalBgImg">
				<image :style="{ background: 'url(' + imageURL + ') no-repeat center; background-size: cover;' }"></image>
				<view class="personalMsg">
					<view class="setUp">
						<image src="../../static/img/setUp.png" mode="aspectFill" class="setUpImg" @tap="setUp"></image>
						<view class="hearder">
							<image :src="userInformation.head" mode="aspectFill" class="hearderImg"></image>
						</view>
					</view>
				</view>
			</view>
			<block v-if="!userInformation.position">
				<view @click="toLogin" class="login">去登录</view>
			</block>
			<block v-else>
				<view class="personalTitle">
					<h1 class="userName">{{ userInformation.name }}</h1>
				</view>
				<navigator url="../myCollection/myCollection">
					<view class="myPersonalCenter">
						<view class="myPersonalCenter-left">
							<image src="../../static/img/Collection.png" mode="aspectFill"></image>
							<text class="collection">我的收藏</text>
						</view>
						<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
					</view>
				</navigator>
				<view class="bottomBorder"></view>

				<navigator url="../myOrder/myOrder">
					<view class="myPersonalCenter">
						<view class="myPersonalCenter-left">
							<image src="../../static/img/order.png" mode="aspectFill"></image>
							<text class="collection">我的订单</text>
						</view>
						<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
					</view>
				</navigator>
				<view class="bottomBorder"></view>

				<block v-if="UserIdentity=='Buyer'">
					<navigator url="../myReleases/myReleases">
						<view class="myPersonalCenter">
							<view class="myPersonalCenter-left">
								<image src="../../static/img/release.png" mode="aspectFill"></image>
								<text class="collection">我的发布</text>
							</view>
							<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
						</view>
					</navigator>
					<view class="bottomBorder"></view>
				</block>
				
				<block v-if="UserIdentity=='Buyer'">
					<navigator url="../existingAddress/existingAddress">
						<view class="myPersonalCenter">
							<view class="myPersonalCenter-left">
								<image src="../../static/img/adress.png" mode="aspectFill"></image>
								<text class="collection">收货地址</text>
							</view>
							<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
						</view>
					</navigator>
					<view class="bottomBorder"></view>
				</block>

				<navigator url="../withdrawalAmount/withdrawalAmount">
					<view class="myPersonalCenter">
						<view class="myPersonalCenter-left">
							<image src="../../static/img/money.png" mode="aspectFill"></image>
							<text class="collection1">可提现现金</text>
						</view>
						<view class="myPersonalCenter-left">
							<text class="collection1Money">￥{{userPrice}}</text>
							<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg1"></image>
						</view>
					</view>
				</navigator>
				<view class="bottomBorder"></view>
			</block>
				
		</view>
		
		<login-app ref="loginApp"></login-app>
		
	</view>
</template>

<script>
import { OrderGetUser } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js'
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
import LoginApp from '@/components/login-app/login-app.vue'

export default {
	data() {
		return {
			imageURL: 'http://seopic.699pic.com/photo/50142/5691.jpg_wh1200.jpg',
			userInformation: {},
			userPrice:0
		};
	},
	components:{
		LoginApp
	},
	methods: {
		toLogin(){
			this.$refs.loginApp.open()
		},
		init() {
			if(this.userInformation.position){
			}else{
				return
			}
			
			OrderGetUser({
				method: 'get'
			}).then(res=>{
				if(res.code == 200){
					this.userPrice = res.rows[0]
				}
			})
		},
		setUp() {
			if(this.userInformation.position){
				navigateTo('/pages/personalCenter/changeInformation/changeInformation')
			}else{
				this.$refs.loginApp.open()
				return
			}		
		}
	},
	onShow() {
		this.$refs.loginApp.close()
		this.userInformation = uni.getStorageSync('userInformation')?JSON.parse(uni.getStorageSync('userInformation')) : {};
		console.log(this.userInformation);
		this.init();
		
	}
};
</script>

<style lang="less">
	.login{
		margin: 120rpx auto;
		text-align: center;
		background: #000;
		color: #fff;
		width: 300rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 12rpx;

	}
.userName {
	max-width: 80%;
	margin: 140rpx auto 10rpx auto !important;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.personalBg {
	.personalBgImg {
		width: 100%;
		height: 416rpx;
		position: relative;
		background-size: cover;
		image {
			width: 100%;
			height: 100%;
		}

		.personalMsg {
			width: 100%;
			height: 100%;
			position: absolute;
			background: rgba(255, 255, 255, 0.5);
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			.setUpImg {
				width: 50rpx;
				height: 50rpx;
				margin-left: 680rpx;
				margin-top: 20rpx;
			}
			.hearder {
				margin-top: 250rpx;
				margin-left: 270rpx;
			}
			.hearderImg {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}
		}
	}
	.personalTitle {
		h1 {
			color: #333;
			text-align: center;
			margin-top: 140rpx;
			margin-left: -15rpx;
			font-size: 30rpx;
		}
	}
	.myPersonalCenter {
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		image {
			width: 50rpx;
			height: 50rpx;
		}
		&-left{
			height: 110rpx;
			align-items: center;
			display: flex;
		}
		.collection {
			margin-left: 30rpx;
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
		}
		.collection1 {
			font-size: 28rpx;
			color: #333;
			margin-left: 30rpx;
			font-weight: 500;
		}
		.collection1Money {
			font-size: 28rpx;
			color: #999;
			margin-right: 20rpx;
			font-weight: 500;
		}
		.arrowImg {
			width: 40rpx;
			height: 40rpx;
		}
		.arrowImg1 {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.bottomBorder {
		position: absolute;
		z-index: 1;
		width: 84%;
		margin: 0 0 0 100rpx;
		border-bottom: 1rpx solid #dcdcdc;
		vertical-align: middle;
	}
}
</style>
