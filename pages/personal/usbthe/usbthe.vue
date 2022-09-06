<template>
	<view>
		<view class="tbdj">
			<view class="twlakj tawbd" @click="ghsjh()">
				<view class="tylkwz">更换手机号</view>
				<image class="wtawimg" src="../../../static/tpmbjt.png"></image>
			</view>
			<view class="twlakj tawbd" @click="smrz()">
				<view class="tylkwz">实名认证</view>
				<image class="wtawimg" src="../../../static/tpmbjt.png"></image>
			</view>
			<view class="twlakj" @click="gywm()">
				<view class="tylkwz">关于代呗</view>
				<image class="wtawimg" src="../../../static/tpmbjt.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
			}
		},
		methods: {
			ghsjh: function() {
				uni.navigateTo({
					url: '/pages/personal/replace/replace'
				})
			},
			smrz: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						if (res.data.user_name == "" || res.data.user_card == "") {
							uni.navigateTo({
								url: '/pages/login/certification/certification'
							})
						} else {
							uni.showToast({
								title: "该账号已实名注册",
								icon: "none"
							})
						}
					} else {
						uni.showToast({
							title: "" + res.msg,
							icon: "none"
						})
					}
				});
			},
			gywm: function() {
				uni.navigateTo({
					url: '/pages/personal/about/about'
				})
			},
			// tuicdl: function() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '确定退出登录？',
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.setStorageSync('tTime', '');
			// 				uni.setStorageSync('hcToken', '');
			// 				uni.reLaunch({
			// 					url: '/pages/login/login'
			// 				})
			// 			} else if (res.cancel) {}
			// 		}
			// 	});
			// }
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	.tbdj {
		padding-top: 40upx;
	}

	.tawbd {
		border-bottom: 1px #F1F4F8 solid;
		;
	}

	.twlakj {
		width: 100%;
		height: 86upx;
		background-color: #FFFFFF;
		display: flex;
		line-height: 86upx;
		font-size: 30upx;
		color: #000000;
	}

	.tylkwz {
		padding-left: 37upx;
		flex: 1;
	}

	.wtawimg {
		display: block;
		padding-top: 30upx;
		padding-right: 30upx;
		width: 24upx;
		height: 24upx;
	}

	.tutttc {
		width: 676upx;
		height: 86upx;
		background: rgba(42, 140, 251, 1);
		border-radius: 43upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 86upx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 91upx;
	}
</style>
