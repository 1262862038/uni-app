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
			<swiper class="follow-list_swiper">
				<swiper-item>
					<list-scroll>
						<list-card v-for='item in list' :key='item._id' :item='item'></list-card>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">作者</view>
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
				list: []
				
			}
		},
		onLoad() {
			this.getFollowList()
		},
		methods: {
			tab(i) {
				this.activeIndex = i
			},
			// 获取列表数据
			async getFollowList() {
				const res = await this.$api.get_follow()
				// console.log('re121s', res)
				this.list = res.data
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
</style>
