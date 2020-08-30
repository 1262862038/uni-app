<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" :tabIndex='tabIndex' @tab='tab'></tab>
		<view class="home-list">
			<list :tab='tabList' :activeIndex='activeIndex' @change='change'></list>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			uni.$on('labelChange', (res) => {
				// console.log('index接收到了其他页面', res)
				this.tabList = []
				this.activeIndex = 0
				this.tabIndex = 0
				this.getLabel()
			}),
			this.getLabel()
		},
		methods: {
			
			async getLabel() {
				const res = await this.$api.get_label()
				console.log('ressss', res)
				this.tabList = [{name: "全部"},...res.data]
			},
			//点击tab
			tab(data) {
				// console.log('data', data)
				this.activeIndex = data.index
			},
			// 滑动swiper传过来的值
			change(current) {
				// console.log('current', current)
				this.tabIndex = current
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex:1;
		border: 1px solid red;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
			
		}
	}
</style>
