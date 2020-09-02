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
			<button class="detail-header_button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like ? '取消关注' : '关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html" >
				<u-parse :content='formData.content' :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key='item.comment_id'>
					<comment-box :comments='item' @reply='reply'></comment-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
					
				</view>
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like? 'heart-filled' : 'heart'"  size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<pop-up ref='popup' :article_id='formData._id' :replyFormData='replyFormData' @updateCommentSuccess='updateCommentSuccess'></pop-up>
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
				commentsValue: '',
				commentsList: [],
				replyFormData: {}
			};
		},
		onLoad(query) {
			// console.log('query', JSON.parse(query.params))
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
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
			openComment() {
				this.$refs.popup.openComment()
			},
			updateCommentSuccess() {
				this.getComments()
				this.replyFormData.reply_id = ''
			},
		
			// 获取评论数据
			async getComments() {
				const res = await this.$api.get_comments({
					article_id: this.formData._id
				})
				console.log('commentsRes', res)
				this.commentsList = res.data
			},
			// 回复评论
			reply(comment) {
				this.replyFormData = {
					"comment_id": comment.comments.comment_id,
					is_reply: comment.is_reply
				}
				if(comment.comments.reply_id) {
					this.replyFormData.reply_id = comment.comments.reply_id
				}
				// console.log('this.replyFormData', this.replyFormData)
				this.$refs.popup.openComment()
			},
			// 关注作者
			follow(author_id) {
				console.log('follow')
				this.setUpdateAuthor(author_id)
			},
			// 关注或取消关注作者
			async setUpdateAuthor(author_id) {
				uni.showLoading()
				const res = await this.$api.update_author({
					author_id
				})
				uni.hideLoading()
				this.formData.is_author_like = !this.formData.is_author_like
				uni.showToast({
					title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
					icon:'none'
				})
			},
			//点击收藏
			likeTap(article_id) {
				this.setUpdateLike(article_id)
			},
			// 收藏接口
			async setUpdateLike(article_id) {
				uni.showLoading()
				const res = await this.$api.update_likes({
					article_id,
				})
				this.formData.is_like = !this.formData.is_like
				uni.hideLoading()
				uni.showToast({
					title: this.formData.is_like ? '收藏成功': '取消收藏',
					icon:'none'
				})
				uni.$emit('update_article')
			},
			// 点击点赞
			thumbsup(article_id) {
				this.setUpdateThumbs(article_id)
			},
			// 点赞接口
			async setUpdateThumbs(article_id) {
				uni.showLoading()
				
				const res = await this.$api.update_thumbs({
					article_id
				})
				uni.hideLoading()
				this.formData.is_thumbs_up = true
				this.formData.thumbs_up_count++
				uni.showToast({
					title: res.msg,
					icon:'none'
				})
				console.log('ressssss', res)
			},
			open() {
				uni.navigateTo({
					url: '../detail-comments/detail-comments?id=' + this.formData._id
				})
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
		.detail-header_button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $base-color;
			color: #fff;
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
	// .popup-wrap {
	// 	background-color: #fff;
	// 	.popup-header {
	// 		display: flex;
	// 		justify-content: space-between;
	// 		font-size: 14px;
	// 		color: #666;
	// 		border-bottom: 1px solid #F5F5F5;
	// 		.popup-header_item {
	// 			height: 50px;
	// 			line-height: 50px;
	// 			padding: 0 15px;
	// 		}
	// 	}
	// 	.popup-content {
	// 		width: 100%;
	// 		padding: 15px;
	// 		box-sizing: border-box;
	// 		.popup-textarea {
	// 			width: 100%;
	// 			height: 200px;
	// 		}
	// 	}
	// 	.popup-count {
	// 		display: flex;
	// 		justify-content: flex-end;
	// 		font-size: 12px;
	// 		color: #999;
	// 	}
	// }
}
</style>
