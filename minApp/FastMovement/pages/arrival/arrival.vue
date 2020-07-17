<template>
	<view>
		<view class="arrivalBg" @click="">
			<spring-box :ShowHidden="ShowHidden" @search="search"></spring-box>
			
			<block v-if="pageType!=2">
				<block v-if="productList.length>0">
					<view class="smallBg" v-for="(item,index) in productList" :key="index">
						<common-cell :DownPrice="pageType==4" :item="item" @collection="collection(index,item.shoseId)"></common-cell>
					</view>
				</block>
				<block v-else>
					<no-data></no-data>
				</block>

			</block>
			<block v-else>
				<view class="allStores">所有门店</view>
				<block v-if="productList.length>0">
					<view>
						<view class="storeBox">
							<text class="store" @click="toTarget(item)" v-for="(item,index) in productList" :key="index">{{item}}</text>
						</view>
					</view>
				</block>
				<block v-else>
					<no-data></no-data>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
import { GoodShoseList, ShopBannerList, OrderList, CollectionEdit, CollectionAdd, ShoseSearch } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import SpringBox from '@/components/springBox/springBox.vue';
import CommonCell from '@/components/commonCell/commonCell.vue'
import NoData from '@/components/noData/noData.vue'

export default {
	data() {
		return {
			productList: [],
			ShowHidden: false,
			pageType: 0,
			value:'',

			pageSize: 10,
			pageNum: 1,
		};
	},
	components: {
		SpringBox,
		CommonCell,
		NoData
	},
	methods: {
		toTarget(name){
			navigateTo('/pages/retailStore/retailInfo/retailInfo',{item:name})
		},
		init() {
			this.productList = []
			this.pageNum = 1
			this.ProductList();
		},
		// 获取页面列表数据
		ProductList(number) {
			showLoading({title: '加载中'})
			GoodShoseList({
				method: 'get',
				data: {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					// shoseNo: this.seachInput
				}
			}).then(res => {
				hideLoading()
				this.productList = this.productList.concat(res.rows);
				
			});
		},
		collection(e,id){
			// console.log(e)
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
		search(e){
			this.pageType = e.type
			this.value = e.value
			console.log(e)
			this.productList = []
			this.pageNum = 1
			this.getSearchList()
		},
		getSearchList(){
			showLoading({title: '加载中'})
			ShoseSearch({
				method: 'get',
				data: {
					key: this.value,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.pageType
				}
			}).then(res=>{
				hideLoading()
				if(res.code == 200){
					this.productList = this.productList.concat(res.rows);
				}
			})
		}
	},
	onShow() {
		this.productList = []
		this.ShowHidden = false
		this.pageType = 0
		this.init();
	},
	onLoad() {
		
	},
	//页面上拉触底事件的处理函数
	onReachBottom() {
		this.pageNum++
		if(this.value!=''){
			this.getSearchList()
		}else{
			this.ProductList();
		}
		
	},
	onPullDownRefresh() {
		this.init();
	},
	onPageScroll(e) {
		// console.log(e)
		this.ShowHidden = false
	}
};
</script>

<style lang="less" scoped>


// 所有门店
.allStores {
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	margin: 20rpx 15rpx;
	font-size: 30rpx;
}
.storeBox {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	.store {
		background-color: #f3f4f8;
		padding: 10rpx 25rpx;
		border-radius: 30rpx;
		font-size: 25rpx;
		margin: 15rpx 20rpx;
	}
}
</style>
