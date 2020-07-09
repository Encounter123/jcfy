<template>
	<view class="bigBg">
		<view class="bg">
			<view class="bgImg" :style="{ background: 'url(' + imageURL + ') no-repeat center; background-size: cover;' }">
				<view class="seach">
					<input type="text" class="seachInput" v-model="seachInput" @confirm="seach()" />
					<image src="../../static/img/search.png" class="searchImg" @tap="seach"></image>
				</view>
			</view>
		</view>
		<view class="lb2Bg">
			<view v-show="noDataAvailable" class="noDataAvailable">暂无数据</view>
			<view class="smallBg" v-for="item in productList" :key="item.shoseId">
				<view><image mode="aspectFill" :src="item.shoseImg"></image></view>
				<view>
					<view class="spacing">
						<text>
							<text class="title">货号：</text>
							{{ item.shoseNo }}
						</text>
						<text style="margin-left: 25rpx;">
							<text class="title">数量：</text>
							{{ item.shoseStock }}
						</text>
					</view>
					<view class="spacing">
						<text style="width: 150rpx;">
							<text class="title">尺码：</text>
							{{ item.shoseSize }}
						</text>
						<text style="margin-left: 80rpx;">
							<text class="title">价格：</text>
							{{ item.shosePrice }}
						</text>
					</view>
					<view class="spacing">
						<text>
							<text class="title">求货方：</text>
							涵与
						</text>
						<text style="margin-left:80rpx;">
							<text class="title">时间：</text>
							{{ item.creaetTime }}
						</text>
					</view>
					<view class="spacing">
						<text>
							<text class="title">过期时间:</text>
							2020-04-08
						</text>
						<button class="orderReceivingBtn">接单</button>
					</view>
				</view>
			</view>
		</view>
		<view class="twoBtn">
			<navigator url="../demandForGoods/demandForGoods">
				<view class="businessPurchase">
					<view class="business">
						<text>商家</text>
						<text>求购</text>
					</view>
				</view>
			</navigator>
			<navigator url="../release/release"><view class="release">发布</view></navigator>
		</view>
	</view>
</template>

<script>
import { GoodShoseList, ShopBannerList } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';

export default {
	data() {
		return {
			imageURL: 'http://seopic.699pic.com/photo/50054/0643.jpg_wh1200.jpg',
			pageSize: 10,
			pageNum: 1,
			productList: [],
			seachInput: '',
			noDataAvailable: false
		};
	},
	methods: {
		init() {
			this.ProductList(this.pageNum);
			this.backgroundMap();
		},

		seach() {
			this.productList = [];
			this.ProductList(this.pageNum);
		},
		// 获取页面列表数据
		ProductList(number) {
			GoodShoseList({
				method: 'get',
				data: {
					pageSize: this.pageSize,
					pageNum: number,
					shoseNo: this.seachInput
				}
			}).then(res => {
				this.productList = this.productList.concat(res.rows);
				if (res.rows.length == 0) {
					this.noDataAvailable = true;
				} else {
					this.noDataAvailable = false;
				}
			});
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res=>{
				this.imageURL = res.data.rows[0].bannerImg;
			})
		}
	},
	onLoad() {
		this.init();
	},
	//页面上拉触底事件的处理函数
	onReachBottom() {
		this.ProductList(this.pageNum++);
	},
	onPullDownRefresh() {
		this.init();
	}
};
</script>

<style lang="less">
.bigBg {
	.bg {
		width: 100%;
		height: 350rpx;

		.bgImg {
			width: 100%;
			height: 100%;
			padding: 20rpx 0 0 0;
		}
		.seach {
			width: 90%;
			height: 70rpx;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 40rpx;
			margin: 0 auto;
			display: flex;
		}
		.seachInput {
			width: 80%;
			margin: 10rpx 0 0 40rpx;
			display: inline-block;
		}
		.searchImg {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
			margin-top: 10rpx;
		}
	}
	.lb2Bg {
		margin-top: 20rpx;
		border: 1px solid #eee;
		.noDataAvailable {
			width: 200rpx;
			height: 100rpx;
			font-size: 30rpx;
			margin: 20rpx auto;
			line-height: 100rpx;
		}
		.smallBg {
			width: 90%;
			height: 208rpx;
			background-color: #fff;
			margin: 30rpx auto;
			border-radius: 20rpx;
			padding: 15rpx;
			display: flex;
			font-size: 25rpx;
			color: #999;
			box-shadow: 0 0 10rpx #eee;
			image {
				width: 160rpx;
				height: 160rpx;
				margin: 20rpx;
			}
			.title {
				color: #555;
				font-size: 26rpx;
			}
			.spacing {
				line-height: 50rpx;
				display: flex;
				.orderReceivingBtn {
					width: 100rpx;
					height: 50rpx;
					color: #fff;
					font-size: 20rpx;
					background-color: #000;
					line-height: 50rpx;
					margin-left: 110rpx;
				}
			}
		}
	}
	.twoBtn {
		.businessPurchase {
			position: fixed;
			bottom: 150rpx;
			right: 20rpx;
			width: 80rpx;
			height: 80rpx;
			padding: 10rpx;
			border-radius: 50%;
			background-color: #fff;
			box-shadow: 0 0 10rpx #999;
			color: #333;
			font-size: 28rpx;
			display: flex;
			text-align: center;
			flex-wrap: wrap;
			.business {
				// border: 1px solid #fff;
			}
		}
		.release {
			position: fixed;
			bottom: 30rpx;
			right: 20rpx;
			width: 80rpx;
			height: 80rpx;
			padding: 10rpx;
			border-radius: 50%;
			background-color: #fff;
			box-shadow: 0 0 10rpx #999;
			color: #333;
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
}
</style>
