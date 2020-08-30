<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view @click="editLabel" class="label-edit">{{is_edit ? '完成' :'编辑'}}</view>
			</view> 
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content_item" v-for="(item, i) in labelList" :key='item._id'>
					{{item.name}}
					<uni-icons @click="del(i)" v-if="is_edit" type="clear" size="20" color="red" class="icons-close"></uni-icons>
				</view>
				<view v-if="labelList.length === 0 && !loading" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
		<!-- 推荐标签 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view> 
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view @click="add(i)" class="label-content_item" v-for="(item, i) in list" :key='item._id'>{{item.name}}</view>
				<view v-if="list.length === 0 && !loading" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: false
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			editLabel() {
				this.is_edit = !this.is_edit
				if(!this.is_edit) {
					this.setUpdateLabel(this.labelList)
					
				}
			},
			//获取标签数据
			async getLabel() {
				this.loading = true
				const res = await this.$api.get_label({
					type: 'all'
				})
				this.loading =false
				console.log('labelRes', res)
				const {data} = res
				this.labelList =  data.filter(v => v.current)
				this.list = data.filter(v => !v.current)
			},
			//点击叉号
			del(i) {
				this.list.push(this.labelList[i])
				this.labelList.splice(i, 1)
			},
			add(i) {
				if(!this.is_edit) return false
				this.labelList.push(this.list[i])
				this.list.splice(i, 1)
			},
			//
			
			async setUpdateLabel(label) {
				let newArrIds = []
				label.forEach(v => {
					newArrIds.push(v._id)
				})
				uni.showLoading()
				const res = await this.$api.update_label({
					label: newArrIds
				})
				uni.hideLoading()
				uni.showToast({
					title: '更新成功',
					icon: 'none'
				})
				uni.$emit('labelChange')
				console.log('updatelabelres', res)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border: 1px solid #f5f5f5;
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap:  wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999999;
		font-size: 14px;
	}
</style>
