<template>
	<view>
		<view class="soso-box">
			<view class="soso-navleft"><uni-icon class="soso-icon" type="search" size="20"></uni-icon><input class="soso-ipt" type="text" placeholder="输入订单号搜索" v-model="sodata" ></input></view>
			<view class="soso-navright" @click="pullData">搜索</view>
		</view>
		<view class="soso-history">
			<!-- <view class="soso-n-t">热门搜索</view>
			<view class="soso-con">
				<view class="soso-list">交通银行</view>
				<view class="soso-list">光大银行</view>
				<view class="soso-list">浦发银行</view>
				<view class="soso-list">兴业银行</view>
			</view> -->
			<view class="loan-nav-child" v-for="(item,index) in orderbox" :key="index">
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
					</view>
					<view class="db-c-right" v-show="isshow">
						<view class="lianxi-kh">联系客户</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon},
		data() {
			return {
				orderbox:'',
				status: '2',
				sodata:'',
			}
		},
		onLoad(e) {
			this.status = e.status;
		},
		methods: {
			pullData: function() {
				uni.showLoading({
					title: '加载中',
					duration: 500
				});
				var data = {
					state: this.status,
					key: this.sodata,
				};
				var parameter = '?state=' + this.status + '&key=' + this.sodata;
				//var parameter = '?key=' + this.sodata;
				api.apiPost('/order/loan', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.orderbox = res.data.loanOrder;
						console.log("的点击记得加" + JSON.stringify(this.orderbox))
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
		}
	}
</script>

<style>
.soso-box{ width: 690upx; padding: 30upx;box-shadow:0px 4upx 17upx 3upx rgba(240,244,249,1); background: #FFFFFF; display: flex;}
.soso-navleft{ flex: 1;background:rgba(255,255,255,1);border:1upx solid rgba(200,212,229,1);border-radius:33upx; display: flex; height: 66upx;}
.soso-ipt{ font-size: 26upx; flex: 1; height: 52upx; line-height: 52upx; margin-top: 7upx;}
.soso-icon{ margin: 8upx 16upx 0 20upx;}
.soso-navright{ font-size: 30upx; color: #000000; line-height: 66upx; padding: 0 20upx 0 40upx;}
.soso-history{ width: 690upx; margin: 30upx;}
.soso-n-t{ font-size: 30upx; color: #67707E;}
.soso-con{ width: 690upx; margin-top: 30upx;}
.soso-list{ float: left; margin: 40upx 34upx 0; color: #414953; font-size: 30upx;}
</style>
