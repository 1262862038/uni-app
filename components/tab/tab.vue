<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x >
			<view class="tab-scroll_box">
				<view v-for="(item, index) in list" :key='item._id' class="tab-scroll_item" :class="{active:activeIndex === index }" @click="clickTab(item, index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default() {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default:0
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		watch:{
			tabIndex(newVal) {
				this.activeIndex = newVal
			}
		},
		methods:{
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
			open() {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		border-bottom:1px solid #f5f5f5 ;
		background-color: #fff;
		box-sizing: border-box;
		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			// border: 1;
			.tab-scroll_box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				.tab-scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					&.active {
						color: $base-color;
					}
				}
				
			}
		}
		.tab-icons {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
				
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				left: 0;
				bottom: 12px;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
