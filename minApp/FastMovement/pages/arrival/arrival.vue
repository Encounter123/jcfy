<template>
	<view>
		<view class="arrivalBg">
			<spring-box :ShowHidden="ShowHidden" @search="search"></spring-box>
			
			<block v-if="pageType!=2">
				<view class="smallBg" v-for="(item,index) in productList" :key="index">
					<common-cell :item="item" @collection="collection(index)"></common-cell>
				</view>
			</block>
			<block v-else>
				<view class="allStores">所有门店</view>
				<view>
					<view class="storeBox">
						<text class="store" @click="toTarget()">北京朝阳</text>
						<text class="store">北京朝阳</text>
						<text class="store">北京朝阳</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { ShopAddress } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import SpringBox from '@/components/springBox/springBox.vue';
import CommonCell from '@/components/commonCell/commonCell.vue'

export default {
	data() {
		return {
			productList: [],
			ShowHidden: false,
			pageType: 0
		};
	},
	components: {
		SpringBox,
		CommonCell
	},
	methods: {
		toTarget(){
			navigateTo('/pages/retailStore/retailInfo/retailInfo')
		},
		search(e){
			this.pageType = e.type
			let value = e.value
			
			console.log(e)
			console.log(e)
			console.log(e)
		}
	},
	mounted() {
		
	},
	onPageScroll() {
		this.ShowHidden = false
	}
};
</script>

<style lang="less" scoped>
.arrivalBg {
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
			line-height: 55rpx;
			display: flex;
			image {
				width: 40rpx;
				height: 40rpx;
			}
			.orderReceivingBtn {
				width: 150rpx;
				height: 50rpx;
				color: #fff;
				font-size: 20rpx;
				background-color: #000;
				line-height: 50rpx;
				margin-left: 210rpx;
				margin-top: 20rpx;
			}
		}
	}
}

// 所有门店
.allStores {
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	margin: 20rpx 15rpx;
	font-size: 30rpx;
}
.storeBox {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	.store {
		background-color: #f3f4f8;
		padding: 10rpx 25rpx;
		border-radius: 30rpx;
		font-size: 25rpx;
		margin: 15rpx 20rpx;
	}
}
</style>
