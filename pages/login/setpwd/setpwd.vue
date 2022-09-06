<template>
	<view class="content">
		<view class="login-t3 mr-setpwd">设置密码</view>
		<view>
			<view class="register-pwd">
				<input class="db-ipt01" v-model="password" type="password" displayable maxlength="12" placeholder="请输入6-12位密码"></input>
			</view>
			<view class="btn-row">
				<button type="primary" class="loan-btn" @click="FindSubmit">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
  import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				password: ''
			}
		},
		methods: {
			FindSubmit: function(){
        if(this.password === ''){
        	 uni.showToast({
        	    icon: 'none',
        	    title: '密码不能为空！'
        	});
        	return;
        }
        if(this.password.length < 6 || this.password.length > 12){
        	 uni.showToast({
        	    icon: 'none',
        	    title: '密码长度不能小于6位且不能大于12位！'
        	});
        	return;
        }else{
          var data = {
            	pwd: this.password,
            };
          var parameter = '?pwd=' + this.password;
        	api.apiPost('/account/setpwd', parameter, data, 'POST', (status, res, code) => {
        		if (res.code == 0) {
        			uni.setStorageSync('landing', res.data);
              uni.navigateTo({
              	url:'/pages/login/certification/certification'
              })
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
.mr-setpwd{ margin: 150upx 0 50upx;}
</style>
