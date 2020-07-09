<template>
	<view>
		<view class="storeBackground">
			<image src="http://seopic.699pic.com/photo/50066/3937.jpg_wh1200.jpg" mode=""></image>
		</view>
		<view class="storeBox">
		   <view class="storeName">
		   	  这里是门店名称
		   </view>
		   <view class="address">
				<text>600m <text class="addressLb">|</text></text>
				<text>北京市——朝阳--朝阳北路101号</text>
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
.storeBackground{
	width: 720rpx;
	height:550rpx;
	margin: 0 auto;
	image{
	width: 100%;
	height: 100%;
	}
}
.storeBox{
	width: 95%;
	margin: 30rpx auto;
	.storeName{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 35rpx;
		font-weight: 500;
	}
	.address{
		font-size: 25rpx;
		margin: 15rpx 0;
	}
	.addressLb{
		width: 80rpx;
		display: inline-block;
		text-align: center;
	}
}
</style>
