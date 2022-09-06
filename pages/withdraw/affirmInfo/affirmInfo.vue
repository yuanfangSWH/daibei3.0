<template>
	<view class="content">
		<view class="aff-nav01">
			<view class="aff-a">银行卡号</view>
			<view class="aff-b">{{bankcard[2]}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">手机号</view>
			<view class="aff-b">{{mobile}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">身份证</view>
			<view class="aff-b">{{bankcard[1]}}</view>
		</view>
		<view class="aff-nav01">
			<view class="aff-a">姓名</view>
			<view class="aff-b">{{bankcard[0]}}</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="AddSubmit">确认绑卡</button>
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
				bankcard: [],
				pandin: false
			}
		},
		onLoad(e) {
			this.getUserinfo();
			var data = decodeURIComponent(e.bankcard);
			this.bankcard = data.split("|");
		},
		methods: {
			getUserinfo: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.mobile = res.data.user_mobile;
						this.name = res.data.user_name;
						this.sfz = res.data.user_card;
						if (this.name == "" || this.sfz == "") {
							this.pandin = true;
						}
					}else{
						uni.showToast({
							title:""+res.msg,
							icon:"none"
						})
					}
				});
			},
			AddSubmit: function() {
				if (this.pandin) {
					var data = {
						user_name: this.bankcard[0],
						user_card: this.bankcard[1],
						bank_card: this.bankcard[2]
					};
					var parameter = '?user_name=' + this.bankcard[0] + '&user_card=' + this.bankcard[1] + '&bank_card=' + this.bankcard[2];
				} else {
					var data = {
						bank_card: this.bankcard[2]
					};
					var parameter = '?bank_card=' + this.bankcard[2];
				}
				api.apiPost('/account/setbankcard', parameter, data, 'POST', (status, res, code) => {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/pages/withdraw/cardWc/cardWc'
						})
					} else {
						uni.showToast({
							title: "" + res.msg,
							icon: "none"
						})
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
