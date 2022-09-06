<template>
	<view v-show="pageshow">
		<!-- v-show="pageshow" -->
		<view class="mainbox">
			<view class="news-title">{{infoData.list_title}}</view>
			<view class="news-s-title">
				<view class="news-nav01">
					<view class="news-t02"><text>{{infoData.list_time}}</text><text>阅读{{infoData.list_look_sum}}</text></view>
				</view>
			</view>
			<view class="neirong">
				<view class="nr-text" id="contents">
					<!-- <rich-text :nodes="new_content"></rich-text> -->
					<text selectable="true">{{new_content}}</text>
				</view>
				<image class="nr-img" v-for="(item, index) in infoData.list_img" :key="index" :src="item" mode="widthFix" />
				<view class="news-i-box">
					<view class="news-i-child" @click="xiePl">
						<image class="n-pl" src="../../static/pinglun.png"></image>
						<view class="news-text01">评论（{{infoData.list_comment_sum}}）</view>
					</view>

					<view class="news-i-child" @click="dianzan">
						<image class="n-pl" src="../../static/dianzan.png"></image>
						<view class="news-text01">点赞（{{infoData.list_like_sum}}）</view>
					</view>

					<view class="news-i-child fuzhi" data-clipboard-action="copy" :data-clipboard-text="tUrl" @click="shareurl">
						<image class="n-pl" src="../../static/fenxiang.png"></image>
						<view class="news-text01">分享</view>
					</view>

					<view class="news-i-child">
						<image class="n-pl" src="../../static/jubao.png"></image>
						<view class="news-text01" @click="jubaoFun">举报</view>
					</view>
				</view>
				<!-- <view class="news-bt-list">
					<view class="news-bt-child">消费金融须去乱象走正道。</view>
					<view class="news-bt-child">贷款不过，评分不足，做到下面几点立马能贷</view>
					<view class="news-bt-child">征信黑了？不用着急，网贷从业者叫你怎么“洗白”</view>
					<view class="news-bt-child">消费金融须去乱象走正道。</view>
				</view> -->


				<!-- 名片 -->

				<view class="mp-bj">
					<view class="mp-fk" v-show="panduan">
						<view class="mp-bj-01">
							<view class="mp-tx">
								<image class="mp-toxiang" :src="carddata.user_avatar"></image>
							</view>
							<view>
								<view class="mp-mzi">{{carddata.user_nickname}}</view>
								<view class="mp-xg" @click="xgmp(carddata.id)">修改名片</view>
							</view>
							<view class="mp-dh-wx">
								<view class="mp-dh" @click="telFun()">
									<image class="mp-dh" src="../../static/dhann.png">
								</view>
								<view class="mp-wx" @click="togglePopup('center', 'popup')">
									<image class="mp-wx" src="../../static/wxann.png">
								</view>
							</view>
						</view>
						<view class="mp-ziti">{{carddata.user_introduce}}</view>
					</view>
 

					<!-- 邀请用户链接进来看到的页面 -->
					<view class="mp-fk" v-show="panduan1">
						<view class="mp-bj-02">
							<view class="mp-tx">
								<image class="mp-toxiang" :src="carddata.user_avatar"></image>
							</view>
							<view class="mp-mzi">{{carddata.user_nickname}}</view>
							<view class="mp-dh-wx">
								<view class="mp-dh" @click="telFun()">
									<image class="mp-dh" src="../../static/dhann.png">
								</view>
								<view class="mp-wx" @click="togglePopup('center', 'popup')">
									<image class="mp-wx" src="../../static/wxann.png">
								</view>
							</view>
						</view>
						<view class="mp-ziti">{{carddata.user_introduce}}</view>
					</view>
				</view>
				<!-- 名片 -->
			</view>
		</view>
		<!--通用遮罩-->
		<!-- 微信二维码弹框 -->
		<uni-popup ref="popup" :type="type" :custom="true" @change="change">
			<view class="mp-wx-tk" v-if="qrcode_img">
				<view class="mpwxewm1">
					<image class="mpwxewm" :src="carddata.qrcode_img">
				</view>
				<view class="sys">长按扫二维码加我微信</view>
			</view>

			<view class="uni-tip" v-else>
				<view class="uni-tip-title">温馨提示</view>
				<view class="uni-tip-content1">该用户没有设置二维码</view>
				<view class="uni-tip-button-1"></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button-qd" @click="cancel('popup')">确定</view>
				</view>
			</view>
		</uni-popup>


		<!-- 	获取电话并拨打弹框 -->
		<!-- 	<uni-popup ref="tip" :type="type" @change="change"></uni-popup>
		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip" v-if="user_mobile =1">
				<view class="uni-tip-title">温馨提示</view>
				<view class="uni-tip-content">确定拨打电话：{{carddata.user_mobile}}吗？</view>
				<view class="uni-tip-button-1"></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button-qx" @click="cancel('tip')">取消</view>
					<view class="uni-tip-button-2"></view>
					<view class="uni-tip-button-qd" @click="telFun()">确定</view>
				</view>
			</view>
			<view class="uni-tip" v-else>
				<view class="uni-tip-title">温馨提示</view>
				<view class="uni-tip-content1">该用户没有设置手机号码</view>
				<view class="uni-tip-button-1"></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button-qd" @click="cancel('tip')">确定</view>
				</view>
			</view>
		</uni-popup>
 -->


		<view class="pinglun">
			<view class="pl-title">评论列表</view>
			<view class="pl-list-null" v-show="!hasreply">
				<image class="pl-imgnull" src="../../static/newsimg02.jpg"></image>
				<view class="zanwu">暂无评论</view>
			</view>
			<view class="pl-list" v-show="hasreply">
				<view class="pl-list-box" v-for="(item, index) in pldata" :key="index">
					<view class="pl-left">
						<image class="pl-pic" :src="item.reply_member_avatar"></image>
					</view>
					<view class="pl-right">
						<view class="pl-nav01">
							<view class="pl-nav01-left">
								<view class="pl-user">{{item.reply_member_name}}</view>
								<view class="pl-time">{{item.reply_time}}</view>
							</view>
							<view class="pl-nav01-right">
								<view class="pl-huifu" @click="sonhuifu(item.reply_id)">
									<image class="pl-icon01" src="../../static/pl.png"></image><text class="pl-text04">回复</text>
								</view>
								<view class="pl-zan" @click="plDianzan(item.reply_id, item.islike)">
									<image class="pl-icon01" src="../../static/zan.png"></image><text class="pl-text04">{{item.reply_like_sum}}</text>
								</view>
							</view>
						</view>
						<view class="pl-nav02">
							<view class="pl-nr01">{{item.reply_content}}</view>
							<view class="pl-nr02" v-if="item.son_reply[0]">
								<text class="nr-text01">{{item.son_reply[0].reply_member_name}}</text><text class="nr-text02">回复了</text><text
								 class="nr-text01">{{item.son_reply[0].reply_from_member_name}} :</text><text class="nr-text03">{{item.son_reply[0].reply_content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pinglun-bar" v-show="panduan">
			<view class="pinglun-ibox">
				<image class="xiepl" src="../../static/xiepl.png"></image>
				<input class="pl-ipt" v-model="plcontent" type="text" :focus="isfocus" :placeholder="defaultipt" @confirm="setPlun"
				 v-show="isplun ? true : false" />
				<input class="pl-ipt" v-model="plcontent2" type="text" :focus="isfocus2" :placeholder="defaultipt" @blur="iptBlur"
				 @confirm="setPlunSon" v-show="isplun ? false : true" />
			</view>
			<view class="bt-pz">
				<view class="bt-pl" @click="xiePl">
					<image class="bt-icon01" src="../../static/pl.png"></image><text class="bt-text">{{infoData.new_reply_num}}</text>
				</view>
				<view class="bt-zan" @click="dianzan">
					<image class="bt-icon01" :src="imgzan"></image><text class="bt-text">{{infoData.new_like_num}}</text>
				</view>
			</view>
		</view>
		<view class="pinglun-bar1" v-show="panduan1">
			<!-- 底部免费换成我的名片 -->
			<view class="dianj" v-show="panduan1" @click="jianjmp()">

				<view class="dianj1">限时免费加入，每天看文章</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import api from '../../common/api/api.js';

	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
				// 变换弹出返回背景色
				bannerShow: true,
				// 文本框换一换数据
				wbkdata: [],
				// 获取全局数据
				infoData: {},
				// 获取名片数据
				carddata: '',
				// 定义数组
				intSlice: '',

				id: '',
				new_content: '',
				toUrl: '',
				pldata: '',
				hasreply: true,
				plcontent: '',
				plcontent2: '',
				isfocus: false,
				isfocus2: false,
				hfid: '',
				sonReply: [],
				isplun: true,
				dzid: '',
				iszan: 0,
				iszan2: 0,
				imgzan: '../../static/zan.png',
				imgyizan: '../../static/yizan.png',
				imgzan2: '../../static/zan.png',
				tUrl: '',
				// 判断分享链接
				panduan: true,
				panduan1: false,
				// 全局加载
				pageshow: false,
				miaoshu: '',
				// 有无二维码判断
				qrcode_img: '',
				// 拨打电话数据
				bodadh: '',
				// 图片
				imgdata: '',
				//是否显示遮罩
				options: false,
				// 组件弹框
				show: false,
				// 分享用户的token
				token: '',
				// 弹框
				type: '',
				//上级token
				tokenSJ: '',
				//动态域名
				ymurl: "",

				// 当前进来的用户id
				user_id: "",

			}
		},
		onLoad(e) {
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isiOS) {
				var outurl = window.location.href;
				var a = uni.getStorageSync("hcinfos");
				if (a == '') {
					location.href = outurl;
					uni.setStorageSync("hcinfos", "123");
				}
			}
			if (e.token) {
				var url = location.href.split('token=').pop();
				//console.log("token11:>>>>"+url)
				this.tokenSJ = url;
			}

			this.user_id = e.uid;
			this.id = e.id;
			this.pullData();
			this.replyData();



			if (e.z) {
				this.panduan = false;
				this.panduan1 = true;
			} else {
				this.panduan = true;

			}
		},
		onUnload() {

			uni.setStorageSync("hcinfos", "");
			//console.log('页面卸载')
		},


		methods: {


			pullData: function() {
				var _this = this;
				uni.showLoading({
					title: '加载中'
				})
				var data = {
					id: this.id,

				};

				var parameter = '?id=' + this.id;
				api.apiPost('/forum/info', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						// console.log("用户id")
						// console.log(this.user_id)
						if (this.user_id == "" || this.user_id == undefined) {
							this.user_id = res.data.info.user_id;
						}
						// this.umpid1 = res.data.info.user_id;
						// 打印输出
						// console.log('用户id')
						// console.log(location.href)
						this.tUrl = location.href + '&uid=' + res.data.info.user_id + '&z=2';
						this.infoData = res.data.info;
						//动态域名
						this.ymurl = res.data.info.share_domain;

						var wxtitle = this.infoData.list_title;
						var miaoshu = this.infoData.list_content;
						miaoshu = miaoshu.substring(0, 12);
						miaoshu = miaoshu + '...';
						var wximg = this.infoData.list_img[0];
						this.iszan = this.infoData.islike;
						if (this.iszan == 1) {
							this.imgzan = this.imgyizan;
						}
						// 分享链接
						this.toUrl = this.infoData.share_link;
						var str = this.infoData.list_content;
						var reg = RegExp(/\\u/);
						if (str.match(reg)) {
							// 包含\\u   
							this.new_content = JSON.parse(str.replace(/<section/g, '<div').replace(/\/section>/g, '/div>'));
						} else {
							this.new_content = str.replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
						}


						this.showP();
						uni.hideLoading();
						// 名片方法异步请求
						this.mpcardata();
						var _this = this;
						// 微信分享
						setTimeout(function() {
							var jweixin = require('jweixin-module') //npm安装的引用
							//var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
							var surl = encodeURIComponent(_this.ymurl + '/web/'); //新加
							api.apiPost('/index/wxshare?shareurl=' + surl + '&token=' + _this.tokenSJ, '', '', 'get', (status, res,
								code) => {
								console.log("数据：" + JSON.stringify(res))
								if (status) {
									jweixin.config({
										debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
										appId: res.data.appId, // 必填，公众号的唯一标识  
										timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
										nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
										signature: res.data.signature, // 必填，签名，见附录1  
										jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表          
									});
									jweixin.config({
										debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
										appId: res.data.appId, // 必填，公众号的唯一标识  
										timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
										nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
										signature: res.data.signature, // 必填，签名，见附录1  
										jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表          
									});
									jweixin.ready(function() {
										//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
										jweixin.updateAppMessageShareData({
											title: wxtitle, // 分享标题  
											desc: miaoshu, // 分享描述  
											link: _this.ymurl + '/web/#/pages/bbsDetails/bbsDetails?id=' + location.href.split('?id=')[1] +
												'&uid=' + _this.user_id + '&z=2', // 分享链接  
											// link: location.href+'?token=' + _this.token, //分享链接  
											imgUrl: wximg, // 分享图标
											success: function() {
												// 用户确认分享后执行的回调函数
											},
											fail: function() {}
										});
										//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
										jweixin.updateTimelineShareData({
											title: wxtitle, // 分享标题
											link: _this.ymurl + '/web/#/pages/bbsDetails/bbsDetails?id=' + location.href.split('?id=')[1] +
												'&uid=' + _this.user_id + '&z=2', // 分享链接 
											// link: location.href+'?token=' + _this.token, // 分享链接 
											imgUrl: wximg, // 分享图标
											success: function() {
												// 用户确认分享后执行的回调函数  
											},
											fail: function() {}
										});

									});

								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									});
								}
							});
						}, 500);
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
						uni.hideLoading();
						this.pageshow == false;
					}
				});
			},

			showP: function() {
				this.pageshow = true;
			},



			replyData: function() {
				var data = {
					id: this.id,
				};
				var parameter = '?id=' + this.id;
				api.apiPost('/forum/reply', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.pldata = res.data.replyList;
						this.iszan2 = this.pldata.islike;
						if (this.iszan2 == 1) {
							this.imgzan2 = this.imgyizan;
						}

						if (this.pldata != '') {
							this.hasreply = true;
						} else {
							this.hasreply = false;
						}
						//console.log("评论列表数据："+JSON.stringify(this.pldata));
					} else {

						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			// 评论成功或失败
			setPlun: function() {
				var data = {
					id: this.id,
					rid: 0,
					content: this.plcontent,
				};
				var parameter = '?id=' + this.id + '&rid=0' + '&content=' + this.plcontent;
				api.apiPost('/forum/comment', parameter, data, 'post', (status, res, code) => {
					if (res.code == 0) {
						uni.showToast({
							title: '评论成功！',
							icon: 'none'
						});
						this.plcontent = '';
						this.replyData();
					} else {
						uni.showToast({
							title: "评论失败",
							icon: "none"
						})
					}
				});
			},
			sonhuifu: function(id) {
				this.isplun = false;
				this.isfocus2 = true;
				this.hfid = id;
			},

			setPlunSon: function() {
				var data = {
					id: this.id,
					rid: this.hfid,
					content: this.plcontent2,
				};
				var parameter = '?id=' + this.id + '&rid=' + this.hfid + '&content=' + this.plcontent2;
				api.apiPost('/forum/comment', parameter, data, 'post', (status, res, code) => {
					if (res.code == 0) {
						uni.showToast({
							title: '评论成功！',
							icon: 'none'
						});
						this.plcontent2 = '';
						this.replyData();
						this.isplun = true;
						this.isfocus2 = false;
					} else {
						uni.showToast({
							title: "评论失败",
							icon: "none"
						})
					}
				});
			},


			xiePl: function() {
				this.isfocus = true;
			},
			iptBlur: function() {
				this.isplun = true;
				this.isfocus2 = false;
			},


			dianzan: function() { //文章点赞
				if (this.iszan == 0) {
					var data = {
						id: this.id,
						type: 0,
					};
					// var parameter = '?id=' + this.id + '&type=0';
					api.apiPost('/forum/like', parameter, data, 'GET', (status, res, code) => {
						if (res.code == 0) {
							uni.showToast({
								title: '点赞成功！',
								icon: 'none'
							});
							this.imgzan = this.imgyizan;
							this.pullData();
						}
					});
				} else {
					uni.showToast({
						title: "你已点过赞啦！",
						icon: "none"
					})
				}
			},

			plDianzan: function(id, a) { //评论点赞
				if (a == 0) {
					this.dzid = id;
					var data = {
						id: this.dzid,
						type: 1,
					};
					var parameter = '?id=' + this.dzid + '&type=1';
					api.apiPost('/forum/like', parameter, data, 'GET', (status, res, code) => {
						if (res.code == 0) {
							uni.showToast({
								title: '点赞成功！',
								icon: 'none'
							});
							//this.imgzan2 = this.imgyizan;
							this.replyData();
						}
					});
				} else {
					uni.showToast({
						title: "你已点过赞啦！",
						icon: "none"
					})
				}

			},


			// 名片数据
			mpcardata: function() {
				var data = {
					//当前的用户ID
					user_id: this.user_id,
				}
				api.apiPost('/user/personalcard?action=userinfo', '', data, 'post', (status, res, code) => {
					if (res.code == 0) {
						// 获取用户总数据
						this.carddata = res.data.userinfo;
						this.bodadh = res.data.userinfo.user_mobile;
						this.imgdata = res.data.userinfo.qrcode_img;
						this.tokenSJ = res.data.userinfo.user_token;
						// 判断弹框
						if (this.imgdata == 0) {
							this.qrcode_img = false;
						} else {
							this.qrcode_img = true;
						}
						
					}
				});
			},
			// 拨打电话
			telFun: function() {
				window.location.href = "tel:" + this.carddata.user_mobile;
			},

			// 修改名片链接
			xgmp: function(id) {
				uni.navigateTo({
					url: '/pages/bbsDetails/bbscard/bbscard?id=' + id

				})
			},

			// 立即注册免费成为合伙人
			jianjmp: function() {
				// window.location.href = 'http://ts.rong298.cn/web/#/pages/personal/smLongPic/smLongPic?token=' + this.tokenSJ
				 window.location.href = 'http://ts.rong298.cn/web/#/pages/personal/hehuoRegister/hehuoRegister?token=' + this.tokenSJ

			},



			//弹出或关闭微信二维码弹框
			togglePopup(type, open) {
				switch (type) {
					// 顶部弹出
					case 'top':
						this.content = ''
						break
						// 底部弹出
					case 'bottom':
						this.content = ''
						break
						// 中部弹出
					case 'center':
						this.content = ''
						break
				}
				//top弹框点击事件		
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},

			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			change(e) {
				console.log(e.show)
			},





			// 复制
			shareurl: function() {
				let _this = this;
				let clipboard = new this.clipboard(".fuzhi");
				clipboard.on('success', function() {
					//_this.$toast("复制成功")
					uni.showToast({
						title: '复制成功',
						icon: 'success'
					})
				});

				clipboard.on('error', function() {
					//_this.$toast("复制失败")
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					})
				});
			},
			jubaoFun: function() {
				uni.showModal({
					content: "举报成功！",
					confirmText: "确定",
					showCancel: false
				})
			},

		},

	}
