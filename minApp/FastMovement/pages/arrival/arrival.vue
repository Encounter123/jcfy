<template>
	<view>
		<view class="topSwiper">
			<swiper class="swiper" circular autoplay interval="5000" :indicator-dots="true">
				<swiper-item v-for="(item, index) in imageUrlList" :key="index"><image class="swiperItem" :src="item.bannerImg" mode="aspectFill"></image></swiper-item>
			</swiper>
			<spring-box v-if="userInformation.position" class="swiper-search" :ShowHidden="ShowHidden" @search="search"></spring-box>
		</view>

		<view class="arrivalBg">
			<block v-if="pageType != 2">
				<block v-if="productList.length > 0">
					<view class="smallBg" v-for="(item, index) in productList" :key="index">
						<common-cell :DownPrice="pageType == 4" :item="item" @collection="collection(index, item.shoseId)"></common-cell>
					</view>
				</block>
				<block v-else><no-data></no-data></block>
			</block>
			<block v-else>
				<view class="allStores">所有门店</view>
				<block v-if="productList.length > 0">
					<view>
						<view class="storeBox">
							<text class="store" @click="toTarget(item)" v-for="(item, index) in productList" :key="index">{{ item }}</text>
						</view>
					</view>
				</block>
				<block v-else><no-data></no-data></block>
			</block>
		</view>
		
		<login-app ref="loginApp"></login-app>
		
	</view>
</template>

<script>
import { GoodShoseList, ShopBannerList, OrderList, CollectionEdit, CollectionAdd, ShoseSearch } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import SpringBox from '@/components/springBox/springBox.vue';
import CommonCell from '@/components/commonCell/commonCell.vue';
import NoData from '@/components/noData/noData.vue';
import LoginApp from '@/components/login-app/login-app.vue'

export default {
	data() {
		return {
			productList: [],
			ShowHidden: false,
			pageType: 0,
			value: '',
			imageUrlList: [],
			userInformation:{},
			pageSize: 10,
			pageNum: 1
		};
	},
	components: {
		SpringBox,
		CommonCell,
		NoData,
		LoginApp
	},
	methods: {
		toTarget(name) {
			navigateTo('/pages/retailStore/retailInfo/retailInfo', { item: name });
		},
		// 获取背景图
		backgroundMap() {
			ShopBannerList({
				method: 'get'
			}).then(res => {
				if (res.code == 200) {
					this.imageUrlList = res.rows;
				}
			});
		},
		init() {
			this.productList = [];
			this.pageNum = 1;
			this.ProductList();
		},
		// 获取页面列表数据
		ProductList(number) {
			showLoading({ title: '加载中' });
			GoodShoseList({
				method: 'get',
				data: {
					pageSize: this.pageSize,
					pageNum: this.pageNum
					// shoseNo: this.seachInput
				}
			}).then(res => {
				hideLoading();
				if(res.code==200){
					this.productList = this.productList.concat(res.rows);
				}
			}).catch(()=>{
				hideLoading();
			})
		},
		collection(e, id) {
			if(this.userInformation.position){
			}else{
				this.$refs.loginApp.open()
				return
			}

			// console.log(e)
			if (this.productList[e].isCollection) {
				CollectionEdit({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						shoseId: id
					}
				}).then(res => {
					showToast({ title: res.msg, icon: 'none' });
					if (res.code == 200) {
						this.productList[e].isCollection = 0;
					}
				});
			} else {
				CollectionAdd({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						shoseId: id
					}
				}).then(res => {
					showToast({ title: res.msg, icon: 'none' });
					if (res.code == 200) {
						this.productList[e].isCollection = 1;
					}
				});
			}
		},
		search(e) {
			this.pageType = e.type;
			this.value = e.value;
			console.log(e);
			this.productList = [];
			this.pageNum = 1;
			this.getSearchList();
		},
		getSearchList() {
			showLoading({ title: '加载中' });
			ShoseSearch({
				method: 'get',
				data: {
					key: this.value,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.pageType
				}
			}).then(res => {
				hideLoading();
				if (res.code == 200) {
					this.productList = this.productList.concat(res.rows);
				}
			}).catch(()=>{
				
				hideLoading();
			})
		}
	},
	onShow() {
		this.$refs.loginApp.close()
		this.userInformation = uni.getStorageSync('userInformation')?JSON.parse(uni.getStorageSync('userInformation')) : {};
		this.productList = [];
		this.ShowHidden = false;
		this.pageType = 0;
		this.init();
		this.backgroundMap();
	},
	onLoad() {
	},
	//页面上拉触底事件的处理函数
	onReachBottom() {
		this.pageNum++;
		if (this.value != '') {
			this.getSearchList();
		} else {
			this.ProductList();
		}
	},
	onPullDownRefresh() {
		this.init();
	},
	onPageScroll(e) {
		// console.log(e)
		this.ShowHidden = false;
	},
	onShareAppMessage(res) {
		return {
			title: '火速搬砖',
			path: '/page/start/start'
		}
	}
};
</script>

<style lang="less" scoped>
	
.topSwiper {
	height: 300rpx;
	width: 100%;
	position: relative;
	.swiper {
		height: 300rpx;
		position: relative;
		.swiperItem {
			height: 300rpx;
			width: 100%;
		}
		&-search {
			position: absolute;
			width: 100%;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.seach {
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
