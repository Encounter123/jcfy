<template>
	<view class="noData">
		<image class="noData-icon" src="../../static/img/none-data.png" mode=""></image>
		<view class="noData-text">暂无数据</view>
	</view>
</template>

<script>
</script>

<style scoped lang="less">
	.noData{
		width: 100%;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&-icon{
			height: 200rpx;
			width: 250rpx;
		}
		&-text{
			color: #ccc;
			font-size: 28rpx;
		}
	}
</style>
