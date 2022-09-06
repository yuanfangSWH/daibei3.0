<template>
	<view class="content">
		<view class="applytitle">申请人信息</view>
		<view class="apply-row">
			<text class="apply-t">申请人</text>
			<view class="apply-iptbox"><input class="apply-ipt" v-model="name" type="text" placeholder="请输入姓名" placeholder-style="color:#CFCFCF" /></view>
		</view>
		<view class="apply-row">
			<text class="apply-t">身份证</text>
			<view class="apply-iptbox"><input class="apply-ipt" v-model="sfz" type="text" placeholder="请输入身份证号" maxlength="18"
				 placeholder-style="color:#CFCFCF" /></view>
		</view>
		<view class="apply-row">
			<text class="apply-t">手机号</text>
			<view class="apply-iptbox"><input class="apply-ipt" v-model="mobile" type="text" placeholder="请输入手机号"
				 placeholder-style="color:#CFCFCF" /></view>
		</view>
		<view class="apply-row">
			<text class="apply-t">验证码</text>
			<view class="apply-iptbox"><input class="apply-ipt" v-model="msgCode" type="text" placeholder="请输入手机验证码"
				 placeholder-style="color:#CFCFCF" maxlength="4" /><text class="code" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</text></view>
		</view>
		<view class="xieyi-box">
			<label>
				<checkbox value="cb" checked="true" color="#257BFF" style="transform:scale(0.6)" /></label><view class="xieyinav">注册即同意<navigator hover-class="none" class="xieyi_a01" url="../../agreement/agreement">《隐私政策》</navigator></view>
		</view>
		<button class="register-btn" @click="loanapply">提交申请并注册</button>
		<view class="applyuser">
			<view class="a-title">历史申请人记录</view>
			<view class="apply-list" v-for="item in historybox" :key="item.id" @click="historynext(item.id)">
				<view class="a-left">
					<view class="a-n01">姓名：{{formatName(item.name)}}</view>
					<view class="a-n02">手机号：{{item.mobile}}</view>
					<view class="a-n02">身份证：{{item.sfz}}</view>
				</view>
				<view class="a-right">
					<uni-icon :type="icontype" size="20"></uni-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				icontype: 'arrowright',
				mobile: '',
				sfz: '',
				name: '',
				msgCode: '',
				key: '',
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				sfzreg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				phoneReg: /^1[3-9][0-9]{9}$/,
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				historybox: '',
				toUrl: '',
				userid: '',
				isApply: true,
			}
		},
		onLoad(e) {
			if (e.key) {
				this.key = e.key;
			}
			//微信分享
			var wximg = '';//分享图标
			var wxtitle = '';
			if(e.fxtitle){
				wximg = e.icon;
				wxtitle = e.fxtitle;
			}
			var jweixin = require('jweixin-module') //npm安装的引用  
			var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
			//var surl = encodeURIComponent(location.href);//据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
			api.apiPost('/index/wxshare?shareurl=' + surl, '', '', 'get', (status, res, code) => {
				if (status) {
					jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
						appId: res.data.appId, // 必填，公众号的唯一标识  
						timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
						nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
						signature: res.data.signature, // 必填，签名，见附录1  
						jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表          
					});
					jweixin.ready(function() {
						//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
						jweixin.updateAppMessageShareData({
							title: wxtitle, // 分享标题  
							desc: "便捷申请，秒审批秒到账", // 分享描述  
							link: location.href, // 分享链接  
							imgUrl: wximg, // 分享图标
							success: function() {
								// 用户确认分享后执行的回调函数
							},
							fail: function() {}
						});
						//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
						jweixin.updateTimelineShareData({
							title: wxtitle, // 分享标题
							link: location.href, // 分享链接  
							imgUrl: wximg, // 分享图标
							success: function() {
								// 用户确认分享后执行的回调函数  
							},
							fail: function() {}
						});
					});
					jweixin.error(function(e) {
						//console.log("错误数据："+JSON.stringify(e))
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
			//微信分享
			this.historydata();
		},
		methods: {
			loanapply: function() {
				if (this.name === '') {
					uni.showToast({
						icon: 'none',
						title: '真实姓名不能为空'
					});
					return;
				}
				if (!this.regName.test(this.name)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的真实姓名'
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
				if (!this.sfzreg.test(this.sfz)) {
					uni.showToast({
						icon: 'none',
						title: '身份证号输入有误，请重新输入'
					});
					return;
				}
				if (this.mobile === '') {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					});
					return;
				}
				if (!this.phoneReg.test(this.mobile)) {
					uni.showToast({
						title: "手机号不正确,请重新输入",
						icon: "none"
					});
					return;
				};
				if (this.msgCode === '') {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return;
				}
				var data = {
					mobile: this.mobile,
					sfz: this.sfz,
					name: this.name,
					msgCode: this.msgCode,
					key: this.key,
				};
				var parameter = '?mobile=' + this.mobile + '&sfz=' + this.sfz + '&name=' + this.name + '&msgCode=' + this.msgCode +
					'&key=' + this.key;
				if(this.isApply == true){
					this.isApply = false;
					api.apiPost('/apply/loan', parameter, data, 'post', (status, res, code) => {
						// console.log("status："+status);
						//if(!Object.is(res.data.inComeList, {})){
						if (res.code == 0) {
							this.isApply = true;
							this.toUrl = res.data.toUrl;
							location.href = this.toUrl;
							// uni.navigateTo({
							//   url: "/pages/index/apply/apply?url="+this.toUrl
							// })
						} else {
							this.isApply = true;
							uni.showToast({
								title: '' + res.msg,
								icon: 'none'
							})
							return;
						}
					});
				}
			},
			/*获取验证码*/
			fnGetPhoneCode() {
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
			},
			RetrieveCode: function() {
				if (this.mobile === '') {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					});
					return;
				}
				if (!this.phoneReg.test(this.mobile)) {
					uni.showToast({
						title: "手机号不正确,请重新输入",
						icon: "none"
					});
					return;
				};
				if (this.safety.state == false) {
					var data = {
						mobile: this.mobile
					};
					var parameter = '?mobile=' + this.mobile
					api.apiPost('/apply/message', parameter, data, 'post', (status, res, code) => {
						//console.log("hhss:" + JSON.stringify(res));
						if (res.code == 0) {
							this.fnGetPhoneCode();
							//console.log(JSON.stringify(res));
						} else {
							uni.showToast({
								title: "" + res.msg,
								icon: "none"
							})
						}
					});
				}
			},
			historydata: function() {
				api.apiPost('/apply/history', '', '', 'get', (status, res, code) => {
					if (!Object.is(res.data.history, {})) {
						this.historybox = res.data.history;
						//console.log("sk"+JSON.stringify(this.historybox));
					}
				});
			},
			formatName: function(str) {
				return new Array(str.length).join('*') + str.substr(-1);
			},
			historynext: function(id) {
				uni.navigateTo({
					url: "/pages/index/historyapply/historyapply?id=" + id + "&key=" + this.key
				})
			},
		}
	}
