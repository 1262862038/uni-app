<template>
	<view>
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content">
			<textarea v-model="content" class="feed-content_textarea" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image_box">
			<view class="feedback-image_item" v-for="(item, i) in imageList" :key='item'>
				<view class="close-icon" @click="delImg(i)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
			
			<view v-if="imageList.length < 5" class="feedback-image_item" @click="uploadImg">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="submit" type="primary" @click="submit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				content:''
			};
		},
		methods:{
			uploadImg() {
				const count = 5-this.imageList.length
				uni.chooseImage({
					count: count,
					success:(res) => {
						let tempFilePaths = res.tempFilePaths
						if(tempFilePaths.length <= count) {
						this.imageList = [...this.imageList, ...tempFilePaths]
						}
					}
				})
			},
			delImg(index) {
				this.imageList.splice(index, 1)
			},
			async submit() {
				if(!this.content) {
					uni.showToast({
						title:'请输入文字内容',
						icon: 'none'
					})
					return false
				}
				let imagePath = []
				uni.showLoading()
				for(let i = 0; i < this.imageList.length; i++) {
					let path = await this.uploadFiles(this.imageList[i], i)
					imagePath.push(path)
				}
				this.updateFeedback(imagePath)
				uni.hideLoading()
				uni.showToast({
					title: '反馈提交成功',
					icon:'none'
				})
				setTimeout(() =>{
					uni.switchTab({
						url: '/pages/tabbar/my/my'
					})
				}, 2000)
				
			},
			async uploadFiles(filePath, i) {
				const cloudPath = +new Date() + i + '.jpg'
				console.log('cloudPath',cloudPath)
				const res = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath: cloudPath
				})
				console.log('上传图片的res', res)
				return res.fileID
			},
			async updateFeedback(feedbackImages) {
				const res = await this.$api.update_feedback({
					content: this.content,
					feedbackImages
				})
				console.log('接口调用的res', res)
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin:15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}
	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;
		.feed-content_textarea {
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	.feedback-image_box {
		display: flex;
		flex-wrap: wrap;
		padding:10px;
		.feedback-image_item {
			width: 33.33%;
			position: relative;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			.close-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.submit {
		margin: 0 15px;
		background-color: $base-color
	}
</style>
