<template>
	<view class="home">
		<navbar :isSearch='true' v-model='value' @input='change'></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text @click="clear" class="label-clear">清空</text>
					
				</view>
				<view v-if='historyList.length > 0' class="label-content">
					<view @click="openHistory(item)" class="label-content_item" v-for="(item, i) in historyList" :key='i'>{{item.name}}</view>
					
				</view>
				<view v-else class="no-data">
					没有搜索历史
					
				</view>
			</view>
			<list-scroll v-else class='list-scroll' >
				<uni-load-more v-if="loading" status='loading' iconType='snow'></uni-load-more>
				<view v-if="searchList.length >0">
					<list-card @click='setHistory' :item='item' mode='base' v-for='item in searchList' :key='item.id' ></list-card>
				</view>
				<view v-if='searchList.length === 0 && !loading' class="no-data">没有搜索到相关数据</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				is_history: true,
				searchList: [],
				value: '',
				loading: false
			};
		},
		computed: {
			...mapState(['historyList'])
		},
		onLoad()  {
		},
		methods:{
			change(val) {
				if(!val) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(val)
					return false
				}
				// 
				if(!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(val)
					}, 1000)
				}
			},
			
			// 获取列表
			async getSearch(val) {
				if(!val) {
					this.searchList = []
					this.is_history = true
					return false
				}
				this.is_history = false
				this.loading = true
				const res =await this.$api.get_search({
					value:val
				})
				console.log('searchRes', res)
				this.searchList = res.data
				
				this.loading = false
			},
			setHistory(item) {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			// 点击历史记录
			openHistory(item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			clear() {
				// 清除历史记录
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title: '清空完成'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex: 1;
		flex-direction: column;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				.label-title {
					color: $base-color;
				}
				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item  {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
		}
		.no-data {
			height: 200px;
			line-height: 200px;
			width: 100%;
			text-align: center;
			color: #666;
			font-size: 12px;
		}
	}
</style>
