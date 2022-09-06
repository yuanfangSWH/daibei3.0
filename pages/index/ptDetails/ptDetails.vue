<template>
	<view v-show="pageshow">
		<view class="hehuo-nav01">
			<view class="hehuo-je" id="xq-box">
				<view class="hehuo-a02">
					{{infobox.card_name}}
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
						<view class="nmbdbt">{{infobox.card_name}}</view>
						<view class="btojb">{{infobox.card_introduce}}</view>
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
			<view class="sq-yaoqiu">
				<view class="jcbox">
					<view class="yaoqiu-title fynav">产品介绍</view><view class="czjc" @click="gotoJiaocheng"><text>操作教程</text><uni-icons type="arrowright" color="#008FFB" size="14"></uni-icons></view>
				</view>
				<view class="yaoqiu-list" style="padding-bottom: 170upx;">
					<view>
						<rich-text :nodes="textbox.cpxq"></rich-text>
					</view>
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
			</view>
		</view>
		<view class="zhuce"><button class="zhuce-btn" @click="zcapply">注册并申请</button></view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				productID: '',
				infobox: '',
				loanname: '',
				textbox: '',
				key: '',
				luyou: '',
				maxLoan: '',
				pageshow: false,
				ukey:'',
				utoken:'',
				mobile: '',
				sfz: '',
				xname: '',
				msgCode: '',
				hasUinfo: true,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
				sfzreg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				phoneReg: /^1[3-9][0-9]{9}$/,
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				userdata: '',
				toUrl: '',
				pIcon:'',
				isApply: true,
			}
		},
		onLoad(option) {
			this.productID = option.id;
			this.ukey = option.key;
			this.utoken = option.token;
			if(option.icon){
				this.pIcon = option.icon;
			}
			// console.log("productID："+this.productID);
			// console.log("ukey："+this.ukey);
			// console.log("utoken："+this.utoken);
			this.pullData();
			//console.log("津冀:"+location.href.split('?').pop());
		},
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
				api.apiPost('/card/info', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.infobox = res.data.cardInfo;
						//console.log("详情数据："+JSON.stringify(this.infobox));
						var sss = this.infobox.card_details_text;
						if(sss == ''){
							this.textbox = this.infobox.card_details_text;
						}else{
							this.textbox = JSON.parse(this.infobox.card_details_text);
						}
						this.key = this.infobox.key;
						//console.log(this.textbox);
						//产品标题
						this.loanname = this.infobox.card_name;
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
							cw = o.clientWidth||o.offsetWidth;
							if (cw > w) {
								location.reload(true);
							}
						}, 10);
						//微信分享
						var wximg = this.pIcon;
						var wxtitle = this.infobox.card_name;
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
					} else if (res.code == 401) {} else {
						uni.showToast({
							title: "数据加载失败",
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
				if(this.isApply == true){
					this.isApply = false;
					api.apiPost('/apply/card', parameter, data, 'post', (status, res, code) => {
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
								title: ""+res.msg,
								icon: "none"
							})
						}
					});
				}
			},
			gotoJiaocheng: function(){
				uni.navigateTo({
					url:"/pages/guide/guide?cur=2"
				})
			}
		}
	}
</script>

