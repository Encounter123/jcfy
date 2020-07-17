<template>
	<view class="bigBg">
		<view class="topSwiper">
			<swiper class="swiper" circular autoplay interval="5000" :indicator-dots="true">
			  <swiper-item v-for="(item,index) in imageUrlList" :key="index">
					<image class="swiperItem" :src="item.bannerImg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<!-- <view class="seach">
				<input type="text" class="seachInput" v-model="seachInput" @confirm="seach()" />
				<image src="../../static/img/search.png" class="searchImg" @tap="seach"></image>
			</view> -->
		</view>
		
		<view class="lb2Bg">
			
			<block v-if="productList.length>0">
				<view class="smallBg" v-for="(item,index) in productList" :key="index">
					<common-cell type="home" :item="item" @acceptSuccess="acceptSuccess" @collection="collection(index)"></common-cell>
				</view>
			</block>
			<block v-else>
				<no-data></no-data>
			</block>
			
		</view>
		<view class="twoBtn" v-if="UserIdentity=='Buyer'">
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
import { GoodShoseList, ShopBannerList, OrderList } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
import CommonCell from '@/components/commonCell/commonCell.vue'
import NoData from "@/components/noData/noData.vue"

export default {
	data() {
		return {
			pageSize: 10,
			pageNum: 1,
			productList: [],
			seachInput: '',
			imageUrlList:[],
		};
	},
	components:{
		CommonCell,
		NoData
	},
	methods: {
		init() {
			this.productList = []
			this.pageNum = 1
			this.ProductList();
			this.backgroundMap();
		},

		seach() {
			this.productList = [];
			this.ProductList();
		},
		// 获取页面列表数据
		ProductList() {
			showLoading({title: '加载中'})
			OrderList({
				method: 'get',
				data: {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					// shoseNo: this.seachInput
				}
			}).then(res => {
				hideLoading()
				uni.stopPullDownRefresh()
				this.productList = this.productList.concat(res.rows);
			});
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res=>{
				if(res.code == 200){
					this.imageUrlList = res.rows
				}
			})
		},
		collection(e){
			this.productList[e].status = false
			console.log(e)
		},
		acceptSuccess(){
			this.init();
		},
	},
	onShow() {
		this.init();
	},
	onLoad() {
		// this.$store.commit('setUserIdentity','Buyer')

	},
	//页面上拉触底事件的处理函数
	onReachBottom() {
		this.pageNum++
		this.ProductList();
	},
	onPullDownRefresh() {
		this.init();
	},
	onShareAppMessage(res) {
		return {
			title: '火速搬砖',
			path: '/page/start/start'
		}
	}

};
</script>

<style lang="less">
.bigBg {
	.topSwiper{
		height: 300rpx;
		width: 100%;
		position: relative;
		.swiper{
			height: 300rpx;
			.swiperItem{
				height: 300rpx;
				width: 100%;
			}
		}
		.seach{
			position: absolute;
			top: 20rpx;
			height: 70rpx;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 40rpx;
			display: flex;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			// margin: 0 30rpx;
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
