<template>
	<view class="smallBg">
		<view><image class="image" mode="aspectFit" :src="item.shoseImg"></image></view>
		<view style="display: flex;flex-direction: column;align-items: center;height: 200rpx;justify-content: space-between;">
			<view class="spacing">
				<text>
					<text class="title">货号：</text>
					{{ item.shoseNo || item.goodNo }}
				</text>
				<text>
					<text class="title">数量：</text>
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
						{{item.expireTime}}
					</text>
					<button v-if="UserIdentity=='Seller'" class="orderReceivingBtn" @click="getOrder(item.orderId)">接单</button>
				</view>
			</block>
			
			<block v-else>
				<view class="spacing">
					<text>
						<text class="title">吊牌价格：</text>
						￥130
					</text>
					<text>
						<text class="title">折扣价格：</text>
						￥100
					</text>
				</view>
				<view class="spacing spacingBetween">
					<image @click="collection()" mode="aspectFill" :src="item.isCollection?'../../static/img/love1.png':'../../static/img/love.png'" class="loveImg"></image>
				  <button v-if="UserIdentity=='Buyer'" class="orderReceivingBtn" @click="purchase()">一键求购</button>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	import { timestampToTime } from '@/common/date-format.js'
	import { OorderAccept } from '@/api/api.js';
	
	
	export default {
		props:{
			item: {
				default: {} 
			},
			type: {
				default: 'nohome'
			}
		},
		filters:{
			TimestampToTime(time){
				return time.substr(0,11)
			},
			TimestampToTimeAfter(time,day){
				return timestampToTime( parseInt(time) + (parseInt(day)*24*60*60))
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
					showToast({title:'接单成功！', icon: 'none'})
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
			purchase(){
			
			}
		}
	}
</script>

<style lang="less" scoped>
	.smallBg {
		width: 90%;
		height: 208rpx;
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
	}
</style>
