<template>
	<view>
		<!-- 验证码登录 -->
		<view class="login-box uni-flex uni-row">
			<view class="uni-form-item uni-column">
				<text class="login-t">更换手机号码</text>
				<text class="login-t2">{{mobileXH}}</text>
				<input class="uni-input" v-model="mobile" type="number" maxlength="11" placeholder="新手机号" @click="hideTabbar"
				 @focus="hideTabbar" @blur="showTabbar" @input="funIpt" />
			</view>
			<view class="login-nav01">
				<input class="uni-input" v-model="verification" type="number" maxlength="4" placeholder="验证码" @click="hideTabbar"
				 @focus="hideTabbar" @blur="showTabbar" @input="funIpt" />
				<view class="register-phone-getcode" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</view>
			</view>
			<view style="height: 56upx;"></view>
			<view class="uni-padding-wrap uni-common-mt">
				<button class="loan-btn active01" type="primary" v-if="isBtn" @click="login">确定</button>
				<button class="loan-btn" type="primary" v-else>确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import Enumerable from '../../../common/linq/linq.js';
	//jsencrypt插件
	import JSEncrypt from '../../../common/js/jsencrypt.min.js';
	//MD5加密
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				//新手机号
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
				//数据
				userinfo: '',
				//星号手机号
				mobileXH: ''
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
			//var a = location.href;
			//var b = a.split("?toredirect=");
			//this.urldata = decodeURIComponent(b[1]);//对url解码
			this.chaxsjData();
		},
		methods: {
			//查询数据
			chaxsjData: function() {
				api.apiPost('/user/userinfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.userinfo = res.data.baseInfo;
						//加星号
						var sjh = /^(\d{3})\d+(\d{4})$/;
						var ty = '' + this.userinfo.user_mobile;
						this.mobileXH = ty.replace(sjh, '$1****$2');
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			pawLogin: function() {
				this.isshow = true;
			},
			mobileLogin: function() {
				this.isshow = false;
			},
			//按钮的判断1
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
			//按钮的判断2
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
						title: "新手机号格式错误",
						icon: "none"
					})
				}
			},
			//获取验证码
			RetrieveCode: function() {
				if (this.safety.state == false) {
					if (this.mobile === '' || this.mobile === null) {
						uni.showToast({
							title: "请输入新手机号",
							icon: "none"
						})
						return;
					}
					if (!this.re.test(this.mobile)) {
						uni.showToast({
							title: "新手机号格式错误",
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
								title: "" + res.msg,
								icon: "none"
							})
						}
					});
				}
			},
			//修改手机号码
			login: function() {
				if (this.mobile == '') {
					uni.showToast({
						title: "请输入新手机号码",
						icon: "none"
					});
					return;
				}
				if (!this.re.test(this.mobile)) {
					uni.showToast({
						title: "新手机号格式错误",
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
					uni.request({
						url: 'http://ts.rong298.cn/account/updatephone', //接口地址。
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						data: {
							//新手机号码
							mobile: this.mobile,
							//手机验证码
							msgCode: this.verification,
						},
						success: (res) => {
							if (res.data.code == 0) {
								uni.reLaunch({
									url: '/pages/personal/replacecg/replacecg'
								});
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
</script>
<style scoped>
	@import url("../../../common/common.css");

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

	.login-t2 {
		display: block;
		font-size: 36upx;
		color: #010101;
		padding-top: 50upx;
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
