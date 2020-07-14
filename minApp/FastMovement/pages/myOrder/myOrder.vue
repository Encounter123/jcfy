<template>
	<view>
		<view class="myOrderList">
			<text @click="selectTab(index)" class="myOrderLb1" :class="selectIndex == index ? 'active' : ''" v-for="(item, index) in tarTab" :key="index">{{ item }}</text>
			<view class="line" :style="{ left: selectLeft + '%' }"></view>
		</view>
		
		<block v-if="productList.length>0">
			<view class="myOrderBg" v-for="(item,index) in productList" :key="index">
				<view class="orderReceiving" v-if="selectIndex!=0&&selectIndex!=3">
					<text class="waybill" @click="copyLogisticsNo(item.logisticsNo)">{{item.logisticsCompany+'：'+item.logisticsNo}}</text>
					<text>{{tarTab[selectIndex]}}</text>
				</view>
				<view class="myOrderBottonBorder"></view>
				<view class="smallBg">
					<view><image mode="aspectFill" :src="item.img"></image></view>
					<view>
						<view class="spacing">
							<text class="bigText">
								<text class="title">货号：</text>
								{{item.goodNo}}
							</text>
						</view>
						<view class="spacing">
							<text>
								<text class="title">尺码：</text>
								{{item.size}}
							</text>
						</view>
						<view class="spacing">
							<text>
								<text class="title">求货方：</text>
								{{item.askingGoodName}}
							</text>
						</view>
					</view>
					<view class="rightBox">
						<view class="bigText">{{item.price}}</view>
						<view>X{{item.count}}</view>
					</view>
				</view>
				<view v-if="selectIndex==0" class="myOrderBottonBorder"></view>
				<view v-if="selectIndex==0" class="myOrderBtn">
					<view class="orderReceivingBtn" @click="returnOrder(item.orderId,index)">退订单</view>
					<block v-if="UserIdentity=='Buyer'">
						<block v-if="item.state==1">
							<view class="orderReceivingBtn" @click="toPay(item)">付款</view>
						</block>
						<block v-else>
							<view class="orderReceivingBtn">已付款</view>
						</block>
					</block>
					<block v-else>
						<block v-if="item.state==4">
							<view class="orderReceivingBtn" @click="toConsignment(item.orderId)">去发货</view>
						</block>
					</block>
				</view>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>
		
		<uni-popup type="center" ref="popup">
			<view class="popup">
				<view class="popup-item">
					<text>物流公司：</text><input type="text" v-model="delivery.companyName" @input="inputDelivery('companyName',$event)"></input>
				</view>
				<view class="popup-item">
					<text>物流单号：</text><input type="text" v-model="delivery.orderNo" @input="inputDelivery('orderNo',$event)"></input>
				</view>
				<view class="popup-submit" @click="saveLogistics">保存</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
import { TakeOrderList, OrderRefund, OrderDelivery } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
import NoData from '@/components/noData/noData.vue'
import UniPopup from '@/components/uni-popup/uni-popup.vue';


export default {
	data() {
		return {
			tarTab:[],
			selectIndex: 0,
			selectLeft: 9,
			pageSize: 10,
			pageNumber:1,
			productList: [],
			orderId:'',
			delivery:{
				companyName:'',
				orderNo:''
			}
		};
	},
	components:{
		NoData,
		UniPopup
	},
	methods:{
		copyLogisticsNo(text){
			uni.setClipboardData({
				data: text
			})
		},
		inputDelivery(name,e){
			this.delivery[name] = e.detail.value
		},
		selectTab(i){
			this.pageNumber = 1
			this.productList = []
			this.selectLeft = i*25 + 9
			this.selectIndex = i
			this.getData()
		},
		getData(){
			showLoading({title: '加载中'})
			TakeOrderList({
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
				if(res.rows.length>0){
					this.productList = this.productList.concat(res.rows);
				}
			});
		},
		returnOrder(id,i){
			showModal({
				title: '提示',
				content: '确认退订单'
			}).then(res=>{
				OrderRefund({
					header: {
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						order: id
					}
				}).then(res=>{
					this.productList.splice(i,1)
					showToast({title: res.msg, icon: 'none'})
				})
			})
			
		},
		toPay(item){
			navigateTo('/pages/confirmOrder/confirmOrder',{item: JSON.stringify(item)})
		},
		toConsignment(id){
			this.orderId = id
			this.$refs.popup.open()
		},
		saveLogistics(id){
			
			OrderDelivery({
				header: {
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					...this.delivery,
					orderId: this.orderId
				}
			}).then(res=>{
				showToast({title: res.msg, icon: 'none'})
				if(res.code == 200){
					this.$refs.popup.close()
					this.productList = []
					this.getData();
				}
			})
		}
	},
	onShow() {

		let sellerTab = ['已接单','已发货','已完成','已退单']
		let buyerTab = ['已接单','待收货','已完成','已退单']
		this.tarTab = this.UserIdentity=='Buyer'? buyerTab: sellerTab
		this.productList = []
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
}
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
.myOrderBg {
	width: 91%;
	background-color: #fff;
	box-shadow: 0 0 10rpx #eee;
	font-size: 25rpx;
	color: #999;
	border-radius: 20rpx;
	padding: 15rpx;
	margin: 30rpx auto;
	.orderReceiving {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-right: 30rpx;
		margin-top: 20rpx;
		position: relative;
		.waybill{
			position: absolute;
			left: 0;
		}
	}
	.myOrderBottonBorder {
		border: 1rpx solid #eee;
		margin: 20rpx 0;
		width: 100%;
	}
	.smallBg {
		display: flex;
		position: relative;
		.rightBox{
			position: absolute;
			right: 20rpx;
			top: 0;
			text-align: right;
			.bigText{
				font-size: 30rpx;
				color: #333;
			}
		}
		image {
			flex: 0 0 160rpx;
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
			.bigText{
				font-size: 30rpx;
				color: #333;
			}
			.loveImg {
				width: 40rpx;
				height: 40rpx;
				margin-top: -1rpx;
			}
		}
	}
	.myOrderBtn {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		align-items: center;
		.orderReceivingBtn {
			width: 150rpx;
			height: 50rpx;
			color: #fff;
			font-size: 20rpx;
			background-color: #000;
			margin: 0 10rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 10rpx;
		}
	}
}

.popup{
	height: 300rpx;
	background-color: #fff;
	border-radius: 12rpx;
	width: 620rpx;
	padding: 30rpx;
	&-item{
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		input{
			border: 1px solid #eee;
			border-radius: 12rpx;
		}
	}
	&-submit{
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		background-color: #333;
		color: #fff;
		text-align: center;
		margin-top: 35rpx;
		border-radius: 12rpx;
	}
}
</style>
