<template>
	<view class="content" v-if="yzsm">
		<text class="login-t3 mr-40">实名认证</text>
		<view class="login-ts2">为有效保证您的资金安全，提升订单处理效率，请填写与您身份证一致的信息，否则不会通过审核。</view>
		<view>
			<view class="uni-input-row">
				<view class="db-sm-t">真实姓名</view>
				<input class="db-ipt01" formType="text" v-model="name" placeholder="请填写您本人的真实姓名。" />
			</view>
			<view class="uni-input-row">
				<view class="db-sm-t">身份证号</view>
				<input class="db-ipt01" formType="text" v-model="card" maxlength="18" placeholder="请填写您本人的身份证号。">
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="loan-btn" @click="rzCard">提交认证</button></view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				urldata: '',
				name: '',
				card: '',
				yzsm: false,
				reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				
			}
		},
		onLoad() {
			this.kajucx();
		},
		methods: {
			kajucx: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						if (res.data.user_name == "" || res.data.user_card == "") {
							this.yzsm = true;
						} else {
							this.yzsm = false;
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
			rzCard: function() {
				if (this.name === '') {
					uni.showToast({
						icon: 'none',
						title: '真实姓名不能为空！'
					});
					return;
				}
				if (!this.regName.test(this.name)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的真实姓名！'
					});
					return;
				}
				if (this.card === '') {
					uni.showToast({
						icon: 'none',
						title: '身份证号不能为空！'
					});
					return;
				}
				if (!this.reg.test(this.card)) {
					uni.showToast({
						icon: 'none',
						title: '身份证号输入有误，请重新输入'
					});
					return;
				} else {
					this.Ksrz();
				}
			},
			//提交实名认证
			Ksrz: function() {
				var data = {
					relaname: this.name,
					card: this.card
				};
				var parameter = '?relaname=' + this.name + '&card=' + this.card;
				api.apiPost('/account/realname', parameter, data, 'post', (status, res, code) => {
					if (res.code == 0) {
						uni.redirectTo({
							url: '/pages/login/certification/complete/complete'
						})
					} else {
						uni.showToast({
							title: "" + res.msg,
							icon: "none"
						})
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../../../common/common.css");

	.content {
		width: 630upx;
		margin: 30upx 60upx 0;
	}

	.db-sm-t {
		color: #000000;
		font-size: 28upx;
		padding-bottom: 10upx;
	}

	.uni-input-row {
		width: 100%;
		float: left;
		margin-top: 40upx;
	}

	.login-ts2 {
		color: #2F281C;
		font-size: 30upx;
		margin-bottom: 30upx !important;
	}
</style>
