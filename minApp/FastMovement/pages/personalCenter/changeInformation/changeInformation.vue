<template>
	<view class="changeBg"> 
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">头像</text>
			<input type="text" value="" />
			<image src="http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg" mode="aspectFill" class="hearderImg"></image>
		</view>
		<view class="changeBottomBorder"></view>
		
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">昵称</text>
			<input type="text" value="我的最爱" style="color: #ccc;"/>
		</view>
		
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">支付宝账号</text>
			<input type="text" value="17829658265" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
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
.changeBg{
	.changeLb1{
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content:flex-start;
		align-items:center;
		font-size: 30rpx;
		input{
			margin-left: 30rpx;
			width:70%;
			height: 100rpx;
			vertical-align: middle;
		}
		image{
			margin-left: 10rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			vertical-align: middle;
		}
	}
	.changeBottomBorder{
		width: 100%;
		border: 0.1rpx solid #eee;
	}
}
</style>
