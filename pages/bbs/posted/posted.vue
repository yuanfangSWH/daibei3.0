<template>
	<view class="ftBox">
		<input class="ftipt" v-model="sqTitle" type="text" placeholder="想个标题吧" value="" @blur="hasCon" />
		<view class="ftmain">
			<textarea class="ftCon" auto-height placeholder="想跟老铁们说点什么？就尽情发挥吧。" placeholder-style="color:#C6C9CD" v-model="textContent"
			 @blur="hasCon"></textarea>
			<view class="ftNav01">
				<!-- 图片上传 -->
				<view class="ft-add">
					<robby-image-upload v-model="imageData" :limit="limitNumber" @add="addImg"></robby-image-upload>
				</view>
				
				<view class="ftTip">提示：单张图片限制1M以内，最多9张。发布后显示的图片为压缩处理过后的图片。帖子发布需审核，通过后才显示。禁止发布任何广告内容，严重者封号处理。</view>
				<view class="bqtitle">请选择分类标签：</view>
				<view class="bqbox" v-show="!isshow">
					<view class="bq-c" v-for="(item,index) in bbsTags" :key="index" @click="dfclick(item.id,index)">{{item.tab_name}}</view>
				</view>
				<view class="bqbox" v-show="isshow">
					<view class="bq-c" v-for="(item,index) in bbsTags" :key="item.id" @click="tagclick(item.id,index)" :class="{tactive:index==tabcurrent}">{{item.tab_name}}</view>
				</view>
			</view>
		</view>
		<view class="ftBtn"><button class="fabuBtn" :class="{ active01: isAct == true}" @click="fabuFun">发布</button></view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	// 插件
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools';
	export default {
		components: {
			robbyImageUpload
		},
		
		data() {
			return {
				// 上传图片的数量
				limitNumber: 9,
				// 上传图片数据
				imageData: [],
				imageStr: '',
				imageStr2: '',
				imageStr3: '',
				isAct: false,
				textContent: '',
				sqTitle: '',
				bbsTags: '',
				tagIds: 1,
				tabcurrent: 0,
				isshow: false,
				imglength: 0,
				kai:false
			}
		},
		onLoad() {
			this.tagFun();
		},
		computed:{
		},
		methods: {
			//社区标签列表数据接口
			tagFun: function() {
				api.apiPost('/forum/tags', '', '', 'GET', (status, res, code) => {
					if (res.code == 0) {
						this.bbsTags = res.data;
						var arr = [];
						for (var i = 0; i < this.bbsTags.length; i++) {
							var zgid = this.bbsTags[i].id;
							arr = arr.concat(zgid);
						}
						this.tagIds = arr[0];
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			tagclick: function(id, index) {
				this.tagIds = id;
				this.tabcurrent = index;
			},
			dfclick: function(id, index) {
				this.isshow = true;
				this.tagIds = id;
				this.tabcurrent = index;
				this.hasCon();
			},
			
			
			// 上传图片点击事件
			addImg: function(e) {
				this.imageData = e.allImages;
				this.imglength = this.imageData.length;
				this.hasCon();
				this.imageStr = e.currentImages.toString();
				var _this=this;
				_this.kai = true;
				_this.imageStr3 = '';
				if(_this.kai == true){
					_this.kai = false;
					for(var i=0; i<_this.imageData.length; i++){
						window.URL = window.URL || window.webkitURL;
						var xhr = new XMLHttpRequest();
						xhr.open("get", _this.imageData[i], true);
						// 至关重要
						xhr.responseType = "blob";
						xhr.onload = function() {
							if (this.status == 200) {
								//得到一个blob对象
								var blob = this.response;
								// 至关重要
								let oFileReader = new FileReader();
								oFileReader.onloadend = function(e) {
									//let base64 = e.target.result;
									//压缩图片代码开始
									if(blob.size > 1048576){
										let image = new Image() //新建一个img标签（还没嵌入DOM节点)
										image.src = e.target.result
										image.onload = function() {
											let canvas = document.createElement('canvas'), 
											context = canvas.getContext('2d'),
											imageWidth = image.width / 2,    //压缩后图片的大小
											imageHeight = image.height / 2,
											data = ''
								
											canvas.width = imageWidth
											canvas.height = imageHeight
								
											context.drawImage(image, 0, 0, imageWidth, imageHeight)
											data = canvas.toDataURL('image/jpeg')
											_this.imageStr2 = data + '|';
											_this.imageStr3 = _this.imageStr3 + _this.imageStr2;
											//压缩完成 
										}
									}else{
										_this.imageStr2 = e.target.result + '|';
										_this.imageStr3 = _this.imageStr3 + _this.imageStr2;
									}//压缩图片代码结束
									
									//_this.imageStr2 = e.target.result + '|';
									//_this.imageStr3 = _this.imageStr3 + _this.imageStr2;
								};
								oFileReader.readAsDataURL(blob);
							}
						}
						xhr.send();
					}
				}
				
			},
			hasCon: function() {
				if (this.textContent == '' || this.sqTitle == '' || this.isshow == false) {
					this.isAct = false;
				} else {
					this.isAct = true;
				}
			},
			
			
			
			
			//发帖接口方法
			fabuFun: function() {
				if (this.imageData == '') {
					this.imageStr3 = '';
				}
				var strs = this.imageStr3;
				if (this.imglength == 1) {
					this.imageStr3 = strs.substring(0, strs.length - 1);
				}
				var str = this.imageStr3.split('data:');
				var str2 = '';
				for (var i = 1; i <= this.imglength; i++) {
					var a = 'data:' + str[i];
					str2 = str2 + a;
				}
				this.imageStr3 = str2;
				var data = '',
					parameter = '';
				if (this.imageStr3 == '') {
					data = {
						title: this.sqTitle,
						content: this.textContent,
						tag: Number(this.tagIds),
					};
					parameter = '?title=' + this.sqTitle + '&content=' + this.textContent + '&tag=' + this.tagIds;
				} else {
					data = {
						title: this.sqTitle,
						content: this.textContent,
						tag: Number(this.tagIds),
						img: this.imageStr3,
					};
					parameter = '?title=' + this.sqTitle + '&content=' + this.textContent + '&tag=' + this.tagIds + '&img=' + this.imageStr3;
				}
				if (this.isAct == true) {
					uni.showLoading({
						title:'发布中'
					});
					api.apiPost('/forum/send', parameter, data, 'POST', (status, res, code) => {
						if (res.code == 0) {
							uni.showToast({
								title: "发布成功！",
								icon: "success",
								duration: 2000,
								success: () => {
									uni.switchTab({
										url: "/pages/bbs/bbs"
									})
								}
							});
							uni.hideLoading();
						} else {
							uni.showToast({
								title: "" + res.msg,
								icon: "none"
							})
							uni.hideLoading();
						}
					});
				}
			},
		}
	}
</script>

<style scoped>
	.ftBox>>>.uni-input-placeholder {
		color: #C6C9CD;
	}

	.ftipt {
		border-bottom: 1px solid #E4E7EA;
		padding: 20upx 26upx;
		font-size: 30upx;
	}

	.ftBox {
		width: 750upx;
	}

	.ftmain {
		width: 698upx;
		margin: 26upx 26upx 0;
		padding-bottom: 208upx;
	}

	.ftCon {
		width: 698upx;
		padding: 0 0 20upx;
		font-size: 28upx;
		line-height: 48upx;
		min-height: 200upx;
	}

	.ft-add {
		width: 100%;
		margin-top: 30upx;
		display: inline-block;
	}

	.addimg {
		width: 218upx;
		height: 218upx;
	}

	.ftTip {
		color: #A0A2A5;
		font-size: 22upx;
		font-family: PingFang-SC-Medium;
		margin-top: 20upx;
		line-height: 42upx;
	}

	.ftBtn {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		width: 750upx;
	}

	.fabuBtn {
		flex: 1;
		border: none !important;
		background: #CCCCCC;
		color: #FFFFFF;
		font-size: 34upx;
		font-family: PingFang-SC-Medium;
		border-radius: 0 !important;
	}

	.fabuBtn:after {
		border: none !important;
		border-radius: 0upx !important;
	}

	.active01 {
		background: #257BFF !important;
	}

	.bqtitle {
		font-size: 26upx;
		font-family: PingFang SC;
		color: rgba(160, 162, 165, 1);
		margin-top: 30upx;
	}

	.bqbox {
		width: 698upx;
		float: left;
		margin-top: 20upx;
	}

	.bq-c {
		float: left;
		height: 58upx;
		line-height: 58upx;
		background: #D7D7D7;
		border-radius: 29upx;
		color: #FFFFFF;
		font-size: 26upx;
		padding: 0 30upx;
		margin-right: 20upx;
	}

	.tactive {
		background: #257BFF !important;
	}
</style>
