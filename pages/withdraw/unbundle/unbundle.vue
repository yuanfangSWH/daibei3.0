<template>
	<view class="content">
		<view class="aff-nav01">
			<view class="aff-a">银行卡号</view>
			<view class="aff-b">{{bankcard}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">手机号</view>
			<view class="aff-b">{{mobile}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">身份证</view>
			<view class="aff-b">{{sfz}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">姓名</view>
			<view class="aff-b">{{name}}</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="jbSubmit">解 绑</button>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				name: '',
				sfz: '',
				mobile: '',
				bankcard: '',
			}
		},
		onLoad() {
			this.getUserinfo();
		},
		methods: {
			getUserinfo: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.cardInfo = res.data;
						this.name = this.cardInfo.user_name;
						this.sfz = this.cardInfo.user_card;
						this.mobile = this.cardInfo.user_mobile;
						this.bankcard = this.cardInfo.user_bank_card;
					}
				});
			},
			jbSubmit: function() {
				var _this = this;
				//_this.bankcard = "5";
				uni.showModal({
					content: "是否解绑当前银行卡",
					confirmText: "确定",
					cancelText: "取消",
					cancelColor: "#3887FF",
					confirmColor: "#E85B54",
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							// var data = {
							// 	bank_card: _this.bankcard,
							// };
							// var parameter = '?bank_card=' + _this.bankcard;
							api.apiPost('/account/delbankcard', '', '', 'POST', (status, res, code) => {
								if (res.code == 0) {
									uni.navigateTo({
										url: '/pages/withdraw/unbundleSucc/unbundleSucc'
									})
								} else {
									uni.showToast({
										title: '银行卡解绑失败',
										icon: 'none'
									})
								}
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
	page {
		background: #F4F6F9;
	}

	.content {
		width: 750upx;
	}

	.aff-nav01 {
		width: 650upx;
		padding: 30upx 50upx;
		background: #FFFFFF;
		margin-top: 30upx;
		display: flex;
		font-weight: bold;
	}

	.aff-a {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		width: 180upx;
	}

	.aff-b {
		flex: 1;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
	}

	.btn-row {
		margin: 50upx 50upx 0;
	}

	.loan-btn {
		background: rgba(37, 123, 255, 1);
		border-radius: 46upx;
	}
</style>
