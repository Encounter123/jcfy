<template>
	<view>
		<view class="myOrderList">
			<text @click="selectTab(index)" class="myOrderLb1" :class="selectIndex==index?'active':''" v-for="(item,index) in tarTab" :key="index">{{item}}</text>
			<view class="line" :style="{left: selectLeft + '%'}"></view>
		</view>
		<view class="myOrderBg">
			<view class="orderReceiving">
				<text>已接单</text>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="smallBg">
				<view>
					<image mode="aspectFill"  src="http://seopic.699pic.com/photo/50052/2341.jpg_wh1200.jpg"></image>
				</view>
				<view>
					<view class="spacing">
						<text><text class="title">货号：</text>689174-098</text>
						<text style="margin-left: 25rpx;"><text class="title">￥1200.00</text></text>
					</view>
					<view class="spacing">
						<text><text class="title" >尺码：</text>全 原盒</text>
						<text  style="margin-left: 27rpx;">X500</text>
					</view>
					<view class="spacing">
						<text><text class="title" >求货方：</text>雨涵</text>
					</view>
					
				</view>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="myOrderBtn">
				<view class="orderReceivingBtn">退订单</view>
			    <view class="orderReceivingBtn" @click="toPay">付款</view>
			</view>
		</view>
		<view class="myOrderBg">
			<view class="orderReceiving">
				<text>已接单</text>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="smallBg">
				<view>
					<image mode="aspectFill"  src="http://seopic.699pic.com/photo/50052/2341.jpg_wh1200.jpg"></image>
				</view>
				<view>
					<view class="spacing">
						<text><text class="title">货号：</text>689174-098</text>
						<text style="margin-left: 25rpx;"><text class="title">￥1200.00</text></text>
					</view>
					<view class="spacing">
						<text><text class="title" >尺码：</text>全 原盒</text>
						<text  style="margin-left: 27rpx;">X500</text>
					</view>
					<view class="spacing">
						<text><text class="title" >求货方：</text>雨涵</text>
					</view>
					
				</view>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="myOrderBtn">
				<view class="orderReceivingBtn">退订单</view>
			    <view class="orderReceivingBtn">付款</view>
			</view>
		</view>
		<view class="myOrderBg">
			<view class="orderReceiving">
				<text>已接单</text>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="smallBg">
				<view>
					<image mode="aspectFill"  src="http://seopic.699pic.com/photo/50052/2341.jpg_wh1200.jpg"></image>
				</view>
				<view>
					<view class="spacing">
						<text><text class="title">货号：</text>689174-098</text>
						<text style="margin-left: 100rpx;">￥1200.00</text>
					</view>
					<view class="spacing">
						<text><text class="title" >尺码：</text>全 原盒</text>
						<text  style="margin-left: 200rpx;">X500</text>
					</view>
					<view class="spacing">
						<text><text class="title" >求货方：</text>雨涵</text>
					</view>
					
				</view>
			</view>
			<view class="myOrderBottonBorder"></view>
			<view class="myOrderBtn">
				<view class="orderReceivingBtn">退订单</view>
			    <view class="orderReceivingBtn">付款</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import {  } from '@/api/api.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
	import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
	
	export default {
		data() {
			return {
				tarTab:[],
				selectIndex: 0,
				selectLeft: 9,
				
			};
		},
		methods:{
			selectTab(i){
				this.selectLeft = i*25 + 9
				this.selectIndex = i
			},
			toPay(){
				navigateTo('/pages/confirmOrder/confirmOrder')
			}
		},
		onLoad() {
			
			let sellerTab = ['已接单','已发货','已完成','已退单']
			let buyerTab = ['已接单','待收货','已完成','已退单']
			this.tarTab = this.UserIdentity=='Buyer'? buyerTab: sellerTab
		}
	}
</script>

<style lang="less">
.myOrderList{
	width: 100%;
	height: 50rpx;
	position: relative;
	.myOrderLb1{
		width: 25%;
		height: 50rpx;
		display: inline-block;
		font-size: 30rpx;
		text-align: center;
	}
	.active{
		color: #1AC681;
	}
	.line{
		height: 6rpx;
		width: 50rpx;
		background-color: #1AC681;
		position: absolute;
		left: 9%;
		bottom: 0;
		transition: left 0.5s; 
	}
}
.myOrderBg{
	width: 91%;
	background-color: #fff;
	box-shadow:0 0 10rpx #eee;
	font-size: 25rpx;
	color: #999;
	border-radius: 20rpx;
	padding: 15rpx;
	margin: 30rpx auto;
	.orderReceiving{
		display: flex;
		 justify-content: flex-end;
		 align-items: center;
		 margin-right: 30rpx;
		 margin-top: 20rpx;
	}
	.myOrderBottonBorder{
		border: 1rpx solid #eee;
		margin: 20rpx 0;
		width: 100%;
	}
	.smallBg{
			display: flex;
			image{
				width: 160rpx;
				height: 160rpx;
				margin: 20rpx;
			}
			.title{
				color: #555;
				font-size: 26rpx;
			}
			.spacing{
				line-height: 50rpx;
				display: flex;
				.loveImg{
					width: 40rpx;
					height: 40rpx;
					margin-top: -1rpx;
				}
			
			}
			
		
	}
	.myOrderBtn{
		display: flex;
		 flex-wrap: nowrap;
		 justify-content: flex-end;
		 align-items: center;
		.orderReceivingBtn{
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
	
</style>
