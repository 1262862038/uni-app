<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373"  :type="like ? 'heart-filled' : 'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item:{
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item(val) {
				this.like = val.like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeTap() {
				this.like = !this.like
				this.updataLikes()
			},
			async updataLikes() {
				uni.showLoading()
				const res = await this.$api.update_likes({
					user_id: "5f43ca43dbc28f000114b282",
					article_id: this.item._id
				})
				uni.hideLoading()
				uni.showToast({
					title: this.like ? '收藏成功' : '取消收藏',
					icon: 'none'
				})
				console.log('ressss111', res)
			}
		}
	}
</script>

<style lang="scss">
	.icons {
			position: absolute;
			right: 0;
			top: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
		}
</style>
