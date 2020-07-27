<template>
	<view>
		<view style="text-align: center;">
			<image style="width: 300rpx;" mode="aspectFit" :src="src"></image>
			<view style="color: #989598;">{{title}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			title: {
				default: '哦豁，什么都没有耶~~'
			},
			src: {
				default: '/static/noData.png'
			}
		}
	}
</script>

<style scoped>

</style>