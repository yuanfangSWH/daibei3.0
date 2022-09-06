<template>
	<view>
		<view class="img404" v-if="pinz">
			<image src="../../static/404.jpg"></image>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				pinz: false
			}
		},
		onLoad() {
			this.userInfo();
		},
		methods: {
			userInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				api.apiPost('/trymake/url', '', '', 'get', (status, res, code) => {
					if (status) {
						var urlData = res.data.url;
						if (urlData == "" || urlData == null) {
							this.pinz = true;
						} else {
							this.pinz = false;
							//#ifdef H5
							//重定向URL
							location.assign(urlData);
							//#endif
						}
						uni.hideLoading();
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
						uni.hideLoading();
					}
				});
			},
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #666666;
	}

	.img404 {
		width: 750upx;
		height: 1300upx;
	}

	.img404 image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
