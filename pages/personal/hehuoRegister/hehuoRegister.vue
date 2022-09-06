<template>
	<view class="content">
		<view class="dnmbt">注册合伙人</view>
		<view class="add-nav01">		
			<view class="add-name"><input v-model="mobile" class="add-ipt01" type="text" maxlength="11" placeholder="请输入手机号" /></view>
		</view>
		<view class="add-nav01">
			
			<view class="yzmbox">
				<input class="add-ipt01" v-model="verification" type="number" maxlength="4" placeholder="请输入验证码" />
				<view class="register-phone-getcode" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</view>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="FindSubmit">提交</button>
		</view>
		<view class="tx-xieyi">
			注册即同意<navigator hover-class="none" class="xieyi_a01" url="../../agreement/agreement">《用户注册协议》</navigator>和<navigator hover-class="none" class="xieyi_a01" url="../../agreement/agreement">《软件使用规范》</navigator>
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
				weixin: '',
				mobile: '',
				verification: '',
				re: /^1[3-9][0-9]{9}$/,
				reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				safety: {
					time: 60,
					state: false,
					interval: '',
					toredirect: ''
				},
				token: '',
				isApply: true,
			}
		},
		onLoad(e) {
			var url=location.href.split('token=').pop();
			//console.log("token11:>>>>"+url)
			this.token = decodeURIComponent(decodeURIComponent(url, "UTF-8"), "UTF-8");
			//console.log("这个token22："+this.token);
			var str=this.token;
			this.token = str.replace(/ /g,'%2B');
			this.toredirect = e.toredirect;
		},
		methods: {
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
							//this.mobile = res.data.mobile;
							//console.log('数据：' + JSON.stringify(res.data));
							this.fnGetPhoneCode();
						} else if(res.code > 400) {
							uni.showToast({
								title: "" + res.msg,
								icon: "none"
							});
						} else if(res.code < 400) {
							uni.showToast({
								title: "" + res.data,
								icon: "none"
							});
						}
					});
				}
			},
			//提交
			FindSubmit: function() {
				var _this = this;
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
				if (this.verification === '' || this.verification === null) {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return;
				}
				var data = {
					mobile: this.mobile,
					msgCode: this.verification
				};
					var parameter = '?mobile=' + this.mobile +'&msgCode=' + this.verification;
				if(this.isApply == true){
					this.isApply = false;
					if (this.token != '' || this.token != undefined) {
						api.apiPost('/account/login?token=' + this.token, parameter, data, 'post', (status, res, code) => {
							if (res.code == 0) {
								this.isApply = true
								//登录信息本地缓存储存
								uni.setStorageSync('landing', res.data);
								uni.reLaunch({
									url: '/pages/guanzhuGzh/guanzhuGzh'
								})
							} else if(res.code > 400) {
								this.isApply = true
								uni.showToast({
									title: "" + res.msg,
									icon: "none"
								});
							} else if(res.code == 205) {
								this.isApply = true
								uni.showModal({
								    title: '登录提示',
								    content: res.data,
								    success: function (res) {
								        if (res.confirm) {
								            //console.log('用户点击确定');
											var data = {
												mobile: _this.mobile,
												msgCode: _this.verification,
											};
											var parameter = '?mobile=' + _this.mobile + '&msgCode=' + _this.verification;
												api.apiPost('/account/login?opcode=1000', parameter, data, 'post', (status, res, code) => {
													if(res.code == 0){
														uni.switchTab({
															url:'/pages/index/index'
														})
													} else if(res.code > 400) {
														uni.showToast({
															title: "" + res.msg,
															icon: "none"
														});
													}
												})
								        } else if (res.cancel) {
								            //console.log('用户点击取消');
								        }
								    }
								});
							}
						});
					
					} else {
						api.apiPost('/account/login', parameter, data, 'post', (status, res, code) => {
							if (res.code == 0) {
								this.isApply = true
								//登录信息本地缓存储存
								uni.setStorageSync('landing', res.data);
								uni.reLaunch({
									url: '/pages/guanzhuGzh/guanzhuGzh'
								})
							}  else if(res.code > 400) {
								this.isApply = true
								uni.showToast({
									title: "" + res.msg,
									icon: "none"
								});
							} else if(res.code == 205) {
								this.isApply = true
								// uni.showToast({
								// 	title: "" + res.data,
								// 	icon: "none"
								// });
								uni.showModal({
								    title: '登录提示',
								    content: res.data,
								    success: function (res) {
								        if (res.confirm) {
								            //console.log('用户点击确定');
											var data = {
												mobile: _this.mobile,
												msgCode: _this.verification,
											};
											var parameter = '?mobile=' + _this.mobile + '&msgCode=' + _this.verification;
												api.apiPost('/account/login?opcode=1000', parameter, data, 'post', (status, res, code) => {
													if(res.code == 0){
														uni.switchTab({
															url:'/pages/index/index'
														})
													}
												})
								        } else if (res.cancel) {
								            //console.log('用户点击取消');
								        }
								    }
								});
							}
						});
					}
				}
			}
		}
	}
</script>

<style scoped>
	.dnmbt{
		font-size: 62upx;
		height: 200upx;
		line-height: 200upx;
		margin-left: 50upx;
	}
	.content {
		margin-top: 40upx;
	}

	.add-nav01 {
		width: 650upx;
		margin: 0 50upx 70upx;
		border-bottom: 1upx solid #EEF3F8;
	}

	.add-ipt01 {
		flex: 1;
		margin-top: 30upx;
	}

	.add-t3 {
		font-size: 30upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(71, 78, 88, 1);
	}

	.add-name {
		font-size: 32upx;
		font-family: PingFang-SC-Regular;
		color: rgba(0, 0, 0, 1);
		margin: 14upx 0 20upx;
	}

	.tx-xieyi {
		display: flex;
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		color: #B1B1B1;
		margin: 30upx 0 30upx 90upx;
		position: fixed;
		bottom: 20upx;
	}

	.xieyinav {
		display: inline-block; position: relative; top: 4upx;
	}

	.xieyi-text {
		color: #257BFF;
	}

	.btn-row {
		margin: 0 50upx;
	}

	.loan-btn {
		background: rgba(37, 123, 255, 1);
		border-radius: 46upx;
	}

	.yzmbox {
		display: flex;
		margin: 0 0 20upx;
	}

	.register-phone-getcode {
		margin-top: 20upx;
		font-size: 28upx;
		color: #257BFF;
		border-radius: 35upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		padding: 0 20upx;
		border: 1px #257BFF solid;
	}
	.xieyi_a01{ color: #257BFF; display: inline-block;}
</style>
