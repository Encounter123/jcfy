<template>
	<view class="bg">
		<view class="update">
			<image src="../../static/img/update.png" mode="aspectFill" class="updataImg"></image>
		</view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">货号</text>
			<input type="text" value="5555099-700" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">数量</text>
			<input type="text" value="500" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;" >尺码</text>
			<input type="text" @focus="inputFunction()"   style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">价格</text>
			<input type="text" value="" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">求购方</text>
			<input type="text" value="涵媛媛" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">过期时间</text>
			<input type="text" value="5天" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="preservation" @click="release">发布</view>
		<view class="selectSize" v-if="show">
			<view class="bottomBorder"></view>
			<view class="triangle">
				<view class="triangle-down"></view>
			</view>
			<view class="size">
				<text @click="sizeBtn">34</text>
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
		</view>
		<view  v-if="ShowHidden">
			<view class="zzc">
			</view>
			<view class="submitBut">
				发布成功
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   show:false,
			   ShowHidden: false,
			   timer: '',
			};
		},
		methods:{
			inputFunction(){
				this.show=true
				setTimeout(function(){
				    uni.hideKeyboard();//隐藏软键盘
				        // plus.key.hideSoftKeybord();
				},250);
			},
			sizeBtn(){
				this.show=false
			},
			release(){
				this.ShowHidden = true
				this.timer = setTimeout(() => {
				   this.ShowHidden = false
				  }, 2000)
			}
		},
		beforeDestroy() {
		     clearTimeout(this.timer);
		   }
	}
</script>

<style lang="less">
	 uni-page-body,html,body{  
	        height: 100%;  
	    }  
	.bg{
		background-color:#F0F2F5;
		height: 100%;
		.update{
			width: 300rpx;
			height: 300rpx;
			background-color: #000;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
				.updataImg{
					width: 100rpx;
					height: 100rpx;
				}
			}
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
			}
			.changeBottomBorder{
				width: 100%;
				border: 0.1rpx solid #D3D3D3;
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
			.selectSize{
				background-color: #fff;
				position: absolute;
				min-height: 48%;
				top: 630rpx;
				z-index: 99;
				padding: 10rpx 0;
				.bottomBorder{
					width: 100%;
					border:0.6px solid #ccc;
				}
				.size{
					width: 97%;
					display: flex;
					flex-wrap:wrap;
					margin: 0 auto;
					text{
						display: inline-block;
						padding:10rpx 30rpx;
						border: 1.3px solid #999;
						margin:20rpx;
						border-radius: 10rpx;
					}
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
			}
			.zzc{
				width: 100%;
				height: 100%;
				background-color:#666;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0.3;
			}
			.submitBut{
				display: flex;
				// align-items: center;
				justify-content: center;
				width: 400rpx;
				background-color: #000;
				color: #fff;
				font-size: 35rpx;
				height: 160rpx;
				line-height: 160rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -80rpx;
				margin-left: -200rpx;
				z-index: 999;
			}
			
	}

	
</style>
