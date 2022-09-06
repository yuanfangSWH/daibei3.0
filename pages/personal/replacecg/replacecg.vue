<template>
	<view class="content">
		<view class="wc-box">
			<image class="wcImg" src="../../../static/succ.png"></image>
			<view class="wc-t">更换成功！</view>
			<view class="wc-t2">手机号码已更换</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="FindSubmit">好 的</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			FindSubmit: function() {
				uni.reLaunch({
					url: '/pages/personal/personal'
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #FFFFFF;
	}

	.content {
		width: 750upx;
		height: 100vh;
		background: #FFFFFF;
	}

	.wc-box {
		text-align: center;
		padding: 100upx 0 60upx;
	}

	.wcImg {
		width: 166upx;
		height: 166upx;
	}

	.wc-t {
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin: 30upx 0 20upx;
	}

	.wc-t2 {
		font-size: 30upx;
		font-family: PingFang-SC-Medium;
		color: rgba(169, 174, 181, 1);
	}

	.wc-border {
		border-bottom: 1upx solid #F4F6F9;
	}

	.wc-nav {
		width: 750upx;
		background: #FFFFFF;
	}

	.wc-01 {
		display: flex;
		width: 650upx;
		padding: 30upx 50upx;
		font-size: 32upx;
	}

	.wc-a {
		color: rgba(95, 101, 111, 1);
	}

	.wc-b {
		flex: 1;
		text-align: right;
		color: rgba(0, 0, 0, 1);
		font-weight: bold;
	}

	.btn-row {
		margin: 50upx 50upx 0;
	}

	.loan-btn {
		background: rgba(37, 123, 255, 1);
		border-radius: 46upx;
	}
</style>
