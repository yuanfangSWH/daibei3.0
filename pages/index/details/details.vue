<template>
	<view v-show="pageshow">
		<view>
			<view class="hehuo-je" id="xq-box">
				<view class="hehuo-a01">最高借款金额（元）</view>
				<view class="hehuo-a02">
					<rich-text :nodes="maxLoan"></rich-text>
				</view>
				<view class="hehuo-a03">
					<view class="hehuo-b01">
						<image class="qian-icon" style="margin-left: 132upx;" src="../../../static/qian-icon.png"></image><text class="hehuo-t01">日利率{{infobox.loan_cost}}</text>
					</view>
					<view class="hehuo-b01">
						<image class="qian-icon" src="../../../static/time-icon.png"></image><text style="margin-right: 100upx;" class="hehuo-t01">最快{{infobox.loan_pass_time}}放款</text>
					</view>
				</view>
			</view>
			<view class="sq-yaoqiu">
				<view class="yaoqiu-title">申请要求</view>
				<view class="yaoqiu-list">
					<view>
						<rich-text :nodes="textbox.sqyq"></rich-text>
					</view>
				</view>
			</view>
			<view class="sq-yaoqiu">
				<view class="yaoqiu-title">操作流程</view>
				<view class="wyjdiv">
					<view class="shouz1">
						<text>操作教程</text>
					</view>
					<view class="shouz2">
						<view class="nmbdbt">{{infobox.loan_name}}</view>
						<view class="btojb">{{infobox.loan_introduce}}</view>
						<view class="wtdan" @click="gotoJiaocheng">查看操作教程图>></view>
					</view>
				</view>
				<view class="cailiao-lc">
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/ct-icon01.png"></image>
						</view>
						<view class="cailiao-a02">申请人信息</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/ct-icon02.png"></image>
						</view>
						<view class="cailiao-a02">实名认证</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/ct-icon03.png"></image>
						</view>
						<view class="cailiao-a02">提交资料</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/ct-icon04.png"></image>
						</view>
						<view class="cailiao-a02">绑卡收款</view>
					</view>
				</view>
			</view>

			<view class="sq-yaoqiu sq-xiang">
				<view class="yaoqiu-title">产品介绍</view>
				<view class="yaoqiu-list">
					<view>
						<rich-text :nodes="textbox.cpxq"></rich-text>
					</view>
				</view>
			</view>
			<view class="applyuser-info">
				<view class="icon-v">
					<image class="icon-fang" src="../../../static/icon01.png"></image>
				</view>
				<view class="info-title">申请人信息</view>
				<view class="info-con">
					<view class="info-nav">
						<view class="info-con-title">申请人</view>
						<view class="info-i"><input class="info-ipt01" type="text" placeholder="请输入姓名" v-model="xname" :disabled="!hasUinfo" /></view>
					</view>
					<view class="info-nav">
						<view class="info-con-title">申请人身份证</view>
						<view class="info-i"><input class="info-ipt01" type="text" placeholder="请输入身份证号" v-model="sfz" :disabled="!hasUinfo" /></view>
					</view>
					<view class="info-nav">
						<view class="info-con-title">申请人手机号</view>
						<view class="info-i"><input class="info-ipt01" type="text" placeholder="请输入手机号" v-model="mobile" :disabled="!hasUinfo" /></view>
					</view>
					<view class="info-nav" v-show="hasUinfo">
						<view class="info-con-title">手机验证码</view>
						<view class="info-i"><input class="info-ipt01" type="text" placeholder="请输入手机验证码" maxlength="4" v-model="msgCode" /><text
							 class="code" @tap="!safety.state ? RetrieveCode() : ''">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</text></view>
					</view>
					<view class="tx-xieyi">
						<checkbox-group @change="gouxFun">
							<label>
								<checkbox value="cb" checked="true" color="#257BFF" style="transform:scale(0.7)" />
							</label>
							<view class="xieyinav">注册即同意<navigator hover-class="none" class="xieyi_a01" url="../../agreement/agreement">《用户注册隐私协议》</navigator>
								用户数据已加密处理</view>
						</checkbox-group>
					</view>
				</view>
			</view>
			<view class="zhuce"><button class="zhuce-btn" @click="zcapply">注册并申请</button></view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniIcon,
			uniRate,
		},
		data() {
			return {
				icontype: 'arrowdown',
				title: 'picker',
				array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				index: 11,
				productID: '',
				infobox: {},
				loanname: '',
				urldata: '',
				ukey: '',
				utoken: '',
				textbox: {
					sqyq: '',
					cpxq:''
				},
				zhouqi: Number(12),
				dkmoney: Number(0),
				loanCost: parseFloat(0.00),
				yuefeilv: Number(0),
				huankuan: 0.00,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				sfzreg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				phoneReg: /^1[3-9][0-9]{9}$/,
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				mobile: '',
				sfz: '',
				xname: '',
				msgCode: '',
				key: '',
				userdata: '',
				hasUinfo: true,
				pageshow: true,
				toUrl: '',
				pIcon: '',
				isApply: true,
				maxLoan: ''
			}
		},
		onLoad(option) {
			this.productID = option.id;
			this.ukey = option.key;
			this.utoken = option.token;
			if (option.icon) {
				this.pIcon = option.icon;
			}
			this.pullData();
		},
		onUnload() {},
		methods: {
			pullData: function() {
				uni.showLoading({
					title: '加载中'
				})
				var data = '';
				var parameter = '';
				if (this.ukey != undefined && this.utoken != undefined && this.productID != undefined) {
					data = {
						id: this.productID,
						key: this.ukey,
						token: this.utoken,
					};
					parameter = '?id=' + this.productID + '&key=' + this.ukey + '&token=' + this.utoken;
				} else if (this.ukey == undefined && this.utoken == undefined && this.productID != undefined) {
					data = {
						id: this.productID,
					};
					parameter = '?id=' + this.productID;
				} else if (this.ukey != undefined && this.utoken != undefined && this.productID == undefined) {
					data = {
						key: this.ukey,
						token: this.utoken,
					};
					parameter = '?key=' + this.ukey + '&token=' + this.utoken;
				} else if (this.ukey == undefined && this.utoken == undefined && this.productID == undefined) {
					data = '';
					parameter = '';
				}
				api.apiPost('/loan/info', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.infobox = res.data.loadInfo;
						var maxnum = this.infobox.loan_money_end;
						var result = '',
							counter = 0,
							strings = '<div style="font-size:30px !important;  display:inline-block;">,</div>';
						maxnum = (maxnum || 0).toString();
						for (var i = maxnum.length - 1; i >= 0; i--) {
							counter++;
							result = maxnum.charAt(i) + result;
							if (!(counter % 3) && i != 0) {
								result = strings + result;
							}
						}
						this.maxLoan = result;
						var axx = Number(this.infobox.loan_pass_rate);
						this.infobox.rate = axx;
						this.textbox = JSON.parse(this.infobox.text);
						this.key = this.infobox.key;
						this.dkmoney = this.infobox.loan_money_end;
						var fl = this.infobox.loan_cost;
						var reg = RegExp(/%/); //校验是否包含%
						if (fl.match(reg)) {
							// 包含   
							fl = fl.substr(0, fl.length - 1); //去除最后一位字符  
						}
						var number = fl / 100;
						this.loanCost = number.toFixed(4);
						this.yuefeilv = Number(this.loanCost);
						this.jisuan();
						//产品标题
						this.loanname = this.infobox.loan_name;
						uni.setNavigationBarTitle({
							title: this.loanname
						});
						if (res.data.userInfo) {
							this.hasUinfo = false;
							this.msgCode = 'history';
							this.userdata = res.data.userInfo;
							this.xname = this.userdata.name;
							this.sfz = this.userdata.card;
							this.mobile = this.userdata.mobile;
						} else {
							this.hasUinfo = true;
							this.msgCode = '';
						}
						this.showP();
						uni.hideLoading();
						setTimeout(function() {
							var outurl = window.location.href;
							var w = document.body.clientWidth;
							var cw = '';
							var o = document.getElementById("xq-box");
							cw = o.clientWidth || o.offsetWidth;
							if (cw > w) {
								location.reload(true);
							}
						}, 10);
						//微信分享
						var wximg = this.pIcon;
						var wxtitle = this.infobox.loan_name;
						var jweixin = require('jweixin-module') //npm安装的引用  
						var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码 
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
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						uni.hideLoading();
						this.pageshow == false;
					}
				});
			},
			showP: function() {
				this.pageshow = true;
			},
			jisuan: function() {
				var jine = Number(this.dkmoney);
				var x = (jine * this.yuefeilv * this.zhouqi + jine) / this.zhouqi; //每月还款额
				var f_x = parseFloat(x);
				if (isNaN(f_x)) {
					return false;
				}
				var f_x = Math.round(x * 100) / 100;
				this.huankuan = f_x;
			},
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value;
				this.zhouqi = parseInt(this.index + 1);
				this.jisuan();
			},
			calculateFun: function() {
				this.jisuan();
			},
			//提交
			zcapply: function() {
				if (this.hasUinfo == true) {
					if (this.xname === '') {
						uni.showToast({
							icon: 'none',
							title: '真实姓名不能为空'
						});
						return;
					}
					if (!this.regName.test(this.xname)) {
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
				}
				var data = '',
					parameter = '';
				if (this.utoken != undefined) {
					data = {
						mobile: this.mobile,
						sfz: this.sfz,
						name: this.xname,
						msgCode: this.msgCode,
						key: this.key,
						token: this.utoken,
					};
					parameter = '?mobile=' + this.mobile + '&sfz=' + this.sfz + '&name=' + this.xname + '&msgCode=' + this.msgCode +
						'&key=' + this.key + '&token=' + this.utoken;
				} else {
					data = {
						mobile: this.mobile,
						sfz: this.sfz,
						name: this.xname,
						msgCode: this.msgCode,
						key: this.key,
					};
					parameter = '?mobile=' + this.mobile + '&sfz=' + this.sfz + '&name=' + this.xname + '&msgCode=' + this.msgCode +
						'&key=' + this.key;
				}
				if (this.isApply == true) {
					this.isApply = false;
					api.apiPost('/apply/loan', parameter, data, 'post', (status, res, code) => {
						if (res.code == 0) {
							this.isApply = true;
							this.toUrl = res.data.toUrl;
							location.href = this.toUrl;
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
			gotoJiaocheng: function(){
				uni.navigateTo({
					url:"/pages/guide/guide?cur=1"
				})
			}
		},
	}
</script>

<style scoped>
	@import url("../../../components/details.css");

	page {
		background-color: #FFFFFF;
	}

	/* CSS */
	.wyjdiv {
		width: 100%;
		height: 180upx;
		display: flex;
		padding-top: 15upx;
	}

	.shouz1{
		width: 270upx;
		height: 180upx;
		margin-left: 5upx;
		border-radius:15upx;
		background-image: url(../../../static/czsc.png);
		background-size: contain;
	}
	.shouz1 text{
		font-size: 40upx;
		color: #FFFAFB;
		text-align: center;
		padding-top: 70upx;
		display: block;
		letter-spacing:6upx
	}

	.shouz2 {
		flex: 1;
		height: 100%;
		margin-left: 50upx;
	}

	.nmbdbt {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 38upx;
		color: #252320;
		font-weight: bold;
	}

	.btojb {
		width: 100%;
		height: 60upx;
		line-height: 50upx;
		font-size: 20upx;
		color: #949494;
	}

	.wtdan {
		width: 280upx;
		height: 70upx;
		background: rgba(31, 142, 255, 1);
		border-radius: 35upx;
		line-height: 70upx;
		font-size: 24upx;
		color: #FFFFFF;
		text-align: center;
	}

	.sq-yaoqiu2 {
		width: 716upx;
		margin: 50upx 0 0;
	}

	.cailiao-lc {
		width: 660upx;
		display: flex;
		padding-top: 35upx;
		margin-left: auto;
		margin-right: auto;
	}

	.cailiao-nav {
		flex: 1;
		text-align: center;
	}

	.cailiao-a01 image {
		width: 60upx;
		height: 60upx;
	}

	.cailiao-a02 {
		font-size: 24upx;
		font-weight: 400;
		color: #949494;
		padding-top: 12upx;
		line-height: 36upx;
	}

	.cailiao-icon image {
		width: 29upx;
		height: 23upx;
		display: block;
		padding-top: 20upx;
	}

	/* CSS结束 */
	.hehuo-je {
			width: 716upx;
			height: 246upx;
			background-image: url(../../../static/cardbg.png);
			background-size: 716upx 246upx;box-shadow:0px 6upx 18upx 0px rgba(27,115,245,0.5); border-radius: 20upx;
			margin-left: 8px;
			margin-right: 8px;
			margin-top: 15px;
		}
	.hehuo-a01 {
			font-size: 24upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: #B1D5FF;
			text-align: center;
			padding-top: 26upx;
		}
	
		.hehuo-a02 {
			font-size: 88upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			padding: 0;
		}
	
		.hehuo-a03 {
			display: flex;
		}
	
		.hehuo-b01 {
			flex: 1;
			text-align: center; line-height: 34upx;
		}
	.qian-icon {
			width: 24upx;
			height: 24upx;
			margin-right: 12upx;
			position: relative;
			top: 4upx;
		}
		.hehuo-t01 {
			font-size: 22upx;
			color: #B1D5FF;
		}
		/*  */
	.yaoqiu-list>>>p {
		background: url(../../../static/dian.png) no-repeat left 22upx;
		background-size: 10upx 10upx;
		padding-left: 30upx;
		color: #949494 !important;
		font-size: 28upx !important;
		line-height: 56upx;
	}

	.yaoqiu-list>>>span {
		font-size: 28upx !important;
		color: #949494 !important;
	}

	.nav01-bg {
		background-image: url(../../../static/xq-ptbg.png);
		background-size: 750upx 340upx !important;
		background-repeat: no-repeat;
		padding-top: 100upx;
	}

	/* 协议CSS */
	.tx-xieyi {
		display: flex;
		font-size: 20upx;
		font-family: PingFang-SC-Medium;
		color: #B1B1B1;
		width: 100%;
		padding-top: 40upx;
		padding-bottom: 30upx;
	}

	.xieyinav {
		display: inline-block;
		position: relative;
		top: 4upx;
	}

	.xieyi_a01 {
		color: #257BFF;
		display: inline-block;
	}
</style>
