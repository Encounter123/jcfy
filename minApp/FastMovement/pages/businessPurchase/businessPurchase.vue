<template>
	<view class="box">
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">手机号</text>
			<input type="text" placeholder="请填写手机号码" value="" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">微信号</text>
			<input type="text" value="" placeholder="请填写微信号"  style="color:#ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">收款信息</text>
			<input type="text" value="" placeholder="填写收款信息,方便打款" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">求货介绍</text>
			<input type="text" value="" placeholder="求货介绍" style="color: #ccc;"/>
		</view>
		<view class="preservation" @click="submit">提交</view>
		<view  v-if="ShowHidden">
			<view class="zzc">
			</view>
			<view class="submitBut">
				提交成功
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 ShowHidden: false,
				 timer: '',
			};
		},
		methods:{
			submit(){
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
	.box{
		margin: 30rpx 0;
		.changeLb1{
				width: 100%;
				height: 110rpx;
				font-size: 30rpx;
				text-align: left;
				input{
					width:70%;
					height: 100rpx;
					margin-left: 20rpx;
					font-size: 25rpx;
					margin-top: 10rpx;
				}
			}
			.changeBottomBorder{
				width: 100%;
				border: 0.1rpx solid #eee;
				margin: 30rpx 0;
			}
			.preservation{
			  height: 100rpx;
			  background-color: #000;
			  color: #fff;
			  font-size: 32rpx;
			  text-align: center;
			  line-height: 100rpx;
			  position: absolute;
			  left: 0;
			  bottom: 0;
			  right: 0;
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

</style>
