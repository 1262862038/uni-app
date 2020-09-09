<template>
	<view>
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
	export default {
		props:{
			article_id: {
				type: String,
				default: ''
			},
			replyFormData: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				commentsValue: ''
			};
		},
		methods:{
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
				this.setUpdateComment({
					content: this.commentsValue,
					...this.replyFormData
				})
			},
			// 更新评论
			async setUpdateComment(content) {
				const formData = {
					article_id: this.article_id,
					...content
				}
				uni.showLoading()
				const res = await this.$api.update_comment(formData)
				uni.hideLoading()
				uni.showToast({
					title: '发布成功'
				})
				this.$emit('updateCommentSuccess')
				this.commentsValue = ''
				this.close()
			},
		}
	}
</script>

<style lang="scss">
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
</style>
