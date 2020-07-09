<template>
	<view>
        <view class="productShoes">
        	<image src="http://seopic.699pic.com/photo/50070/6451.jpg_wh1200.jpg" mode="aspectFill"></image>
        </view>
		<view class="productShoesText">
			VANS SKB_HIMTE 高帮鞋 VN0A33TXQWT
		</view>
		<view class="productShoesMsg">
			5555099-700
		</view>
		<view class="bottomBorder"></view>
		<view class="triangle">
			<view class="triangle-down"></view>
		</view>
		<view class="size">
			<text>34</text>
			<text>35</text>
			<text>36</text>
			<text>37</text>
			<text>38</text>
			<text>39</text>
			<text>40</text>
			<text>41</text>
			<text>42</text>
			<text>43</text>
			<text>44</text>
		</view>
		<view class="submit" @click="submitFrom">
		   提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			submitFrom(){
				 uni.navigateTo({
					url: '../../businessPurchase/businessPurchase',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	.productShoes{
		width: 688rpx;
		height: 632rpx;
		margin: 20rpx auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.productShoesText{
		width: 90%;
		height: 90rpx;
		line-height: 90rpx;
		margin: 20rpx auto;
		font-size: 32rpx;
	}
	.productShoesMsg{
		width: 90%;
		height: 90rpx;
		line-height: 90rpx;
		margin: 10rpx auto;
		font-size: 28rpx;
		color: #999;
	}
	.size{
		width: 97%;
		display: flex;
		flex-wrap:wrap;
		margin: 15rpx auto;
		text{
			display: inline-block;
			padding:10rpx 30rpx;
			border: 1.3px solid #999;
			margin:20rpx;
			border-radius: 10rpx;
		}
	}

	.bottomBorder{
		width: 100%;
		border:0.6px solid #ccc;
	}
	.triangle{
		width:0;
		height:0;
		display: flex;
		margin:0 auto;
		border-left: 31rpx solid transparent;
		border-right: 31rpx solid transparent;
		border-top: 41rpx solid #ccc;
		position: relative;
		.triangle-down {
		    width: 0;
		    height: 0;
		    border-left: 30.8rpx solid transparent;
		    border-right: 30.8rpx solid transparent;
		    border-top: 40.8rpx solid #fff;
			position: absolute;
			top: -42rpx;
			left: -30rpx;
			z-index: 999;
		}
	}
	.submit{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		color: #fff;
		background-color: #000;
		text-align: center;
		margin-top: 108rpx;
		border-radius: 10rpx 10rpx 0 0;
	}
	
</style>
