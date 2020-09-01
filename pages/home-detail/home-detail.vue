<template>
	<view class="detail">
		<view class="detail-title">{{formData.title}}</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">{{formData.author.name}}</view>
				<view class="detail-header_content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}}浏览</text>
					<text>{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-html" >
				<!-- <u-parse :content='formData.content' :noData="noData"></u-parse> -->
				内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content">
					<comment-box v-for='item in 5'></comment-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
					
				</view>
				<view class="detail-bottom_icons-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup type="bottom" ref='popup' :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" placeholder="请输入评论内容" maxlength="200" fixed />
					<view class="popup-count">{{commentsValue.length}}/200</view>
					
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData: {},
				noData: '<p style="text-align: center; color:#666">详情加载中</p>',
				// 输入框的值
				commentsValue: ''
			};
		},
		onLoad(query) {
			// console.log('query', JSON.parse(query.params))
			this.formData = JSON.parse(query.params)
			this.getDetail()
		},
		onReady() {
		},
		methods:{
			// 获取详情信息
			async getDetail() {
				const res = await this.$api.get_detail({article_id: this.formData._id})
				console.log('detailRes', res)
				this.formData = res.data
			},
			// 更新评论
			async setUpdateComment() {
				uni.showLoading()
				const res = await this.$api.update_comment({
					article_id: this.formData._id,
					content: this.commentsValue
				})
				uni.hideLoading()
				uni.showToast({
					title: '发布成功'
				})
				this.close()
				console.log('commentRes', res)
			},
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			submit() {
				if(!this.commentsValue) {
					uni.showToast({
						title: '请输入评论内容',
						icon:'none'
					})
					return false
				}
				this.setUpdateComment()
			}
		}
	}
</script>

<style lang="scss">
.detail {
	padding: 15px 0;
	padding-bottom: 54px;
	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-header_logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.detail-header_content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			.detail-header_content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header_content-info {
				color: #999;
				text {
					margin-right: 10px;
				}
			}
		}
	}
	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px solid #eee;
			}
		}
	}
	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		.detail-bottom_input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 5px;
			text {
				color: #999;
				font-size: 14px;
			}
		}
		.detail-bottom_icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;
			.detail-bottom_icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
	.popup-wrap {
		background-color: #fff;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
			.popup-header_item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
		}
		.popup-count {
			display: flex;
			justify-content: flex-end;
			font-size: 12px;
			color: #999;
		}
	}
}
</style>
