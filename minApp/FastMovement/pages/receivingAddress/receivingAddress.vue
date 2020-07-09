<template>
	<view>
		<view class="receivingBg">
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">收货人</text>
				<input type="text" value="爱丽丝" style="color: #ccc;"/>
			</view>
			<view class="changeBottomBorder"></view>
			
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">联系电话</text>
				<input type="text" value="19876539876" style="color: #ccc;"/>
			</view>
			<view class="changeBottomBorder"></view>
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">所在地区</text>
				<input type="text" value="四川省成都市成华区" style="color: #ccc;"/>
			</view>
			<view class="changeBottomBorder"></view>
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">详细地址</text>
				<input type="text" value="建设路98号" style="color: #ccc;"/>
			</view>
			<view class="changeBottomBorder"></view>
		</view>
	    <view class="default">
			<text class="defaultText">设为默认地址</text>
		</view>
		
		<view class="preservation">保存并使用</view>
		
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
	.receivingBg{
		box-shadow: 0 0 10rpx #eee;
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
				border: 1rpx solid #eee;
			}
		}
.default{
	margin: 40rpx 0;
	height: 100rpx;
	box-shadow: 0 0 10rpx #eee;
	.defaultText{
		line-height: 100rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
	}
}
.preservation{
  height: 100rpx;
  background-color: #000;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  line-height: 100rpx;
  position: absolute;
  bottom:0;
  left: 0;
  right: 0;
}
</style>
