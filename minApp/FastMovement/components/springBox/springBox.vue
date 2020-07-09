<template>
	<view>
		<view class="arrivalSearch">
			 <view class="arrivalSmallsearch">
				 <view class="arrivalSearchInput">
					 <input type="text" :placeholder="dateinit">
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
					<li>到货查询</li>
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
	</view>
</template>

<script>
		export default {
			data() {
				return {
					 ShowHidden: false,
					 dateinit:'请输入货号',
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
	 .arrivalNavigation{
	 	width: 250rpx;
	 	position: absolute;
	     right:20rpx;
	 	z-index: 99;
	 	.sideNavigation{
	 		  width: 248rpx;
	 		  background-color: #202020;
	 		  color: #eee;
	 		  border-radius: 10rpx;
	 			  li{
	 				 height: 85rpx;
	 				 text-align: center;
	 				 line-height: 85rpx;
	 				 font-size: 25rpx;
	 			  }
	 			  .liBottomBorder{
	 				border: 0.1rpx solid #373737;
	 			  }
	 			
	 		  }
	 		  .d4{
	 			// position: absolute;
	 		 //  	left: 140rpx;
	 		  	width: 0; 
	 		  	height: 0;
	 			margin-left: 150rpx;
	 			margin-top: -20rpx;
	 		  	border-width:20rpx;
	 		  	border-style: solid;
	 		  	border-color: transparent #333 transparent transparent;
	 		  	transform: rotate(90deg); /*顺时针旋转90°*/
	 			
	 		  }
	 	}
</style>
