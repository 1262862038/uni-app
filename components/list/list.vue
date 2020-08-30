<template>
	<swiper class="home-swiper" :current="activeIndex" @change='change'>
		<swiper-item v-for="(item, i) in tab" :key='i' class="swiper-item">
			<list-item :list='listCatchData[i]' :load='load[i]' @loadmore='loadmore'></list-item>
		</swiper-item>
	</swiper>
</template>
<script>
	import ListItem from './list-item.vue'
	export default {
		components:{
			ListItem
		},
		props:{
			tab:{
				type: Array,
				default() {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list:[],
				listCatchData: {},
				load: {},
				pageSize: 10
			};
		},
		watch:{
			tab(val) {
				if(val.length === 0) return false
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
		},
		methods: {
			//上拉加载
			loadmore() {
				if(this.load[this.activeIndex].loading === 'noMore') return false
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			//轮播滑动事件
			change(e) {
				this.$emit('change', e.detail.current)
				if(!this.listCatchData[e.detail.current] || this.listCatchData[e.detail.current].length === 0) {
					
				this.getList(e.detail.current)
				}
			},
			// 获取列表
			async getList(current) {
				if(!this.load[current]) {
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				const res =await this.$api.get_list({
					name:this.tab[current].name,
					page:this.load[current].page,
					pageSize: this.pageSize
				})
				
				console.log('res', res)
				if(res.data.length === 0) {
					let oldLoad = {}
					oldLoad.loading = 'noMore'
					oldLoad.page = this.load[current].page
					this.$set(this.load, current, oldLoad)
					//强制渲染页面
					this.$forceUpdate()
					return 
				}
				let oldList = this.listCatchData[current] || []
				oldList.push(...res.data)
				this.$set(this.listCatchData, current, oldList)
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;
		.swiper-item {
			height: 100%;
			overflow: hidden;
			.list-scroll {
				height: 100%;
			}
		}
	}

</style>
