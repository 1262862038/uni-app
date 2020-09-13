<template>
	<view>
		<view class="my-header">
			<view class="my-header_bg">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header_logo">
				<view class="my-header_logo-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-header_name">{{userinfo.author_name}}</text>
			</view>
			<view class="my-header_info">
				<view class="my-header_info-box">
					<text class="my-header_info-title">被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header_info-box">
					<text class="my-header_info-title">粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header_info-box">
					<text class="my-header_info-title">积分</text>
					<text>{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content_list" @click="open">
				<view class="my-content_list-title">
					<uni-icons class='icons' type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content_list" @click="feedback">
				<view class="my-content_list-title">
					<uni-icons class='icons' type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['userinfo'])
		},
		methods:{
			open() {
				uni.navigateTo({
					url:'/pages/my-article/my-article'
				})
			},
			feedback() {
				uni.navigateTo({
					url:'/pages/feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.my-header {
		padding-bottom: 15px;
		position: relative;
		.my-header_bg {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			filter: blur(8px);
			opacity: 0.3;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.my-header_logo{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;
			.my-header_logo-box {
				height: 60px;
				width: 60px;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.my-header_name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}
		.my-header_info {
			margin-top: 15px;
			display: flex;
			.my-header_info-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				font-size: 12px;
				color: #999;
				.my-header_info-title {
					font-size: 14px;
					color: #333;
				}
			}
		}
	}
	.my-content {
		.my-content_list {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			margin-bottom: 10px;
			background-color: #fff;
			color: #333;
			font-size: 14px;
			.my-content_list-title {
				display: flex;
				align-items: center;
				.icons {
					margin-right: 5px;
				}
			}
		}
		
	}
</style>
