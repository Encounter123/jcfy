<template>
	<view>
		<!-- 搜索门店名称 -->
 		<view class="arrivalSearch">
			 <view class="arrivalSmallsearch">
				 <view class="arrivalSearchInput">
					 <input type="text" placeholder="请输入门店名称">
				  </view>
				 <image src="../../static/img/nav.png" mode="aspectFill" @click.stop="ShowHidden = !ShowHidden"></image>
			 </view>
		</view>
		<view class="arrivalNavigation" v-if="ShowHidden">
		 <view class="d4"></view>
		 <view class="sideNavigation">
		 <nav>
			 <ul>
				 <navigator url="../arrivalQuery/arrivalQuery">
					<li @tap="jumpToDetails">到货查询</li>
				 </navigator>
				 <view class="liBottomBorder"></view>
				<navigator url="../retailStore/retailStore"><li>门店查询</li></navigator>
				  <view class="liBottomBorder"></view>
				  <navigator url="../itemNoQuery/itemNoQuery"><li>货号查询</li></navigator>
				  <view class="liBottomBorder"></view>
				  <navigator url="../priceReductionQuery/priceReductionQuery"><li>降价查询</li></navigator>
			 </ul>
		 </nav>
		 </view>
		</view>
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
		<!-- 所有门店 -->
		<view class="allStores">
			所有门店
		</view>
		<view>
			
			<view class="storeBox">
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<navigator url="retailInfo/retailInfo">
				   <text class="store">北京朝阳</text>
				</navigator>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
				<text class="store">北京朝阳</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ShowHidden: false,
				
			
			};
		},
		methods: {
		   // 点击页面事件 隐藏需要隐藏的区域
		   HiddenClick () {
		     this.ShowHidden = false
		   },
		 },
		mounted () {
		    // document.addEventListener('click', this.HiddenClick)
		  },
	}
</script>

<style lang="less">
 .arrivalSearch{
		 width: 100%;
		 height: 100rpx;
		 background-color: #fff;
		 box-shadow: 0 0 10rpx #eee;
		.arrivalSmallsearch{
			width: 96%;
			display: flex;
			.arrivalSearchInput{
						 height: 70rpx;
						 background-color: #F0F1F6;
						 border-radius: 40rpx;
						 font-size: 25rpx;
						 margin-left: 10rpx;
						 margin-top: 10rpx;
						 width: 608rpx;
			}
			input{
				width: 80%;
			    margin-left: 40rpx;
				margin-top: 10rpx;
			}
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
				margin-top: 20rpx;
			}
		}
	 }
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
	 // 所有门店
	 .allStores{
		 width: 100%;
		 height: 70rpx;
		 line-height: 70rpx;
		 margin: 20rpx 15rpx;
		 font-size: 30rpx;
	  }
    .storeBox{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
		align-items: center;
		.store{
			background-color: #F3F4F8;
		 	padding: 10rpx 25rpx;
		 	border-radius: 30rpx;
		 	font-size: 25rpx;
		 	margin: 15rpx 20rpx;
		}
	}
	 
</style>