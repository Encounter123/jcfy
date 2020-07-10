<template>
	<view>
		<view class="receivingBg">
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">收货人</text>
				<input type="text" v-model="form.userName" placeholder="请输入收货人"/>
			</view>
			<view class="changeBottomBorder"></view>

			<view class="changeLb1">
				<text style="margin-left: 20rpx;">联系电话</text>
				<input type="number" v-model="form.userPhone" placeholder="请输入联系电话"/>
			</view>
			<view class="changeBottomBorder"></view>
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">所在地区</text>
				<picker mode="region" @change="changeAddres" value="" style="width: 72%;height: 100rpx;line-height: 100rpx;margin-left: 20rpx;">
					{{form.province + form.city + form.area}}
				</picker>
			</view>
			<view class="changeBottomBorder"></view>
			<view class="changeLb1">
				<text style="margin-left: 20rpx;">详细地址</text>
				<input type="text" v-model="form.detailed" placeholder="请输入详细地址"/>
			</view>
			<view class="changeBottomBorder"></view>
		</view>
		<view class="default">
			<text class="defaultText">设为默认地址</text>
			<switch @change="checkDefalut" class="radio" style="transform: scale(0.7);" :checked="form.isDefault"></switch>
			
			
		</view>

		<view @click="submit()" class="preservation" :style="{ bottom: FixedBottomHeight + 'px' }">保存并使用</view>
	</view>
</template>

<script>
import { ShopAddress } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js'
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'

export default {
	data() {
		return {
			form: {
				userName: '',
				userPhone: '',
				isDefault: 0,
				area:'东城区',
				province:'北京市',
				city:'北京市',
				detailed:''
			}
		};
	},
	methods:{
		changeAddres(e){
			this.form.province = e.detail.value[0]
			this.form.city = e.detail.value[1]
			this.form.area = e.detail.value[2]
		},
		checkDefalut(e){
			this.form.isDefault = e.detail.value?1:0
		},
		submit(){
			console.log(this.form)
			if(this.form.addressId){
				ShopAddress({
					method: 'put',
					data: {
						...this.form
					}
				}).then(res=>{
					if(res.code == 200){
						showToast({title: '操作成功！', icon: 'none'})
						setTimeout(()=>{
							navigateBack()
						},2000)
					}else{
						showToast({title: res.msg, icon: 'none'})
					}
				})
			}else{
				ShopAddress({
					data: {
						...this.form
					}
				}).then(res=>{
					if(res.code == 200){
						showToast({title: '操作成功！', icon: 'none'})
						setTimeout(()=>{
							navigateBack()
						},2000)
					}else{
						showToast({title: res.msg, icon: 'none'})
					}
				})
			}
		}
	},
	onLoad(options) {
		if(options.item&&JSON.parse(options.item).addressId){
			let form = JSON.parse(options.item)
			this.form = form
			this.form.isDefault = form.isDefault==1?true:false
		}
		console.log(this.form)
		
	}
};
</script>

<style lang="less">
.receivingBg {
	box-shadow: 0 0 10rpx #eee;
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
		}
		image {
			margin-left: 10rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			vertical-align: middle;
		}
	}
	.changeBottomBorder {
		width: 100%;
		border: 1rpx solid #eee;
	}
}
.default {
	margin: 40rpx 0;
	height: 100rpx;
	box-shadow: 0 0 10rpx #eee;
	.defaultText {
		line-height: 100rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
	}
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
</style>
