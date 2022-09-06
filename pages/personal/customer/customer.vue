<template>
	<view class="cus-box">
		<view class="cus-title">在线客服</view>
		<view class="cus-nav01">
			<view class="cus-kf">
				<image class="cus-ewm" @longtap="fun1($event)" :src="ewm1"></image>
				<p class="ewm-tis">长按二维码即可识别</p>
			</view>
			<view class="cus-time">
				<view class="cus-a">在线时间</view>
				<view class="cus-b">周一到周五9:00 ~ 18：00</view>
			</view>
		</view>
		<view class="cus-title" style="padding-top: 50upx;">结算客服</view>
		<view class="cus-nav01">
			<view class="cus-kf">
				<image class="cus-ewm" @longtap="fun2($event)" :src="ewm2"></image>
				<p class="ewm-tis">长按二维码即可识别</p>
			</view>
			<view class="cus-time">
				<view class="cus-a">在线时间</view>
				<view class="cus-b">周一到周五9:00 ~ 18：00</view>
			</view>
		</view>
		<view class="cus-title" style="padding-top: 50upx;">官方公众号</view>
		<view class="cus-nav01">
			<view class="cus-kf">
				<image class="cus-ewm" @longtap="fun3($event)" :src="ewm3"></image>
				<p class="ewm-tis">长按二维码即可识别</p>
			</view>
			<view class="cus-time">
				<view class="cus-a">在线时间</view>
				<view class="cus-b">周一到周五9:00 ~ 18：00</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				ewm1: '',
				ewm2: '',
				ewm3: ''
			}
		},
		onLoad() {
			this.kefuFun();
		},
		methods: {
			kefuFun: function() {
				api.apiPost('/user/service', '', '', 'GET', (status, res, code) => {
					if (res.code == 0) {
						this.ewm1 = res.data.serverCode;
						this.ewm2 = res.data.jsCode;
						this.ewm3 = res.data.gzhCode;
					} else {
						uni.showToast({
							title: '获取数据失败',
							icon: 'none'
						})
					}
				});
			},
			fun1: function(e) {
				let eve = e || window.event;
				let url = this.ewm1;
				plus.gallery.save(url, function() {
					uni.showToast({
						title: '图片已保存到相册中',
						icon: 'none'
					});
				}, function() {
					uni.showToast({
						title: '保存失败，请重试！',
						icon: 'none'
					});
				});
			},
			fun2: function(e) {
				let eve = e || window.event;
				let url = this.ewm2;
				plus.gallery.save(url, function() {
					uni.showToast({
						title: '图片已保存到相册中',
						icon: 'none'
					});
				}, function() {
					uni.showToast({
						title: '保存失败，请重试！',
						icon: 'none'
					});
				});
			},
			fun3: function(e) {
				let eve = e || window.event;
				let url = this.ewm3;
				plus.gallery.save(url, function() {
					uni.showToast({
						title: '图片已保存到相册中',
						icon: 'none'
					});
				}, function() {
					uni.showToast({
						title: '保存失败，请重试！',
						icon: 'none'
					});
				});
			}
		}
	}
</script>

<style>
	.cus-box {
		width: 690upx;
		padding: 30upx;
	}

	.cus-title {
		font-size: 32upx;
		font-weight: bold;
		padding-bottom: 50upx;
	}

	.cus-nav01 {
		width: 100%;
		display: inline-block;
		height: 240upx;
		background: linear-gradient(-51deg, rgba(85, 117, 255, 1), rgba(60, 175, 255, 1));
		box-shadow: 0px 7upx 6upx 0px rgba(208, 220, 255, 1), 0px 3upx 7upx 0px rgba(80, 146, 255, 1);
	}

	.cus-kf {
		display: inline-block;
		text-align: center;
		margin: 26upx 0 0 30upx;
		float: left;
	}

	.cus-ewm {
		width: 140upx;
		height: 140upx;
		display: inline-block;
	}

	.ewm-tis {
		font-size: 24upx;
		color: #FFFFFF;
	}

	.cus-time {
		display: inline-block;
		float: left;
		margin: 72upx 0 0 50upx;
	}

	.cus-a {
		font-size: 24upx;
		color: #D8E2FF;
		padding-bottom: 20upx;
	}

	.cus-b {
		font-size: 28upx;
		color: #FFFFFF;
	}
</style>
