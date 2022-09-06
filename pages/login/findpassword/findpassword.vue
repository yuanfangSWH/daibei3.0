<template>
	<view class="content">
		<view class="login-t3 mr-40">找回密码</view>
		  <view>
		    <view class="register-phone">
		      <input class="db-ipt01" v-model="phone" type="number" focus maxlength="11" placeholder="请输入手机号"></input>
		    </view>
		    <view class="register-code">
		      <input class="db-ipt02" v-model="code" type="number" maxlength="4" placeholder="请输入手机验证码"></input>
			  <view class="register-phone-getcode" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</view>
		    </view>
			<view class="register-pwd">
				<input class="db-ipt01" v-model="password" type="password" displayable maxlength="26" placeholder="请输入6-12位密码"></input>
			</view>
			<view class="btn-row">
			    <button type="primary" class="loan-btn" @tap="FindSubmit">提交</button>
			</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				 phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				safety: {
				  time: 10,
				  state: false,
				  interval: ''
				}
			}
		},
		methods: {
			fnGetPhoneCode() {
				if (this.phoneReg.test(this.phone)) {
				uni.showToast({
				  title: "正在发送验证码",
				  icon: "loading",
				  success: () => {
					// 成功后显示倒计时60s后可在点击
					this.safety.state = true;
					// 倒计时
					this.safety.interval = setInterval(() => {
					  if (this.safety.time-- <= 0) {
						this.safety.time = 10;
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
					title: "手机号不正确",
					icon: "none"
				  })
				}
			},
			RetrieveCode: function(){
				if(this.safety.state == false){
					if(this.phone === '' || this.phone === null){
						uni.showToast({
							title: "请输入手机号",
							icon: "none"
						})
						return;
					}
					this.fnGetPhoneCode();	
				}
			}
		}
	}
</script>

<style>
@import url("../../../common/common.css");
.content{ width: 630upx; margin: 30upx 60upx 0;}
</style>
