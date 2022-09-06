<template>
	<view class="page">
		<view class="xgtobu">
			<view class="toxiang">
				<view class="toxiangzi">头像</view>
				<view class="toxiang1">
					<!-- <image class="toxiang2" src="../../../static/toxiang.png"> -->
					<image class="toxiang2" :src="carddata.user_avatar"></image>
				</view>
			</view>


			<view class="hox"></view>

			<view class="toxiangzi">上传二维码</view>

			<view class="toxiang1" @click="togglePopup('bottom', 'popup')" v-if="imageSrc">
				<image class="ewma" :src="carddata.qrcode_img"></image>
			</view>
			<view class="toxiang1" @click="togglePopup('bottom', 'popup')" v-else><!-- @click="chooseImg()" -->
				<image class="ewma" src="../../../static/ewma.png"></image>
			</view>
		</view>
		 
		  <!-- 弹框 -->
	      <uni-popup ref="showpopup" :type="type" @change="change">
				<view class="qbu">
				<view class="popup-content" @click="chooseImg('popup')"><text class="xc">手机相册</text></view>
				<view class="popup-content1" @click="cancel('popup')"><text class="qx">取消</text></view>
				</view>
			
			</uni-popup>

		<view class="grjs">
			<view class="hyh">
			
			<view class="grjs-01">个人简介</view>
			<view class="grjs-02" @click="dianjihyh">
				<view class="hyh1" >换一换</view>
			</view>
			
			</view>
			
			<view class="xg-fk">
			<!-- 	文本选择修改框 -->
			
				<view class="jsziti">
				<!-- {{intSlice}} -->
				<view class="jsziti1">{{intSlice}}</view>
				</view>
				<!-- 	文本选择修改框 -->
			    <!-- <textarea maxlength="48" style="border-width:1; background: #EEEEEE;" class="jsziti" placeholder="" v-model="intSlice" type="textarea" disabled ></textarea> -->
			
			</view>
			<view class="xgbc" @click="baocun()">
				<view class="xgbc-01">保存</view>
			</view>
		</view>
		<view class="sming">声明：发布内容不得违反现行法律法规，禁止发布色情 及赌博擦边类广告内容，违者一律永久封号</view>
	</view>
</template>

