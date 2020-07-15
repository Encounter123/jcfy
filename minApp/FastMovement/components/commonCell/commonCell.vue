<template>
	<view class="smallBg">
		<view><image class="image" mode="aspectFit" :src="item.img || item.shoseImg"></image></view>
		<view style="display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
			<block v-if="type!='home'">
				<!-- <view class="spacing">{{item.shoseName}}</view> -->
			</block>
			<view class="spacing">
				<text>
					<text class="title">货号：</text>
					{{ item.shoseNo || item.goodNo }}
				</text>
				<text>
					<text class="title">{{item.count?'数量':'库存'}}：</text>
					{{ item.shoseStock || item.count }}
				</text>
			</view>
			
			
			<block v-if="type=='home'">
				<view class="spacing">
					<text>
						<text class="title">尺码：</text>
						{{ item.shoseSize || item.size }}
					</text>
					<text>
						<text class="title">价格：</text>
						{{ item.shosePrice || item.price }}
					</text>
				</view>
				<view class="spacing">
					<text>
						<text class="title">求货方：</text>
						{{item.askingGoodName || ''}}
					</text>
					<text>
						<text class="title">时间：</text>
						{{ item.createTime | TimestampToTime }}
					</text>
				</view>
				<view class="spacing spacingBetween">
					<text>
						<text class="title">过期时间:</text>
						{{item.endDate}}
					</text>
					<button v-if="UserIdentity=='Seller'" class="orderReceivingBtn" @click="getOrder(item.orderId)">接单</button>
				</view>
			</block>
			
			
			<block v-if="type!='home'">
				<view class="spacing">
					<text>
						<text class="title">折扣价格：</text>
						￥{{item.shosePrice || 0}}
					</text>
					<text>
						<text class="title">品牌价格：</text>
						￥{{item.issuePrice || 0}}
					</text>
				</view>
				<view v-if="DownPrice" class="spacing" :style="{color: item.shoseChange>0?'green':'red'}">比前一天{{item.shoseChange>0?'增':'降'}}{{item.shoseChange | MathAbs}}</view>
				<view class="spacing spacingBetween">
					<image @click="collection()" mode="aspectFill" :src="item.isCollection?'../../static/img/love1.png':'../../static/img/love.png'" class="loveImg"></image>
				  <button v-if="UserIdentity=='Buyer'" class="orderReceivingBtn" @click="purchase(item)">一键求购</button>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	import { timestampToTime } from '@/common/date-format.js'
	import { OorderAccept, OrderPublish } from '@/api/api.js';
	import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js'
	
	export default {
		props:{
			item: {
				default: {} 
			},
			type: {
				default: 'nohome'
			},
			DownPrice:{
				default: false
			}
		},
		filters:{
			TimestampToTime(time){
				if(time){
					return time.substr(0,11)
				}else{
					return  0
				}
			},
			TimestampToTimeAfter(time,day){
				return timestampToTime( parseInt(time) + (parseInt(day)*24*60*60))
			},
			MathAbs(number){
				if(number){
					console.log(number)
					return Math.abs(parseInt(number))
				}else{
					return  0
				}
			}
		},
		methods:{
			//接单
			getOrder(id){
				OorderAccept({
					header: {
						'content-type':'application/x-www-form-urlencoded'
					},
					data: {
						orderId: id
					}
				}).then(res=>{
					if(res.code == 200){
						showToast({title:'接单成功！', icon: 'none'})
						setTimeout(()=>{
							this.$emit('acceptSuccess')
						},1500)
					}else{
						showToast({title: res.msg, icon: 'none'})
					}
				})
				
			},
			//收藏
			collection(){
				console.log(this.item)
				console.log(this.item.status)
				this.item.status = false
				this.$emit('collection')
			},
			//一键求购
			purchase(item){
				console.log(item);
				showLoading({title: '加载中'})
				navigateTo('/pages/release/release',{item: JSON.stringify(item)})
				
				
				// OrderPublish({
				// 	data: {
				// 		...this.form
				// 	}
				// }).then(res=>{
				// 	hideLoading()
				// 	showToast({title: res.msg, icon: 'none'})
				// 	if (res.code == 200) {
				// 		setTimeout(()=>{
				// 			navigateBack()
				// 		},2000)
				// 	}
				// })
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.smallBg {
		width: 90%;
		// height: 208rpx;
		background-color: #fff;
		margin: 30rpx auto;
		border-radius: 20rpx;
		padding: 15rpx;
		display: flex;
		font-size: 25rpx;
		color: #999;
		box-shadow: 0 0 10rpx #eee;
		.image {
			width: 160rpx;
			height: 160rpx;
			margin: 20rpx;
		}
		.title {
			color: #555;
			font-size: 26rpx;
		}
		.spacing {
			line-height: 50rpx;
			display: flex;
			width: 460rpx;
			text{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				flex: 0 0 50%;
			}
			.loveImg{
				width: 40rpx;
				height: 40rpx;
				margin-top: -1rpx;
			}
			.orderReceivingBtn {
				padding: 0 20rpx;
				height: 50rpx;
				color: #fff;
				font-size: 20rpx;
				background-color: #000;
				line-height: 50rpx;
				margin: 0;
			}
		}
		.spacingBetween {
			justify-content: space-between;
			text{
				flex: 0 0 80%;
			}
		}
		.spacingLong{
			width: 100%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
</style>
