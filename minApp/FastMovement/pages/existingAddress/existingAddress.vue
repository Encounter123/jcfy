<template>
	<view>
		<!-- 地址的Box -->
		<view class="addressBox">
			<view class="addressBoxWidth">
				<view class="addressLbb1">
					<text>刘媛媛</text>
					<text>18897543719</text>
				</view>
				<view class="addressLbb2">
					四川省成都市成华区建设路花园小区19栋1单元3008
				</view>
				<view class="addressLbb3">
					<view class="default">
						<radio class="radio" value=""></radio>
						<text>设置为默认</text>
					</view>
					<view class="delete">
						<text class="deleteBtn" >删除</text>
						<text class="editBtn" @tap="edit">编辑</text>
					</view>
					
				</view>
			</view>
		
			
		</view>
		<view class="addressBox">
			<view class="addressBoxWidth">
				<view class="addressLbb1">
					<text>刘媛媛</text>
					<text>18897543719</text>
				</view>
				<view class="addressLbb2">
					四川省成都市成华区建设路花园小区19栋1单元3008
				</view>
				<view class="addressLbb3">
					<view class="default">
						<radio class="radio" value=""></radio>
						<text>设置为默认</text>
					</view>
					<view class="delete">
						<text class="deleteBtn">删除</text>
						<text class="editBtn" @tap="edit">编辑</text>
					</view>
					
				</view>
			</view>
		
			
		</view>
		<view class="addressBox">
			<view class="addressBoxWidth">
				<view class="addressLbb1">
					<text>刘媛媛</text>
					<text>18897543719</text>
				</view>
				<view class="addressLbb2">
					四川省成都市成华区建设路花园小区19栋1单元3008
				</view>
				<view class="addressLbb3">
					<view class="default">
						<radio class="radio" value=""></radio>
						<text>设置为默认</text>
					</view>
					<view class="delete">
						<text class="deleteBtn">删除</text>
						<text class="editBtn" @tap="edit">编辑</text>
					</view>
					
				</view>
			</view>
		
			
		</view>
		<!-- 添加新地址的btn -->
		<navigator url="../receivingAddress/receivingAddress">
			<view class="addBtn">
			   添加新地址
		    </view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			edit(){
				 uni.navigateTo({
					url: '../receivingAddress/receivingAddress',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
.addressBox{
	width: 100%;
	background-color: #fff;
	box-shadow: 0 0 10rpx #eee;
	margin: 40rpx 0;
	padding: 30rpx 0;
	.addressBoxWidth{
		width: 95%;
		margin: 0 auto;
		.addressLbb1{
			display: flex;
			font-size: 35rpx;
			justify-content:space-between;
			margin: 20rpx 0;
		}
		.addressLbb2{
			font-size: 30rpx;
			margin: 20rpx 0;
		}
		.addressLbb3{
			display: flex;
			align-items: center;
			justify-content:space-between;
			margin-top: 30rpx;
			.default{
				font-size: 25rpx;
				.radio{
					transform:scale(0.7);
					vertical-align: middle;
				}
				text{
					vertical-align: middle;
				}
			}
			.delete{
				font-size: 25rpx;
				color:gray;
				.deleteBtn{
					border: 1px solid #ccc;
					display: inline-block;
					padding:8rpx 25rpx;
				}
				.editBtn{
					border: 1px solid #ccc;
					display: inline-block;
					padding:8rpx 25rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
	
	}
	.addBtn{
		width: 90%;
		background-color: #000;
		color: #fff;
		font-size: 25rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		
	}
</style>
