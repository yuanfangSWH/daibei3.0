<template>
	<view>
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item"></image>
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<uni-icon type="closeempty" size="26" color="#F00"></uni-icon>
					</view>
				</view>
				<view class="an-img-add" @click="chooseImage">
					<uni-icon type="plus" size="46" color="#D7D7D7"></uni-icon>
          <!-- <image class="addimg" src="@/static/ftAddimg.png"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	export default {
		name: 'AnUploadImg',
		components:{
			uniIcon
		},
		data() {
			return {
				imgList: [],
				imgBase64List: []
			};
		},
		methods:{
			chooseImage() {
				uni.chooseImage({
				  success: (chooseImageRes) => {
					for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
						this.imgList.push(chooseImageRes.tempFilePaths[i]);
						uni.getFileSystemManager().readFile({
							filePath: chooseImageRes.tempFilePaths[i], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
								let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
								this.imgBase64List.push(base64);
							}
						})
					}
				  }
				})
			},
			perviewImg(index){
				let urls = [];
				if(index != -1){
					urls[0] = this.imgList[index];
				}else{
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index){
				let il=[], ibl=[];
				for (var i = 0; i < this.imgList.length; i++) {
					if(i != index){
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
			}
		}
	}
</script>

<style>
	.an-uploadImg-group{
		margin: 5upx 20upx;
	}
	.an-img{
		float: left; 
		margin-right: 10upx; position: relative;
	}
	.an-img-add{
		float: left; 
		height: 210upx; 
		width: 210upx; 
     border: 4upx dashed #D7D7D7;
		text-align: center; 
		line-height: 210upx;
    
	}
	.an-img>image{
		height: 218upx; 
		width: 218upx;
	}
	.an-icon-close{
		position: absolute; 
		right: 0; 
		top: 0;
	}
  .addimg{ width: 218upx; height: 218upx;}
</style>
