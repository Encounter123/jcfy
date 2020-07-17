<template>
	<view>
		<view class="search">
			<input type="text" value="" placeholder="请输入货名或货号" @input="inputValue"/>
			<image src="../../static/img/search.png" mode="" @click="search"></image>
		</view>

		
		<block v-if="productList.length>0">
			<view class="smallBg" v-for="(item,index) in productList" :key="index">
				<common-cell :item="item" @collection="collection(index,item.shoseId)"></common-cell>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>
		
		
		
	</view>
</template>

<script>
	import { ShoseSearch, CollectionEdit, CollectionAdd } from '@/api/api.js';
	import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
	import CommonCell from '@/components/commonCell/commonCell.vue'
	import NoData from '@/components/noData/noData.vue'
	
	export default {
		data() {
			return {
				productList: [],
				pageSize: 10,
				pageNum: 1,
				value:''
			};
		},
		components:{
			CommonCell,
			NoData
		},
		methods:{
			toTarget(){
				navigateTo('/pages/demandForGoods/info/info')
			},
			inputValue(e){
				this.value = e?e.detail.value:''
			},
			search(){
				this.pageNum = 1
				this.productList = []
				this.getData()
			},
			getData(){
				showLoading({title: '加载中'})
				ShoseSearch({
					method: 'get',
					data: {
						key: this.value,
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						type: 3
					}
				}).then(res=>{
					hideLoading()
					if(res.code == 200){
						this.productList = this.productList.concat(res.rows);
					}
				})
			},
			collection(e,id){
				
				console.log(e)
				if(this.productList[e].isCollection){
					CollectionEdit({
						header: {
							'content-type':'application/x-www-form-urlencoded'
						},
						data: {
							shoseId: id
						}
					}).then(res=>{
						showToast({title: res.msg, icon: 'none'})
						if(res.code == 200){
							this.productList[e].isCollection = 0
						}
					})
				}else{
					CollectionAdd({
						header: {
							'content-type':'application/x-www-form-urlencoded'
						},
						data: {
							shoseId: id
						}
					}).then(res=>{
						showToast({title: res.msg, icon: 'none'})
						if(res.code == 200){
							this.productList[e].isCollection = 1
						}
					})
				}
			},
		},
		onShow() {
			this.getData();
		},
		onReachBottom() {
			this.pageNum++
			this.getData();
		},
		onPullDownRefresh() {
			this.getData();
		},
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
	width: 90%;
	margin: 30rpx auto;
	.productShoesImg{
		width:160rpx;
		height: 160rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 12rpx;
		}
	}
	.productShoesTitle{
		width: 75%;
		margin-left: 20rpx;
		.productShoesText{
			font-size: 27rpx;
			width: 100%;
			height: 120rpx;
			word-break: break-all;
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