</script>

<style>
	.content {
		width: 650upx;
		margin: 30upx 50upx;
	}

	.applytitle {
		font-size: 36upx;
		font-weight: bold;
		color: #000000;
		margin-bottom: 60upx;
	}

	.apply-row {
		margin-bottom: 50upx;
		display: flex;
	}

	.apply-t {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		line-height: 50upx;
	}

	.apply-iptbox {
		flex: 1;
		display: flex;
		margin-left: 30upx;
		border-bottom: 1upx solid #EDEDED;
		height: 74upx;
	}

	.apply-ipt {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		padding-bottom: 10upx;
		flex: 1;
	}

	.code {
		width: 184upx;
		height: 57upx;
		line-height: 57upx;
		background: rgba(37, 123, 255, 1);
		border-radius: 29upx;
		font-size: 28upx;
		text-align: center;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.xieyi-box {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(177, 177, 177, 1);
	}

	.xieyi-box text {
		color: #257BFF;
	}

	.register-btn {
		margin-top: 50upx;
		height: 87upx;
		background: rgba(37, 123, 255, 1);
		border-radius: 44upx;
		border: none;
		line-height: 87upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
	}

	.applyuser {
		margin-top: 100upx;
	}

	.a-title {
		font-size: 36upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		line-height: 34upx;
	}

	.apply-list {
		display: flex;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2upx 15upx 1upx rgba(235, 244, 255, 1);
		border-radius: 8upx;
		padding: 20upx 30upx;
		margin-top: 30upx;
	}

	.a-left {
		flex: 1;
	}

	.a-n01 {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(24, 33, 48, 1);
	}

	.a-n02 {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(153, 168, 188, 1);
		padding-top: 10upx;
	}

	.a-right {
		line-height: 130upx;
		color: #99A8BC;
	}
	.xieyinav {
		display: inline-block; position: relative; top: 4upx;
	}
	.xieyi_a01{ color: #257BFF; display: inline-block;}
</style>
