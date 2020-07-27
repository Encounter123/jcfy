<template>
	<view>
		<nav-bar status-bar fixed title=" "></nav-bar>
		
		<no-data title="没有数据"></no-data>
		
		<view style="text-align: center;">
			<image style="margin-top: 100rpx;" src="../static/notwork.png" mode=""></image>
			<view style="color: #989598;">噫？是谁掐了我的网线</view>
		</view>
		<view class="btnBox">
			<button class="btn" size="mini" type="primary" @click="onBack">返回</button>
			<button class="btn" size="mini" type="primary" @click="onBackHome">返回首页</button>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import NoData from '@/components/nodata/nodata.vue'
	import { navigateBack, reLaunch } from "@/common/navigation.js"
	
	export default {
		components:{
			NavBar,
			NoData
		},
		methods:{
			onBack(){
				navigateBack()
			},
			onBackHome(){
				reLaunch('/pages/start')
			}
		},
		
	}
</script>

<style>
	page{
		background-color: #f7f3f7;
	}
</style>
<style scoped lang="scss">
	.btnBox{
		display: flex;
		justify-content: space-between;
		padding: 0 150rpx;
		margin-top: 60rpx;
	}
	.btn{
		border:1rpx solid #82b9c6;
		background: transparent;
		color: #82b9c6;
		&:after{
			border: 0;
		}
	}
</style>