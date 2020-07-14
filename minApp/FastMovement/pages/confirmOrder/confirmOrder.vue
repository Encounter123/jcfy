<template>
	<view>
		<view class="receivingAddress" @click="toAddress">
			<view><image src="../../static/img/adress1.png" mode=""></image></view>
			<view class="addressMsg">
				<view>
					<text style="font-size: 30rpx">{{address.userName}}</text>
					<text style="margin-left: 30rpx;">{{address.userPhone}}</text>
				</view>
				<view><text>{{address.province+address.city+address.area+address.detailed}}</text></view>
			</view>
			<view class="nextPage"><image style="width: 30rpx;height: 30rpx;" src="../../static/img/arrow.png" mode=""></image></view>
		</view>

		<view class="receivingAddress1">
			<view class="userName">{{information.askingGoodName}}</view>
			<view class="receivingAddressBox">
				<view style="flex: 0 0 180rpx;"><image style="border-radius: 12rpx;" :src="information.img" mode="aspectFill"></image></view>
				<view style="position: relative;width: 100%;">
					<view class="shoesTitle">{{information.askingGoodName}}</view>
					<text class="shoesPrice">{{information.price}}元</text>
					<view class="shoesSize">尺码：{{information.size}}</view>
					<view class="shoesDeliverGoods">发货时间：付款后发货</view>
				</view>
			</view>
			<view>
				<text class="productTitle">商品货号</text>
				<text style="color: #999;margin-left: 70rpx;">{{information.goodNo}}</text>
			</view>
			<view class="">
				<text class="productTitle">购买数量</text>
				<text style="color: #999;margin-left: 70rpx;">{{information.count}}</text>
			</view>
			<view class="total">
				<!-- <text style="color: #999;letter-spacing: 5rpx;">共1件</text> -->
				<text style="font-size: 30rpx;margin-left: 15rpx;">合计：</text>
				<text style="font-size: 28rpx;color: red;">{{information.price}}元</text>
			</view>
		</view>
		<view class="loginbutton" @click="submitOrder" :style="{ bottom: FixedBottomHeight + 'px' }">确认订单</view>

		<uni-popup type="bottom" ref="popup">
			<view class="popup">
				<radio-group @change="changePayType">
					<view class="popup-item">
						<text>微信支付</text>
						<radio checked value="wxpay"></radio>
					</view>
					<view class="popup-item">
						<text>余额支付</text>
						<radio value="pay"></radio>
					</view>
				</radio-group>
				<view class="loginbutton" @tap="startPay" :style="{ bottom: FixedBottomHeight + 'px' }">立即支付</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { AddressList, OrderPay, Order } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
import UniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	data() {
		return {
			payWay: 'wxpay',
			address: {},
			information:{}
		};
	},
	components: {
		UniPopup
	},
	methods: {
		toAddress() {
			navigateTo('/pages/existingAddress/existingAddress', { choose: true });
		},
		submitOrder() {
			this.$refs.popup.open();
		},
		startPay(id) {
			if(this.payWay=='wxpay'){
				let _this = this
				uni.login({
					provider: 'weixin',
					success: (res)=> {
						OrderPay({
							header: {
								'content-type':'application/x-www-form-urlencoded'
							},
							data:{
								addressId: this.address.addressId,
								code: res.code,
								order: _this.information.orderId
							}
						}).then(res=>{
							let data = _this.analysis(res.rows[0])
							uni.requestPayment({
								provider: 'weixin',
								...data,
								package: 'prepay_id='+data.package,
								success: (e) => {
									showToast({title: '支付成功！'})
									this.$refs.popup.close();
									setTimeout(()=>{
										navigateBack()
									},1500)
								},
								fail: (e) => {
									showToast({title: '支付失败！', icon: 'none'})
								}
								
							})
							
							console.log(_this.analysis(res.rows[0]))
						})
					}
				})
			}else{
				showToast({title: '余额不足', icon: 'none'})
			}
			
		},
		analysis(data){
			let splitData = data.replace(/{/,'').replace(/}/,'').split(',')
			let mapData = splitData.map((val)=>{
				let splitValue = val.split('=')
				if(splitValue[0].replace(/\s+/g,'')=='package'){
					return { [splitValue[0].replace(/\s+/g,'')]: splitValue[2] }
				}else{
					return { [splitValue[0].replace(/\s+/g,'')]: splitValue[1] }
				}
			})
			let json = {}
			for (var i = 0; i < mapData.length; i++) {
				json = { ...json, ...mapData[i]}
			}
			return json
		},
		changePayType(e) {
			this.payWay = e.detail.value;
			console.log(e);
		},
		getDefaultAddress(){
			AddressList({
				method: 'get'
			}).then(res=>{
				hideLoading()
				if(res.code == 200){
					this.address = res.rows.filter(val=>{
						return val.isDefault == 1
					})[0]
				}else{
					showToast({title: res.msg, icon: 'none'})
				}
			})
		}
	},
	onShow() {
		let address = uni.getStorageSync('address') || ''
		if(address){
			this.address = JSON.parse(address)
			uni.setStorageSync('address','')
		}else{
			this.getDefaultAddress()
		}
	},
	onLoad(options) {
		console.log(JSON.parse(options.item))
		this.information = JSON.parse(options.item)
		// Order({
		// 	method: 'get',
		// 	data:{
		// 		orderId: this.information.orderId
		// 	}
		// })
	}
};
</script>

<style lang="less">
.popup {
	position: relative;
	height: 310rpx;
	background-color: #fff;
	padding: 30rpx;
	border-radius: 12rpx 12rpx 0;
	&-item {
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		align-items: center;
	}
}
.receivingAddress {
	width: 90%;
	padding: 20rpx;
	box-shadow: 0 0 10rpx #eee;
	margin: 10rpx auto;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	position: relative;
	.addressMsg {
		margin-left: 40rpx;
		font-size: 27rpx;
		line-height: 50rpx;
		flex: 0 0 520rpx;
	}
	image {
		width: 50rpx;
		height: 50rpx;
	}
	.nextPage {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}
.receivingAddress1 {
	width: 90%;
	padding: 20rpx;
	box-shadow: 0 0 10rpx #eee;
	margin: 30rpx auto;
	border-radius: 20rpx;
	font-size: 25rpx;
	.receivingAddressBox {
		display: flex;
	}
	.userName {
		margin: 10rpx;
		font-size: 30rpx;
		color: #999;
	}
	image {
		width: 160rpx;
		height: 160rpx;
		margin: 0 20rpx 0 0;
	}
	.shoesTitle {
		line-height: 50rpx;
		height: 50rpx;
		width: 350rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 30rpx;
	}
	.shoesPrice {
		position: absolute;
		right: 0;
		top: 0;
	}
	.shoesSize {
		// width: 150rpx;
		// background-color: #eee;
		// border-radius: 15rpx;
		// text-align: center;
		font-size: 20rpx;
		color: #666;
		margin: 15rpx 0;
	}
	.shoesDeliverGoods {
		color: #ec971e;
		font-size: 25rpx;
		display: inline-block;
		margin: 15rpx 0;
	}
	.productTitle {
		font-size: 28rpx;
		color: #333;
		line-height: 50rpx;
	}
	.total {
		display: flex;
		justify-content: flex-end;
	}
}
.loginbutton {
	background-color: #000;
	font-size: 30rpx;
	text-align: center;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	color: #fff;
}
</style>
