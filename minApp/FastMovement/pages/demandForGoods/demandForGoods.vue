<template>
	<view>
		<view class="search">
			<input type="text" value="" placeholder="请输入货名或货号" />
			<image src="../../static/img/search.png" mode=""></image>
		</view>
		<navigator url="./info/info">
			<view class="productShoes">
				<view class="productShoesImg">
					<image src="http://seopic.699pic.com/photo/50070/6451.jpg_wh1200.jpg" mode="aspectFill"></image>
				</view>
				<view class="productShoesTitle">
					<view class="productShoesText">
						VANS SKB_HIMTE 高帮鞋 VN0A33TXQWT
					</view>
					<view class="productShoesMsg">
						5555099-700
					</view>
				</view>
			</view>
		</navigator>
		<view class="bottomBorder"></view>
		
		<view class="productShoes">
			<view class="productShoesImg">
				<image src="http://seopic.699pic.com/photo/50070/6451.jpg_wh1200.jpg" mode="aspectFill"></image>
			</view>
			<view class="productShoesTitle">
				<view class="productShoesText">
					VANS SKB_HIMTE 高帮鞋 VN0A33TXQWT
				</view>
				<view class="productShoesMsg">
					5555099-700
				</view>
			</view>
		</view>
		<view class="bottomBorder"></view>
		
		<view class="productShoes">
			<view class="productShoesImg">
				<image src="http://seopic.699pic.com/photo/50070/6451.jpg_wh1200.jpg" mode="aspectFill"></image>
			</view>
			<view class="productShoesTitle">
				<view class="productShoesText">
					VANS SKB_HIMTE 高帮鞋 VN0A33TXQWT
				</view>
				<view class="productShoesMsg">
					5555099-700
				</view>
			</view>
		</view>
		<view class="bottomBorder"></view>
		
		
		<view class="productShoes">
			<view class="productShoesImg">
				<image src="http://seopic.699pic.com/photo/50070/6451.jpg_wh1200.jpg" mode="aspectFill"></image>
			</view>
			<view class="productShoesTitle">
				<view class="productShoesText">
					VANS SKB_HIMTE 高帮鞋 VN0A33TXQWT
				</view>
				<view class="productShoesMsg">
					5555099-700
				</view>
			</view>
		</view>
		<view class="bottomBorder"></view>
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
.search{
   border: 2px solid red;
   width: 90%;
   height: 70rpx;
   line-height: 70rpx;
   border: 1px solid #333;
   display: flex;
   background-color: #fff;
   border-radius: 50rpx;
   justify-content: space-between;
   margin: 20rpx auto;
   input{
	   width: 80%;
	   margin-left: 25rpx;
	   margin-top: 10rpx;
   }
   image{
	   width: 60rpx;
	   height: 60rpx;
	   margin-right: 20rpx;
   }
}
.productShoes{
	display: flex;
	width: 95%;
	margin: 30rpx auto;
	.productShoesImg{
		width:160rpx;
		height: 160rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.productShoesTitle{
		width: 75%;
		margin-left: 20rpx;
		.productShoesText{
			font-size: 27rpx;
			width: 100%;
			height: 120rpx;
		}
		.productShoesMsg{
		  font-size: 25rpx;
		  color: #666;
		}
	}
	}
	.bottomBorder{
		width: 100%;
		border: 0.6px solid #eee;
		margin: 40rpx 0;
	}
</style>
