<template>
	<view>
		<view class="arrivalSearch">
			<view class="arrivalSmallsearch">
				<view class="arrivalSearchInput"><input confirm-type="搜索" type="text" :placeholder="dateinit" @focus="focus" @confirm="submit" v-model="inputValue"/></view>
				<image src="../../static/img/nav.png" mode="aspectFill" @click.stop="HiddenClick()"></image>
			</view>
		</view>
		<view class="arrivalNavigation" v-if="showHidden">
			<view class="d4"></view>
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="toNavigateTo(1)">到货查询</li>
						<view class="liBottomBorder"></view>
						<li @click="toNavigateTo(2)">门店查询</li>
						<view class="liBottomBorder"></view>
						<li @click="toNavigateTo(3)">货号查询</li>
						<view class="liBottomBorder"></view>
						<li @click="toNavigateTo(4)">降价查询</li>
					</ul>
				</nav>
			</view>
		</view>

		<block v-if="showHistory">
			<view>
				<view class="searchHistory">
					<text class="searchHistoryTitle">搜索历史</text>
					<image @click="deleteHistory" src="../../static/img/delete.png" mode=""></image>
				</view>
			</view>
			<view class="historyBigBox">
				<view class="historyBox">
					<text class="history" v-for="(item,index) in historyList" :key="index" @click="clickHistory(item,index)">{{item}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import {  } from '@/api/api.js';
import { hideLoading, showLoading, showModal, showToast } from '@/common/toast.js';
import { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } from '@/common/navigation.js';

export default {
	data() {
		return {
			showHidden: false,
			dateinit: '请输入货号',
			showHistory: false,
			type: 1,
			inputValue:'',
			historyList:[],
			
		};
	},
	props: {
		ShowHidden: {
			default: false
		}
	},
	methods: {
		HiddenClick() {
			this.showHidden = !this.showHidden;
		},
		creatHistory(){
			let history = uni.getStorageSync('history')?JSON.parse(uni.getStorageSync('history')) : [[],[],[],[]]
			this.historyList = history[parseInt(this.type)-1]
		},
		toNavigateTo(type) {
			this.inputValue = ''
			this.showHidden = false
			this.showHistory = true
			this.type = type
			if (type == 1) {
				uni.setNavigationBarTitle({ title: '到货查询' });
				this.dateinit = '请输入货号';
			} else if (type == 2) {
				uni.setNavigationBarTitle({ title: '门店查询' });
				this.dateinit = '请输入门店名称';
			} else if (type == 3) {
				uni.setNavigationBarTitle({ title: '货号查询' });
				this.dateinit = '请输入货号';
			} else if (type == 4) {
				uni.setNavigationBarTitle({ title: '降价查询' });
				this.dateinit = '请输入货号';
			}
			this.creatHistory()
		},
		deleteHistory(){
			let history = uni.getStorageSync('history')?JSON.parse(uni.getStorageSync('history')) : [[],[],[],[]]
			history[parseInt(this.type)-1] = []
			uni.setStorageSync('history',JSON.stringify(history))
			this.creatHistory()
		},
		focus(){
			this.showHidden = false
			this.showHistory = true
			this.creatHistory()
		},
		clickHistory(item,i){
			let history = uni.getStorageSync('history')?JSON.parse(uni.getStorageSync('history')) : [[],[],[],[]]
			history[this.type-1].splice(i,1)
			history[this.type-1].unshift(item)
			uni.setStorageSync('history',JSON.stringify(history))
			this.showHistory = false
			this.inputValue = item
			this.$emit('search',{type:this.type,value: item})
		},
		submit(e) {
			this.showHistory = false
			let value = e.detail.value
			if(value){
				let history = uni.getStorageSync('history')?JSON.parse(uni.getStorageSync('history')) : [[],[],[],[]]
				history[this.type-1].unshift(value)
				if(history[this.type-1].length>6){
					history[this.type-1].pop()
				}
				uni.setStorageSync('history',JSON.stringify(history))
			}
			
			this.$emit('search',{type:this.type,value: value})
		}
	},
	watch:{
		ShowHidden(e){
			console.log(e)
			this.showHidden = false
		}
	},
	mounted() {
		// this.showHidden = this.ShowHidden;

		// document.addEventListener('click', this.HiddenClick)
	}
};
</script>

<style lang="less">
.arrivalSearch {
	padding: 0 24rpx;
	box-sizing: border-box;
	height: 100rpx;
	background-color: #fff;
	box-shadow: 0 0 10rpx #eee;
	.arrivalSmallsearch {
		width: 95%;
		display: flex;
		justify-content: space-between;
		.arrivalSearchInput {
			height: 70rpx;
			background-color: #f0f1f6;
			border-radius: 40rpx;
			font-size: 25rpx;
			margin-left: 10rpx;
			margin-top: 10rpx;
			width: 570rpx;
		}
		input {
			// width: 80%;
			margin-left: 40rpx;
			margin-top: 10rpx;
		}
		image {
			width: 40rpx;
			height: 40rpx;
			// margin-left: 20rpx;
			margin-top: 20rpx;
		}
	}
}
.arrivalNavigation {
	width: 250rpx;
	position: absolute;
	right: 20rpx;
	z-index: 99;
	.sideNavigation {
		width: 248rpx;
		background-color: #202020;
		color: #eee;
		border-radius: 10rpx;
		li {
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 25rpx;
		}
		.liBottomBorder {
			border: 0.1rpx solid #373737;
		}
	}
	.d4 {
		width: 0;
		height: 0;
		margin-left: 170rpx;
		margin-top: -20rpx;
		border-width: 20rpx;
		border-style: solid;
		border-color: transparent #333 transparent transparent;
		transform: rotate(90deg); /*顺时针旋转90°*/
	}
}

// 搜索历史
.searchHistory {
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 15rpx;
	.searchHistoryTitle {
		margin-left: 15px;
		font-size: 30rpx;
		font-weight: 400;
	}
	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20px;
	}
}
.historyBigBox {
	display: flex;
	.historyBox {
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.history {
			background-color: #f3f4f8;
			padding: 15rpx;
			border-radius: 30rpx;
			font-size: 25rpx;
			margin: 10rpx 20rpx;
		}
	}
	.downArrowBox {
		.downArrow {
			width: 40rpx;
			height: 30rpx;
			margin-top: 100rpx;
		}
	}
}
</style>
