<template>
	<view v-show="pageshow">
		<view class="gd-nav01">
			<image class="gd-icon01" :src="etuinfo.education_logo"></image><text class="gd-text01">{{etuinfo.education_name}}</text>
		</view>
		<view class="gd-con">
			<image class="gd-img" :src="etuinfo.education_img" mode="widthFix"></image>
		</view>
		<view class="gd-lianjie">
			<view class="gd-fzlj fuzhi" data-clipboard-action="copy" :data-clipboard-text="tUrl" @click="sharurl">复制链接</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				tId: '',
				etuinfo: '',
				url: '',
				pageshow: false,
				tUrl:''
			}
		},
		onLoad(e) {
			this.tId = e.id;
			this.infoData();
			this.tUrl = location.href;
		},
		onShow() {
			
		},
		methods: {
			infoData: function() {
				uni.showLoading({
					title:'加载中'
				})
				var data = {
					id: this.tId,
				};
				var parameter = '?id=' + this.tId;
				api.apiPost('/edu/info', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.etuinfo = res.data.info;
						this.url = this.etuinfo.share_link;
						this.showP();
						uni.hideLoading();
						//微信分享
						var wximg = this.etuinfo.education_logo;
						var wxtitle = this.etuinfo.education_name;
						var jweixin = require('jweixin-module') //npm安装的引用  
						var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
						//var surl = encodeURIComponent(location.href);//据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
						api.apiPost('/index/wxshare?shareurl=' + surl, '', '', 'get', (status, res, code) => {
							if (status) {
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
										desc: "新手必备推广教程", // 分享描述  
										link: location.href, // 分享链接  
										imgUrl: wximg, // 分享图标
										success: function() {
											// 用户确认分享后执行的回调函数
										},
										fail: function() {}
									});
									//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
									jweixin.updateTimelineShareData({
										title: wxtitle, // 分享标题
										link: location.href, // 分享链接  
										imgUrl: wximg, // 分享图标
										success: function() {
											// 用户确认分享后执行的回调函数  
										},
										fail: function() {}
									});
								});
								jweixin.error(function(e) {
									//console.log("错误数据："+JSON.stringify(e))
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						});
						//微信分享
					} else if (res.code == 401) {
						//console.log("身份过期获取链接："+outurl);
						// uni.navigateTo({
						// 	//url:'http://www.huaniaopet.com/html/login'
						// 	url:'/pages/login/pwdlogin/pwdlogin'
						// })
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
			showP: function(){
				this.pageshow = true;
			},
			//复制分享链接
			sharurl: function() {
				let _this = this;
				let clipboard = new this.clipboard(".fuzhi");
				clipboard.on('success', function() {
					//_this.$toast("复制成功")
					uni.showModal({
						title: '复制成功',
						content: '内容已复制到粘贴板，可前往其他应用粘贴查看。',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								//console.log('用户点击确定');
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});
				});
				clipboard.on('error', function() {
					//_this.$toast("复制失败")
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					})
				});
			}
			
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	.gd-nav01 {
		width: 690upx;
		float: left;
		background: #FFFFFF;
		padding: 20upx 30upx;
		margin-bottom: 30upx;
		box-shadow: 0px 5upx 17upx 1upx rgba(232, 239, 246, 1);
	}

	.gd-icon01 {
		width: 50upx;
		height: 50upx;
		float: left; border-radius: 8upx;
	}

	.gd-text01 {
		float: left;
		height: 50upx;
		line-height: 50upx;
		font-size: 34upx;
		color: #000000;
		margin-left: 20upx;
		width: 620upx;
		overflow: hidden;
	}

	.gd-con {
		width: 690upx;
		float: left;
		padding: 0 30upx;
		margin-bottom: 120upx;
	}

	.gd-img {
		width: 690upx;
	}

	.gd-lianjie {
		width: 750upx;
		height: 120upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		border-top: 1upx solid #EAF1F8;
	}

	.gd-fzlj {
		width: 692upx;
		height: 86upx;
		background: #1F8EFF;
		box-shadow: 0upx 6upx 14upx 0upx rgba(132, 192, 252, 1);
		border-radius: 43upx;
		margin: 10upx 29upx 0;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		line-height: 86upx;
	}
</style>