<script>
	// 官方弹框组件
	// import uniSection from '@/components/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	// 个人介绍文本框插件
	import sunUiTextarea from "@/components/sunui-textarea/sunui-textarea.vue";
	//
	import api from '../../../common/api/api.js';
	// base64图片转换插件
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/image-tools/index.js'
	
	export default {
		components: {
			// 官方弹框组件
			// uniSection,
			uniPopup,
			uniIcons
		},
		data() {
			return {
				// 获取名片数据
				carddata: '',
				// 文本框换一换数据
				wbkdata:[],
				//返回图片路径
				path: false,
				//图片信息
				imageSrc: '',
				// 定义数组
				intSlice: '',
				
			    shuj: '',
				// 分享用户token
				token: '',
				// 从新查询渲染的数据
				xgcardata: '',

				id: '',
				// 跳转上一级
			    // title: 'navigate'，
				//是否显示遮罩
				// options: false,
				// 组件弹框
				// show: false,
				// 组件弹框
			     type: '',
				//总长度
				zomncdata:0,
				//坐标
				huianyzb:0
			}

		},

		// 生命周期
		onLoad(options) {
			   // this.id = this.getQueryVariable("id");
			  console.log('名片用户id')
			  this.id = options.id
			  console.log(options.id)
			this.mpcardata();
			this.hyhdata();
			 // 返回上一级并刷新
			 var pages = getCurrentPages(); // 当前页面
			 var beforePage = pages[pages.length - 2]; // 前一个页面
		},

		methods: {
			
			// 名片数据
			mpcardata: function() {
				var data = {
					 user_id: this.id
				};
				api.apiPost('/user/personalcard?action=userinfo', '', data, 'post', (status, res, code) => {
					if (status) {
						// 获取用户总数据
						this.carddata = res.data.userinfo;
						// 获取图片信息
						this.imageSrc = this.carddata.qrcode_img;
						// 获取文本介绍
					} else {
                     
					}
				});
			},
		
		
		
			//换一换名片文案介绍显示
			   hyhdata:function() {
				var id = uni.getStorageSync('id')
				var data = {
					introduce_id:this.id,
				};	
				api.apiPost('/user/personalcard?action=gettext', "", data, 'post', (status, res, code) => {
					if (status) {
						var shuj = res.data;
						for(var i=0;i<shuj.length;i++){
						this.wbkdata.push(shuj[i].personal_text)
						}
						var chandu = this.wbkdata.length;
						this.zomncdata = chandu-1;
						// 定义保存的信息
						this.intSlice =this.wbkdata[0];
						//保存的ID
								//  var ext = id;
								// //显示的值
						        //  var intSlice = ""
								//    for (var i = 0;i<shuj.length;i++) {
								//    if(shuj[i].id==ext){
								// 		//显示的值
								// 		this.intSlice = this.shuj[i].personal_text //得到的结果：CCCC
								// 	}
								// }
					} else {
					  	
					}
				});
			},
			
			//点击换一换
			dianjihyh:function(){
				console.log("总长度："+this.zomncdata);
				console.log("长度："+this.huianyzb);
				if(this.huianyzb==this.zomncdata){
					this.huianyzb=0;
					this.intSlice =this.wbkdata[0];
					this.intSlice =this.wbkdata[this.huianyzb]
				}else{
					this.huianyzb++;
					this.intSlice =this.wbkdata[this.huianyzb]
				}
			},
			
 //弹出或关闭微信二维码弹框
			//选择图片方法
			chooseImg: function() {
				var _this = this;
				uni.chooseImage({
					count: 1, //限制的张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						//判断图片是否超过大小限制
						//_this.judge2M(res.tempFilePaths[0]);
						_this.imgBase64(res.tempFilePaths[0]);
						_this.carddata.qrcode_img=res.tempFilePaths[0];
					}
				});
			},
			// h5用图片路径转base64位
			imgBase64: function(path) {
				pathToBase64(path)
					.then(base64 => {
						this.imageSrc = base64;
					})
					.catch(error => {
						console.error(error)
					})
			}, //判断图片是否超过大小限制app用
			// judge2M: function(imgData) {
			// 	var _this = this;
			// 	var wtm = uni.getSavedFileInfo({
			// 		filePath: imgData, //仅做示例用，非真正的文件路径
			// 		success: function(res) {
			// 			if (res.size > 2097152) {
			// 				uni.showToast({
			// 					title: '图片超过2M限制！',
			// 					icon: 'none',
			// 					duration: 2000
			// 				});
			// 			} else {
			// 				// _this.imgzhuanH(imgData);
			// 				_this.imageSrc =imgData;
			// 			}
			// 		}
			// 	});
			// },
			// APP用图片路径转base64位
			imgzhuanH: function(img) {
				var _this = this;
				var reader = new plus.io.FileReader();
				//以URL编码格式读取文件数据内容
				reader.readAsDataURL(img);
				//读取文件成功完成的回调函数
				reader.onloadend = function(e) {
					_this.imageSrc = e.target.result; //base64图片   
					console.log("base64图片=" + _this.imageSrc);
				};
			},
			  
			        
			// 弹框
           togglePopup(type, open) {
   				switch (type) {
   					case 'top':
   						this.content = '顶部弹出 popup'
   						break
   
   					case 'bottom':
   						this.content = '底部弹出 popup'
   						break
   					case 'center':
   						this.content = '居中弹出 popup'
   						break
   				}
   				this.type = type
   				this.$nextTick(() => {
   					this.$refs['show' + open].open()
   				})
   			},
   			cancel(type) {
   				this.$refs['show' + type].close()
   			},
   			change(e) {
   				console.log('是否打开:' + e.show)
   			
   		},
   		   
		
    
			//保存
			baocun: function() {
				// var id = uni.getStorageSync('id')
				var data = {
					user_id:this.id,
					// 名片数据
					user_introduce: this.intSlice,
					// 图片数据
					qrcode_img: this.imageSrc,
					
				};
				api.apiPost('/user/personalcard?action=edit', "", data, 'post', (status, res, code) => {
					if (status) {
						uni.showToast({
							title: '保存成功！',
							icon: 'none',
							duration: 2000
						}) ;
							//关闭当前页面返回上一级页面并刷新
					    window.history.back(-1);
					} else {
						uni.showToast({
							title: '保存失败！',
							// title: res.msr,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//通过id获取当前页面url的参数
		 getQueryVariable(variable)
			{
			       var query = window.location.search.substring(1);
			       var vars = query.split("&");
			       for (var i=0;i<vars.length;i++) {
			               var pair = vars[i].split("=");
			               if(pair[0] == variable){return pair[1];}
			       }
			       return(false);
			}
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F8F8F8;
	}

	.xgtobu {
		width: 100%;
		height: 180upx;
		background: #FFFFFF;
	}

	.ts {
		float: right;
		font-size: 14upx;
		color: #000000;
	}

	.toxiang {
		width: 100%;
		height: 86upx;
		/* display: flex; */
	}

	.toxiangzi {
		width: 300upx;
		height: 28upx;
		font-size: 30upx;
		color: #000000;
		margin-left: 5%;
		line-height: 86upx;
	}

	.toxiang2 {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		float: right;
		margin-top: -16upx;
		/* margin-bottom: 8upx; */
		margin-right: 5%;

	}

	.ewma {
		width: 70upx;
		height: 70upx;
		float: right;
		margin-top: -16upx;
		/* margin-bottom: 8upx; */
		margin-right: 5%;
	}


	.hox {
		width: 95%;
		height: 1upx;
		background: #DDE2E8;
		float: right;
	}

	.grjs {
		
		width: 100%;
		height: 425upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.hyh{
		display: flex;
	}
    .hyh1{
		width:auto;
		height:26upx;
		font-size:28upx;
		color:#FFFFFF;
		text-align: center;
		padding-top: 5upx;
	}
	.grjs-01 {
		width: 154upx;
		height: 28upx;
		font-size: 30upx;
		color: #000000;
		padding-top: 29upx;
		margin-left: 36upx;
	}
	.grjs-02{
		width: 154upx;
		height: 50upx;
		background:rgba(42,140,251,1);
		border-radius:29upx;
		margin-top: 29upx;
		margin-left: 375upx;
	}

	.jsziti {
		width: auto;
		height: 100%;
		font-size: 28upx;
		color: #000000;
		display: flex;
		/* margin-left: 25upx;
		margin-right: 40upx; */
		background: #F1F4F8;
	}
	.jsziti1 {
		width: 95%;
		height: 100%;
		font-size: 28upx;
		color: #909090;
		display: flex;
		/* margin-left: 25upx;
		margin-right: 40upx; */
		background: #F1F4F8;
		margin-left: auto;
		margin-right: auto;
	}

	.xg-fk {
		width: 683upx;
		height: 296upx;
		background: #FFFFFF;
		border: 2upx solid rgba(234, 239, 244, 1);
		margin-left: auto;
		margin-right: auto;
		/* text-align: center; */
		/* text-indent: 2em; */
		margin-top: 30upx;

	}

	.sming {
		width: 670upx;
		height: 77upx;
		font-size: 28upx;
		color: rgba(147, 147, 147, 1);
		margin-left: auto;
		margin-right: auto;
		padding-top: 58upx;
	}

	.xgbc {
		width: 676upx;
		height: 86upx;
		background: rgba(42, 140, 251, 1);
		border-radius: 43upx;
		margin-top: 256upx;
		margin-left: auto;
		margin-right: auto;

	}

	.xgbc-01 {
		width: 60upx;
		height: 28upx;
		font-size: 30upx;
		color: #FFFFFF;
		/* text-align: center; */
		margin-left: auto;
		margin-right: auto;
		padding-top: 25upx;
	}
	/* 弹框css */
      .qbu{
		  width:100%;
		  background:#F1F1F1;
/* 		  border-radius:20px 20px 0px 0px; */
	  }
		.popup-content {
		width:100%;
		height:100upx;
		background:#ffffff;
		/* border-radius:20px 20px 0px 0px; */
		text-align: center;
		margin-bottom: 10upx;
		}
		
		.popup-content1 {
		width:100%;
		height:100upx;
		background:#FFFFFF;
		/* border-radius:20px 20px 0px 0px; */
		text-align: center;
		
		}
		
	.qx{
		width:auto;
		height:34upx;
		font-size:36upx;
		color:#A4A4A4;
		line-height: 129upx;
	}
	.xc{
		width:auto;
		height:34upx;
		font-size:36upx;
		color:#000000;
		padding-top: 43upx;
	}
</style>
