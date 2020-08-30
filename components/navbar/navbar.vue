<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏站位 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view @click.stop="open" class="navbar-content flex-content" :class="{search: isSearch}" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}">
				
				<view v-if="isSearch"  class="navbar-content_search-icons" @click="back">
					<uni-icons type="back" size='22' color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search flex-content">
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app、vue</view>
				</view>
				<view v-else class="navbar-search">
					<input @input='inputchange' class="navbar-search_text" type="text" v-model="val" placeholder="请输入你要搜索的内容" />
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight +  navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight:20,
				navBarHeight: 45,
				windowWidth: 375,
				val: ''
			};
		},
		watch:{
			value(val) {
				this.val = val
			}
		},
		created() {
			// 获取手机信息
			const info = uni.getSystemInfoSync()
			console.log('info', info)
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊信息
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log('menuButtonInfo',menuButtonInfo)
			
			// (胶囊底部高度-状态栏高度) + (胶囊顶部高度 - 状态栏内高度) = 导航栏高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight) 
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods:{
			open() {
				if(this.isSearch) return false
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputchange(e) {
				const {value} = e.detail
				this.$emit('input', value)
			},
			back() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $base-color;
			.navbar-content {
				padding: 0 15px;
				justify-content: center;
				box-sizing: border-box;
				.navbar-search {
					height: 30px;
					border-radius: 30px;
					background-color: #fff;
					width: 100%;
					padding: 0 10px;
					.navbar-search_icon {
						margin-right: 10px;
					}
					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search {
					padding-left: 0px;
					.navbar-content_search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search {
						border-radius: 5px;
					}
				
				}
			}
			
			
		}
		
	}

</style>
