<template>
	<view class="bg">
		<view class="update" @click="chooseImage" v-if="imageSrc" style="background-color: #fff;">
			<image :src="imageSrc" mode="aspectFit" class="detailImg"></image>
		</view>
		<view class="update" @click="chooseImage" v-else>
			<image src="../../static/img/update.png" mode="aspectFit" class="updataImg"></image>
		</view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">货号</text>
			<input type="text" v-model="form.goodNo" placeholder="请输入货号"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">数量</text>
			<input type="number" v-model="form.count" placeholder="请输入数量"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">尺码</text>
			<input type="text" v-model="form.size"  placeholder="请输入尺码"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">价格</text>
			<input type="text" v-model="form.price" placeholder="请输入价格(元)"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">求购方</text>
			<input type="text" v-model="form.askingGoodName" placeholder="请输入求购方姓名"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="changeLb1">
			<text style="margin-left: 20rpx;">过期时间</text>
			<input type="number" v-model="form.expireDay" placeholder="请输入过期时间(天)"/>
		</view>
		<view class="changeBottomBorder"></view>
		<view class="preservation" @click="release" :style="{ bottom: FixedBottomHeight + 'px' }">发布</view>
	</view>
</template>

<script>
	import { OrderPublish } from '@/api/api.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
	import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js'
	import { baseURL } from '../../config.js'
	
	
export default {
	data() {
		return {
			imageSrc: '',
			client:{},
			form: {
				goodNo: '',
				count: '',
				size: '',
				price: '',
				askingGoodName: '',
				expireDay: '',
				img: ''
			}
		};
	},
	methods: {
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
							_this.form.img = _this.client.host + '/' + fileName
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
		release() {
			console.log(this.form);
			showLoading({title: '加载中'})
			OrderPublish({
				data: {
					...this.form
				}
			}).then(res=>{
				hideLoading()
			})
		}
	},
	onLoad() {
		let _this = this
		uni.request({
			url: baseURL + '/app/aliyun/oss/policy',
			method: 'get',
			success: (res) => {
				_this.client = res.data
			}
		})
		
		
		// OssPolicy({
		// 	method: 'get'
		// }).then(res=>{
		// 	this.client = new OSS.Wrapper({
		// 		region: 'oss-cn-beijing',
		// 		accessKeyId: 'X8Tartapp0w0VNj6ZrMej4',
		// 		accessKeySecret: 'VziKartappfO9oXMINPnvzaJNcgcvE0mYWCq',
		// 		bucket: 'artapp-dev-bucket'
		// 	});

		// })
	}
};
</script>

<style lang="less">
uni-page-body,
html,
body {
	height: 100%;
}
.bg {
	background-color: #f0f2f5;
	height: 100%;
	.update {
		width: 300rpx;
		height: 300rpx;
		background-color: #000;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		.updataImg {
			width: 100rpx;
			height: 100rpx;
		}
		.detailImg{
			width: 300rpx;
			height: 300rpx;
		}
	}
	.changeLb1 {
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 30rpx;
		input {
			margin-left: 30rpx;
			width: 70%;
			height: 100rpx;
			vertical-align: middle;
			color: #999;
		}
	}
	.changeBottomBorder {
		width: 100%;
		border: 0.1rpx solid #d3d3d3;
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
