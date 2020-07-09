<template>
	<view class="mainBox">
		<view class="mobilePhone">
			<text>手机号</text>
			<input type="text" value="" placeholder="请输入手机号码" />
		</view>
		<view class="verificationCode">
			<text>验证码</text>
			<input type="text" value="" placeholder="请填写验证码" />
		</view>
		<button class="titBtn" @tap="sendCode" :disabled="disabled">{{send}}</button>
		 <text v-show="ismMsg" class="msg">{{msg}}</text> 
		 <view class="loginbutton" @tap="login" :style="{bottom: FixedBottomHeight + 'px'}">
	     	登录
	     </view>
	</view>
</template>

<script>
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
 	
	export default {
		data() {
			return {
				// bottomHeight: 0,
				 disabled:false,
				 ismMsg:false,
				 send:'获取验证码',
				 msg:'',
			};
		},
		computed:{
			// bottomHeight(){
			// 	return this.$store.state.isIphoneX? '20px':0
			// }
		},
		 methods: {
			 init(){
				 
			 },
			 // 发送验证码
				sendCode(){
					let self = this
					//验证码
					self.disabled = true;
					self.ismMsg = true;
					var time = 10;                //时间为10s，可以按情况更改 
					var timer = setInterval(fun, 1000);  //设置定时器 
					function fun() { 
						time--; 
						if(time>=0) { 
							self.msg = time + "秒后重新发送"; 
						}else if(time<0){ 
							self.msg = "";
							self.send = "重新发送"; 
							self.disabled = false;  //倒计时结束能够重新点击发送的按钮 
							clearInterval(timer);  //清除定时器 
							time = 10;  //设置循环重新开始条件 
						} 
					} 
				},
				login(){
					navigateTo('/pages/signIn/registeredIdentity/registeredIdentity')
					// uni.navigateTo({
					// 	url: '../registeredIdentity/registeredIdentity',
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// })
				},
				
			},
			onLoad(){
				this.init()
				// this.bottomHeight = this.$store.state.isIphoneX? '20px':0
			}
	}
</script>

<style lang="less" scoped>
	.mainBox{
		padding: 30rpx;
	}
.mobilePhone{
	width:98%;
	height: 150rpx;
	line-height: 90rpx;
	// border: 1px solid red;
	border-bottom: 1rpx solid #eee;
	margin: 40rpx auto;
	input{
	   font-size: 30rpx;
	}
	text{
	   font-size: 32rpx;
	}
 }
 .verificationCode{
	 width:98%;
	 height: 150rpx;
	 line-height: 90rpx;
	 border-bottom: 1rpx solid #eee;
	 margin: 40rpx auto;
	 input{
		 width: 70%;
		 font-size: 30rpx;
	 }
	 text{
	    font-size: 32rpx;
	 }
 }
 .titBtn{
	border: 1px solid #1AC681; 
	background-color: #fff;
	width: 200rpx;
	height: 64rpx;
	line-height: 64rpx;
	color:#1AC681;
	font-size: 28rpx;
	position:absolute;
	top:280rpx;
	right: 40rpx;
 }
 .msg{
	 width: 100%;
	 font-size: 30rpx;
	 color: #ccc;
	 display: flex;
     justify-content:flex-end;
	 margin-left: -20rpx;
	 margin-top: -20rpx;
 }
 .loginbutton{
	background-color: #000;
	font-size: 30rpx;
	text-align: center;
    width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	position: absolute;
	bottom:0;
	left: 0;
	right: 0;
	color: #fff;
 }
</style>
