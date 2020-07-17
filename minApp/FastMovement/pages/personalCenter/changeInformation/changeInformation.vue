<template>
	<view class="changeBg"> 
		<view class="changeLb1 hearderImg" @click="chooseImage">
			<text style="margin-left: 20rpx;">头像</text>
			<!-- <input type="text" value="" /> -->
			<image :src="imageSrc" mode="aspectFill" class="hearderImg"></image>
		</view>
		<view class="changeBottomBorder"></view>
		
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">昵称</text>
			<input @input="inputValue('name',$event)" type="text" :value="userInformation.name" style="color: #ccc;"/>
		</view>
		
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">支付宝账号</text>
			<input @input="inputValue('zfbAccount',$event)" type="text" :value="userInformation.zfbAccount" style="color: #ccc;"/>
		</view>
		<view class="changeBottomBorder"></view>
		
		
		<view class="preservation" @click="release" :style="{ bottom: FixedBottomHeight + 'px' }">保存</view>
		
	</view>
</template>

<script>
	
	import { Update } from '@/api/api.js';
	import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
	import { baseURL } from '../../../config.js'
	
	export default {
		data() {
			return {
				imageSrc: '',
				client:{},
				userInformation: {}
			};
		},
		methods:{
			inputValue(name,e){
				this.userInformation[name] = e.detail.value
			},
			chooseImage(){
				let _this = this
				uni.chooseImage({
					count: 1,
					success:(res)=>{
						console.log(res.tempFilePaths[0])
						let imageSrc = res.tempFilePaths[0]
						let fileName = _this.client.dir + new Date().getTime()
						showLoading({title: '加载中'})
						uni.uploadFile({
							url: _this.client.host,
							filePath: imageSrc,
							name:'file',
							formData:{
								name: imageSrc,
								key: fileName,
								policy: _this.client.policy,
								OSSAccessKeyId: _this.client.accessKeyId,
								success_action_status: '200',
								signature: _this.client.signature
							},
							success: (res)=>{
								_this.userInformation.head = _this.client.host + '/' + fileName
								_this.imageSrc = imageSrc
								hideLoading()
							},
							fail: (errMsg)=>{
								hideLoading()
								showToast({title: '上传失败', icon: 'none'})
							}
						})
					}
				})
			},
			release(){
				console.log(this.userInformation)
				Update({
					data:{
						...this.userInformation
					}
				}).then(res=>{
					showToast({title: res.msg, icon: 'none'})
					if(res.code == 200){
						uni.setStorageSync('userInformation', JSON.stringify(res.rows[0]))
						setTimeout(()=>{
							navigateBack()
						},1500)
					}
				})
			}
		},
		onLoad() {
			this.userInformation = JSON.parse(uni.getStorageSync('userInformation')) || {};
			this.imageSrc = this.userInformation.head || ''
			console.log(this.userInformation)
			let _this = this
			uni.request({
				url: baseURL + '/app/aliyun/oss/policy',
				method: 'get',
				success: (res) => {
					_this.client = res.data
				}
			})
		}
	}
</script>

<style lang="less">
.changeBg{
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
		image{
			margin-right: 16rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			vertical-align: middle;
		}
	}
	.hearderImg{
		justify-content: space-between;
	}
	.changeBottomBorder{
		width: 100%;
		border: 0.1rpx solid #eee;
	}
	.preservation {
		height: 100rpx;
		background-color: #000;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		line-height: 100rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
