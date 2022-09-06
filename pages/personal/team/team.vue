<template>
	<view class="content" v-show="pageshow">
		<view class="team-nav01">
			<view class="team-title">我的团队业绩<view class="lishiyj" @click="yejiFun">历史业绩></view>
			</view>
			<view class="team-con">
				<view class="td-nav1">
					<view class="td-n01">
						<view class="td-nav1-left">
							<view class="left-01">本月团队等级</view>
							<view class="left-02">V{{teamyjdata.monthLevel}}</view>
						</view>
						<view class="td-nav1-right">
							<view class="left-01">预估我的奖金（元）</view>
							<view class="left-02">{{teamyjdata.expectMoney}}</view>
						</view>
					</view>
					<view class="td-n02" @click="shengji">
						<text class="td-text01">提升团队等级，可享受奖金翻倍！</text>
						<text>奖励规则></text>
					</view>
				</view>
			
				<view class="td-nav2">
					<view class="td-nav2-b">
						<view class="td-nav2-c">本月总返佣(元)</view>
						<view class="td-nav2-d">{{teamyjdata.teamAllMoney}}</view>
					</view>
					<view class="td-nav2-b">
						<view class="td-nav2-c">我的返佣(元)</view>
						<view class="td-nav2-d">{{teamyjdata.myMonthIncome}}</view>
					</view>
					<view class="td-nav2-b">
						<view class="td-nav2-c">下属团队(个)</view>
						<view class="td-nav2-d">{{teamyjdata.myTeamNum}}</view>
					</view>
					<view class="td-nav2-b">
						<view class="td-nav2-c">团队人数(个)</view>
						<view class="td-nav2-d">{{teamyjdata.teamAllNums}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="team-nav01" v-show="hasTj">
			<view class="team-title">我的推荐人</view>
			<view class="team-con02">
				<view class="team-a01">
					<image class="tj-peple" :src="tjPeople.lead_avatar"></image><text class="tj-name">{{tjPeople.lead_name}}</text>
				</view>
				<view class="team-a02">
					
					<view class="kf-weixin2" data-clipboard-action="copy" :data-clipboard-text="wxhao" @click="sharweixin">
						<image class="kf-weixin" src="../../../static/weixin.png"></image>
					</view>
					
					
					<image @click="telFun" class="kf-phone" src="../../../static/phone.png"></image>
				</view>
			</view>
			
			
			<view class="ke-t">专属客服会详细解答您的问题，快和他联系吧</view>
		</view>
		
		<view class="team-nav01">
			<view class="team-title">直推及其团队业绩</view>
			<view class="noData" v-show="!showText">
				<image class="defimg" src="../../../static/def.png"></image>
				<view class="deftext">暂无团队业绩</view>
			</view>
			
			<view v-show="showText" class="team-con03" v-for="(item, key) in teamlistdata" :key="key">
				<view class="team-yj-01">
					<image class="yj-tx" v-if="item.avatar" :src="item.avatar"></image>
					<image class="yj-tx" v-else="!item.avatar" src="../../../static/avatar_icon.png"></image>
					<view class="yj-uinfo">
						<view class="yj-a">{{item.nickName}}<text class="teamdji">V{{item.teamLevel}}</text></view>
						<view class="yj-b">{{item.mobile}}</view>
						<view class="yj-c"><text class="time-t">加入时间：{{item.joinTime}}</text>
							<view class="tdyj" @click="teamInfo(item.id)"><text class="zd-t">团队业绩</text>
								<uni-icons :type="icontype" color="#2C8BFB" size="18"></uni-icons>
							</view>
						</view>
					</view>
				</view> 
				
				<view class="team-yj-02" v-show="theZK[key].isShow">
					<view class="team-c-left">
						<view class="tc-01">团队人数<text class="tc-text">{{theZK[key].teamNums}}</text>人</view>
						<view class="tc-02">本月业绩<text class="tc-text">{{theZK[key].teamMoney}}</text>元</view>
					</view>
					<view class="team-c-right">
						<view class="tc-01">本月推单<text class="tc-text">{{theZK[key].cards}}</text>张</view>
						<view class="tc-02">昨日业绩<text class="tc-text">{{theZK[key].yesMoney}}</text>元</view>
					</view>
				</view>
			</view>
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
				showText: true,
				icontype: 'arrowdown',
				teamyjdata: '',
				teamlistdata: '',
				teamcontent: '',
				kaiguan: true,
				theZK: [],
				page: 1,
				pageCount: 0,
				tjPeople: '',
				hasTj: false,
				wxhao: '',
				// 拨打电话数据
				tjMobile: '',
				// 页面加载
				pageshow: false
			}
		},
		onLoad() {
			this.teamyeji();
			this.teamList();
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			this.loadingData();
		},
		methods: {
			teamyeji: function() {
				uni.showLoading({
					title:'加载中'
				})
				api.apiPost('/team/myteam', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.teamyjdata = res.data;
						this.tjPeople = res.data.myLead;
						if (this.tjPeople != '') {
							this.hasTj = true;
						} else {
							this.hasTj = false;
						}
						this.wxhao = res.data.myLead.wx;
						this.tjMobile = res.data.myLead.mobile;
						//console.log("业绩: "+JSON.stringify(this.teamyjdata));
						this.showP();
						uni.hideLoading();
					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'none'
						})
						uni.hideLoading();
						this.pageshow == false;
					}
				});
			},
			showP: function(){
				this.pageshow = true;
			},
		    // 获取用户数据下拉分页显示
			teamList: function() {
				api.apiPost('/team/mybranch', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.teamlistdata = res.data.teamList;
						if(this.teamlistdata == ''){
							this.showText = false;
						}else{
							this.showText = true;
						}
						//console.log("列表: "+JSON.stringify(this.teamlistdata));
						var rowCount = res.data.pages.totalCount;
						var pageSize = res.data.pages.defaultPageSize;
						if (rowCount == null || rowCount == "") {
							this.pageCount = 0;
						} else {
							if (pageSize != 0 && rowCount % pageSize == 0) {
								this.pageCount = parseInt(rowCount / pageSize);
							}
							if (pageSize != 0 &&
								rowCount % pageSize != 0) {
								this.pageCount = parseInt(rowCount / pageSize) + 1;
							}
						}
						for (var i = 0; i < this.teamlistdata.length; i++) {
							this.theZK.push({
								t_id: this.teamlistdata[i].id,
								teamNums: '0',
								teamMoney: '0',
								cards: '0',
								yesMoney: '0',
								isShow: false
							});
						}
						//console.log("数组："+JSON.stringify(this.theZK))
					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'none'
						})
					}
				});
			},
			 // 获取用户数据下拉分页显示
			//加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						page: this.page,
					};
					var parameter = '?page=' + this.page;
					api.apiPost('/team/mybranch', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.teamlistdata = this.teamlistdata.concat(res.data.teamList);
							for (var i = 0; i < this.teamlistdata.length; i++) {
								this.theZK.push({
									t_id: this.teamlistdata[i].id,
									teamNums: '0',
									teamMoney: '0',
									cards: '0',
									yesMoney: '0',
									isShow: false
								});
							}
							//console.log("数组2："+JSON.stringify(this.theZK))
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			teamInfo: function(id) {
				//if(this.kaiguan == true){
				// var getid=uni.getStorageSync('landing');
				// if(id === getid){
				//  this.kaiguan=false;
				// }else{
				//  this.kaiguan=true;
				// }
				api.apiPost('/team/branchinfo?bid=' + id, '', '', 'get', (status, res, code) => {
					//console.log("团队详情："+JSON.stringify(res.data))
					//uni.setStorageSync('landing', id);
					if (res.code == 0) {
						if(this.icontype == 'arrowdown'){
							this.icontype = 'arrowup'
						}else{
							this.icontype = 'arrowdown'
						}
						for (var i = 0; i < this.theZK.length; i++) {
							if (this.theZK[i].t_id == id) {
								if (!this.theZK[i].isShow) {
									//团队人数
									this.theZK[i].teamNums = res.data.teamInfo.teamNums;
									//本月团队业绩
									this.theZK[i].teamMoney = res.data.teamInfo.teamMoney;
									//本月核卡数
									this.theZK[i].cards = res.data.teamInfo.cards;
									//昨日业绩
									this.theZK[i].yesMoney = res.data.teamInfo.yesMoney;
									this.theZK[i].isShow = true;
								} else {
									this.theZK[i].isShow = false;
								}
							}
						}
					} else {
						uni.showToast({
							title: '数据获取失败',
							icon: 'none',
							duration: 2000
						});
					}
				});
				//}

			},
			yejiFun: function() {
				uni.navigateTo({
					url: '/pages/personal/performance/performance'
				})
			},
			//复制微信号
			sharweixin: function() {
				let _this = this;
				let clipboard = new this.clipboard(".kf-weixin2");
				if (this.wxhao == '') {
					uni.showToast({
						title: '此用户未配置微信号!',
						icon: 'none'
					});
					return;
				}
				clipboard.on('success', function() {
					//_this.$toast("复制成功")
					uni.showToast({
						title: '微信号复制成功',
						icon: 'success'
					})
				});
				clipboard.on('error', function() {
					//_this.$toast("复制失败")
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					})
				});
			},
			// 拨打电话
			telFun: function() {
				if (!this.tjMobile) {
					uni.showToast({
						title: '此用户未配置电话信息！',
						icon: 'none'
					})
					return;
				}
				window.location.href = "tel:" + this.tjMobile;
			},
			
			
			shengji: function() {
				uni.navigateTo({
					url: '/pages/personal/upgraderules/upgraderules'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}
	.content {
		width: 690upx;
		margin: 0 30upx 30upx;
		float: left;
	}

	.team-nav01 {
		width: 690upx;
		float: left;
		margin: 30upx 0;
	}

	.team-title {
		font-size: 32upx;
		color: #222427;
		font-weight: bold;
		line-height: 48upx;
	}

	.team-con {
		width: 690upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16upx;
		padding: 0 0 40upx;
		margin-top: 30upx;
	}

	.team-con02 {
		width: 590upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16upx;
		padding: 50upx 50upx;
		margin-top: 30upx;
		float: left;
		box-shadow: 0px 6upx 20upx 0px rgba(115, 153, 206, 0.1);
	}

	.team-a01 {
		float: left;
	}

	.tj-peple {
		width: 96upx;
		height: 96upx;
		border-radius: 100%;
		float: left;
	}

	.tj-name {
		float: left;
		line-height: 96upx;
		font-size: 32upx;
		color: #000000;
		margin-left: 20upx;
		font-weight: bold;
	}

	.team-a02 {
		float: right;
		margin-top: 7upx;
	}

	.kf-weixin {
		width: 82upx;
		height: 82upx;
		float: left;
	}

	.kf-weixin2 {
		width: 82upx;
		height: 82upx;
		float: left;
		margin-right: 60upx;
	}

	.kf-phone {
		width: 82upx;
		height: 82upx;
		float: left;
	}

	.ke-t {
		width: 690upx;
		float: left;
		text-align: center;
		font-size: 24upx;
		color: #6E737B;
		margin-top: 20upx;
	}

	.team-con03 {
		width: 690upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16upx;
		padding: 20upx 0;
		margin-top: 30upx;
		float: left;
		box-shadow: 0px 6upx 20upx 0px rgba(115, 153, 206, 0.1);
	}

	.team-yj-01 {
		display: flex;
		width: 610upx;
		padding: 0 40upx 0;
	}

	.yj-tx {
		width: 75upx;
		height: 75upx;
		border-radius: 75upx;
		margin-top: 20upx;
	}

	.yj-uinfo {
		flex: 1;
		margin-left: 20upx;
	}

	.yj-a {
		font-size: 30upx;
		color: #000000;
	}

	.yj-b {
		font-size: 24upx;
		color: #98A7B8;
		padding: 10upx 0;
	}

	.yj-c {
		width: 100%;
	}

	.time-t {
		float: left;
		font-size: 24upx;
		color: #98A7B8;
	}

	.tdyj {
		float: right;
		font-size: 25upx;
		color: #2C8BFB;
	}

	.team-yj-02 {
		width: 590upx;
		padding: 0 50upx;
		margin-top: 24upx;
		border-top: 1upx solid #E6EDF7;
	}

	.team-c-left {
		float: left;
	}

	.team-c-right {
		float: right;
	}

	.tc-01 {
		padding: 20upx 0;
	}

	.tc-01,
	.tc-02 {
		font-size: 22upx;
		color: #98A7B8;
	}

	.tc-text {
		font-size: 30upx;
		color: #434A52;
		padding: 0 16upx;
		font-weight: bold;
	}

	.lishiyj {
		float: right;
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(38, 145, 255, 1);
	}

	.td-nav1 {
		background: #2691FF;
		border-top-right-radius: 16upx;
		border-top-left-radius: 16upx;
	}

	.td-n01 {
		display: flex;
	}

	.td-nav1-left,
	.td-nav1-right {
		flex: 1;
		text-align: center;
		color: #FFFFFF;
	}

	.left-01 {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		padding: 40upx 0 14upx;
	}

	.left-02 {
		font-size: 52upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
	}

	.td-n02 {
		margin: 40upx 30upx 30upx;
		width: 630upx;
		display: inline-block;
		text-align: center;
		color: #FFFFFF;
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		height: 60upx;
		line-height: 60upx;
		background: rgba(84, 168, 255, 1);
		border-radius: 30upx;
	}

	.td-text01 {
		margin-right: 50upx;
	}

	.td-nav2 {
		display: flex;
		margin-top: 20upx;
	}

	.td-nav2-b {
		flex: 1;
		text-align: center;
	}

	.td-nav2-c {
		font-size: 20upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(90, 106, 128, 1);
		margin-bottom: 20upx;
	}

	.td-nav2-d {
		font-size: 28upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(34, 35, 37, 1);
	}

	.teamdji {
		background: #3A96FF;
		color: #FFFFFF;
		font-size: 20upx;
		border-radius: 4upx;
		height: 40upx;
		line-height: 40upx;
		padding: 0 10upx;
		margin-left: 20upx;
	}
</style>
