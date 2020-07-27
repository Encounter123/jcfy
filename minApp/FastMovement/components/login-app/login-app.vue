<style lang="less" scoped>
	.downAppPopupBox{
		position: relative;
		z-index: 5;
		.popup{
			width: 538rpx;
			height: 688rpx;
			background: #fff;
			padding: 30rpx;
			border-radius: 10rpx;
			text-align: center;
			&-imgBox{
				height: 420rpx;
				border-bottom: 1rpx dashed #979797;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				&-logo{
					height: 172rpx;
					width: 172rpx;
					border-radius: 50%;
				}
				&-title{
					font-size: 48rpx;
					color: #1A1A1A;
					font-weight: 600;
				}
				&-icon{
					height: 54rpx;
					width: 318rpx;
				}
			}
			&-note{
				color: #666666;
				font-size: 26rpx;
				text-align: center;
				margin: 40rpx auto 24rpx auto;
			}
			&-defaultBtn{
				background:#30313A;
				height:88rpx;
				width:362rpx;
				border-radius:100rpx;
				color:#34E5FF;
				font-size:32rpx;
				line-height:88rpx;
				text-align:center;
				border:none;
				outline:0;
				padding:0;
				font-weight: bold;
			}
			&-defaultBtn:after{
				outline:0;
				border:none;
			}
		}
	}
</style>

<template>
	<view>
		<uni-popup class="downAppPopupBox" ref="popup" type="center">
			<view class="popup">
				<view class="popup-imgBox">
					<image class="popup-imgBox-logo" src="../../static/img/logo1.png" mode=""></image>
					<view class="popup-imgBox-title">火速搬砖</view>
				</view>
				<view class="popup-note">为继续使用，请您授权登录</view>
				<button @click="toLogin" class="popup-defaultBtn" hover-class="none">去登录</button>
			</view>
		</uni-popup>	
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { showToast } from "@/common/toast.js"
	import { navigateTo } from '@/common/navigation.js';
	
	export default {
		components:{
			uniPopup
		},
		data() {
			return { };
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			toLogin(e){
				navigateTo('/pages/signIn/signIn')
			},
		}
	}
</script>

