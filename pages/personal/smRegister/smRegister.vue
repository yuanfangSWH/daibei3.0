<template>
	<view class="content">
		<view class="tImg">
			<image class="smImg" src="../../../static/3.png" mode="widthFix"></image>
		</view>
		<view class="smzcbox">
			<view class="add-nav01">
				<view class="add-t3">申请人</view>
				<view class="add-name"><input v-model="name" class="add-ipt01" type="text" placeholder="请输入本人真实姓名" /></view>
			</view>
			<view class="add-nav01">
				<view class="add-t3">申请人身份证号</view>
				<view class="add-name"><input v-model="sfz" class="add-ipt01" type="text" placeholder="请输入本人真实身份证号" /></view>
			</view>
			<view class="add-nav01">
				<view class="add-t3">申请人手机号</view>
				<view class="add-name"><input v-model="mobile" class="add-ipt01" maxlength="11" type="text" placeholder="请输入本人手机号" /></view>
			</view>
			<view class="add-nav01">
				<view class="add-t3">验证码</view>
				<view class="yzmbox">
					<input class="add-ipt01" v-model="verification" type="number" maxlength="4" placeholder="请输入验证码" />
					<view class="register-phone-getcode" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</view>
				</view>
			</view>
			<view class="tx-xieyi">
				<checkbox-group @change="gouxFun">
					<label>
						<checkbox value="cb" checked="true" color="#257BFF" style="transform:scale(0.7)" />
					</label><view class="xieyinav">注册即同意<navigator hover-class="none" class="xieyi_a01" url="../../agreement/agreement">《隐私政策》</navigator></view>
				</checkbox-group>
			</view>
			<view class="btn-row">
				<button type="primary" class="loan-btn" @click="FindSubmit">立即申请</button>
			</view>
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
				verification: '',
				re: /^1[3-9][0-9]{9}$/,
				reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				isXuan: 'cb',
				safety: {
					time: 60,
					state: false,
					interval: '',
					token: '',
					tUrl: '',
				},
				isApply: true,
			}
		},
		onLoad(e) {
			var url=location.href.split('?').pop();
			this.tUrl = decodeURIComponent(decodeURIComponent(url, "UTF-8"), "UTF-8");
			//console.log("这个"+this.tUrl);
			var str= this.tUrl;
			this.tUrl = str.replace(/\+/g,'%2B');
			//console.log("参数："+this.tUrl);
		},
		methods: {
			gouxFun: function(e) {
				this.isXuan = e.mp.detail.value;
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
						title: "手机号不正确",
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
						} else {
							uni.showToast({
								title: ""+res.msg,
								icon: "none"
							})
						}
					});
				}
			},
			FindSubmit: function() {
				var _this=this;
				if (this.name === '' || this.name === null) {
					uni.showToast({
						title: "请输入姓名",
						icon: "none"
					})
					return;
				}
				if (!this.regName.test(this.name)) {
					uni.showToast({
						icon: 'none',
						title: '姓名不正确，请重新输入'
					});
					return;
				}
				if (this.sfz === '') {
					uni.showToast({
						icon: 'none',
						title: '身份证号不能为空'
					});
					return;
				}
				if (!this.reg.test(this.sfz)) {
					uni.showToast({
						icon: 'none',
						title: '身份证号输入有误，请重新输入'
					});
					return;
				}
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
				if (this.isXuan == '') {
					uni.showToast({
						title: "请阅读并同意协议",
						icon: "none"
					})
					return;
				}
				var data = {
					name: this.name,
					sfz: this.sfz,
					mobile: this.mobile,
					msgCode: this.verification,
				};
				var parameter = '?name=' + this.name + '&sfz=' + this.sfz + '&mobile=' + this.mobile + '&msgCode=' + this.verification;
				if(this.isApply == true){
					this.isApply = false;
					if (this.tUrl != "" || this.tUrl != undefined) {
						api.apiPost('/account/login?' + this.tUrl, parameter, data, 'POST', (status, res) => {
							if (status) {
								this.isApply = true;
								//登录信息本地缓存储存
								uni.setStorageSync('landing', res.data);
								
								switch(uni.getSystemInfoSync().platform){
									case 'android':
									   //console.log('运行Android上')
									   uni.navigateTo({
									   	url: '/pages/Andriodownload/Andriodownload'
									   })
									   break;
									case 'ios':
									   //console.log('运行iOS上')
									  uni.navigateTo({
									  	url: '/pages/IOSdowmload/IOSdowmload'
									  })
									   break;
									default:
									  //console.log('运行在开发者工具上')
									 uni.navigateTo({
									 	url: '/pages/Andriodownload/Andriodownload'
									 });
									   break;
								}
							} else if(res.code > 400) {
								this.isApply = true;
								uni.showToast({
									title: "" + res.msg,
									icon: "none"
								});
							} else if(res.code == 205) {
								this.isApply = true;
								uni.showModal({
								    title: '下载APP',
								    //content: res.data,
									content: "安装APP，赚钱更方便",
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
														// uni.switchTab({
														// 	url:'/pages/index/index'
														// })
														switch(uni.getSystemInfoSync().platform){
															case 'android':
															   //console.log('运行Android上')
															   uni.navigateTo({
															   	url: '/pages/Andriodownload/Andriodownload'
															   })
															   break;
															case 'ios':
															   //console.log('运行iOS上')
															  uni.navigateTo({
															  	url: '/pages/IOSdowmload/IOSdowmload'
															  })
															   break;
															default:
															  //console.log('运行在开发者工具上')
															 uni.navigateTo({
															 	url: '/pages/Andriodownload/Andriodownload'
															 });
															   break;
														}
													}
												})
								        } else if (res.cancel) {
								            //console.log('用户点击取消');
								        }
								    }
								});
							} else {
								this.isApply = true;
								uni.showToast({
									title: "" + res.msg,
									icon: "none"
								});
							}
						});
					} else {
						api.apiPost('/account/login', parameter, data, 'POST', (status, res) => {
							if (status) {
								this.isApply = true;
								//登录信息本地缓存储存
								uni.setStorageSync('landing', res.data);
								uni.reLaunch({
									url: '/pages/guanzhuGzh/guanzhuGzh'
								})
							} else {
								this.isApply = true;
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
	}
</script>

<style scoped>
	page {
		background: #F2F5FA;
	}

	.content {}

	.tImg {
		width: 750upx;
	}

	.smImg {
		width: 750upx;
	}

	.smzcbox {
		width: 750upx;
		background: #FFFFFF;
		margin-top: 20upx;
		padding: 40upx 0;
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
		font-weight: bold;
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
		margin: 30upx 0 30upx 50upx;
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
		background: #1F8EFF;
		border-radius: 46upx;
		box-shadow: 0px 3px 8px 0px rgba(132, 192, 252, 1);
	}

	.yzmbox {
		display: flex;
		margin: 0 0 20upx;
	}

	.register-phone-getcode {
		margin-top: 20upx;
		font-size: 28upx;
		background: #1F8EFF;
		color: #FFFFFF;
		border-radius: 35upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		padding: 0 20upx;
	}
	.xieyi_a01{ color: #257BFF; display: inline-block;}
</style>
