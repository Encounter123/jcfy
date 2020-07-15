<template>
	<view>
		<view class="withdrawlBg">
			<text class="withdrawlMoneyTitle">我的金额</text>
			<view class="withdrawlBottomBorder"></view>
			<view class="withdrawlMoney">
				<text class="withdrawlMoneyText">￥{{userPrice}}元</text>
				<text class="moneyBtn1" @click="cash">提现</text>
				<text class="moneyBtn2" @click="showPopup">充值</text>
			</view>
		</view>
		
		<uni-popup type="center" ref="popup">
			<view class="popup">
				<view class="popup-item">
					<text>充值金额：</text><input type="digit" v-model="price" @input="inputDelivery"></input>
				</view>
				<view class="popup-submit" @click="save">充值</view>
			</view>
		</uni-popup>
		
		<uni-popup type="center" ref="popupUp">
			<view class="popup">
				<view class="popup-item">
					<text>提现账号：</text><input type="text" v-model="form.account" @input="input('account',$event)"></input>
				</view>
				<view class="popup-item">
					<text>提现金额：</text><input type="number" v-model="form.money" @input="input('money',$event)"></input>
				</view>
				<view class="popup-item">
					<text>真实姓名：</text><input type="text" v-model="form.name" @input="input('name',$event)"></input>
				</view>
				<view class="popup-item">
					<text>联系方式：</text><input type="number" v-model="form.phone" @input="input('phone',$event)"></input>
				</view>
				<view class="popup-submit" @click="beginUp">发起提现</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import { OrderRecharge, OrderWithdrawal, OrderGetUser } from '@/api/api.js';
	import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';
	import { showModal, showToast, hideLoading, showLoading } from '@/common/toast.js';
	import UniPopup from '@/components/uni-popup/uni-popup.vue';
	
	export default {
		data() {
			return {
				price: 1,
				form:{
					account: '',
					money: '',
					name: '',
					phone: ''
				},
				userPrice: 'X'
			};
		},
		components:{
			UniPopup
		},
		methods:{
			showPopup(){
				this.$refs.popup.open()
			},
			cash(){
				this.$refs.popupUp.open()
			},
			input(name,e){
				this.form[name] = e.detail.value
			},
			inputDelivery(e){
				this.price = e.detail.value || 1
			},
			beginUp(){
				showLoading({title: '发起提现'})
				var _this = this
				uni.login({
					provider: 'weixin',
					success: (res1)=> {
						OrderWithdrawal({
							header: {
								'content-type':'application/x-www-form-urlencoded'
							},
							data: {
								code: res1.code,
								..._this.form
							}
						}).then(res=>{
							hideLoading()
							this.$refs.popupUp.close()
							if(res.code == 200){
								showToast({title: '已发起提现请求，请等待客服与你联系',icon: 'none'})
							}else{
								showToast({title: res.msg,icon: 'none'})
							}
						})
					}
				})
			},
			save(){
				showLoading({title: '发起支付'})
				let _this = this
				uni.login({
					provider: 'weixin',
					success: (res1)=> {
						OrderRecharge({
							header: {
								'content-type':'application/x-www-form-urlencoded'
							},
							data:{
								code: res1.code,
								money: this.price
							}
						}).then(res=>{
							let data = _this.analysis(res.rows[0])
							uni.requestPayment({
								provider: 'weixin',
								...data,
								package: 'prepay_id='+data.package,
								success: (e) => {
									hideLoading()
									showToast({title: '支付成功！'})
									this.$refs.popup.close();
								},
								fail: (e) => {
									hideLoading()
									showToast({title: '支付失败！', icon: 'none'})
								}
							})
						})
					}
				})
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
		},
		onShow() {
			OrderGetUser({
				method: 'get'
			}).then(res=>{
				if(res.code == 200){
					this.userPrice = res.rows[0]
				}else{
					this.userPrice = 'X'
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.popup{
		padding: 30rpx;
		background-color: #fff;
		border-radius: 12rpx;
		width: 560rpx;
		&-item{
			display: flex;
			margin: 20rpx 0 40rpx 0;
			input{
				border-radius: 6rpx;
				border: 1rpx solid #eee;
			}
		}
		&-submit{
			height: 70rpx;
			line-height: 70rpx;
			background: #333;
			color: #fff;
			text-align: center;
		}
	}
.withdrawlBg{
	width: 95%;
	height: 220rpx;
	box-shadow: 0 0 10rpx #eee;
	font-size: 30rpx;
	border-radius: 10rpx;
	margin: 30rpx auto;
	.withdrawlMoneyTitle{
		display: inline-block;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
	}
	.withdrawlBottomBorder{
		width: 100%;
		border: 1rpx solid #eee;
		margin: 10rpx 0;
	}
	.withdrawlMoney{
		line-height: 100rpx;
		.withdrawlMoneyText{
			font-size: 40rpx;
			font-weight: 600;
		}
		.moneyBtn1{
				width: 100rpx;
				line-height: 50rpx;
				text-align: center;
				height: 50rpx;
				background-color: #eee;
			    margin-left: 300rpx;
				color: #333;
				display: inline-block;
				border-radius: 10rpx;
				font-size: 25rpx;
			}
			.moneyBtn2{
					width: 100rpx;
					line-height: 50rpx;
					text-align: center;
					height: 50rpx;
					display: inline-block;
					background-color: #000;
					margin: 0 10rpx;
					color: #fff;
					border-radius: 10rpx;
					font-size: 25rpx;
					 margin-left: 30rpx;
				}
	}
	
}
</style>
