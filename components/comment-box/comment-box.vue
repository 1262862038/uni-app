<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header_logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header_info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
				<view v-else class="title">{{comments.author.author_name}} <text class="reply-text">回复</text> {{comments.to}}</view>
				<view>{{comments.create_time}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view >
				{{comments.comment_content}}
			</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentsReply({comments, is_reply: reply})">回复</view>
			</view>
			<view class="comments-reply" v-for="item in comments.replys" :key='item.comment_id'>
				<comments-box :reply='true' :comments='item' @reply='commentsReply'></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comment-box/comment-box.vue'
	export default {
		name:'commentsBox',
		components: {
			commentsBox
		},
		props: {
			comments: {
				type: Object,
				default() {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			commentsReply(comments) {
				// 判断事主回复还是子回复
				if(comments.is_reply) {
					comments.comments.reply_id = comments.comments.comment_id
					comments.comments.comment_id = this.comments.comment_id
				} else {
					
				}
				this.$emit('reply', comments)
				
			}
		}
	}
</script>

<style lang="scss">
	.comment-box {
		margin: 15px 0;
		.comment-header {
			display: flex;
			.comment-header_logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.comment-header_info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text {
						margin: 0 10px;
						font-weight: blod;
						color: #000;
					}
				}
			}
		
		}
		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			.comments-info {
				margin-top: 15px;
				display: flex;
				.comments-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}
			.comments-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>
