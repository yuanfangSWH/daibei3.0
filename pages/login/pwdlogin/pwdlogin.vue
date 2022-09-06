<template>
	<view class="content">
	  <view class="login-find">
	  	<navigator url="/pages/login/findpassword/findpassword" redirect hover-class="none" open-type="navigate"><text class="find-pwd">找回密码</text></navigator>
	  </view>
	  <view class="login-t3 mr-40">密码登录</view>
	  <view>
		<view class="register-phone">
		  <input class="db-ipt01" v-model="mobile" type="number" focus maxlength="11" placeholder="请输入手机号"></input>
		</view>
		<view class="register-pwd">
			<input class="db-ipt01" v-model="password" type="password" displayable maxlength="26" placeholder="请输入6-12位密码"></input>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="login">登录</button>
		</view>
	  </view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				mobile: '18778922241',
				password: '123456',
				phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
			}
		},
		methods: {
			login: function() {
				if (this.mobile == '') {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					});
					return;
				}
				if (!this.phoneReg.test(this.mobile)) {
					uni.showToast({
						title: "手机号不正确，请重新输入",
						icon: "none"
					});
					return;
				}
				if (this.password == '') {
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					});
					return;
				}
				if(this.password.length < 6 || this.password.length > 13){
					 uni.showToast({
					    icon: 'none',
					    title: '密码长度不能小于6位且不能大于13位！'
					});
					return;
				}else {
					/* const requestTask = uni.request({
						url: 'http://www.huaniaopet.com/index/login', //仅为示例，并非真实接口地址。
						data: {
							mobile: this.mobile,
							password: this.password
						},
						method:'post',
						success: function(res) {
							//登录信息本地缓存储存
							uni.setStorageSync('cache', res.data);
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
					}); */
					
					
					
					var data = {
						mobile: this.mobile,
						password: this.password
					};
					var parameter = '?mobile=' + this.mobile + '&password=' + this.password;
					//调用API登录
					api.apiPost('/index/login', parameter, data, 'post', (status, res, code) => {
						if (res.code == 0) {
							//console.log("数据："+ JSON.stringify(res.data));
							//登录信息本地缓存储存
							uni.setStorageSync('cache', res.data);
							//用户ID本地缓存储存
							//uni.setStorageSync('theuserID', JSON.stringify(res.data.member_id));
							//跳转首页
							uni.reLaunch({
								url: '/pages/index/index'
							});
							
						} else {
							uni.showToast({
								title: "" + res.msg,
								icon: "none"
							});
						}
					});
				}
			}
		}
	}
</script>

<style>
@import url("../../../common/common.css");
.content{ width: 630upx; margin: 30upx 60upx 0;}
</style>
