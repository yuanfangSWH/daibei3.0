<template>
	<view class="content" v-show="pageshow">
		<view class="person-nav01">
			<image class="u-touxiang" :src="userinfo.user_avatar"></image>
			<view class="u-info">
				<view class="u-nic"><text class="u-name">{{userinfo.user_nickname}}</text><text class="u-jibie">{{utype}}</text></view>
				<view class="u-ph"><text class="u-phone">{{mobileXH}}</text>|<text class="uid">UID：{{userinfo.id}}</text></view>
			</view>
			<view class="tzhi" @click="notice">通知<view class="red-dian" v-show="isnotice == 0"></view>
			</view>
		</view>
		
		
		<view class="con-mainbox" v-show="showinfo">
			<view class="u-content">
				<view class="con-left">
					<view class="con-01">
						<view class="c-01">可提现(元)</view>
						<view class="c-02"><text class="t-01">¥</text><text class="t-02">{{accountInfo.accountMoney}}</text></view>
					</view>
					<view class="con-02">
						<view class="c-01">总收入(元)</view>
						<view class="c-04"><text class="t-03">¥</text><text class="t-04">{{accountInfo.allIncome}}</text></view>
					</view>
				</view>
				<view class="con-right">
					<view class="tixian" @click="tixianFun">提现</view>
					<view class="mx" @click="shouzhi">收支明细></view>
				</view>
			</view>
			<view class="con-nav02" @click="upgrader">
				<view class="c-03">
					<view class="c-tdui">下属团队
						<!-- <image class="dj-img" src="../../static/dj-01.png"></image> --><text class="dji-nav">V{{teamData.monthLevel}}</text></view>
					<view class="c-fy">本月还需{{teamData.lack}}元业绩可晋升为V{{djno}} 享更高返佣</view>
				</view>
				<view class="c-05">
					<image class="c-jiantou" src="../../static/jiantou.png"></image>
				</view>
			</view>
		</view>
		
		<view class="db-index-nav01" v-show="showinfo">
			<view class="flex-item" @click="order">
				<image class="db-index-img01" src="../../static/u-order.png"></image><text class="db-index-text">订单查询</text>
			</view>
			<view class="flex-item" @click="team">
				<image class="db-index-img02" src="../../static/u-tuandui.png"></image><text class="db-index-text">客户管理</text>
			</view>
			<view class="flex-item" @click="kefu">
				<image class="db-index-img03" src="../../static/u-kefu.png"></image><text class="db-index-text">联系客服</text>
			</view>
			<view class="flex-item" @click="question">
				<image class="db-index-img01" src="../../static/u-wti.png"></image><text class="db-index-text">常见问答</text>
			</view>
		</view>
		
		<view class="db-index-nav01" v-show="!showinfo">
			<view class="flex-item" @click="order">
				<image class="db-index-img01" src="../../static/u-order.png"></image><text class="db-index-text">订单查询</text>
			</view>
			<view class="flex-item" @click="zhinan">
				<image class="db-index-img03" src="../../static/u-zhinan.png"></image><text class="db-index-text">操作指南</text>
			</view>
			<view class="flex-item" @click="kefu">
				<image class="db-index-img03" src="../../static/u-kefu.png"></image><text class="db-index-text">联系客服</text>
			</view>
			<view class="flex-item" @click="question">
				<image class="db-index-img01" src="../../static/u-wti.png"></image><text class="db-index-text">常见问答</text>
			</view>
		</view>
		
			<!-- 推广邀请 -->
		<view class="yaoqhy" v-show="showinfo">
			<view class="db-menu02" @click="yaoqing()">
				<view class="db-menuyq"><image class="db-menuyq1" src="../../static/yq.png"></image><text class="db-menuyq2">邀请好友</text></view>
				<view class="db-menuyq3">好友越多，赚钱越快</view>
				<image class="db-menuyq4" src="../../static/qianto.png"></image>
			</view>
			</view>		
			
		<!-- 设置 -->
		<view class="db-menu">
			<view class="db-menu02" @click="appxzai()">
				<view class="db-sz"><image class="db-sz1" src="../../static/appxz.png"></image><text class="db-sz2">APP下载</text></view>
				<view class="db-sz3"><image class="db-sz4" src="../../static/qianto.png"></view>
			</view>
			<view class="db-henx"></view>
		
			<view class="db-menu01" @click="tiaozsz()">
				<view class="db-sz"><image class="db-sz1" src="../../static/sz.png"></image><text class="db-sz2">设置</text></view>
				<view class="db-sz3"><text><image class="db-sz4" src="../../static/qianto.png"></image></text></view>
			</view>
		</view>
		
		
	<!-- 上个代呗版本样式 -->
		
		<!-- 	
		<view class="db-menu" v-show="showinfo">
		<view class="u-tuig">推广赚钱</view>
			<view class="tg-v01">
				<image class="tg-img01" src="../../static/u-img01.png" mode="widthFix" @click="tglcFun"></image>
			</view>
			<view class="tg-v01">
				<image class="tg-img02" src="../../static/u-img02.png" mode="widthFix" @click="gotoHehuo"></image>
				<image class="tg-img03" src="../../static/u-img03.png" mode="widthFix" @click="loantgFun"></image>
			</view>
			</view> -->
		
		<!-- <view class="kefu-nav" v-show="!showinfo" @click="kefuFun">
			<image class="kefu-icon" src="../../static/kefu-icon.png"></image>
			<view class="kefu-text">联系客服</view>
		</view> -->
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				usertype: '',
				showinfo: false,
				userinfo: '',
				utype: '合伙人',
				//手机号星号
				mobileXH: '',
				accountInfo: '',
				teamData: '',
				djno: 0,
				txMoney: '',
				isnotice: 0,
				pageshow: false
			}
		},
		onLoad() {
			this.userInfo();
		},
		methods: {
			userInfo: function() {
				uni.showLoading({
					title:'加载中',
					
				})
				api.apiPost('/user/userinfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.userinfo = res.data.baseInfo;
						if(this.userinfo.user_type != 0){
							this.accountInfo = res.data.accountInfo;
							this.txMoney = this.accountInfo.accountMoney;
							this.teamData = res.data.teamInfo;
							this.djno = Number(this.teamData.monthLevel + 1);
						}
						
						//加星号
						var sjh = /^(\d{3})\d+(\d{4})$/;
						var ty = '' + this.userinfo.user_mobile;
						this.mobileXH = ty.replace(sjh, '$1****$2');
						//
						this.usertype = res.data.baseInfo.user_type;
						if (this.usertype == 1) {
							this.showinfo = true;
							this.utype = '合伙人';
						} else {
							this.utype = '普通用户';
							this.showinfo = false;
						}
						//console.log("用户信息: "+JSON.stringify(this.userinfo));
						this.showP();
						uni.hideLoading();
					}else{
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
						uni.hideLoading();
						this.pageshow == false;
					}
				});
			},
			showP: function(){
				this.pageshow = true;
			},
			// 邀请好友
			yaoqing: function() {
				uni.navigateTo({
					url: '/pages/personal/friends/friends'
				})
			},
			// app下载
			appxzai: function() {
				uni.navigateTo({
					url: '/pages/Andriodownload/Andriodownload'
				})
			},
			notice: function() {
				uni.navigateTo({
					url: '/pages/personal/notice/notice'
				})
			},
			shouzhi: function() {
				uni.navigateTo({
					url: '/pages/personal/shouzhi/shouzhi'
				})
			},
			upgrader: function() {
				uni.navigateTo({
					url: '/pages/personal/team/team'
				})
			},
			order: function() {
				uni.navigateTo({
					url: '/pages/personal/order/order'
				})
			},
			team: function() {
				uni.navigateTo({
					url: '/pages/personal/customerGl/customerGl'
				})
			},
			kefu: function() {
				uni.navigateTo({
					url: '/pages/personal/customer/customer'
				})
			},
			question: function() {
				uni.navigateTo({
					url: '/pages/personal/question/question'
				})
			},
			tixianFun: function() {
				uni.navigateTo({
					url: '/pages/withdraw/withdraw'
				})
			},
			gotoHehuo: function() {
				uni.navigateTo({
					url: '/pages/personal/invite/invite'
				})
			},
			tglcFun: function() {
				uni.navigateTo({
					url: '/pages/personal/tglc/tglc'
				})
			},
			loantgFun: function() {
				uni.navigateTo({
					url: '/pages/personal/loantg/loantg'
				})
			},
			zhinan: function() {
				uni.navigateTo({
					url: '/pages/guide/guide'
				})
			},
			// 个人设置中心
			tiaozsz:function(){
				uni.navigateTo({
					url: '/pages/personal/usbthe/usbthe'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	.dji-nav {
		margin-left: 20upx;
		width: 54upx;
		height: 24upx;
		display: inline-block;
		background: url(../../static/dj-bg.png) no-repeat;
		background-size: 54upx 24upx;
		line-height: 24upx;
		text-align: center;
		font-size:20upx;
		color: #FFFFFF;
		font-weight:bold;
	}

	.content {
		width: 690upx;
		margin: 0 30upx 20upx;
		display: inline-block;
	}

	/*个人中心*/
	.person-nav01 {
		width: 630upx;
		padding: 30upx;
		height: 90upx;
		margin-top: 30upx;
		background: #FFFFFF;
		border-radius: 12upx;
		float: left;
		display: flex;box-shadow:0px 6upx 20upx 0px rgba(228,235,245,1);
	}

	.u-touxiang {
		float: left;
		width: 78upx;
		height: 78upx;
		margin-top: 6upx;
		border-radius: 100%;
	}

	.u-info {
		flex: 1;
		float: left;
		margin: 0 20upx;
	}

	.u-name {
		font-size: 26upx;
		color: #000000;
		font-weight: bold;
	}

	.u-nic {
		position: relative;
		top: -4upx;
	}

	.u-jibie {
		height: 34upx;
		padding: 0 20upx;
		background: #E4EFFF;
		color: #528CEF;
		line-height: 34upx;
		border-radius: 17upx;
		font-size: 20upx;
		margin-left: 20upx;
	}

	.u-ph {
		font-size: 22upx;
		color: #868F9F;
		margin-top: 6upx;
	}

	.u-phone {
		font-size: 22upx;
		color: #38393F;
		margin-right: 14upx;
	}

	.uid {
		font-size: 22upx;
		color: #38393F;
		margin-left: 14upx;
	}

	.tzhi {
		height: 46upx;
		width: 90upx;
		line-height: 46upx;
		font-size: 24upx;
		color: #5492F3;
		float: left;
		margin-top: 22upx;
		border: 1upx solid #5492F3;
		border-radius: 23upx;
		text-align: center;
		position: relative;
	}

	.red-dian {
		width: 16upx;
		height: 16upx;
		border: 4upx solid #FFFFFF;
		background: #ED3618;
		border-radius: 100%;
		position: absolute;
		top: -12upx;
		right: 4upx;
	}

	.con-mainbox {
		width: 690upx;
		float: left;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 12upx;
		box-shadow: 0px 6upx 20upx 0px rgba(228, 235, 245, 1);
	}

	.u-content {
		width: 690upx;
		height: 304upx;
		/* background: url(../../static/person-bg.png); */
		background: url(../../static/person-bg.png);
		box-shadow: 0px 6upx 20upx 0px rgba(166, 192, 231, 1);
		border-radius: 12upx;
		background-size: 690upx 304upx;
		float: left;
		display: flex;
	}

	.con-left {
		flex: 1;
		float: left;
		padding: 40upx 0 40upx 40upx;
	}

	.con-01 {
		width: 100%;
		float: left;
		height: 104upx;
		overflow: hidden;
	}

	.c-01 {
		font-size: 24upx;
		color: #D1E6FF;
		margin-bottom: 10upx;
	}

	.t-01 {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.t-02 {
		font-size: 48upx;
		color: #FFFFFF;
	}

	.con-02 {
		width: 100%;
		float: left;
		height: 92upx;
		overflow: hidden;
		margin-top: 28upx;
	}

	.t-03 {
		font-size: 28upx;
		color: #FFFFFF;
	}

	.t-04 {
		font-size: 34upx;
		color: #FFFFFF;
	}

	.con-right {
		padding: 40upx 40upx 40upx 0;
	}

	.tixian {
		width: 170upx;
		height: 68upx;
		line-height: 68upx;
		font-size: 28upx;
		color: #2275FF;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 9upx 9upx 4upx rgba(43, 126, 235, 1);
		border-radius: 34upx;
		text-align: center;
	}

	.mx {
		width: 170upx;
		text-align: center;
		font-size: 28upx;
		color: #D1E6FF;
		height: 40upx;
		line-height: 40upx;
		margin-top: 114upx;
	}

	.con-nav02 {
		width: 610upx;
		padding: 30upx 40upx;
		float: left;
		display: flex;
	}

	.c-03 {
		flex: 1;
	}

	.c-tdui {
		font-size: 28upx;
		color: #38393F;
	}

	.c-fy {
		font-size: 22upx;
		color: #38393F;
		margin-top: 10upx;
	}

	.c-jiantou {
		width: 20upx;
		height: 20upx;
		margin-top: 29upx;
	}

	.dj-img {
		width: 54upx;
		height: 24upx;
		display: inline-block;
		margin: 0 0 0 20upx;
		position: relative;
		top: 4upx;
	}

	.db-index-nav01 {
		width: 690upx;
		margin: 20upx 0;
		background: #ffffff;
		box-shadow: 0px 6upx 20upx 0px rgba(228, 235, 245, 1);
		display: flex;
		text-align: center;
		border-radius: 12upx;
		padding: 30upx 0;
		float: left;
	}

	.db-index-nav01 .flex-item {
		flex: 1;
	}

	.db-index-img01 {
		width: 52upx;
		height: 52upx;
	}

	.db-index-img02 {
		width: 52upx;
		height: 52upx;
	}

	.db-index-img03 {
		width: 52upx;
		height: 52upx;
	}

	.db-index-text {
		font-size: 22upx;
		color: #38393F;
		width: 100%;
		float: left; margin-top: 6upx;
	}



/* 新版本菜单设置模块 */
 .db-menu{
	width: 610upx;
	height:160upx;
	margin: 0;
	background: #ffffff;
	box-shadow:0px 4px 16px 0px rgba(235,235,235,1);
	padding: 30upx 40upx;
	float: left;
	border-radius:12px;
	margin-top: 20upx;
 }
 .db-menu01{
	 margin-top: 40upx;
 }
	 
 .db-menu02{
	 margin-top: 20upx;
 }
.db-sz{
		 display: flex;
	
	}
	.db-sz1{
		 width: 50upx;
		 height: 50upx;
		 margin-top: -20upx;
	}
	.db-sz2{
		 width:auto;
		 height:29upx;
		 font-size:30upx;
		 color:#38393F;
		 margin-left: 24upx;
		 margin-top: -15upx;
		 font-weight: bold;
	}
	.db-sz3{
		 width:auto;
		 height:24upx;
		 font-size:24upx;
		 color:#B3B6BB;
		 float: right;
		 margin-top: -38upx;
		 margin-right: 30upx;
		
		 
	}
	.db-sz4{
		 width: 24upx;
		 height: 24upx;
		 float: right;
		/* margin-top: -35upx; */
		 margin-right:-30upx;
	}



 .yaoqhy{
 	width: 610upx;
 	height:60upx;
 	/* margin: 0; */
 	background: #ffffff;
 	box-shadow:0px 4px 16px 0px rgba(235,235,235,1);
 	padding: 30upx 40upx;
 	float: left;
 	border-radius:12px;
	margin-top: 10upx;
 }
	
	.db-menuyq{
		 display: flex;
	
	}
	.db-menuyq1{
		 width: 50upx;
		 height: 50upx;
		 margin-top: -20upx;
	}
	.db-menuyq2{
		 width:auto;
		 height:29upx;
		 font-size:30upx;
		 color:#38393F;
		 margin-left: 24upx;
		 margin-top: -15upx;
		 font-weight: bold;
	}
	.db-menuyq3{
		 width:auto;
		 height:24upx;
		 font-size:24upx;
		 color:#B3B6BB;
		 float: right;
		 margin-top: -38upx;
		 margin-right: 30upx;
		
		 
	}
	.db-menuyq4{
		 width: 24upx;
		 height: 24upx;
		 float: right;
		 margin-top: -35upx;
	}
	.db-henx{
		 width:upx;
		 height:1upx;
		 background:#F5F5F5;
		 border-radius:1upx;
		 margin-top: 30upx;
	}
	
	
	
</style>
