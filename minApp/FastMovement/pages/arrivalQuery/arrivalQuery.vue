<template>
	<view>
		<springBox></springBox>
		<!-- 搜索历史记录 删除历史记录 -->
			<view>
				<view class="searchHistory">
					<text class="searchHistoryTitle">搜索历史</text>
					<image src="../../static/img/delete.png" mode=""></image>
				</view>
			</view>
			<view class="historyBigBox">
				<view class="historyBox">
					<text class="history">123456789</text>
					<text class="history">123456789</text>
					<text class="history">123456789</text>
				    <text class="history">123456789</text>
				</view>
			    <!-- 历史记录超过6条显示下拉箭头 -->
				<view v-if="detailList.length > 6" v-on:click="changeFoldState" class="downArrowBox">
				         <image src="../../static/img/downArrow.png" mode="aspectFill" class="downArrow"></image>
						 <!-- <span>{{brandFold?'展开':'收起'}}</span> -->
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
 // 搜索历史
	 .searchHistory{
		 width: 100%;
		 height: 70rpx;
		 line-height: 70rpx;
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 margin-top: 15rpx;
		.searchHistoryTitle{
			margin-left: 15px;
			font-size: 30rpx;
			font-weight: 400;
		 }
	 	image{
			width: 40rpx;
			height: 40rpx;
			margin-right: 20px;
		}
	 }
	 .historyBigBox{
		 display: flex;
		 .historyBox{
		 		 width: 80%;
		 		 display: flex;
		 		 flex-wrap:wrap;
		 		 align-items: center;
		 		 .history{
		 		 		 background-color: #F3F4F8;
		 		 		 padding: 15rpx;
		 		 		 border-radius: 30rpx;
		 		 		 font-size: 25rpx;
		 				 margin: 10rpx 20rpx;
		 		 }
		 }
		 .downArrowBox{
			 .downArrow{
			 	width: 40rpx;
			 	height: 30rpx;
				margin-top: 100rpx;
			 }
		 }
		
	 }
</style>
