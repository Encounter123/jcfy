<template>
	<view>
		<view class="priceReductionNotice">降价通知</view>
		
		<block v-if="productList.length>0">
			<view class="smallBg" v-for="(item,index) in productList" :key="index">
				<common-cell :DownPrice="true" :item="item" @collection="collection(index,item.shoseId)"></common-cell>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>
		
	</view>
</template>

<script>
	import { CollectionNotes } from '@/api/api.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
	import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
	import NoData from '@/components/noData/noData.vue';
	import CommonCell from '@/components/commonCell/commonCell.vue'
	
	
	export default {
		data() {
			return {
				pageSize:10,
				pageNum:1,
				productList:[],
				
			};
		},
		components:{
			NoData,
			CommonCell
		},
		methods:{
			getData(){
				CollectionNotes({
					method: 'get',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then(res=>{
					if(res.code == 200){
						this.productList = this.productList.concat(res.rows)
					}
				})
			}
		},
		onLoad() {
			this.getData()
		},
		//页面上拉触底事件的处理函数
		onReachBottom() {
			this.pageNum++
			this.getData();
		},
		onPullDownRefresh() {
			this.pageNum = 1
			this.productList = []
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	.priceReductionNotice{
		font-size: 30rpx;
		color: #333;
		margin-left: 30rpx;
	}
	
</style>
