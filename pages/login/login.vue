<template>
	<view>
		<!-- 验证码登录 -->
		<view class="login-box uni-flex uni-row">
			<view class="uni-form-item uni-column">
				<text class="login-t">登录</text>
				<input class="uni-input" v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号" @click="hideTabbar"
				 @focus="hideTabbar" @blur="showTabbar" @input="funIpt" />
			</view>
			<view class="login-nav01">
				<input class="uni-input" v-model="verification" type="number" maxlength="4" placeholder="请输入验证码" @click="hideTabbar"
				 @focus="hideTabbar" @blur="showTabbar" @input="funIpt" />
				<view class="register-phone-getcode" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</view>
			</view>
			<view class="login-ts">未注册的手机号验证后自动创建账户</view>
			<view class="uni-padding-wrap uni-common-mt">
				<button class="loan-btn active01" type="primary" v-if="isBtn" @click="login">登录</button>
				<button class="loan-btn" type="primary" v-else>登录</button>
			</view>
			<view class="fixed-nav" v-if="tabbar">
				<view class="xieyi-nav">注册即同意<navigator hover-class="none" class="xieyi_a01" url="../agreement/agreement">《隐私政策》</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	import Enumerable from '../../common/linq/linq.js';
	//jsencrypt插件
	import JSEncrypt from '../../common/js/jsencrypt.min.js';
	//MD5加密
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				//手机号
				mobile: '',
				verification: '',
				//验证正则表达式
				re: /^1[3-9][0-9]{9}$/,
				tabbar: true,
				windowHeight: '',
				urldata: '',
				safety: {
					time: 60,
					state: false,
					interval: '',
				},
				isBtn: false,
				token: '',
			}
		},
		onLoad(e) {
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight;
				}
			});
			uni.onWindowResize((res) => {
				if (res.size.windowHeight < this.windowHeight) {
					this.tabbar = false
				} else {
					this.tabbar = true
				}
			});
			var a = location.href;
			var b = a.split("?toredirect=");
			this.urldata = decodeURIComponent(b[1]);//对url解码
		},
		methods: {
			pawLogin: function() {
				this.isshow = true;
			},
			mobileLogin: function() {
				this.isshow = false;
			},
			showTabbar() {
				this.tabbar = true;
				if (this.verification != '' && this.mobile != '') {
					this.isBtn = true;
				} else {
					this.isBtn = false;
				}
			},
			hideTabbar() {
				this.tabbar = false;
			},
			funIpt() {
				if (this.verification != '' && this.mobile != '') {
					this.isBtn = true;
				} else {
					this.isBtn = false;
				}
			},
			/*获取验证码*/
			fnGetPhoneCode() {
				if (this.re.test(this.mobile)) {
					uni.showToast({
						title: "正在发送验证码",
						icon: "loading",
						success: () => {
							// 成功后显示倒计时60s后可在点击
							this.safety.state = true;
							// 倒计时
							this.safety.interval = setInterval(() => {
								if (this.safety.time-- <= 0) {
									this.safety.time = 60;
									this.safety.state = false;
									clearInterval(this.safety.interval);
								}
							}, 1000);
							uni.showToast({
								title: "发送成功",
								icon: "success"
							})
						}
					})
				} else {
					uni.showToast({
						title: "手机号不正确，请重新输入",
						icon: "none"
					})
				}
			},
			RetrieveCode: function() {
				if (this.safety.state == false) {
					if (this.mobile === '' || this.mobile === null) {
						uni.showToast({
							title: "请输入手机号",
							icon: "none"
						})
						return;
					}
					if (!this.re.test(this.mobile)) {
						uni.showToast({
							title: "手机号不正确，请重新输入",
							icon: "none"
						});
						return;
					}
					var data = {
						mobile: this.mobile
					};
					var parameter = '?mobile=' + this.mobile
					api.apiPost('/account/sendmsg', parameter, data, 'POST', (status, res) => {
						if (status) {
							this.fnGetPhoneCode();
						} else {
							uni.showToast({
								title: ""+res.msg,
								icon: "none"
							})
						}
					});
				}
			},
			login: function() {
				if (this.mobile == '') {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					});
					return;
				}
				if (!this.re.test(this.mobile)) {
					uni.showToast({
						title: "手机号不正确，请重新输入",
						icon: "none"
					});
					return;
				}
				if (this.verification == '') {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					});
					return;
				} else {
					var havesession = {
						'Content-Type': 'application/x-www-form-urlencoded',
					};
					var baseURL = 'http://ts.rong298.cn/account/login'
					if (this.urldata == undefined || this.urldata == 'undefined') {
						uni.request({
							url: baseURL, //接口地址。
							method: 'POST',
							header: havesession,
							data: {
								mobile: this.mobile,
								msgCode: this.verification,
							},
							success: (res) => {
								if (res.data.code == 0) {
									uni.setStorageSync('landing', res.data);
									uni.reLaunch({
										url: '/pages/index/index'
									});
								} else {
									uni.showToast({
										title: "" + res.data.msg,
										icon: "none"
									});
								}
							}
						});
					} else {
						uni.request({
							url: baseURL+"?toredirect="+encodeURIComponent(this.urldata), //接口地址。
							method: 'POST',
							header: havesession,
							data: {
								mobile: this.mobile,
								msgCode: this.verification,
							},
							success: (res) => {
								if (res.data.code == 301) {
									uni.setStorageSync('landing', res.data);
									location.href = this.urldata;
									
								} else {
									uni.showToast({
										title: "" + res.data.msg,
										icon: "none"
									});
								}
							}
						});
					}
				}
			}
		}
	}
</script>
<style scoped>
	@import url("../../common/common.css");

	.content {
		width: 630upx;
		margin: 0 60upx 0;
	}

	.loan-btn {
		background: #DCDCDC;
	}

	.active01 {
		background: #257BFF !important;
	}

	.login-t {
		margin-top: 100upx;
		margin-bottom: 20upx;
	}

	.login-ts {
		margin-bottom: 50upx;
	}

	.phonglogin {
		text-align: center;
		font-size: 28upx;
		color: #888;
		margin-top: 60upx;
	}

	.uni-input {
		height: 70upx;
		line-height: 70upx;
		padding-top: 40upx;
		border: none;
	}

	.login-nav01 {
		display: flex;
		border-bottom: 1upx solid #E7E7E7;
	}

	.uni-form-item {
		border-bottom: 1upx solid #E7E7E7;
	}

	.login-nav01 .uni-input {
		flex: 1;
	}

	.register-phone-getcode {
		margin-top: 40upx;
		border: 1upx solid #257BFF;
		color: #257BFF;
		border-radius: 35upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		padding: 0 20upx;
	}
</style>
