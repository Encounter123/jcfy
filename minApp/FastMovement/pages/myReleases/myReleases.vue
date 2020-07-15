<template>
	<view>
		<view class="myOrderList">
			<text @click="selectTab(index)" class="myOrderLb1" :class="selectIndex == index ? 'active' : ''" v-for="(item, index) in tarTab" :key="index">{{ item }}</text>
			<view class="line" :style="{ left: selectLeft + '%' }"></view>
		</view>

		<block v-if="productList.length>0">

			<view class="smallBg" v-for="(item,index) in productList" :key="index">
				<view><image mode="aspectFit" :src="item.img"></image></view>
				<view>
					<view class="spacing">
						<text>
							<text class="title">货号：</text>
							{{item.goodNo}}
						</text>
						<text style="margin-left: 25rpx;">
							<text class="title">数量：</text>
							{{item.count}}
						</text>
					</view>
					<view class="spacing">
						<text>
							<text class="title">尺码：</text>
							{{item.size}}
						</text>
						<text>
							<text class="title">价格：</text>
							{{item.price}}
						</text>
					</view>
					<view class="spacing">
						<text>
							<text class="title">求货方：</text>
							{{item.askingGoodName}}
						</text>
						<text>
							<text class="title">时间：</text>
							{{item.createTime | TimestampToTime}}
						</text>
					</view>
					<view class="spacing" >
						<text style="flex: 0 0 70%;">
							<text class="title" style="flex: 0 0 70%;">过期时间:</text>
							{{item.endDate}}
						</text>
						<button v-if="selectIndex==2" class="orderReceivingBtn" @click="purchase(item.orderId,index)">重新发布</button>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>
		
		
	</view>
</template>

<script>
import { OrderRelease, OrderRePublish } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
import NoData from '@/components/noData/noData.vue'
import { timestampToTime } from '@/common/date-format.js'

export default {
	data() {
		return {
			tarTab: ['全部', '最近三天', '已过期'],
			selectIndex: 0,
			selectLeft: 9,
			pageSize: 10,
			pageNumber:1,
			productList: []
		};
	},
	components:{
		NoData
	},
	filters: {
		TimestampToTime(time){
			return time.substr(0,11)
		},
	},
	methods: {
		selectTab(i) {
			this.pageNumber = 1
			this.productList = []
			this.selectLeft = i * 25 + 9;
			this.selectIndex = i;
			this.getData()
		},
		purchase(id,i){
			OrderRePublish({
				header: {
					'content-type':'application/x-www-form-urlencoded'
				},
				data: {
					id: id
				}
			}).then(res=>{
				if(res.code == 200){
					this.productList.splice(i,1)
				}else{
					showToast({title: res.msg, icon: 'none'})
				}
			})
		},
		getData() {
			showLoading({title: '加载中'})
			OrderRelease({
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					pageSize: this.pageSize,
					pageNum: this.pageNumber,
					type: this.selectIndex+1
				}
			}).then(res => {
				hideLoading()
				this.productList = this.productList.concat(res.rows);
			});
		}
	},
	onLoad() {
		this.getData();
	},
	onReachBottom() {
		this.pageNumber++
		this.getData();
	},
	onPullDownRefresh() {
		this.pageNumber = 1
		this.productList = []
		this.getData();
	}
};
</script>

<style lang="less">
.myOrderList {
	width: 100%;
	height: 50rpx;
	position: relative;
	.myOrderLb1 {
		width: 25%;
		height: 50rpx;
		display: inline-block;
		font-size: 30rpx;
		text-align: center;
	}
	.active {
		color: #1ac681;
	}
	.line {
		height: 6rpx;
		width: 50rpx;
		background-color: #1ac681;
		position: absolute;
		left: 9%;
		bottom: 0;
		transition: left 0.5s;
	}
}

.smallBg {
	width: 91%;
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
		width: 460rpx;
		text{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			flex: 0 0 50%;
		}
	}
}
.orderReceivingBtn {
				padding: 0 20rpx;
				height: 50rpx;
				color: #fff;
				font-size: 20rpx;
				background-color: #000;
				line-height: 50rpx;
				margin: 0;
			}
</style>
