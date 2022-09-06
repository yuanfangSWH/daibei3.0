<template>
	<view>
		<view class="sbox" v-show="!isSo">
			<view class="soso-box">
				<view class="soso-navleft"><uni-icon class="soso-icon" type="search" size="20"></uni-icon><input class="soso-ipt" type="text" placeholder="输入姓名或手机号搜索" v-model="sodata" ></input></view>
				<view class="soso-navright" @click="orderSosuo">搜索</view>
			</view>
		</view>
		<view class="mainbox-order" v-show="isSo">
			<view class="zn-tab">
				<view class="or-nav01">
					<view class="uni-padding-wrap uni-common-mt">
						<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
						 :activeColor="activeColor"></uni-segmented-control>
					</view>
					<view class="or-soso" @click="orderSoFun"><text class="or-t01">|</text><text class="or-t02">搜索</text></view>
				</view>
				<view class="content">
					<view v-show="current === 0">
						<view class="db-tab-box">
							<view class="db-tab-child" :class="{ tactive: status == 2 }" @click="statusTAB(2)">待查询</view>
							<view class="db-tab-child" :class="{ tactive: status == 3 }" @click="statusTAB(3)">待再查</view>
							<view class="db-tab-child" :class="{ tactive: status == 1 }" @click="statusTAB(1)">已完成</view>
							<view class="db-tab-child" :class="{ tactive: status == 5 }" @click="statusTAB(5)">未通过</view>
							<view class="db-tab-child" :class="{ tactive: status == 0 }" @click="statusTAB(0)">失效订单</view>
						</view>
					</view>
					<view v-show="current === 1">
						<view class="db-tab-box">
							<view class="db-tab-child" :class="{ tactive: status == 2 }" @click="statusTABcard(2)">待查询</view>
							<view class="db-tab-child" :class="{ tactive: status == 3 }" @click="statusTABcard(3)">待再查</view>
							<view class="db-tab-child" :class="{ tactive: status == 1 }" @click="statusTABcard(1)">已完成</view>
							<view class="db-tab-child" :class="{ tactive: status == 5 }" @click="statusTABcard(5)">未通过</view>
							<view class="db-tab-child" :class="{ tactive: status == 0 }" @click="statusTABcard(0)">失效订单</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-show="showorder">
			<view class="order-box" v-show="productshow">
				<view class="nonebox" v-if="!haveorder">
					<image class="defimg" src="../../../static/def.png"></image>
					<view class="no-order">暂无
						<text v-if="status == 2">待查询</text>
						<text v-else-if="status == 3">待再查</text>
						<text v-else-if="status == 1">已完成</text>
						<text v-else-if="status == 5">未通过</text>
						<text v-else-if="status == 0">失效订单</text>
						订单</view>
				</view>
				<view class="loan-nav-child" v-else v-for="(item,index) in orderbox" :key="index">
					<view class="db-icon01">
						<image class="dou-img" :src="item.order_wxicon"></image><text class="dou-name">{{item.order_nickname}}</text><text
						 class="u-phone02">{{(item.order_to_mobile).replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</text>
					</view>
					<view class="db-conten">
						<view class="db-c-left">
							<view class="order-name">{{item.order_loan_name}}</view>
							<view class="order-time">申请时间：{{item.order_create_time}}</view>
							<view class="or-ztai">
								<view class="or-01">申请状态：<text class="zt-t">{{item.order_state}}</text></view>
								<view class="or-01 or-02" v-if="item.order_money" v-show="iswc">放款金额：<text class="zt-t">{{item.order_money}} 元</text></view>
							</view>
							<view class="order-time">
								<view class="or-01">订单ID：<text class="zt-t">{{item.id}}</text></view>
							</view>
						</view>
						<view class="db-c-right" v-show="isshow">
							<view class="lianxi-kh">联系客户</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order-box" v-show="!productshow">
				<view class="nonebox" v-if="!haveorder2">
					<image class="defimg" src="../../../static/def.png"></image>
					<view class="no-order">暂无
						<text v-if="status == 2">待查询</text>
						<text v-else-if="status == 3">待再查</text>
						<text v-else-if="status == 1">已完成</text>
						<text v-else-if="status == 5">未通过</text>
						<text v-else-if="status == 0">失效订单</text>
						订单</view>
				</view>
				<view class="loan-nav-child" v-else v-for="(item,index) in cardorderbox" :key="index">
					<view class="db-icon01">
						<image class="dou-img" :src="item.order_wxicon"></image><text class="dou-name">{{item.order_nickname}}</text><text
						 class="u-phone02">{{(item.order_to_mobile).replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</text>
					</view>
					<view class="db-conten">
						<view class="db-c-left">
							<view class="order-name">{{item.order_card_name}}</view>
							<view class="order-time">申请时间：{{item.order_create_time}}</view>
							<view class="or-ztai">
								<view class="or-01">申请状态：<text class="zt-t">{{item.order_state}}</text></view>
							</view>
							<view class="order-time">
								<view class="or-01">订单ID：<text class="zt-t">{{item.id}}</text></view>
							</view>
						</view>
						<view class="db-c-right" v-show="isshow">
							<view class="lianxi-kh">联系客户</view>
						</view>
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniSegmentedControl from '@/components/uni-segmented-control2/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'贷款订单',
					'拉新产品订单'
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
				activeColor: '#fff',
				styleType: 'text',
				//borderbtm: 'border-bottom:6upx solid #2A8CFB'
				orderbox: '',
				cardorderbox: '',
				status: '2',
				isshow: false,
				haveorder: false,
				haveorder2: false,
				productshow: true,
				page: 1,
				pageCount: 0,
				page2: 1,
				page3:1,
				page4:1,
				iswc: false,
				isSo:true,
				sodata:'',
				isload:true,
				showorder:true,
			}
		},
		onLoad() {
			this.pullData();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.page2 = 1;
			this.page3 = 1;
			this.page4 = 1;
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
			if(this.isload == true){
				if (this.current == 0) {
					this.loadLoanData();
				} else {
					this.loadCardData();
				}
			}else{
				if (this.current == 0) {
					this.soLoanData();
				} else {
					this.soCardData();
				}
			}
			
			
		},
		methods: {
			onClickItem(index) {
				this.isload = true;
				if (this.current !== index) {
					this.current = index;
					if (this.current == 0) {
						this.productshow = true;
						this.status = 2;
						this.pullData();
					} else {
						this.isshow = false;
						this.productshow = false;
						this.status = 2;
						this.pullDatacard();
					}
				}
			},
			pullData: function() {
				uni.showLoading({
					title: '加载中',
					duration: 500
				});
				var data = {
					state: this.status,
				};
				var parameter = '?state=' + this.status;
				api.apiPost('/order/loan', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.showorder = true;
						this.orderbox = res.data.loanOrder;
						//console.log("的点击记得加" + JSON.stringify(this.orderbox))
						if (res.data.loanOrder == '') {
							this.haveorder = false;
						} else {
							this.haveorder = true;
						}

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
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			//加载数据
			loadLoanData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						state: this.status,
						page: this.page,
					};
					var parameter = '?state=' + this.status + '&page=' + this.page;
					api.apiPost('/order/loan', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.orderbox = this.orderbox.concat(res.data.loanOrder);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			pullDatacard: function() {
				uni.showLoading({
					title: '加载中',
					duration: 500
				});
				var data = {
					state: this.status,
				};
				var parameter = '?state=' + this.status;
				api.apiPost('/order/card', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.showorder = true;
						this.cardorderbox = res.data.cardOrder;
						if (res.data.cardOrder == '') {
							this.haveorder2 = false;
						} else {
							this.haveorder2 = true;
						}
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
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
					}
				});
			},
			//加载数据
			loadCardData: function() {
				this.page2++;
				if (this.page2 > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						state: this.status,
						page: this.page2,
					};
					var parameter = '?state=' + this.status + '&page=' + this.page2;
					api.apiPost('/order/card', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.cardorderbox = this.cardorderbox.concat(res.data.cardOrder);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//切换状态
			statusTAB: function(value) {
				if(this.showorder == true){
					this.showorder = false;
				}
				this.isload = true;
				this.status = value;
				this.page = 1;
				this.pullData();
				if (this.status == 3 || this.status == 5) {
					this.isshow = true;
				} else {
					this.isshow = false;
				}
				if (this.status == 1) {
					this.iswc = true;
				} else {
					this.iswc = false;
				}
			},
			//切换状态
			statusTABcard: function(value) {
				if(this.showorder == true){
					this.showorder = false;
				}
				this.isload = true;
				this.status = value;
				this.page2 = 1;
				this.pullDatacard();
				if (this.status == 3 || this.status == 5) {
					this.isshow = true;
				} else {
					this.isshow = false;
				}
			},
			// orderSoFun: function(){
			// 	uni.navigateTo({
			// 		url:"/pages/personal/search/search?status="+this.status
			// 	})
			// }
			orderSoFun: function(){
				this.isSo = false;
				this.isload = false;
				this.sodata='';
			},
			orderSosuo: function(){
				if(this.sodata == ''){
					this.isSo = true;
				}else{
					if (this.current == 0) {
						var data = {
							state: this.status,
							key: this.sodata,
						};
						var parameter = '?state=' + this.status + '&key='+this.sodata;
						api.apiPost('/order/loan', parameter, data, 'get', (status, res, code) => {
							if (res.code == 0) {
								this.isSo = true;
								this.orderbox = res.data.loanOrder;
								//console.log("的点击记得加" + JSON.stringify(this.orderbox))
								if (res.data.loanOrder == '') {
									this.haveorder = false;
								} else {
									this.haveorder = true;
								}
						
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
									//隐藏加载框
									uni.hideLoading();
								}, 300);
							} else {
								setTimeout(function() {
									//隐藏加载框
									uni.hideLoading();
								}, 300);
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
							}
						});
					} else {
						uni.showLoading({
							title: '加载中',
							duration: 500
						});
						var data = {
							state: this.status,
							key: this.sodata,
						};
						var parameter = '?state=' + this.status + '&key='+this.sodata;
						api.apiPost('/order/card', parameter, data, 'get', (status, res, code) => {
							if (res.code == 0) {
								this.isSo = true;
								this.cardorderbox = res.data.cardOrder;
								if (res.data.cardOrder == '') {
									this.haveorder2 = false;
								} else {
									this.haveorder2 = true;
								}
								setTimeout(function() {
									//隐藏加载框
									uni.hideLoading();
								}, 300);
							} else {
								setTimeout(function() {
									//隐藏加载框
									uni.hideLoading();
								}, 300);
								uni.showToast({
									title: "数据加载失败",
									icon: "none"
								})
							}
						});
					}
				}
			},
			//加载数据
			soLoanData: function() {
				this.page3++;
				if (this.page3 > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						state: this.status,
						key: this.sodata,
						page: this.page3,
					};
					var parameter = '?state=' + this.status + '&page=' + this.page3 + '&key='+this.sodata;
					api.apiPost('/order/loan', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.orderbox = this.orderbox.concat(res.data.loanOrder);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//加载数据
			soCardData: function() {
				this.page4++;
				if (this.page4 > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						state: this.status,
						key: this.sodata,
						page: this.page4,
					};
					var parameter = '?state=' + this.status + '&page=' + this.page4 + '&key='+this.sodata;
					api.apiPost('/order/card', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.cardorderbox = this.cardorderbox.concat(res.data.cardOrder);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
		}
	}
</script>

<style>
	@import url("../../../common/common.css");

	page {
		background: #F1F4F8;
	}

	.nonebox {
		text-align: center;
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: rgba(189, 203, 222, 1);
		margin-top: 260upx;
	}

	.zn-tab {
		width: 750upx;
		float: left;
		background: #FFFFFF;
	}

	.uni-padding-wrap {
		flex: 1;
	}

	.content {
		width: 690upx;
		padding: 0 30upx;
	}

	.db-tab-box {
		width: 100%;
		float: left;
		display: flex;
		margin-top: 30upx;
		padding-bottom: 30upx;
	}

	.db-tab-child {
		flex: 1;
		font-size: 24upx;
		color: #868789;
		margin-right: 20upx;
		background: #F3F4F6;
		border-radius: 6upx;
		text-align: center;
		line-height: 50upx;
	}

	.tactive {
		color: #FFFFFF !important;
		background: #257BFF !important;
	}

	.zn-content {
		width: 750upx;
		float: left;
	}

	.content-nav {
		width: 330upx;
		margin-left: 30upx;
		margin-top: 30upx;
		float: left;
		overflow: hidden;
		background: #FFFFFF;
	}

	.con-img {
		width: 330upx;
		height: 194upx;
		float: left;
	}

	.con-t {
		width: 290upx;
		padding: 20upx 20upx 10upx;
		float: left;
	}

	.con-icon01 {
		width: 28upx;
		height: 28upx;
		float: left;
		border-radius: 100%;
	}

	.zn-t {
		width: 252upx;
		float: right;
		font-size: 28upx;
		color: #000000;
		line-height: 28upx;
		height: 28upx;
		overflow: hidden;
	}

	.zn-fw {
		width: 290upx;
		padding: 0 20upx;
		float: left;
		font-size: 22upx;
		color: #868789;
		padding-bottom: 20upx;
	}

	.or-01 {
		float: left;
	}

	.or-02 {
		margin-left: 20upx;
	}
	.soso-box{ width: 690upx; padding: 30upx;box-shadow:0px 4upx 17upx 3upx rgba(240,244,249,1); background: #FFFFFF; display: flex;}
	.soso-navleft{ flex: 1;background:rgba(255,255,255,1);border:1upx solid rgba(200,212,229,1);border-radius:33upx; display: flex; height: 66upx;}
	.soso-ipt{ font-size: 26upx; flex: 1; height: 52upx; line-height: 52upx; margin-top: 7upx;}
	.soso-icon{ margin: 8upx 16upx 0 20upx;}
	.soso-navright{ font-size: 30upx; color: #000000; line-height: 66upx; padding: 0 20upx 0 40upx;}
</style>
