<template>
	<view class="dlbox">
		<view class="iBox">
			<view class="dlBg">
				<image class="dlBgImg" src="../../static/andrio.jpg" mode="widthFix"></image>
			</view>
			<view class="dlfooter" @click="iosFun">
				<image class="dlbtn" src="../../static/downloadbtn.jpg"></image>
			</view>
		</view>
		<view class="imgbox">
			<image class="iosImg" src="../../static/iosimg01.jpg" mode="widthFix"></image>
			<image class="iosImg" src="../../static/iosimg02.jpg" mode="widthFix"></image>
			<image class="iosImg" src="../../static/iosimg03.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad() {
			this.iosInfo();
		},
		methods: {
			iosInfo: function() {
				api.apiPost('/index/update', '', '', 'GET', (status, res, code) => {
					if (res.code == 0) {
						//console.log("数据："+JSON.stringify(res));
						this.url = res.data.ios_src;
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			iosFun: function() {
				// var browser = {
				// 	versions: function() {
				// 		var u = navigator.userAgent,
				// 			app = navigator.appVersion;
				// 		return { //移动终端浏览器版本信息
				// 			//trident: u.indexOf('Trident') > -1, //IE内核
				// 			//presto: u.indexOf('Presto') > -1, //opera内核
				// 			//webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				// 			//gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				// 			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				// 			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				// 			//android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				// 			//iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				// 			//iPad: u.indexOf('iPad') > -1, //是否iPad
				// 			//webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				// 		};
				// 	}(),
				// 	language: (navigator.browserLanguage || navigator.language).toLowerCase()
				// }
				
				// if ((/MicroMessenger/i).test(navigator.userAgent)) {
				// 	//location.href = this.applyulr;
				// 	location.href = 'itms-services://?action=download-manifest&url=https://kashenimg.oss-cn-shenzhen.aliyuncs.com/file.plist';
				// 	//alert('微信环境');
				// 	return;
				// }
				// if (browser.versions.mobile) {
				// 	if (browser.versions.ios) { //是否在IOS浏览器打开  
				// 		location.href = 'itms-services://?action=download-manifest&url=https://kashenimg.oss-cn-shenzhen.aliyuncs.com/file.plist';
				// 	}
				// }
				location.href = this.url;
			}
		}
	}
</script>

<style scoped>
	.dlbox {
		height: 100vh;
		background: #FFFFFF;
	}

	.iBox {
		position: relative;
		height: 1206upx;
	}

	.dlBg {
		height: 100vh;
		width: 750upx;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
	}

	.dlBgImg {
		width: 750upx;
		display: block;
	}

	.iosImg {
		width: 750upx;
		display: block;
	}

	.dlfooter {
		width: 750upx;
		position: absolute;
		bottom: 40upx;
		left: 0;
		z-index: 2;
	}

	.dlbtn {
		width: 606upx;
		height: 125upx;
		display: block;
		margin: 0 72upx;
	}
</style>
