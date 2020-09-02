<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key='item.comment_id'>
			
		<comment-box :comments='item'></comment-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id:'',
				commentsList:[],
				page: 1, 
				pageSize: 5,
				loading:'loading'
			}
		},
		onLoad(query) {
			// console.log('query', query)
			this.article_id = query.id
			this.getComments()
		},
		onReachBottom() {
			console.log('上啦到底了')
			if(this.loading === 'noMore') return 
			this.page++
			this.getComments()
		},
		methods: {
			// 获取评论数据
			async getComments() {
				const res = await this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				})
				if(res.data.length === 0) {
					this.loading = "noMore"
					return 
				}
				console.log('commentsRes', res)
				this.commentsList = [...this.commentsList,...res.data]
			},
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
