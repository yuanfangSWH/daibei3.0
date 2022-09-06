<template>
	<view>
		<view>跳转下载中...</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			//#ifdef H5
			uni.request({
				url: 'http://ts.rong298.cn/index/update',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'get',
				success: (res) => {
					var code = res.data.code;
					switch (parseInt(code)) {
						case 0:
							var a = navigator.userAgent;
							var isAndroid = a.indexOf('Android') > -1 || a.indexOf('Adr') > -1; //android终端
							var isiOS = !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
							if (isAndroid) {
								//Android下载地址
								location.assign(res.data.data.src);
							}
							if (isiOS) {
								//ios下载地址
								location.assign(res.data.data.ios_src);
							}
							break;
						default:
							console.log("未知错误");
					}
				},
				fail: (res) => {
					console.log(res.data);
				}
			});
			//#endif
		},
		methods: {

		}
	}
</script>

<style>

</style>
