<template>
	<view>
		<!-- 地址的Box -->
		<block v-if="addressList.length>0">
			<view class="addressBox" v-for="(item,index) in addressList" :key="index">
				<view class="addressBoxWidth">
					<view @click="chooseAddress(item,index)">
						<view class="addressLbb1">
							<text>{{item.userName}}</text>
							<text>{{item.userPhone}}</text>
						</view>
						<view class="addressLbb2">{{item.province+item.city+item.area+item.detailed}}</view>
					</view>
					<view class="addressLbb3">
						<view class="default">
							<switch :disabled="item.isDefaul" :checked="item.isDefault" class="radio" type="checkbox" @change="selectDefault(item.addressId,index)"></switch>
							<text>设置为默认</text>
						</view>
						<view class="delete">
							<text class="deleteBtn" @tap="deleteBtn(item.addressId,index)">删除</text>
							<text class="editBtn" @tap="edit(item)">编辑</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>

		<!-- 添加新地址的btn -->
		<view class="addBtn" @click="edit()">添加新地址</view>
	</view>
</template>

<script>
import { ShopAddress, ShopAddressDel, AddressList } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js'
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
import NoData from '@/components/noData/noData.vue'

export default {
	data() {
		return {
			addressList:[],
			choose: false,
		};
	},
	components:{
		NoData
	},
	methods: {
		edit(item) {
			navigateTo('/pages/receivingAddress/receivingAddress',{item: JSON.stringify(item)})
		},
		chooseAddress(item,index){
			if(this.choose){
				uni.setStorageSync('address',JSON.stringify(item))
				navigateBack()
			}
		},
		selectDefault(id,index){
			for (var i = 0; i < this.addressList.length; i++) {
				this.addressList[i].isDefault = 0
			}
			ShopAddress({
				method: 'put',
				data: {
					addressId: id,
					isDefault: 1
				}
			}).then(res=>{
				this.addressList[index].isDefault = 1
			})
		},
		deleteBtn(id,i){
			showModal({
				title: '确定删除地址吗？'
			}).then(res=>{
				ShopAddressDel({
					method: 'get',
					data:{
						addressIds: id
					}
				}).then(res=>{
					this.addressList.splice(i,1)
				})
				
			})
		},
		getList(){
			AddressList({
				method: 'get'
			}).then(res=>{
				hideLoading()
				if(res.code == 200){
					this.addressList = res.rows
				}else{
					showToast({title: res.msg, icon: 'none'})
				}
			})
		}
	},
	onShow() {
		showLoading({title:'加载中'})
		this.getList()
	},
	onLoad(options) {
		console.log(options)
		if(options.choose == 'true'){
			this.choose = true
		}
	}
};
</script>

<style lang="less">
.addressBox {
	background-color: #fff;
	margin: 40rpx;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	border: 1rpx solid #eee;
	border-radius: 12rpx;

	.addressBoxWidth {
		width: 95%;
		margin: 0 auto;
		.addressLbb1 {
			display: flex;
			font-size: 35rpx;
			justify-content: space-between;
			margin: 20rpx 0;
		}
		.addressLbb2 {
			font-size: 30rpx;
			margin: 20rpx 0;
		}
		.addressLbb3 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;
			.default {
				font-size: 25rpx;
				.radio {
					transform: scale(0.7);
					vertical-align: middle;
				}
				text {
					vertical-align: middle;
				}
			}
			.delete {
				font-size: 25rpx;
				color: gray;
				.deleteBtn {
					border: 1px solid #ccc;
					display: inline-block;
					padding: 8rpx 25rpx;
				}
				.editBtn {
					border: 1px solid #ccc;
					display: inline-block;
					padding: 8rpx 25rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
}
.addBtn {
	width: 90%;
	background-color: #000;
	color: #fff;
	font-size: 25rpx;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 auto;
}
</style>
