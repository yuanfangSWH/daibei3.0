import Vue from 'vue'
import App from './App'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

//获取到初始需要分享跳转到的链接
var fxurl = '';
uni.request({
	url: "http://ts.yuanfang.cn/user/teamext", 
	method: 'GET',
	header: {
	    'Content-Type': 'application/x-www-form-urlencoded', 
	},
	success: (res) => {
		if (res.data.code == 0) {
			fxurl = res.data.data.shareUrl;
		}
	}
});
var wximg = "http://ts.yuanfang.cn/web/static/icon.png"; //分享的图标
//分享代码开始
// #ifdef H5
var jweixin = require('jweixin-module')
//获取当前URL
var url = location.href.split('#')[0];
url = encodeURIComponent(url);
uni.request({
	url: "http://ts.yuanfang.cn/index/wxshare?shareurl="+url, //接口地址
	method: 'GET',
	header: {
	    'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
	},
	success: (res) => {
		if (res.data.code == 0) {
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.data.appId, // 必填，公众号的唯一标识  
				timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳  
				nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串  
				signature: res.data.data.signature, // 必填，签名，见附录1  
				jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表  
			});
			jweixin.ready(function() {
				//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
				jweixin.updateAppMessageShareData({
					title: "加入代呗合伙人，轻松月入上万！", // 分享标题  
					desc: "零门槛快速注册，收入提现立即赚钱，点击立即加入！", // 分享描述  
					link: fxurl, // 分享链接  
					imgUrl: wximg, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
					}
				});
				//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
				jweixin.updateTimelineShareData({
					title: "加入代呗合伙人，轻松月入上万！", // 分享标题
					link: fxurl, // 分享链接  
					imgUrl: wximg, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数  
					}
				});
			
			});
		} else {
			uni.showToast({
				title: "" + res.data.msg,
				icon: 'none'
			});
		}
	}
});
// #endif  
//分享代码结束

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
