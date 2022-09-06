<template>
	<view>
		<view>
			<image class="hh-img" mode="widthFix" src="../../../static/hhsao-img1.jpg"></image>
			<image class="hh-img" mode="widthFix" src="../../../static/hhsao-img2.jpg"></image>
		</view>
		<view class="btnBox" @click="regFun">立即注册 成为合伙人</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				hhdata: '',
				url: '',
				// 分享上级用户带的token
				token: '',
				ilogo:'/static/icon.png'
			}
		},
		onLoad(e) {
			if (e.token) {
				var url = location.href.split('token=').pop();
				//console.log("token11:>>>>"+url)
				this.token = url;
			}
			uni.setNavigationBarTitle({
				title: ''
			});
		},
		onShow() {
			var _this = this;
			var wximg = "http://ts.rong298.cn/web/static/icon.png";
			//微信分享
			var jweixin = require('jweixin-module') //npm安装的引用
			var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
			//var surl = encodeURIComponent(location.href);//据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
			api.apiPost('/index/wxshare?shareurl=' + surl+ '&token=' + _this.token, '', '', 'get', (status, res, code) => {
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
							title: "加入代呗合伙人，轻松月入上万！", // 分享标题  
							desc: "零门槛快速注册，收入提现立即赚钱，点击立即加入！", // 分享描述  
							link: location.href, // 分享链接  
							imgUrl: wximg, // 分享图标
							success: function() {
								// 用户确认分享后执行的回调函数
							},
							fail: function() {}
						});
						//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
						jweixin.updateTimelineShareData({
							title: "加入代呗合伙人，轻松月入上万！", // 分享标题
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
		},
		methods: {
			regFun: function() {
				uni.navigateTo({
					url: '/pages/personal/hehuoRegister/hehuoRegister?token=' + this.token
				})
			}
		}
	}
</script>

<style scoped>
	.hh-img {
		width: 750upx;
		float: left;
	}

	.btnBox {
		width: 750upx;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		height: 120upx;
		line-height: 120upx;
		color: #FFFFFF;
		font-size: 42upx;
		background: linear-gradient(0deg, rgba(255, 97, 60, 1), rgba(255, 155, 66, 1));
	}
</style>