</script>

<style scoped>
	@import url("../../common/common.css");

	page {
		background: #FFFFFF;
	}

	.nr-text>>>img {
		width: 100%;
		display: block;
		margin-top: 10px;
	}

	.uni-mask {
		z-index: 1;
		background: rgba(0, 0, 0, 0.6);
	}

	/* 弹出框微信css */
	.tanchuk {
		width: 600upx;
		height: 682upx;
		background: #FFFFFF;
		border-radius: 32upx;

	}

	.uni-banner {
		width: 600upx;
		height: 682upx;
		position: fixed;
		left: 10%;
		margin-top: 200upx;
		z-index: 20;


	}

	.mpwxewm {
		width: 500upx;
		height: 500upx;
		border-radius: 8upx;
		padding-top: 40upx;
		margin-left: 50upx;

	}

	.sys {
		text-align: center;
		/* margin-top: -112upx; */
		width: auto;
		height: 36upx;
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #515359;
		margin-top: 40upx;
	}

	.mp-wx-tk {
		width: 600upx;
		height: 682upx;
		background: #FFFFFF;
		border-radius: 32upx;
	}

	/* 电话弹出框css */
	.uni-tip {
		padding: 15upx;
		width: 512upxpx;
		background: #FFFFFF;
		box-sizing: border-box;
		border-radius: 32upx;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 28upx;
		color: #333;
	}

	.uni-tip-content {
		padding: 50upx;
		font-size: 28upx;
		color: #666;
	}

	.uni-tip-content1 {
		padding: 50upx;
		font-size: 28upx;
		color: #666;
		text-align: center;
	}

	.uni-tip-group-button {
		margin-top: 20upx;
		display: flex;
	}

	.uni-tip-button-qx {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #9D9D9D;
	}

	.uni-tip-button-qd {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #2A8CFB;
	}

	.uni-tip-button-1 {
		width: 512upx;
		height: 2upx;
		background: #DFE4EA;
	}

	.uni-tip-button-2 {
		width: 2upx;
		height: 83upx;
		background: #DFE4EA;
		margin-left: auto;
		margin-right: auto;
		margin-top: -20upx;
	}
</style>
