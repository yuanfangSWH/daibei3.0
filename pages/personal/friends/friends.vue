<template>
	<view class="page" v-show="pageshow">
		<view class="haoybj">
			<view class="haoybj-01">好友做业务越多</view>
			<view class="haoybj-02">我的收入越高</view>
		</view>
		<view class="haoyou-01"> <!-- v-for="(item,key) in teamdata" :key="key" -->
			<view class="db-haoyou">
				<view class="db-haoyou-01" @click="haoyou()">好友人数：<text class="db-haoyou-02">{{teamdata.myFriendsNum}}</text></view>
				<view class="db-haoyou1-03" @click="haoyou()"><image class="db-haoyou-04" src="../../../static/xyj.png"></image></view>
			</view>
			<view class="db-yaoq-01" @click="yqhaoyou">
				<view class="db-yaoq-02">邀请好友</view>
			</view>
		</view>
		
		
		<view class="haoyou-02" @click="tguan()">
			<view class="db-haoyou">
				<view class="db-haoyou-01">好友累计给我赚钱</view>
				<image class="db-haoyou-05" src="../../../static/xyj.png"></image>
				<view class="db-haoyou-03">玩法规则</view>
			</view>
			<view class="jingri">
				<view>
				<view class="jingri-01">{{teamdata.todayFriendsMoney}}<text class="jingri-02">元</text></view>
	 	    <!-- 	显示00元 -->
				<!-- <view class="jingri-01" v-else-if="todayFriendsMoney ==0">0.00<text class="jingri-02">元</text></view> -->
				<view class="jingri-03">今日好友给我贡献</view>
				</view>
				<view>
				<view class="by-01">{{teamdata.allFriendsMoney}}<text class="by-02">元</text></view>
			<!-- 	显示00元 -->
				<!-- <view class="by-01" v-else-if="allFriendsMoney ==0">0.00<text class="by-02">元</text></view> -->
				<view class="by-03">当前阶段总收入</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="haoyou-02" @click="jianli()">
			<view class="db-haoyou">
				<view class="db-haoyou-01">团队累计给我赚钱</view>
				<image class="db-haoyou-05" src="../../../static/xyj.png"></image>
				<view class="db-haoyou-03">玩法规则</view>
				
			</view>
			<view class="jingri">
				<view>
				<view class="jingri-01"><text>{{teamdata.teamAllMoney}}</text><text class="jingri-02">元</text></view>
				<view class="jingri-03">本月团队给我贡献</view>
				</view>
				<view>
				<view class="by-01"><text>{{teamdata.allTeamMoney}}</text><text class="by-02">元</text></view>
				<view class="by-03">当前阶段总收入</view>
				</view>
			</view>
		</view>
		
		<view class="haoyou-02">
			<view class="db-haoyou">
				<view class="db-haoyou-01">我的推荐人</view>
				<image class="db-haoyou-06" @click="telFun()" src="../../../static/xyj.png"></image>
				<view class="db-haoyou2-03" @click="telFun()"> 联系Ta</view>
				
			</view>
			<view class="lxta">
				<view class="lxta-01">
					<image class="lxta-02" src="../../../static/news-01.png" v-if="userLeaderId ==0"></image>
				<image class="lxta-02" :src="teamdata.userLeaderAvatar" v-else></image>
				</view>
				<view class="lxta-03">他邀请了<text class="lxta-04">{{teamdata.leaderTeamNum}}</text>人，当前累计收益<text class="lxta-05">{{teamdata.leaderTeamMoney}}</text> <text class="lxta-06">元</text></view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
		    // 自定义获取接口数据
			teamdata: '',
			// 页面加载
            pageshow: false,
			// 组件弹框
			show: false,
			
			lxdhdata: '',
			// // 判断今日好友共享
			// todayFriendsMoney: '',
			// friend: '',
			// //判断好友当前阶段收入
			// allFriendsMoney: '',
			// friend1: '',
			// //判断团队今日收入
			// team: '',
			// // 判断团队当前阶段收入
			// team1: '',
			}
		},
		// 生命周期
		onLoad() {
	      this.teamyeji();
		},
		methods: {	
			// 获取查询数据	
		teamyeji: function() {
			uni.showLoading({
				title:'加载中',
				
			})
			api.apiPost('/user/invitation', '', '', 'get', (status, res, code) => {
				if (res.code == 0) {
					this.teamdata = res.data.Invitation;
					this.lxdhdata = res.data.leaderMobile;
					// this.todayFriendsMoney = res.data.todayFriendsMoney;
					// this.allFriendsMoney = res.data.allFriendsMoney;
					// // 判断好友今日收入
					// if (this.todayFriendsMoney != 0) {
					// 	this.todayFriendsMoney = false;
					// } else {
					// 	this.todayFriendsMoney = true;
					// }
					// // 判断好友当前收入
					// if (this.allFriendsMoney != 0) {
					// 	this.allFriendsMoney = false;
					// } else {
					// 	this.allFriendsMoney = true;
					// }
					// 页面加载获取用户数据
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
				
				
		 // 联系ta拨打电话
		 telFun: function() {
		 	window.location.href = "tel:" + this.teamdata.leaderMobile;
		 },
		 //联系电话弹框插件
		 togglePopup(type, open) {
		 	switch (type) {
		 		// 顶部弹出
		 		case 'top':
		 			this.content = ''
		 			break
		         // 底部弹出
		 		case 'bottom':
		 			this.content = ''
		 			break
		 		// 中部弹出
		 		case 'center':
		 			this.content = ''
		 			break
		 	}
		 	//top弹框点击事件		
		 	this.type = type
		 	if (open === 'tip') {
		 		this.show = true
		 	} else {
		 		this.$refs[open].open()
		 	}
		 },
		 cancel(type) {
		 	if (type === 'tip') {
		 		this.show = false
		 		return
		 	}
		 	this.$refs[type].close()
		 },
		 change(e) {
		 	console.log(e.show)
		 },
		 
			// 进入团队业绩页面
			haoyou: function() {
				uni.navigateTo({
					url: '/pages/personal/team/team'
				})
			},
			// 邀请好友页面
			yqhaoyou: function() {
				uni.navigateTo({
					url: '/pages/personal/invite/invite'
				})
			},
			// 好友累计给我赚钱
			tguan: function() {
				uni.navigateTo({
					url: '/pages/personal/tglc/tglc'
				})
			},
			// 团队累计给我赚钱
			jianli: function() {
				uni.navigateTo({
					url: '/pages/personal/upgraderules/upgraderules'
				})
			},
		
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
	.haoybj{
		width: 750upx;
		height:432upx;
		background-image: url('~@/static/yaoqing.png');
		background-size: contain;
	}
	.haoybj-01{
		width:300upx;
		height:33upx;
		font-size:34upx;
		font-family:FZLanTingHei-EL-GBK;
		font-weight:400;
		color:#FFFFFF;
		padding-top: 140upx;
		margin-left: 30upx;
	}
	.haoybj-02{
		width:400upx;
		height:52upx;
		font-size:56upx;
		font-family:FZLanTingHei-B-GBK;
		font-weight:bold;
		color:#FFFFFF;
		padding-top: 23upx;
		margin-left: 30upx;
	}
	.haoyou-01{
		width:690upx;
		height:208upx;
		background:#FFFFFF;
		box-shadow:0px 4px 16px 0px rgba(235,235,235,1);
		border-radius:10upx;
		margin-left: auto; margin-right: auto;
		margin-top: -102upx;
	}
	.db-yaoq-01{
		width:630upx;
		height:90upx;
		background:#2A8CFB;
		border-radius:45px;
		margin-left: auto; margin-right: auto;
		margin-top: 60upx;
	}
	.db-yaoq-02{
		width:150upx;
		height:34upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#FFFFFF;
		margin-left: auto; margin-right: auto;
		padding-top: 23upx;
	}
	.haoyou-02{
		width:690upx;
		height:224upx;
		background:#FFFFFF;
		box-shadow:0px 4px 16px 0px rgba(235,235,235,1);
		border-radius:10upx;
		margin-left: auto; margin-right: auto;
		margin-top: 30upx;
	}
    .db-haoyou{
		
	}
	.db-haoyou-01{
		width:250;
		height:29upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#38393F;
		line-height: 90upx;
		/* padding-top: 30upx; */
		margin-left: 30upx;
		display: flex;
	}
	.db-haoyou-02{
		width:400upx;
		height:29upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#38393F;
		line-height: 90upx;
	}
	.db-haoyou-03{
		width:150upx;
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#B3B6BB;
	    float: right;
		margin-right: -40upx;
	}
	.db-haoyou1-03{
		width:150upx;
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#B3B6BB;
	    float: right;
		/* margin-right: -40upx; */
	}
	.db-haoyou2-03{
		width:150upx;
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#B3B6BB;
	    float: right;
		margin-right: -40upx;
	}
	.db-haoyou-04{
		width: 24upx;
		height: 24upx;
		float: right;
		margin-right: 30upx;
		
		
	}
	.db-haoyou-05{
		width: 24upx;
		height: 24upx;
		float: right;
		margin-right: 30upx;
		margin-top: 5upx;
	}
	.db-haoyou-06{
		width: 24upx;
		height: 24upx;
		float: right;
		margin-right:30upx;
		margin-top: 5upx;
	}
	.jingri{
		width: 330upx;
		height: 100%;
		display: flex;
	}
	.jingri-01{
		width:auto;
		height:36upx;
		font-size:50upx;
		font-family:DINPro;
		font-weight:bold;
		color:#ED5D31;
		margin-left: 79upx;
		line-height: 150upx;
	}
	.jingri-02{
		width:250upx;
		height:27upx;
		font-size:30upx;
		font-weight:bold;
		color:#ED5D31;
	}
	.jingri-03{
		width:250upx;
		height:27upx;
		font-size:28upx;
		font-weight:500;
		color:#83878E;
		line-height: 216upx;
		margin-left: 79upx;
	}
	.by-01{
		width:auto;
		height:36upx;
		font-size:50upx;
		font-family:DINPro;
		font-weight:bold;
		color:#38393F;
		margin-left: 65upx;
		line-height: 150upx;
	}
	.by-02{
		width:300upx;
		height:27upx;
		font-size:30upx;
		font-weight:bold;
		color:#38393F;
	}
	.by-03{
		width:300upx;
		height:27upx;
		font-size:28upx;
		font-weight:500;
		color:#83878E;
		line-height: 216upx;
		margin-left: 65upx;
	}
 .lxta{
	 display: flex;
	 width: 100%;
 }
 .lxta-02{
	 width:96upx;
	 height:96upx;
	 border-radius:50%;
	 margin-left: 30upx;
	 margin-top: 58upx;
	 
 }
 .lxta-03{
	 width:auto;
	 height:28upx;
	 font-size:28upx;
	 font-family:PingFang SC;
	 font-weight:500;
	 color:#83878E;
	padding-top: 85upx;
	margin-left: 21upx;
 }
 .lxta-05{
	 color: #ED5D31;
 }
 .lxta-06{
 	 color: #ED5D31;
 }
 /* 电话弹出框css */
 .uni-tip {
 	padding: 15upx;
 	width: 512upxpx;
 	background: #FFFFFF;
 	box-sizing: border-box;
 	border-radius: 32upx;
 }
 
 .uni-tip-title {
 	text-align: center;
 	font-weight: bold;
 	font-size: 28upx;
 	color: #333;
 }
 
 .uni-tip-content {
 	padding: 50upx;
 	font-size: 28upx;
 	color: #666;
 }
 .uni-tip-content1 {
 	padding: 50upx;
 	font-size: 28upx;
 	color: #666;
 	text-align: center;
 }
 
 .uni-tip-group-button {
 	margin-top: 20upx;
 	display: flex;
 }
 
 .uni-tip-button-qx {
 	width: 100%;
 	text-align: center;
 	font-size: 28upx;
 	color: #9D9D9D;
 }
 .uni-tip-button-qd {
 	width: 100%;
 	text-align: center;
 	font-size: 28upx;
 	color: #2A8CFB;
 }
 .uni-tip-button-1{
 	width:512upx;
 	height: 2upx;
 	background:#DFE4EA;
 }
 .uni-tip-button-2{
 	width:2upx;
 	height: 83upx;
 	background:#DFE4EA;
 	margin-left: auto;
 	margin-right: auto;
 	margin-top: -20upx;
 }
 
</style>
