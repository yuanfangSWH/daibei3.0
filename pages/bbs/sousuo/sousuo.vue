<template>
	<view class="contentb">
		<!-- 搜索 -->
		<view class="db-sosuo">
			<input class="shous-input" v-model="keyword" @confirm="doSearch(keyword);doSearch1(keyword)" type="text" placeholder="请输入要搜索的产品或关键词" />
			<view @tap="doSearch(keyword);doSearch1(keyword)">
				<image class="sslogo" src="../../../static/dbsosuo.png"></image>
			</view>
		</view>
		<!-- 历史区域模块 -->
		<view v-if="keyword==''">
			<scroll-view class="keyword-box">
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view class="db-lsz">历史搜索</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword);doSearch1(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="loan-list" style="margin-top: 20upx;">
			<view class="uni-padding-wrap uni-common-mt">
			</view>
			<!-- 今日头条模块 -->
			<view class="db-jrtt" v-if="topdata!=0">今日头条</view>
			<view class="loan-nav" v-show="isshow ? true : false">
				<view style="width: 638upx; padding: 0 30upx; background: #FFFFFF; display: inline-block;">
					<view v-show="showText" class="loan-nav-child" v-for="(item, index) in topdata" :key="index" @click="newsdetails(item.id)">
						<view class="bbs-left">
							<view class="bbs-title">{{item.new_name}}</view>
							<view class="bbs-zy">
								<view class="bbs-look">
									<image class="look-icon01" src="../../../static/look.png"></image><text class="look-nb">{{item.new_look_num}}</text>
								</view>
								<text class="bbs-time">{{item.create_time}}</text>
							</view>
						</view>
						<view class="bbs-right">
							<image class="bbs-img" :src="item.new_img[0]"></image>
						</view>
					</view>

				</view>
				<!-- 	查看更多 -->
				<view class="db-ssck" @click="fydata()" v-if="topdata!=0">
					<view class="db-ck">查看更多</view>
				</view>
				<view class="db-jrtt" v-if="bbsdata!=0">社区交流</view>
			</view>

			<!-- 社区交流模块 -->
			<view class="tiezibox">
				<view class="tiezi-nav" v-for="(item, index) in bbsdata" :key="index" @click="bbsdetails(item.list_id)">
					<view class="tiezi-nav01">
						<image class="ft-tx" :src="item.list_member_avatar"></image><text class="ft-user">{{item.list_member_name}}</text><text
						 class="tz-leibie">最新资讯</text><text class="tz-time">{{item.list_time}}</text>
					</view>
					<view class="tiezi-nav02">
						<view class="tiezi-nr">
							<rich-text :nodes="item.list_content"></rich-text>
						</view>
						<view class="tiezi-img" v-if="item.list_img[0]">
							<image class="tz-img" :src="item.list_img[0]" mode="widthFix"></image>
						</view>
					</view>
					<view class="tiezi-nav03">
						<view class="tz-bt">
							<image class="tz-i-01" src="../../../static/dlook.png"></image><text class="tz-text01">{{item.list_look_sum}}</text>
						</view>
						<view class="tz-bt tz-md">
							<image class="tz-i-02" src="../../../static/dpinglun.png"></image><text class="tz-text02">{{item.list_comment_sum}}</text>
						</view>
						<view class="tz-bt"><text class="tz-text03">{{item.list_like_sum}}</text>
							<image class="tz-i-03" src="../../../static/dzan01.png"></image>
						</view>
					</view>

				</view>
				<!-- 查看更多 -->
				<image class="db-ck2">
					<view class="db-ck1" @click="bbsfye()" v-if="bbsdata!=0">查看更多</view>
				</image>
			</view>
			<!-- <view v-if="keyword!=''">暂无搜索记录</view> -->
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				loantext: '',
				cardtext: '',
				showText: true,
				showTextc: true,
				bannerData: '',
				scrollLeft: 0,
				isshow: true,
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				// 分页
				page: 1,
				totalCount: 1,
				// 今日头条数据
				topdata: '',
				// 社区列表数据
				bbsdata: '',
				// 获取搜索数据
				suosoudata: '',
				// 搜索数据内容
				keyword: '',
				// 历史相关
				// keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false
			}
		},
		onLoad() {
			// 加载历史记录关键字到本地
			this.loadOldKeyword();
		},
		methods: {
			// 获取今日头条搜索方法
			doSearch: function(keyword) {
				this.keyword = keyword ? keyword : this.keyword;
				this.saveKeyword(keyword); //保存为历史 
				var data = {
					key: this.keyword,
					// page:this.page
					page: this.page
				};
				api.apiPost('/index/query', '', data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.keyword = this.keyword;
						this.topdata = res.data.newlist;
						var rowCount = res.data.newpages.totalCount;
						var pageSize = res.data.newpages.defaultPageSize;
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
					} else {
						uni.showToast({
							title: '搜索内容不能为空',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},

			// 获取社区交流搜索方法
			doSearch1: function(keyword) {
				this.keyword = keyword ? keyword : this.keyword;
				this.saveKeyword(keyword); //保存为历史 
				var data = {
					key: this.keyword,
					page: this.page
				};
				api.apiPost('/index/query', '', data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.keyword = this.keyword;
						this.bbsdata = res.data.bbslist;
						var rowCount = res.data.bbspages.totalCount;
						var pageSize = res.data.bbspages.defaultPageSize;
						if (rowCount == null || rowCount == "") {
							this.pageCount1 = 0;
						} else {
							if (pageSize != 0 && rowCount % pageSize == 0) {
								this.pageCount1 = parseInt(rowCount / pageSize);
							}
							if (pageSize != 0 &&
								rowCount % pageSize != 0) {
								this.pageCount1 = parseInt(rowCount / pageSize) + 1;
							}
						}
					} else {
						uni.showToast({
							title: '搜索内容不能为空',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},

			//今日头条查看数据分页加载数据
			fydata: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = '';
					var parameter = '';
					if (this.tabcurrent == 0) {
						data = {
							page: this.page,
						};
					} else {
						data = {
							key: this.keyword,
							page: this.page,
						};
						parameter = '?key=' + this.keyword + '&page=' + this.page;
					}
					api.apiPost('/index/query', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {

							this.topdata = this.topdata.concat(res.data.newlist);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//社区交流查看数据分页加载数据
			bbsfye: function() {
				this.page++;
				if (this.page > this.pageCount1) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = '';
					var parameter = '';
					if (this.tabcurrent == 0) {
						data = {
							page: this.page,
						};
					} else {
						data = {
							key: this.keyword,
							page: this.page,
						};
						parameter = '?key=' + this.keyword + '&page=' + this.page;
					}
					api.apiPost('/index/query', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.bbsdata = this.bbsdata.concat(res.data.bbslist);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword: function() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},

			//保存关键字到历史记录
			saveKeyword: function(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},

			// 点击进入今日头条的详情的id链接
			newsdetails: function(id) {
				uni.navigateTo({
					url: '/pages/NewsDetails/NewsDetails?id=' + id
				})
			},
			// 点击进入社区交流详情的id链接
			bbsdetails: function(id) {
				uni.navigateTo({
					url: '/pages/bbsDetails/bbsDetails?id=' + id
				})
			},

			bannerFun: function(url) {
				location.href = url;
			}
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	uni-swiper {
		height: 210upx;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		height: 60upx;
		margin-top: 6upx;
	}

	.contentb {
		padding-bottom: 20upx;
		display: inline-block;
	}

	.daibei-banner {
		width: 698upx;
		margin: 26upx 26upx 0 26upx;
		border-radius: 16upx;
	}

	.swiper-item image {
		width: 100%;
		height: 210upx;
		border-radius: 16upx;
	}

	.swiper {
		height: 210upx
	}

	.swiper-item {
		height: 210upx;
	}

	.db-index-nav01 {
		width: 698upx;
		margin: 26upx;
		background: #ffffff;
		display: flex;
		text-align: center;
		border-radius: 10upx;
		padding: 14upx 20upx;
		box-sizing: border-box;
	}

	.bbs-soso {
		width: 30upx;
		height: 30upx;
		margin: 8upx 16upx 0 0;
	}

	.newipt {
		flex: 1;
		height: 48upx;
		line-height: 48upx;
		font-size: 26upx;
		text-align: left;
	}

	.loan-list {
		width: 698upx;
		margin: 0 26upx 0 26upx;
	}

	.db-tab-box {
		width: 100%;
		float: left;
		display: flex;
		margin-top: 12upx;
	}

	.db-tab-child {
		width: auto;
		display: inline-block;
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 24upx;
		color: #95a2b0;
		margin-right: 20upx;
		border: 1px solid #e2e5e8;
		border-radius: 50upx;
		text-align: center;
		line-height: 50upx;
		height: 50upx;
	}

	.tactive {
		color: #459BFF !important;
		border-color: #459BFF !important;
	}

	.loan-nav {
		width: 698upx;
		padding: 0;
		float: left;
		border-radius: 10upx;
		margin-top: 26upx;
	}

	.loan-nav-child {
		width: 638upx;
		padding: 30upx 0;
		float: left;
		background: #FFFFFF;
		display: flex;
		border-bottom: 2upx solid #E3ECFA;
	}

	.bbs-zy {
		width: 100%;
		float: left;
		margin-top: 22upx;
	}

	.bbs-left {
		flex: 1;
	}

	.bbs-title {
		font-size: 32upx;
		color: #1B1B1B;
		height: 84upx;
		line-height: 42upx;
		font-weight: bold;
		overflow: hidden;
	}

	.bbs-right {
		width: 265upx;
		height: 136upx;
		margin-left: 20upx;
	}

	.bbs-img {
		width: 265upx;
		height: 136upx;
	}

	.bbs-look {
		float: left;
		width: 52%;
	}

	.bbs-time {
		float: left;
		width: 48%;
		font-size: 24upx;
		color: #A3B0C1;
		line-height: 32upx;
	}

	.look-icon01 {
		width: 28upx;
		height: 24upx;
		float: left;
		margin-top: 5upx;
	}

	.look-nb {
		font-size: 24upx;
		color: #A3B0C1;
		float: left;
		line-height: 32upx;
		margin: 0 0 0 6upx;
	}

	.laba {
		width: 32upx;
		height: 26upx;
	}

	.uni-swiper-msg {
		width: 100%;
		display: flex;
	}

	.uni-swiper-msg-icon {
		width: 50upx;
		margin-left: 14upx;
		margin-right: 8upx;
	}

	.uni-swiper-msg uni-swiper {
		flex: 1;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #000;
	}

	.tiezi-nav {
		width: 638upx;
		padding: 30upx;
		float: left;
		background: #FFFFFF;
		margin-top: 26upx;
	}

	.tiezi-nav01 {
		width: 100%;
		float: left;
	}

	.ft-tx {
		float: left;
		width: 50upx;
		height: 50upx;
		border-radius: 50upx;
		margin-right: 10upx;
	}

	.ft-user {
		float: left;
		font-size: 30upx;
		color: #000000;
	}

	.tz-leibie {
		float: left;
		height: 24upx;
		line-height: 24upx;
		padding: 0 20upx;
		margin: 10upx 0 10upx 20upx;
		color: #2389FF;
		font-size: 24upx;
		border-left: 2upx solid #E2E2E2;
	}

	.tz-time {
		color: #B1B8C3;
		font-size: 22upx;
		float: right;
		height: 24upx;
		line-height: 24upx;
		margin: 10upx 0;
	}

	.tiezi-nav02 {
		width: 100%;
		float: left;
	}

	.tiezi-nr {
		width: 100%;
		float: left;
		font-size: 26upx;
		color: #363A3D;
		margin: 30upx 0;
	}

	.tiezi-img {
		width: 100%;
		float: left;
	}

	.tz-img {
		width: 303upx;
	}

	.tiezi-nav03 {
		width: 100%;
		float: left;
		display: flex;
		border-top: 1upx solid #F1F4F8;
		padding-top: 20upx;
		margin-top: 20upx;
	}

	.tz-bt {
		flex: 1;
		height: 50upx;
		overflow: hidden;
		line-height: 50upx;
	}

	.tz-md {
		text-align: center;
	}

	.tz-i-01 {
		width: 26upx;
		height: 26upx;
		float: left;
		margin: 12upx 10upx 0 0;
	}

	.tz-i-02 {
		width: 26upx;
		height: 26upx;
		margin: 6upx 10upx 0 0;
	}

	.tz-i-03 {
		width: 26upx;
		height: 26upx;
		float: right;
		margin: 12upx 10upx 0 0;
	}

	.tz-text01 {
		float: left;
		font-size: 28upx;
		color: #627381;
	}

	.tz-text02 {
		font-size: 28upx;
		color: #627381;
		position: relative;
		top: -1px;
	}

	.tz-text03 {
		float: right;
		font-size: 28upx;
		color: #627381;
	}

	.fatie {
		position: fixed;
		right: 20upx;
		bottom: 100upx;
	}

	.fatieImg {
		width: 118upx;
		height: 118upx;
	}

	.db-jrtt {
		width: 200upx;
		height: 28upx;
		font-size: 30upx;
		color: #A2ADB9;
	}

	/* 搜索 */
	.db-sosuo {
		width: 690upx;
		height: 80upx;
		background: #FFFFFF;
		border-radius: 12upx;
		margin-top: 15upx;
		margin-left: auto;
		margin-right: auto;
	}

	.sslogo {
		width: 30upx;
		height: 30upx;
		float: right;
		margin-right: 41upx;
		margin-top: -55upx;

	}

	.shous-input {
		width: 580upx;
		height: 80upx;
		border-radius: 25upx;
		padding-left: 10upx;
		line-height: 50upx;
		font-size: 26upx;
	}

	.db-ck {
		text-align: center;
		font-size: 26upx;
		line-height: 60upx;
		color: #419EFF;
		background: #FFFFFF;
		margin-top: -10upx;
	}

	.db-ck1 {
		width: 700upx;
		height: 60upx;
		text-align: center;
		font-size: 26upx;
		line-height: 60upx;
		color: #419EFF;
		background: #FFFFFF;
		margin-top: -50upx;
	}

	.db-ck2 {
		width: 700upx;
		height: 0;
	}

	.db-ls {
		width: 700upx;
		height: 300upx;
	}

	.db-lsz {
		width: auto;
		height: 29upx;
		font-size: 30upx;
		color: #000000;
		font-weight: bold;
		margin-top: 10upx;
		margin-left: 12upx;
	}

	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #F1F4F8;
		height: 220upx;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: #FFFFFF;
		color: #6b6b6b;
	}
</style>
