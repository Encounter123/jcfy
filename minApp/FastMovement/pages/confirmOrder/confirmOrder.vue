<template>
	<view>
		<view class="receivingAddress">
			<view>
				<image src="../../static/img/adress（1）.png" mode=""></image>
			</view>
			<view class="addressMsg">
				<view>
					<text style="font-size: 30rpx">小王</text>
					<text style="margin-left: 30rpx;">16726527635</text>
				</view>
				<view>
					<text>收货地址：</text>
					<text>四川省成都市高新区</text>
				</view>
			
			</view>
			<view class="nextPage">
				<image style="width: 30rpx;height: 30rpx;" src="../../static/img/arrow.png" mode=""></image>
			</view>
		</view>
		
	    <view class="receivingAddress1">
			<view class="userName">小王</view>
			<view class="receivingAddressBox">
				<view>
					<image src="http://seopic.699pic.com/photo/50052/2341.jpg_wh1200.jpg" mode="aspectFill"></image>
				</view>
				<view>
					<text class="shoesTitle">这里是商品名称</text>
					<text class="shoesPrice">1266元</text>
					<view class="shoesSize">
						黑色 42
					</view>
					<view class="shoesDeliverGoods">
						发货时间：付款后发货
					</view>
				</view>
			</view>
			<view>
				<text class="productTitle">商品货号</text>
				<text style="color: #999;margin-left: 70rpx;">123456789</text>
			</view>
			<view class="">
				<text class="productTitle">购买数量</text>
			</view>
			<view class="total">
				<text style="color: #999;letter-spacing: 5rpx;">共1件</text>
				<text style="font-size: 30rpx;margin-left: 15rpx;">合计：</text>
			    <text style="font-size: 28rpx;color: red;">1266元</text>
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
.receivingAddress{
	width: 90%;
	padding: 20rpx;
	box-shadow: 0 0 10rpx #eee;
	margin: 10rpx auto;
	border-radius: 20rpx;
	display: flex;
	align-items:center;
	 .addressMsg{
		margin-left: 40rpx;
		 font-size: 27rpx;
		 line-height: 50rpx;
	 }
	image{
		width: 50rpx;
		height: 50rpx;
	}
	.nextPage{
		// border: 1px solid red;
		margin-left: 180rpx;
	}
}
.receivingAddress1{
    width: 90%;
	padding: 20rpx;
	box-shadow: 0 0 10rpx #eee;
	margin: 30rpx auto;
	border-radius: 20rpx;
	font-size: 25rpx;
	.receivingAddressBox{
		display: flex;
	}
	.userName{
		width: 100rpx;
		margin: 10rpx;
		font-size: 30rpx;
		color: #999;
	}
	image{ 
		width: 160rpx;
		height: 160rpx;
		margin: 0 20rpx 0 0;
	}
	.shoesTitle{
		line-height: 50rpx;
		height: 50rpx;
		width: 350rpx;
		overflow: hidden;
		font-size: 30rpx;
	}
	.shoesPrice{
		margin-left: 180rpx;
		line-height: 50rpx;
		height: 50rpx;
		overflow: hidden;
		font-size: 30rpx;
	}
	.shoesSize{
		width: 150rpx;
		background-color: #eee;
		border-radius: 15rpx;
		text-align: center;
		font-size: 20rpx;
		color: #666;
		margin: 15rpx 0;
	}
	.shoesDeliverGoods{
		color: #EC971E;
		font-size: 25rpx;
		display: inline-block;
		margin: 15rpx 0;
	}
	.productTitle{
		font-size: 28rpx;
		color: #333;
		line-height: 50rpx;
		}
		.total{
			margin-left: 400rpx;
		}
	 }
</style>
