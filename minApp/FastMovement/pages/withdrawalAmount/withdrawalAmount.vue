<template>
	<view>
		<view class="withdrawlBg">
			<text class="withdrawlMoneyTitle">我的金额</text>
			<view class="withdrawlBottomBorder"></view>
			<view class="withdrawlMoney">
				<text class="withdrawlMoneyText">￥690元</text>
				<text class="moneyBtn1">提现</text>
				<text class="moneyBtn2">充值</text>
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
.withdrawlBg{
	width: 95%;
	height: 220rpx;
	box-shadow: 0 0 10rpx #eee;
	font-size: 30rpx;
	border-radius: 10rpx;
	margin: 30rpx auto;
	.withdrawlMoneyTitle{
		display: inline-block;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
	}
	.withdrawlBottomBorder{
		width: 100%;
		border: 1rpx solid #eee;
		margin: 10rpx 0;
	}
	.withdrawlMoney{
		line-height: 100rpx;
		.withdrawlMoneyText{
			font-size: 40rpx;
			font-weight: 600;
		}
		.moneyBtn1{
				width: 100rpx;
				line-height: 50rpx;
				text-align: center;
				height: 50rpx;
				background-color: #eee;
			    margin-left: 300rpx;
				color: #333;
				display: inline-block;
				border-radius: 10rpx;
				font-size: 25rpx;
			}
			.moneyBtn2{
					width: 100rpx;
					line-height: 50rpx;
					text-align: center;
					height: 50rpx;
					display: inline-block;
					background-color: #000;
					margin: 0 10rpx;
					color: #fff;
					border-radius: 10rpx;
					font-size: 25rpx;
					 margin-left: 30rpx;
				}
	}
	
}
</style>
