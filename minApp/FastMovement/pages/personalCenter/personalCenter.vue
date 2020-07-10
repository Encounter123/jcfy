<template>
	<view>
		<view class="personalBg">
			<view class="personalBgImg">
				<image :style="{ background: 'url(' + imageURL + ') no-repeat center; background-size: cover;' }"></image>
				<view class="personalMsg">
					<view class="setUp">
						<image src="../../static/img/setUp.png" mode="aspectFill" class="setUpImg" @tap="setUp"></image>
						<view class="hearder">
							<image src="http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg" mode="aspectFill" class="hearderImg"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="personalTitle">
				<h1 class="userName">{{ userInformation.name }}</h1>
			</view>
			<navigator url="../myCollection/myCollection">
				<view class="myPersonalCenter">
					<image src="../../static/img/Collection.png" mode="aspectFill"></image>
					<text class="collection">我的收藏</text>
					<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
				</view>
			</navigator>
			<view class="bottomBorder"></view>

			<navigator url="../myOrder/myOrder">
				<view class="myPersonalCenter">
					<image src="../../static/img/order.png" mode="aspectFill"></image>
					<text class="collection">我的订单</text>
					<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
				</view>
			</navigator>
			<view class="bottomBorder"></view>

			<block v-if="UserIdentity=='Buyer'">
				<navigator url="../myReleases/myReleases">
					<view class="myPersonalCenter">
						<image src="../../static/img/release.png" mode="aspectFill"></image>
						<text class="collection">我的发布</text>
						<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
					</view>
				</navigator>
				<view class="bottomBorder"></view>
			</block>
			
			<block v-if="UserIdentity=='Buyer'">
				<navigator url="../existingAddress/existingAddress">
					<view class="myPersonalCenter">
						<image src="../../static/img/adress.png" mode="aspectFill"></image>
						<text class="collection">收货地址</text>
						<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg"></image>
					</view>
				</navigator>
				<view class="bottomBorder"></view>
			</block>

			<navigator url="../withdrawalAmount/withdrawalAmount">
				<view class="myPersonalCenter">
					<image src="../../static/img/money.png" mode="aspectFill"></image>
					<text class="collection1">可提现现金</text>
					<text class="collection1Money">￥690</text>
					<image src="../../static/img/arrow.png" mode="aspectFill" class="arrowImg1"></image>
				</view>
			</navigator>
			<view class="bottomBorder"></view>
		</view>
	</view>
</template>

<script>
import { ShopBannerList } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js'
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'


export default {
	data() {
		return {
			imageURL: 'http://seopic.699pic.com/photo/50142/5691.jpg_wh1200.jpg',
			userInformation: {}
		};
	},
	methods: {
		init() {
			this.backgroundMap();
		},
		setUp() {
			navigateTo('/pages/personalCenter/changeInformation/changeInformation')
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res => {
				this.imageURL = res.data.rows[1].bannerImg;
			});
			// this.$apiReq.req({ // 创建对象
			// 	url: '/ui/shop/banner/list', // 示例请求路径
			//     method:"get",
			// 	data : {
			// 	},
			// 	success: (res) => {
			// 		this.imageURL=res.data.rows[1].bannerImg
			// 	},
			//  })
		}
	},
	onLoad() {
		this.userInformation = JSON.parse(uni.getStorageSync('userInformation')) || {};
		console.log(this.userInformation);
		this.init();
	}
};
</script>

<style lang="less">
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
		image {
			width: 50rpx;
			height: 50rpx;
			vertical-align: middle;
			margin-left: 20rpx;
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
			width: 100rpx;
			font-size: 28rpx;
			color: #999;
			margin-left: 30rpx;
			font-weight: 500;
			margin-left: 350rpx;
		}
		.arrowImg {
			width: 40rpx;
			height: 40rpx;
			margin-left: 480rpx;
		}
		.arrowImg1 {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.bottomBorder {
		position: absolute;
		z-index: 999;
		width: 84%;
		margin: 0 0 0 100rpx;
		border-bottom: 1rpx solid #dcdcdc;
		vertical-align: middle;
	}
}
</style>
