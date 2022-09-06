<template>
	<view class="contentb">
	
		<!-- 图片轮播 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper daibei-banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					 :duration="duration" :indicator-active-color="activecolor" :indicator-color="indicatorcolor">
						<swiper-item v-for="(item,index) in bannerData" :key="index">
							<view class="swiper-item" @click="bannerFun(item.poster_value)">
								<image :src="item.poster_url"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- <view class="db-index-nav01">
			<image class="bbs-soso" src="../../static/soso.png"></image><input class="newipt" type="text" placeholder="输入要搜索的产品或关键词" />
		</view> -->
		<!-- 搜索 -->
		<view class="db-sosuo">
			<input class="shous-input" @click="djss()" v-model="ssdata" type="text" placeholder="请输入要搜索的产品或关键词" />
			<image class="sslogo" @click="ssffdata(topdata.key)" src="../../static/dbsosuo.png"></image>
		</view>
		<view class="loan-list" style="margin-top: 20upx;">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></uni-segmented-control>
			</view>
			<!-- 产品标签的显示 -->
			<view class="content">
				<view v-show="current === 0">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in loantagarr" :key="item.id" @click="tagfilter(index, item.tab_name)" :class="{tactive:index==tabcurrent}"
						 :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
				<view v-show="current === 1">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in bbstagarr" :key="item.id" @click="bbstagfilter(index, item.tab_name)" :class="{tactive:index==bbscurrent}"
						 :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
			</view>
			<!-- 今日头条列表 -->
			  <view class="loan-nav" v-show="isshow ? true : false">
				<view class="noData" v-show="!showText">
					<image class="defimg" src="../../static/def.png"></image>
					<view class="deftext">暂无{{loantext}}新闻</view>
				</view>
				
				<view style="width: 638upx; padding: 0 30upx; background: #FFFFFF; display: inline-block;">
					<view v-show="showText" class="loan-nav-child" v-for="(item, index) in topdata" :key="index" @click="newsdetails(item.id)">
						<view class="bbs-left">
							<view class="bbs-title">{{item.new_name}}</view>
							<view class="bbs-zy">
								<view class="bbs-look">
									<image class="look-icon01" src="../../static/look.png"></image><text class="look-nb">{{item.new_look_num}}</text>
								</view>
								<text class="bbs-time">{{item.create_time}}</text>
							</view>
						</view>
						<view class="bbs-right">
							<image class="bbs-img" :src="item.new_img[0]"></image>
						</view>
					</view>
				</view>
			</view>
			
		<!-- 	社区列表 -->
			<view class="tiezibox" v-show="isshow ? false : true">
				<view class="noData" v-show="!showTextc">
					<image class="defimg" src="../../static/def.png"></image>
					<view class="deftext">暂无{{cardtext}}帖子</view>
				</view>
				
				
				<view v-show="showTextc" class="tiezi-nav" v-for="(item, index) in bbsdata" :key="index" @click="bbsdetails(item.list_id)">
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
							<image class="tz-i-01" src="../../static/dlook.png"></image><text class="tz-text01">{{item.list_look_sum}}</text>
						</view>
						<view class="tz-bt tz-md">
							<image class="tz-i-02" src="../../static/dpinglun.png"></image><text class="tz-text02">{{item.list_comment_sum}}</text>
						</view>
						<view class="tz-bt"><text class="tz-text03">{{item.list_like_sum}}</text>
							<image class="tz-i-03" src="../../static/dzan01.png"></image>
						</view>
					</view>
				</view>
				<view class="fatie" @click="fatie">
					<image class="fatieImg" src="../../static/fatie.png"></image>
				</view>
			</view>
		</view>
	<!-- 	搜索返回 -->
		<!-- <view>没有搜索到短信哟</view> -->
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				loantext:'',
				cardtext:'',
				showText:true,
				showTextc:true,
				bannerData: '',
				scrollLeft: 0,
				isshow: true,
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				activecolor: '#2A8CFB',
				indicatorcolor: '#ffffff',
				items: [
					'今日头条',
					'社区交流'
				],
				styles: [{
					value: 'button',
					text: '按钮',
					checked: true
				}, {
					value: 'text',
					text: '文字'
				}],
				colors: [
					'#000000',
					'#4cd964',
					'#dd524d'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#F1F4F8',
				styleType: 'button',
				topdata: '',
				newid: '',
				//页数
				page: 1,
				//页数总数
				pageCount: 1,
				bbsdata: '',
				list_content: '',
				loantagarr: '',
				loanTags: '',
				tabcurrent: 0,
				tagid: '',
				bbsTags: '',
				bbstagarr: '',
				bbscurrent: 0,
				bbstagid: '',
				// 获取搜索数据
				suosoudata: '',
				// 关键字数据
				ssdata: '',
				
			}
		},
		onLoad() {
			this.page = 1;
			this.pullData();
			this.bannerD();
		},
		
		onPullDownRefresh: function() {
			this.page = 1;
			//下拉刷新的时候请求一次数据
			if (this.isshow == false) {
				this.bbsInfo();
			}else{
				this.topInfo();
			}
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			if (this.current == 0) {
				this.loadingTopData();
			} else {
				this.loadingBbsData();
			}

		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					if (this.current == 0) {
						this.page = 1;
						this.topInfo();
						this.isshow = true;
					} else {
						this.page = 1;
						this.bbstagFun();
						//this.bbsInfo();
						this.isshow = false;
					}
				}
			},
			bannerD: function() {
				api.apiPost('/index/main', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.bannerData = res.data.bannerList;
					}
				})
			},
			pullData: function() {
				api.apiPost('/new/tags', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.loanTags = res.data;
						var arr01 = [{
							"id": "1000000",
							"tab_name": "全部"
						}];
						var loanarr = arr01.concat(this.loanTags);
						this.loantagarr = loanarr;
						//console.log("标签值："+JSON.stringify(this.loantagarr));
						if (this.isshow == true) {
							var i = this.tabcurrent;
							this.tagid = this.loantagarr[i].id;
							this.topInfo();
						}
					} else if (res.code == 401) {
						//console.log("身份过期获取链接："+outurl);
						// uni.navigateTo({
						// 	//url:'http://www.huaniaopet.com/html/login'
						// 	url:'/pages/login/pwdlogin/pwdlogin'
						// })
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			topInfo: function() {
				if (this.tabcurrent == 0) {
					uni.showLoading({
						title:'加载中'
					})
					api.apiPost('/new/list', '', '', 'get', (status, res, code) => {
						if (res.code == 0) {
							this.topdata = res.data.list;
							if(this.topdata == ''){
								this.showText = false;
							}else{
								this.showText = true;
							}
							//console.log("头条列表："+JSON.stringify(this.topdata));
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
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						}
					});
				} else {
					uni.showLoading({
						title:'加载中'
					})
					var data = {
						tab: this.tagid,
						page: this.page,
					};
					var parameter = '?tab=' + this.tagid + '&page=' + this.page;
					api.apiPost('/new/list', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.topdata = res.data.list;
							if(this.topdata == ''){
								this.showText = false;
							}else{
								this.showText = true;
							}
							//console.log("头条列表："+JSON.stringify(this.topdata));
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
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						}
					});
				}
			},
			bbstagFun: function() {
				api.apiPost('/forum/tags', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.bbsTags = res.data;
						var arr01 = [{
							"id": "1000000",
							"tab_name": "全部"
						}];
						var loanarr = arr01.concat(this.bbsTags);
						this.bbstagarr = loanarr;
						if (this.isshow == false) {
							var i = this.bbscurrent;
							this.bbstagid = this.bbstagarr[i].id;
							this.bbsInfo();
						}
					} else if (res.code == 401) {
						//console.log("身份过期获取链接："+outurl);
						// uni.navigateTo({
						// 	//url:'http://www.huaniaopet.com/html/login'
						// 	url:'/pages/login/pwdlogin/pwdlogin'
						// })
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			bbsInfo: function() {
				if (this.bbscurrent == 0) {
					uni.showLoading({
						title:'加载中'
					})
					api.apiPost('/forum/list', '', '', 'get', (status, res, code) => {
						if (res.code == 0) {
							this.bbsdata = res.data.list;
							if(this.bbsdata == ''){
								this.showTextc = false;
							}else{
								this.showTextc = true;
							}
							var str = '';
							for (var i = 0; i < this.bbsdata.length; i++) {
								str = this.bbsdata[i].list_content;
								str = str.replace("\"", "").replace("\"", "");
								str = str.replace("\{content:\"", "").replace("\"}", "");
								str = str.replace(/\\u/gi, '%u');
								str = str.replace(/\\/gi, '');
								str = unescape(str.replace(/\\u/g, '%u'));
								this.bbsdata[i].list_content = str;
							};
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
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
							uni.hideLoading()
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						}
					});
				} else {
					uni.showLoading({
						title:'加载中'
					})
					var data = {
						tab: this.bbstagid,
						page: this.page,
					};
					var parameter = '?tab=' + this.bbstagid + '&page=' + this.page;
					api.apiPost('/forum/list', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							uni.hideLoading();
							this.bbsdata = res.data.list;
							if(this.bbsdata == ''){
								this.showTextc = false;
							}else{
								this.showTextc = true;
							}
							//console.log("社区列表："+JSON.stringify(this.bbsdata));
							var str = '';
							for (var i = 0; i < this.bbsdata.length; i++) {
								str = this.bbsdata[i].list_content;
								str = str.replace("\"", "").replace("\"", "");
								str = str.replace("\{content:\"", "").replace("\"}", "");
								str = str.replace(/\\u/gi, '%u');
								str = str.replace(/\\/gi, '');
								str = unescape(str.replace(/\\u/g, '%u'));
								this.bbsdata[i].list_content = str;
							};
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
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
							uni.hideLoading();
							setTimeout(function() {
								uni.stopPullDownRefresh();
							}, 1000);
						}
					});
				}

			},
			//头条加载数据
			loadingTopData: function() {
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
						parameter = '?page=' + this.page;
					} else {
						data = {
							tab: this.tagid,
							page: this.page,
						};
						parameter = '?tab=' + this.tagid + '&page=' + this.page;
					}
					api.apiPost('/new/list', parameter, data, 'get', (status, res, code) => {
						//console.log("后视镜粉红色"+JSON.stringify(res))
						if (res.code == 0) {
							this.topdata = this.topdata.concat(res.data.list);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//社区加载数据
			loadingBbsData: function() {
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
					if (this.bbscurrent == 0) {
						data = {
							page: this.page,
						};
						parameter = '?page=' + this.page;
					} else {
						data = {
							tab: this.bbstagid,
							page: this.page,
						};
						parameter = '?tab=' + this.bbstagid + '&page=' + this.page;
					}
					api.apiPost('/forum/list', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.bbsdata = this.bbsdata.concat(res.data.list);
							var str = '';
							for (var i = 0; i < this.bbsdata.length; i++) {
								str = this.bbsdata[i].list_content;
								str = str.replace("\"", "").replace("\"", "");
								str = str.replace("\{content:\"", "").replace("\"}", "");
								str = str.replace(/\\u/gi, '%u');
								str = str.replace(/\\/gi, '');
								str = unescape(str.replace(/\\u/g, '%u'));
								this.bbsdata[i].list_content = str;
							};
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			// 获取搜索方法
			ssffdata: function(key) {
			var data = {
					key:this.ssdata
				};
				api.apiPost('/index/query', '', data, 'get', (status, res, code) => {
					if (res.code == 0) {
					  // 判断搜索框有没有输入值
					  this.ssdata = this.ssdata;
					  // 搜索框输入值后带关键字跳转也搜索页面显示
				      this.$router.push({
				                   path: '/pages/bbs/sousuo/sousuo',
				                   query: { key: this.ssdata}
				                 })
					} else {
			         uni.showToast({
			         	title: '搜索内容不能为空',
			         	icon: 'none',
			         	duration: 2000
			         });
					}
				});
			},
			// 点击搜索框后跳转搜索页
		djss: function() {
				uni.navigateTo({
					url: '/pages/bbs/sousuo/sousuo'
			
				})
			},
			
			tagfilter: function(index, name) {
				this.tabcurrent = index;
				this.loantext = name;
				this.showText = true;
				//console.log("贷款索引值："+this.tabcurrent);
				this.page = 1;
				this.pullData();
			},
			bbstagfilter: function(index, name) {
				this.bbscurrent = index;
				this.cardtext = name;
				this.showTextc = true;
				this.page = 1;
				//console.log("信用卡索引值："+this.tabcurrent);
				this.bbstagFun();
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
			fatie: function() {
				uni.navigateTo({
					url: '/pages/bbs/posted/posted',
					//url: '/pages/bbs/fatie/fatie'
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
		font-weight:bold;
		overflow: hidden;
	}

	.bbs-right {
		width: 265upx;
		height: 136upx; margin-left: 20upx;
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
	.tz-time{ color: #B1B8C3; font-size: 22upx; float: right;height: 24upx;
		line-height: 24upx; margin: 10upx 0;}
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
	/* 搜索 */
   .db-sosuo{
	width:690upx;
	height:80upx;
	background:#FFFFFF;
	border-radius:12upx;
	margin-top: 15upx;
	margin-left: auto;
	margin-right: auto;
	}
	.sslogo{
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
</style>
