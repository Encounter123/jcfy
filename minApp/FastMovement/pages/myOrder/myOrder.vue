<template>
	<view>
		<view class="myOrderList">
			<text class="myOrderLb1">已接单</text>
			<text class="myOrderLb1">发货中</text>
			<text class="myOrderLb1">已完成</text>
			<text class="myOrderLb1">已退</text>
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
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.myOrderList{
	width: 100%;
	.myOrderLb1{
		width: 25%;
		height: 50rpx;
		display: inline-block;
		font-size: 30rpx;
		text-align: center;
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
