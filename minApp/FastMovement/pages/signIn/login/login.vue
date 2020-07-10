<template>
	<view class="mainBox">
		<view class="mobilePhone">
			<text>手机号</text>
			<input type="number" v-model="mobilePhone" placeholder="请输入手机号码" />
		</view>
		<view class="verificationCode">
			<text>验证码</text>
			<input type="text" v-model="verCode" placeholder="请填写验证码" />
		</view>
		<button class="titBtn" @tap="sendCode" :disabled="disabled">{{ send }}</button>
		<text v-show="ismMsg" class="msg">{{ msg }}</text>
		<view class="loginbutton" @tap="login" :style="{ bottom: FixedBottomHeight + 'px' }">登录</view>
	</view>
</template>

<script>
import { BizMsg, LoginPhone } from '@/api/api.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';

export default {
	data() {
		return {
			disabled: false,
			ismMsg: false,
			send: '获取验证码',
			msg: '',
			verCode: '',
			mobilePhone:'',
		};
	},
	methods: {
		// 发送验证码
		sendCode() {
			if(this.mobilePhone.match(/^[1][3,4,5,7,8][0-9]{9}$/)){
				let self = this;
				//验证码
				self.disabled = true;
				self.ismMsg = true;
				var time = 10; //时间为10s，可以按情况更改
				var timer = setInterval(fun, 1000); //设置定时器
				function fun() {
					time--;
					if (time >= 0) {
						self.msg = time + '秒后重新发送';
					} else if (time < 0) {
						self.msg = '';
						self.send = '重新发送';
						self.disabled = false; //倒计时结束能够重新点击发送的按钮
						clearInterval(timer); //清除定时器
					}
				}
				BizMsg({
					data:{
						bizType: 1,
						msgType: 1,
						phone: this.mobilePhone
					}
				}).then(res=>{
					showToast({title: '短信验证码发送成功', icon: 'none'})
				})
			}else{
				showToast({title: '请输入正确的手机号', icon:'none'})
			}
			
		},
		login() {
			if(this.verCode.match(/^[0-9]{6}$/)){
				LoginPhone({
					header: {
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						authCode: this.verCode,
						type: 1,
						phone: this.mobilePhone
					}
				}).then(res=>{
					if(res.code == 200){
						uni.setStorageSync('sessionToken', res.rows[0].token)
						navigateTo('/pages/signIn/registeredIdentity/registeredIdentity');
					}else{
						showToast({title: res.msg, icon: 'none'})
					}
				})
			}else{
				showToast({title: '验证码输入不正确', icon: 'none'})
			}
		}
	},
	onLoad() { }
};
</script>

<style lang="less" scoped>
.mainBox {
	padding: 30rpx;
}
.mobilePhone {
	width: 98%;
	height: 150rpx;
	line-height: 90rpx;
	// border: 1px solid red;
	border-bottom: 1rpx solid #eee;
	margin: 40rpx auto;
	input {
		font-size: 30rpx;
	}
	text {
		font-size: 32rpx;
	}
}
.verificationCode {
	width: 98%;
	height: 150rpx;
	line-height: 90rpx;
	border-bottom: 1rpx solid #eee;
	margin: 40rpx auto;
	input {
		width: 70%;
		font-size: 30rpx;
	}
	text {
		font-size: 32rpx;
	}
}
.titBtn {
	border: 1px solid #1ac681;
	background-color: #fff;
	width: 200rpx;
	height: 64rpx;
	line-height: 64rpx;
	color: #1ac681;
	font-size: 28rpx;
	position: absolute;
	top: 280rpx;
	right: 40rpx;
}
.msg {
	width: 100%;
	font-size: 30rpx;
	color: #ccc;
	display: flex;
	justify-content: flex-end;
	margin-left: -20rpx;
	margin-top: -20rpx;
}
.loginbutton {
	background-color: #000;
	font-size: 30rpx;
	text-align: center;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	color: #fff;
}
</style>
