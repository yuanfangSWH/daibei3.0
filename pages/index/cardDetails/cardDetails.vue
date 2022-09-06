<template>
	<view v-show="pageshow">
		<view class="hehuo-nav01">
			<view class="hehuo-je">
				<view class="hehuo-a02">
					{{infobox.card_name}}
				</view>
				<view class="hehuo-a03">
					<view class="hehuo-b01">
						<image class="qian-icon" style="margin-left: 132upx;" src="../../../static/qian-icon.png"></image><text class="hehuo-t01">返佣{{infobox.card_pass_fanyong}}</text>
					</view>
					<view class="hehuo-b01">
						<image class="qian-icon" src="../../../static/time-icon.png"></image><text style="margin-right: 100upx;" class="hehuo-t01">{{infobox.card_pass_end}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="xq-nav02">
				<view class="loan-beizhu">
					<view class="bz-t01">最快放款</view>
					<view class="bz-t02">{{infobox.loan_pass_time}}</view>
				</view>
				<text class="gx-t"></text>
				<view class="loan-beizhu">
					<view class="bz-t01">月费率</view>
					<view class="bz-t02">{{infobox.loan_cost}}</view>
				</view>
				<text class="gx-t"></text>
				<view class="loan-beizhu">
					<view class="bz-t01">贷款期数</view>
					<view class="bz-t02">{{infobox.loan_periods_start}}-{{infobox.loan_periods_end}}</view>
				</view>
			</view>
			<view class="xq-tishi">*仅供参考，请以实际审批结果为准*</view> -->
			<view class="sq-yaoqiu">
				<view class="yaoqiu-title">申请要求</view>
				<view class="yaoqiu-list">
					<view>
						<rich-text :nodes="textbox.sqyq"></rich-text>
					</view>
				</view>
			</view>
			<view class="sq-yaoqiu2">
				<view class="yaoqiu-title" style="padding-left: 13upx;">推广流程</view>
				<view class="wyjdiv">
					<view class="shouz1">
						<text>操作教程</text>
					</view>
					<view class="shouz2">
						<view class="nmbdbt">{{infobox.card_name}}</view>
						<view class="btojb">{{infobox.card_introduce}}</view>
						<view class="wtdan" @click="gotoJiaocheng">查看推广教程图>></view>
					</view>
				</view>
				<view class="cailiao-lc">
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/cl-icon01.png"></image>
						</view>
						<view class="cailiao-a02">点击“立即推广”保存海报</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/cl-icon02.png"></image>
						</view>
						<view class="cailiao-a02">客户扫码<br />注册并申请</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/cl-icon03.png"></image>
						</view>
						<view class="cailiao-a02">申请成功<br />贷款到账</view>
					</view>
					<view class="cailiao-icon">
						<image src="../../../static/cl-icon05.png"></image>
					</view>
					<view class="cailiao-nav">
						<view class="cailiao-a01">
							<image src="../../../static/cl-icon04.png"></image>
						</view>
						<view class="cailiao-a02">等待结算日<br />结算佣金</view>
					</view>
				</view>
			</view>
			<view class="sq-yaoqiu">
				<view class="jcbox">
					<view class="yaoqiu-title fynav">返佣说明</view><view class="czjc" @click="gotoJiaocheng"><text>推广教程</text><uni-icons type="arrowright" color="#008FFB" size="14"></uni-icons></view>
				</view>
				
				<view class="yaoqiu-list">
					<view>
						<rich-text :nodes="textbox.fysm"></rich-text>
					</view>
				</view>
			</view>
			<view class="sq-yaoqiu">
				<view class="yaoqiu-title">产品介绍</view>
				<view class="yaoqiu-list" style="padding-bottom: 170upx;">
					<view>
						<rich-text :nodes="textbox.cpxq"></rich-text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-apply">
			<view class="benren-apply" @click="loanapply">更改申请人</view>
			<view class="tuiguang" @click="loanTuig">立即推广</view>
		</view>
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
				url:'',
				pIcon:'',
			}
		},
		onLoad(option) {
			this.productID = option.id;
			this.pIcon = option.icon;
			this.pullData();
			//console.log("津冀:"+location.href.split('?').pop());
		},
		methods: {
			pullData: function() {
				uni.showLoading({
					title: '加载中'
				})
				var data = {
					id: this.productID,
				};
				var parameter = '?id=' + this.productID;
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
						this.dataFun();
						this.showP();
						uni.hideLoading();
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
			dataFun: function() {
				var _this = this;
				api.apiPost('/user/teamext', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						_this.url = res.data.shareUrl;
						//微信分享
						var wximg = _this.pIcon;//分享图标
						var wxtitle = _this.infobox.card_name;
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
										link: _this.url, // 分享链接  
										imgUrl: wximg, // 分享图标
										success: function() {
											// 用户确认分享后执行的回调函数
										},
										fail: function() {}
									});
									//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
									jweixin.updateTimelineShareData({
										title: wxtitle, // 分享标题
										link: _this.url, // 分享链接  
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
					}else{
						uni.showToast({
							title:""+res.msg,
							icon:'none'
						});
					}
				})
			},
			loanapply: function() {
				uni.navigateTo({
					url: '/pages/index/cardApply/cardApply?key=' + this.key + '&fxtitle=' + encodeURIComponent(this.loanname) + '&icon=' + encodeURIComponent(this.pIcon)
				})
			},
			loanTuig: function() {
				uni.navigateTo({
					url: '/pages/index/poster/poster?id=' + this.productID
				})
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
	/* CSS */
	.wyjdiv{
		width: 100%;
		height: 180upx;
		display: flex;
		padding-top: 15upx;
	}
	.shouz1{
		width: 270upx;
		height: 180upx;
		margin-left: 15upx;
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
	.shouz2{
		flex: 1;
		height: 100%;
		margin-left: 50upx;
	}
	.nmbdbt{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 38upx;
		color: #252320;
		font-weight: bold;
	}
	.btojb{
		width: 100%;
		height: 60upx;
		line-height: 50upx;
		font-size: 20upx;
		color: #949494;
	}
	.wtdan{
		width:280upx;
		height:70upx;
		background:rgba(31,142,255,1);
		border-radius:35upx;
		line-height: 70upx;
		font-size: 24upx;
		color: #FFFFFF;
		text-align: center;
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
	.jcbox{ width: 100%;display: flex;}
	.fynav{ flex: 1;}
	.czjc{ font-size: 28upx; color: #008FFB; padding-top: 6upx;}
</style>
