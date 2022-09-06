<template>
	<view class="contentb" v-if="pageshow">
		<!-- 新手指导 -->
		<view class="xins-div" v-if="xinzdata1"></view>
		<view class="xins-zzc" v-if="xinzdata2">
			<view class="xins-xyk">
				<view class="dmbwz">信用卡推广</view>
			</view>
			<view class="xins-ms">
				<image class="xinimg" src="../../static/xinsjc1.png">
			</view>
			<view class="xins-ann" @click="dycGB()">
				<image class="xinimg" src="../../static/xinsjc2.png">
			</view>
		</view>
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
		<view class="tindgongo">
			<view class="gontb">
				<image src="../../static/gongaotb.png">
			</view>
			<view class="nrpmd">
				<uni-notice-bar class="timdwz" color="#7D8EAE" background-color="#DFEEFF" speed="40" scrollable="true" single="true"
				 :text="AfficheData"></uni-notice-bar>
			</view>
		</view>
		<view class="db-index-nav01" v-show="!isuserShow">
			<view class="flex-item" @click="lockFun">
				<image class="db-index-img" src="../../static/i-04.png"></image><text class="db-index-text">锁定客户</text>
			</view>
			<view class="flex-item" @click="tuiguang">
				<image class="db-index-img" src="../../static/i-01.png"></image><text class="db-index-text">推广流程</text>
			</view>
			<view class="flex-item" @click="zhinan">
				<image class="db-index-img" src="../../static/i-02.png"></image><text class="db-index-text">操作指南</text>
			</view>
			<view class="flex-item" @click="kefu">
				<image class="db-index-img" src="../../static/i-03.png"></image><text class="db-index-text">联系客服</text>
			</view>
		</view>
		<view class="loan-list">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in loantagarr" :key="item.id" @click="tagfilter(index, item.tab_name)"
						 :class="{tactive:index==tabcurrent}" :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
				<view v-show="current === 1">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in cardtagarr" :key="item.id" @click="cardtagfilter(index, item.tab_name)"
						 :class="{tactive:index==cardtab}" :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
			</view>

			<view v-show="isshow ? true : false" v-if="tabShow">
				<view class="noData" v-show="!showText">
					<image class="defimg" src="../../static/def.png"></image>
					<view class="deftext">暂无{{loantext}}产品</view>
				</view>
				
				<view v-show="showText" class="loan-nav" v-for="(item, key) in loanbox" :key="item.id" @click="loandetails(item.id, item.loan_icon)">
					<view class="loan-nav-child">
						<view class="db-icon01">
							<image class="dou-img" :src="item.loan_icon"></image><text class="dou-name">{{item.loan_name}}</text>
						</view>
						<view class="db-conten">
							<view class="db-c-left">
								<view class="loan-fanwei">{{item.loan_money_start}}~{{item.loan_money_end}}</view><text class="loantip-nane">额度范围(元)</text>
							</view>
							<view class="db-c-right">
								<view class="loan-fanyong" v-show="isuserShow">免费申请</view>
								<view class="loan-fanyong" v-show="!isuserShow">{{item.loan_pass_fanyong}}</view>
								<text class="loantip-nane" v-show="!isuserShow">{{item.loan_pass_end}}</text>
							</view>
						</view>
						<view class="db-b">
							<view class="db-b-child">
								<view style="display: inline-block;">
									<image class="db-icon02" src="../../static/1-1.png"></image><text class="db-b-t">日利率{{item.loan_cost}}</text>
								</view>
							</view>
							<view class="db-b-child">
								<view style="display: inline-block;">
									<image class="db-icon02" src="../../static/2.png"></image><text class="db-b-t">最快{{item.loan_pass_time}}放款</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view v-show="isshow ? false : true" v-if="tabShowcard">
				<view class="noData" v-show="!showTextc">
					<image class="defimg" src="../../static/def.png"></image>
					<view class="deftext">暂无{{cardtext}}产品</view>
				</view>
				<view v-show="showTextc" class="loan-nav" v-for="item in cardbox" :key="item.id" @click="carddetails(item.id, item.card_img)">
					<view class="loan-nav-child">
						<view class="db-icon01">
							<image class="dou-img" :src="item.card_img"></image><text class="dou-name">{{item.card_name}}</text>
						</view>
						<view class="db-conten">
							<view class="db-c-left">
								<view class="card-fanwei">{{item.card_introduce}}</view><text class="loantip-nane">{{item.card_introduce2}}</text>
							</view>
							<view class="db-c-right">
								<view class="loan-fanyong" v-show="isuserShow">免费申请</view>
								<view class="loan-fanyong" v-show="!isuserShow">{{item.card_pass_fanyong}}</view>
								<text class="loantip-nane" >{{item.card_pass_end}}</text>
							</view>
						</view>
						<view class="db-b">
							<view class="db-b-child">
								<view style="display: inline-block;">
									<image class="db-icon02" src="../../static/1.png"></image><text class="db-b-t">{{item.card_introduce3}}</text>
								</view>
							</view>
							<view class="db-b-child">
								<view style="display: inline-block;">
									<image class="db-icon02" src="../../static/2.png"></image><text class="db-b-t">{{item.card_introduce4}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// import api from '../../common/api/api.js';
	// import Enumerable from '../../common/linq/linq.js';
	// //jsencrypt插件
	// import JSEncrypt from '../../common/js/jsencrypt.min.js';
	// //MD5加密
	// import md5 from 'js-md5';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	//跑马灯
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniNoticeBar
		},
		data() {
			return {
				//线上域名
				baseURL: 'http://ts.yuanfang.cn',
				pageshow: false,
				loantext: '',
				cardtext: '',
				showText: true,
				showTextc: true,
				scrollLeft: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				activecolor: '#2A8CFB',
				indicatorcolor: '#ffffff',
				items: [
					'贷款产品',
					'信用卡推广'
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
				loanTags: [],
				cardTags: [],
				loanbox: '',
				cardbox: '',
				isshow: true,
				//贷款id
				tagid: [],
				//页数
				page: 1,
				//页数总数
				pageCount: 1,
				//信用卡id
				cardtagid: [],
				//页数
				page2: 1,
				//页数总数
				pageCount2: 1,
				tabcurrent: 0,
				cardtab: 0,
				loantagarr: [],
				cardtagarr: [],
				userinfo: '',
				usertype: '',
				// 合伙人注册提示数据
				bannerData: '',
				isuserShow: false,
				tabShow: true,
				tabShowcard: true,
				//公告数据
				AfficheData: "",
				list: ['1分钟前，无夏购买了会员', '2分钟前，无夏购买了会员', '3分钟前，无夏购买了会员'],
				//新手指南弹框1
				xinzdata1: false,
				//新手指南弹框2
				xinzdata2: false

			}
		},
		onLoad() {
			// uni.getSystemInfo({
			//     success: function (res) {
			// 		//分辨率大于370则设置公告速度为40
			// 		if(res.windowWidth>=370){
			// 			this.AfficheS=40;
			// 		}else{
			// 			this.AfficheS=30;
			// 		}
			//     }
			// });
			//检测是否是第一次进入
			this.dycJR();

			this.pullData();
			this.userInfo();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.page2 = 1;
			this.pullData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			if (this.isshow == true) {
				this.loadingData();
			} else {
				this.loadingCardData();
			};
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					if (this.current == 0) {
						this.loanlist();
						this.isshow = true;
					} else {
						this.banklist();
						this.isshow = false;
					}
				}
			},
			//检查是否是第一次进入
			dycJR: function() {
				var guide = uni.getStorageSync('guideData');
				if (guide == "") {
					//隐藏 tabBar
					uni.hideTabBar();
					this.xinzdata1 = true;
					this.xinzdata2 = true;
				}
			},
			//关闭
			dycGB: function() {
				uni.setStorageSync('guideData', 1);
				//显示 tabBar
				uni.showTabBar();
				this.xinzdata1 = false;
				this.xinzdata2 = false;
			},
			pullData: function() {
				var burl = this.baseURL;
				uni.request({
					url: burl + '/index/main',
					method: 'GET',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						//#ifdef H5
						var outurl = encodeURIComponent(window.location.href);
						//#endif
						if (res.data.code == 0) {
							this.bannerData = res.data.data.bannerList;
							this.loanTags = res.data.data.loanTags;
							//公告
							this.AfficheData = res.data.data.Affiche[0].config_value;
							this.pageshow = true;
							var arr01 = [{
								"id": "1000000",
								"tab_name": "全部"
							}];
							var loanarr = arr01.concat(this.loanTags);
							this.loantagarr = loanarr;
							this.cardTags = res.data.data.cardTags;
							var arr02 = [{
								"id": "2000000",
								"tab_name": "全部"
							}];
							var loanarr02 = arr02.concat(this.cardTags);
							this.cardtagarr = loanarr02;
							if (this.isshow == true) {
								var i = this.tabcurrent;
								//console.log("i值："+i);
								this.tagid = this.loantagarr[i].id;
								//console.log('tagid：'+ this.tagid );
								this.loanlist();
							} else {
								var k = this.cardtab;
								//console.log("K值："+k);
								this.cardtagid = this.cardtagarr[k].id;
								//console.log('cardtagid：'+ this.cardtagid );
								this.banklist();
							}
						} else if (res.data.code == 401) {
							//#ifdef H5
							window.location.href = "http://ts.yuanfang.cn/index/authorization?toredirect=" + outurl
							//#endif
							uni.navigateTo({
								url: '/pages/login/login'
							})
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
						}
					}
				});

			},
			// 判断是否合伙人
			userInfo: function() {
				var burl = this.baseURL;
				uni.request({
					url: burl + '/user/userinfo',
					method: 'GET',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 0) {
							this.userinfo = res.data.data.baseInfo;
							//判断是否是合伙人 1是 0是否
							this.usertype = res.data.data.baseInfo.user_type;
							if (this.usertype == 0) {
								this.isuserShow = true;
							} else {
								this.isuserShow = false;
							}
						}
					}
				});
			},
			loanlist: function() {
				if (this.tabcurrent == 0) {
					uni.showLoading({
						title: "加载中"
					})
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/loanlist',
						method: 'GET',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.tabShow = true;
								this.loanbox = res.data.data.loadList;
								//console.log("到这1吗");
								if (this.loanbox == '') {
									this.showText = false;
								} else {
									this.showText = true;
								}
								//console.log("贷款产品："+JSON.stringify(res.data));
								var rowCount = res.data.data.pages.totalCount;
								var pageSize = res.data.data.pages.defaultPageSize;
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
								uni.setNavigationBarTitle({
									title: '首页'
								});
							} else {
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
								this.tabShow = true;
								uni.hideLoading();
							}
						}
					});
				} else {
					uni.showLoading({
						title: "加载中"
					})
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/loanlist',
						method: 'GET',
						data: {
							tag: this.tagid,
							page: this.page,
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.tabShow = true;
								this.loanbox = res.data.data.loadList;
								if (this.loanbox == '') {
									this.showText = false;
								} else {
									this.showText = true;
								}
								//console.log(JSON.stringify(res.data.loadList));
								var rowCount = res.data.data.pages.totalCount;
								var pageSize = res.data.data.pages.defaultPageSize;
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
							} else {
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
								uni.hideLoading();
								this.tabShow = true;
							}
						}
					});
				}

			},
			banklist: function() {
				if (this.cardtab == 0) {
					uni.showLoading({
						title: "加载中"
					})
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/cardlist',
						method: 'GET',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.tabShowcard = true;
								this.cardbox = res.data.data.cardList;
								if (this.cardbox == '') {
									this.showTextc = false;
								} else {
									this.showTextc = true;
								}
								//console.log("信用卡："+JSON.stringify(res.data));
								var rowCount = res.data.data.pages.totalCount;
								var pageSize = res.data.data.pages.defaultPageSize;
								if (rowCount == null || rowCount == "") {
									this.pageCount2 = 0;
								} else {
									if (pageSize != 0 && rowCount % pageSize == 0) {
										this.pageCount2 = parseInt(rowCount / pageSize);
									}
									if (pageSize != 0 &&
										rowCount % pageSize != 0) {
										this.pageCount2 = parseInt(rowCount / pageSize) + 1;
									}
								}
								uni.hideLoading();
							} else {
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
								this.tabShowcard = true;
								uni.hideLoading();
							}
						}
					});
				} else {
					uni.showLoading({
						title: "加载中"
					})
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/cardlist',
						method: 'GET',
						data: {
							tag: this.cardtagid,
							page: this.page2,
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.tabShowcard = true;
								this.cardbox = res.data.data.cardList;
								if (this.cardbox == '') {
									this.showTextc = false;
								} else {
									this.showTextc = true;
								}
								var rowCount = res.data.data.pages.totalCount;
								var pageSize = res.data.data.pages.defaultPageSize;
								if (rowCount == null || rowCount == "") {
									this.pageCount2 = 0;
								} else {
									if (pageSize != 0 && rowCount % pageSize == 0) {
										this.pageCount2 = parseInt(rowCount / pageSize);
									}
									if (pageSize != 0 &&
										rowCount % pageSize != 0) {
										this.pageCount2 = parseInt(rowCount / pageSize) + 1;
									}
								}
								// setTimeout(function() {
								// 	//隐藏加载框
								// 	uni.hideLoading();
								// }, 300);
								uni.hideLoading();
							} else {
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
								uni.hideLoading();
								this.tabShowcard = true;
							}
						}
					});
				}
			},
			//贷款加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多产品了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = '';
					if (this.tabcurrent == 0) {
						data = {
							page: this.page,
						};
					} else {
						data = {
							tag: this.tagid,
							page: this.page,
						};
					}
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/loanlist',
						method: 'GET',
						data: data,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.loanbox = this.loanbox.concat(res.data.data.loadList);
								this.tagid = this.loanbox.id;
								setTimeout(function() {
									//隐藏加载框
									uni.hideLoading();
								}, 300);
							}
						}
					});
				}
			},
			//信用卡加载数据
			loadingCardData: function() {
				this.page2++;
				if (this.page2 > this.pageCount2) {
					uni.showToast({
						title: '没有更多产品了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = '';
					if (this.cardtab == 0) {
						data = {
							page: this.page2,
						};
					} else {
						data = {
							tag: this.cardtagid,
							page: this.page2,
						};
					}
					var burl = this.baseURL;
					uni.request({
						url: burl + '/index/cardlist',
						method: 'GET',
						data: data,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 0) {
								this.cardbox = this.cardbox.concat(res.data.data.cardList);
								this.cardtagid = this.cardbox.id;
								setTimeout(function() {
									//隐藏加载框
									uni.hideLoading();
								}, 300);
							}
						}
					});
				}
			},
			tagfilter: function(index, name) {
				this.tabcurrent = index;
				this.loantext = name;
				this.showText = true;
				this.tabShow = false;
				//console.log("贷款索引值："+this.tabcurrent);
				this.page = 1;
				this.pullData();
			},
			cardtagfilter: function(index, name) {
				this.cardtab = index;
				this.cardtext = name;
				this.showTextc = true;
				this.tabShowcard = false;
				this.page2 = 1;
				//console.log("信用卡索引值："+this.tabcurrent);
				this.pullData();
			},
			tuiguang: function() {
				uni.navigateTo({
					url: '/pages/personal/tglc/tglc'
				})
			},
			zhinan: function() {
				uni.navigateTo({
					url: '/pages/guide/guide'
				})
			},
			kefu: function() {
				uni.navigateTo({
					url: '/pages/personal/customer/customer'
				})
			},
			//贷款
			loandetails: function(id, icon) {
				if (this.usertype == 1) {
					uni.navigateTo({
						url: '/pages/index/hehuoDetails/hehuoDetails?id=' + id + '&icon=' + encodeURIComponent(icon)
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/details/details?id=' + id + '&icon=' + encodeURIComponent(icon)
					})
				}
			},
			//信用卡
			carddetails: function(id, icon) {
				if (this.usertype == 1) {
					uni.navigateTo({
						url: '/pages/index/cardDetails/cardDetails?id=' + id + '&icon=' + encodeURIComponent(icon)
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/ptDetails/ptDetails?id=' + id + '&icon=' + encodeURIComponent(icon)
					})
				}
			},
			
			
			// 合伙人推广指南
			bannerFun: function(url) {
				// uni.navigateTo({
				// 	url: '/pages/index/apply/apply?url=' + url
				// })
				location.href = url;
			},
			
			lockFun: function() {
				uni.navigateTo({
					url: '/pages/index/lockcustomer/lockcustomer'
				})
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

	/* 新手指导 */
	.xins-div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 30;
	}

	.xins-zzc {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
	}

	.xins-xyk {
		width: 234upx;
		height: 100upx;
		border: 4upx dashed #ACADAD;
		border-radius: 10upx;
		position: absolute;
		top: 530upx;
		left: 150upx;
	}

	.dmbwz {
		width: 204upx;
		height: 70upx;
		background-color: #F1F4F8;
		border-radius: 14upx;
		line-height: 70upx;
		font-size: 32upx;
		font-weight: bold;
		color: #3F4753;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15upx;
	}

	.xins-ms {
		width: 500upx;
		height: 159upx;
		position: absolute;
		top: 655upx;
		left: 135upx;
	}

	.xins-ann {
		width: 251upx;
		height: 98upx;
		position: fixed;
		bottom: 150upx;
		left: 240upx;
	}

	.xinimg {
		width: 100%;
		height: 100%;
		display: block;
	}

	/* 公告 */
	.tindgongo {
		width: 698upx;
		margin-left: 26upx;
		margin-right: 26upx;
		margin-top: 17upx;
		height: 66upx;
		background: rgba(223, 238, 255, 1);
		border-radius: 10upx;
		display: flex;
	}

	.gontb {
		width: 75upx;
		height: 100%;
	}

	.gontb image {
		width: 28upx;
		height: 28upx;
		display: block;
		margin-top: 20upx;
		margin-left: 30upx;
	}

	.nrpmd {
		width: 605upx;
		height: 66upx;
		overflow: hidden;
	}

	.timdwz {
		width: 605upx;
		height: 66upx;
		font-size: 24upx;
	}

	/*  */
	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		height: 60upx;
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
		margin: 17upx 26upx 0;
		background: #ffffff;
		display: flex;
		text-align: center;
		border-radius: 10upx;
		padding: 30upx 0;
	}

	.db-index-nav01 .flex-item {
		flex: 1;
	}

	.db-index-img {
		width: 90upx;
		height: 90upx;
	}

	.db-index-text {
		font-size: 24upx;
		color: #52607A;
		width: 100%;
		float: left;
	}

	.loan-list {
		width: 698upx;
		margin: 26upx 26upx 0 26upx;
	}

	.content {
		padding-top: 16upx;
	}

	.db-index-nav02 {
		width: 100%;
		float: left;
	}

	.active-a {
		font-size: 32upx !important;
		color: #000000 !important;
		font-weight: bold;
		line-height: 42upx !important;
	}

	.db-index-text01 {
		float: left;
		font-size: 30upx;
		color: #3F4753;
		line-height: 48upx;
		margin-left: 30upx;
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
		line-height: 46upx;
		height: 50upx;
		overflow: hidden;
	}

	.tactive {
		color: #459BFF !important;
		border-color: #459BFF !important;
	}

	.loan-nav {
		width: 698upx;
	}

	.loan-nav-child {
		width: 638upx;
		padding: 30upx;
		border-radius: 10upx;
		padding-bottom: 10px;
		float: left;
		background: #FFFFFF;
		margin-top: 26upx;
	}

	.db-b {
		width: 100%;
		float: left;
		display: flex;
		margin-top: 10upx;
	}

	.db-icon01 {
		width: 100%;
		float: left;
	}

	.dou-img {
		width: 30upx;
		height: 30upx;
		border-radius: 30upx;
		float: left;
		margin-top: 5upx;
	}

	.dou-name {
		font-size: 24upx;
		color: #1B1B1B;
		float: left;
		line-height: 40upx;
		margin-left: 10upx;
	}

	.db-conten {
		width: 100%;
		float: left;
		display: flex;
		border-bottom: 1upx solid #EEF2F9;
		padding: 26upx 0;
	}

	.db-c-left {
		width: 418upx;
		float: left;
		margin-right: 20upx;
	}

	.loan-fanwei {
		font-size: 50upx;
		color: #2D2A27;
		width: 100%;
		float: left;
		height: 66upx;
		line-height: 66upx;
	}

	.card-fanwei {
		font-size: 36upx;
		color: #2D2A27;
		float: left;
		width: 100%;
		height: 66upx;
		line-height: 66upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.loantip-nane {
		width: 100%;
		float: left;
		font-size: 24upx;
		color: #A3B0C1;
		margin-top: 20upx;
	}

	.db-c-right {
		width: 200upx;
		text-align: center;
		margin-left: 10upx;
	}

	.loan-fanyong {
		width: 200upx;
		float: right;
		height: 56upx;
		line-height: 56upx;
		color: #FFFFFF;
		font-size: 26upx;
		text-align: center;
		margin: 5upx 0;
		background: rgba(255, 110, 64, 1);
		box-shadow: 0px 7px 6px 0px rgba(255, 225, 215, 1);
		border-radius: 56upx;
	}


	.db-b-child {
		flex: 1;
		text-align: center;
		height: 40upx;
		overflow: hidden;
	}

	.db-b-t {
		font-size: 22upx;
		color: #656E7B;
		height: 32upx;
		line-height: 32upx;
		display: inline-block;
		float: left;
	}

	.db-icon02 {
		width: 24upx;
		height: 24upx;
		margin-top: 4upx;
		display: inline-block;
		float: left;
		margin-right: 10upx;
	}
</style>
