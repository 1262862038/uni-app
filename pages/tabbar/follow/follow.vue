<template>
	<view class="follow">
		<!-- 导航栏切换 -->
		<view class="follow-tab">
			<view class="follow-tab_box">
				<view @click="tab(0)" class="follow-tab_item" :class="{active: activeIndex === 0}">文章</view>
				<view @click="tab(1)" class="follow-tab_item" :class="{active: activeIndex === 1}">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list_swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="list.length === 0 && !articleShow" status="loading" iconType="snow"></uni-load-more>
						<list-card types='follow' v-for='item in list' :key='item._id' :item='item'></list-card>
						<view class="no-data" v-if="articleShow">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<list-author v-for='item in authorList' :key='item.id' :item='item'></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				articleShow: false,
				authorList: []
			}
		},
		onLoad() {
			uni.$on('update_article', () => {
				this.getFollowList()
			})
			uni.$on('update_author', () => {
				this.getAuthor()
			})
			this.getFollowList()
			this.getAuthor()
		},
		methods: {
			tab(i) {
				this.activeIndex = i
			},
			change(e) {
				this.activeIndex = e.detail.current
			},
			// 获取列表数据
			async getFollowList() {
				const res = await this.$api.get_follow()
				// console.log('re121s', res)
				this.list = res.data
				this.articleShow = this.list.length === 0 ? true : false
			},
			//获取关注作者列表
			async getAuthor() {
				const res = await this.$api.get_author()
				console.log('ressss', res)
				this.authorList = res.data
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px solid #f5f5f5;
			.follow-tab_box {
				width: 100%;
				height: 100%;
				display: flex;
				border-radius: 5px;
				border: 1px solid $base-color;
				.follow-tab_item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #666;
					font-size: 14px;
					&:first-child {
						border-right: 1px solid $base-color;
					}
					&.active {
						color: $base-color;
					}
				}
			}
			
		}
		.follow-list {
			flex: 1;
			.follow-list_swiper {
				height: 100%;
				.swiper-item {
					height: 100%;
				}
			}
		}
	}
	
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