<style scoped>
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
	
	
	.cailiao-nav {
		flex: 1;
		text-align: center;
	}
	
	.cailiao-a01 image {
		width: 48upx;
		height: 48upx;
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
	}
	
	/* CSS结束 */
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

	.hehuo-nav01 {
		width: 716upx;
		margin: 30upx 17upx 0;
	}

	.hehuo-je {
		width: 716upx;
		height: 246upx;
		background-image: url(../../../static/cardbg.png);
		background-size: 716upx 246upx;box-shadow:0px 6upx 18upx 0px rgba(27,115,245,0.5); border-radius: 20upx;
	}

	.xq-nav02 {
		width: 610upx;
		margin: 0 13upx;
		display: flex;
		background: #FFFFFF;
		padding: 30upx 40upx;
		box-shadow: 0px 11upx 35upx 0px rgba(233, 236, 240, 1);
		border-radius: 16upx;
	}

	.loan-beizhu {
		flex: 1;
		text-align: center;
	}

	.bz-t01 {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(117, 118, 120, 1);
	}

	.bz-t02 {
		font-size: 30upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #2D2A27;
		font-weight: bold;
	}

	.gx-t {
		height: 60upx;
		width: 2upx;
		background: #D8DBE6;
		display: inline-block;
	}

	.xq-tishi {
		font-size: 22upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(219, 219, 219, 1);
		text-align: center;
		margin-top: 30upx;
	}

	.sq-yaoqiu {
		width: 690upx;
		margin: 50upx 13upx 0;
	}

	.sq-yaoqiu2 {
		width: 716upx;
		margin: 50upx 0 0;
	}

	.sq-xiang {
		padding-bottom: 50upx;
	}

	.yaoqiu-title {
		font-size: 32upx;
		font-weight: bold;
		color: #2D2A27 !important;
		padding-bottom: 26upx;
	}

	.yaoqiu-list {
		font-size: 28upx;
		color: #949494 !important;
		line-height: 44upx;
	}

	.blue-dian {
		width: 10upx;
		height: 10upx;
		background: rgba(48, 158, 255, 1);
		border-radius: 50%;
		float: left;
		margin: 16upx 20upx 0 0;
	}

	.hehuo-a01 {
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: #B1D5FF;
		text-align: center;
		padding-top: 48upx;
	}

	.hehuo-a02 {
		font-size: 48upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		padding: 54upx 0 16upx;
	}

	.hehuo-a03 {
		display: flex;
	}

	.hehuo-b01 {
		flex: 1;
		text-align: center;
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

	.fixed-apply {
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 130upx;
		border-top: 1upx solid #EAF1F8;
		background: #FFFFFF;
		display: flex;
	}

	.benren-apply {
		margin-left: 22upx;
		margin-top: 20upx;
		flex: 1;
		height: 86upx;
		line-height: 86upx;
		border: 1upx solid rgba(31, 142, 255, 1);
		border-radius: 43upx;
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(31, 142, 255, 1);
		text-align: center;
	}

	.tuiguang {
		margin: 0 22upx;
		margin-top: 20upx;
		flex: 1;
		width: 340upx;
		height: 86upx;
		line-height: 86upx;
		background: rgba(31, 142, 255, 1);
		box-shadow: 0px 6upx 14upx 0px rgba(132, 192, 252, 1);
		border-radius: 43upx;
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: #fff;
		text-align: center;
	}
	.applyuser-info{ width: 690upx; border-top: 30upx solid #F2F5FA; padding: 30upx 30upx 150upx; position: relative;}
	.icon-v{ width: 690upx; text-align: center; position: absolute; top: -54upx; left: 30upx;}
	.icon-fang{ width: 51upx; height: 51upx;}
	.info-title{ font-size:34upx;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
	.info-con{ padding: 0 30upx;}
	.info-con-title{ font-size: 26upx; color: #000000; padding: 48upx 0 20upx; font-weight: bold;font-family:PingFang-SC-Bold;}
	.info-i{font-size:30upx;font-family:PingFang-SC-Medium;font-weight:500; border-bottom: 1upx solid #DADDE2; padding-bottom: 14upx; display: flex;}
	.info-ipt01{ flex: 1; color: #9a99a3; }
	.info-code{width:156upx;height:50upx; line-height: 50upx; border:1upx solid rgba(28,119,255,1);border-radius:25upx; color: rgba(28,119,255,1); font-size: 24upx; text-align: center;}
	.zhuce{width:750upx;height:112upx;background:rgba(255,255,255,1);border-top:1upx solid rgba(234,241,248,1);box-shadow:0px 5upx 17upx 1upx rgba(232,239,246,1); position: fixed; left: 0; bottom: 0;}
	.zhuce-btn{width:690upx;height:86upx;background:rgba(31,142,255,1);box-shadow:0px 6upx 14upx 0px rgba(132,192,252,1);border-radius:43upx; margin: 8upx 30upx 0; color: #FFFFFF;font-size:36upx;
	font-family:PingFang-SC-Medium;font-weight:500;}
	.applyuser-info >>> .uni-input-placeholder{ color: #d6d6e0;}
	.code{ color: #3A89FF; border:1px solid #3A89FF; border-radius: 32upx; font-size: 24upx; padding: 0 16upx; height: 48upx; line-height: 48upx;}
	.jtxia{ width: 42upx; height: 26upx; float: left;}
	.jtxia .jtimg { width: 22upx; height: 13upx;}
	.jcbox{ width: 100%;display: flex;}
	.fynav{ flex: 1;}
	.czjc{ font-size: 28upx; color: #008FFB; padding-top: 6upx;}
</style>
