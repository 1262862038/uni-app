<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view> 
			<view class="label-content">
				<view class="label-content_item" v-for="item in 5">
					{{item}}的标签
					<uni-icons type="clear" size="20" color="red" class="icons-close"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 推荐标签 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view> 
			<view class="label-content">
				<view class="label-content_item" v-for="item in 5">{{item}}的标签</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border: 1px solid #f5f5f5;
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap:  wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
