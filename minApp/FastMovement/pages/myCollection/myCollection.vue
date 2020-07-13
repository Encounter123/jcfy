<template>
	<view>
		<view class="myCilleBg">
			<navigator url="../notice/notice">
				<view class="myCilleImg"><image src="../../static/img/notice.png" mode=""></image></view>
			</navigator>
		</view>
		
		<block v-if="productList.length>0">
			<view class="smallBg" v-for="(item,index) in productList" :key="index">
				<common-cell :item="item" @collection="collection(index)"></common-cell>
			</view>
		</block>
		<block v-else>
			<no-data></no-data>
		</block>
		
		
	</view>
</template>

<script>
import { CollectionList, CollectionEdit, CollectionAdd } from '@/api/api.js';
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
		CommonCell,
		NoData
	},
	methods: {
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
		getData() {
			CollectionList({
				method: 'get',
				data: {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			}).then(res => {
				this.productList = this.productList.concat(res.rows);
			});
		}
	},
	onLoad() {
		this.getData();
	},
	onReachBottom() {
		this.pageNum++
		this.getData();
	},
	onPullDownRefresh() {
		this.pageNum = 1
		this.productList = []
		this.getData();
	}
};
</script>

<style lang="less">
.myCilleBg {
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	box-shadow: 0 0 10rpx #eee;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	image {
		width: 50rpx;
		height: 50rpx;
	}
	.myCilleImg {
		margin-right: 30rpx;
	}
}

</style>
