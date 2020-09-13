<template>
	<view>
		<uni-load-more status="loading" v-if="list.length === 0 && !noData"></uni-load-more>
		<list-card v-for='item in list' :key='item.id' :item='item'></list-card>
		<text v-if="list.length === 0 && noData">没有更多数据了</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				noData:false
			};
		},
		onLoad() {
			this.getMyArticle()
		},
		methods:{
			// 获取文章列表
			async getMyArticle() {
				const res = await this.$api.get_my_article()
				console.log('resss', res)
				this.list = res.data
				if(this.list.length === 0) {
					this.noData = true
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
