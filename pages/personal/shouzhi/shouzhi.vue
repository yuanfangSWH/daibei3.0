<template>
	<view class="shouzhibox">
		<view class="alllist" v-show="isSo">
			<view class="sz-tabbox">
				<view class="sz-qiehuan"><text class="sz-tab" :class="{ active: status == 0 }" @click="statusTAB(0)">收入记录</text><text
					 class="sz-tab" :class="{ active: status == 1 }" @click="statusTAB(1)">提现记录</text></view>
				<view class="sz-soso"><text class="ss-t01">|</text><text class="ss-t02" @click="soFun">搜索</text></view>
			</view>
			<view v-show="isshow">
				<view v-show="hasdata" class="shouzhi-con" v-for="(item, key) in inComeList" :key="key">
					<view class="shouzhi-nav01">
						<text class="shouzhi-time">{{item.key}}</text>
						<text class="shouzhi-shouru">收入：¥{{item.value[0].summoney}}</text>
					</view>
					<view class="shouzhi-nav02" v-for="(list, index1) in item.value" :key="index1">
						<view class="sz-nav02-left">
							<view class="sz-nav02-a01"><text class="a-t01">{{list.income_type}}</text><text class="a-t02">[{{list.income_name}}]</text></view>
							<view class="user-info"><text class="info-text01">{{list.name}}</text><text class="info-text02">{{list.mobile}}</text></view>
							<view class="mx-time">{{list.income_time}}</view>
						</view>
						<view class="sz-nav02-right"><text class="b-t01">+</text><text class="b-t02">{{list.income_money}}</text></view>
					</view>
				</view>
				<view class="nonebox" v-show="!hasdata">
					<image class="defimg" src="../../../static/def.png"></image>
					<view class="deftext">{{n1}}</view>
				</view>
			</view>
			<view v-show="!isshow">
				<view v-show="hasdata2" class="shouzhi-con" v-for="(item, index) in outComeList" :key="index">
					<view class="shouzhi-nav01"><text class="shouzhi-time">{{item.key}}</text></view>
					<view class="shouzhi-nav02" v-for="(list, index1) in item.value" :key="index1">
						<view class="sz-nav02-left">
							<view class="sz-nav02-a01"><text class="a-t01">收入提现</text></view>
							<view class="user-info"><text class="info-text02">提现到：{{list.account_type}}尾号（{{jiequ(list.outcome_account)}}）</text></view>
							<view class="mx-time">{{list.outcome_start_time}}</view>
						</view>
						<view class="sz-nav02-right">
							<view class="zc-data"><text class="c-t01">-</text><text class="c-t02">{{list.outcome_money}}</text></view>
							<view class="tx-cheng">{{list.outcome_state}}</view>
						</view>
					</view>
				</view>
				<view class="nonebox" v-show="!hasdata2">
					<image class="defimg" src="../../../static/def.png"></image>
					<view class="deftext">{{n2}}</view>
				</view>
			</view>
		</view>
		<view class="sosuobox" v-show="!isSo">
			<view class="soso-box">
				<view class="soso-navleft">
					<uni-icon class="soso-icon" type="search" size="20"></uni-icon><input v-model="key" class="soso-ipt" type="text"
					 placeholder="输入用户手机号或银行名称" placeholder-style="color:#C8D4E5"></input>
				</view>
				<view class="soso-navright" @click="sosuoFun">搜索</view>
			</view>
			<view class="soso-history">
				<view class="soso-n-t">热门搜索</view>
				<view class="soso-con">
					<view class="soso-list" v-for="(item, index) in hotdata" :key="index" @click="hotFun(item)">{{item}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				inComeList: [],
				BFdata: [],
				outComeList: {},
				status: '0',
				isshow: true,
				page: 1,
				pageCount: 0,
				page2: 1,
				pageCount2: 0,
				amountData: [],
				hasdata: true,
				hasdata2: true,
				isSo: true,
				key: '',
				hotdata: ["交通银行", "光大银行", "浦发银行", "兴业银行"],
				n1: '暂无收入记录',
				n2: '暂无提现记录'
			}
		},
		onLoad() {
			this.income();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.page2 = 1;
			if (this.isshow == true) {
				this.income();
			} else {
				this.outcome();
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom() {

			if (this.isshow == true) {
				uni.showLoading({
					title: '加载中'
				});
				this.loadingData();
			} else {
				uni.showLoading({
					title: '加载中'
				});
				this.loadZhichuData();
			}
		},
		methods: {
			//加载数据
			income: function() {
				api.apiPost('/user/income', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						uni.hideLoading();
						//数据
						var dataI = res.data.inComeList;
						//拆分成数组----------
						var arr = Array();
						for (var key in dataI) {
							if (dataI.hasOwnProperty(key)) {
								var temp = new Object();
								var value = dataI[key];
								temp.key = key;
								temp.value = value;
								arr.push(temp);
							}
						}
						this.inComeList = arr;
						//数据备份
						this.BFdata = arr;
						//分页
						this.pageCount = res.data.pages.defaultPageSize;
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '' + res.msg,
							icon: 'none',
							duration: 2000
						});
					}

				})
			},
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
					api.apiPost('/user/income', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							var dataI = res.data.inComeList;
							//拆分成数组----------
							var arr = Array();
							for (var key in dataI) {
								if (dataI.hasOwnProperty(key)) {
									var temp = new Object();
									var value = dataI[key];
									temp.key = key;
									temp.value = value;
									arr.push(temp);
								}
							}
							var bf = arr;
							this.BFdata = this.BFdata.concat(arr);
							//console.log("备份数据：" + JSON.stringify(this.BFdata));
							
							var hash=[];
							  for (var i = 0; i < this.BFdata.length; i++) {
							    for (var j = i+1; j < this.BFdata.length; j++) {
							      if(this.BFdata[i].key==this.BFdata[j].key){
							        ++i;
							      }
							    }
							      hash.push(this.BFdata[i]);
								  //console.log("数据：" + JSON.stringify(hash));
							  }
							this.inComeList = hash;
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '' + res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			},
			//加载数据（旧）
			//income: function() {
			// income: function() {
			// 	uni.showLoading({
			// 		title:'加载中'
			// 	})
			// 	api.apiPost('/user/income', '', '', 'get', (status, res, code) => {
			// 		if (res.code == 0) {
			// 			this.inComeList = res.data.inComeList;
			// 			if(this.inComeList == ''){
			// 				this.hasdata = false;
			// 				this.n1 = '暂无收入记录';
			// 			}else{
			// 				this.hasdata = true;
			// 			}
			// 			//拆分成数组----------
			// 			var arr = Array();
			// 			for (var key in this.inComeList) {
			// 				if (this.inComeList.hasOwnProperty(key)) {
			// 					var temp = new Object();
			// 					var value = this.inComeList[key];
			// 					temp.key = key;
			// 					temp.value = value;
			// 					arr.push(temp);
			// 				}
			// 			}
			// 			this.inComeList = arr;

			// 			//计算累加
			// 			var value = 0;
			// 			for (let i = 0; i < arr.length; i++) {
			// 				for (let x = 0; x < arr[i].value.length; x++) {
			// 					value += parseFloat(arr[i].value[x].income_money);
			// 				}
			// 				this.amountData.push(value.toFixed(2));
			// 				value = 0;
			// 			}
			// 			//分页
			// 			var rowCount = res.data.pages.totalCount;
			// 			var pageSize = res.data.pages.defaultPageSize;
			// 			if (rowCount == null || rowCount == "") {
			// 				this.pageCount = 0;
			// 			} else {
			// 				if (pageSize != 0 && rowCount % pageSize == 0) {
			// 					this.pageCount = parseInt(rowCount / pageSize);
			// 				}
			// 				if (pageSize != 0 &&
			// 					rowCount % pageSize != 0) {
			// 					this.pageCount = parseInt(rowCount / pageSize) + 1;
			// 				}
			// 			}
			// 			uni.hideLoading();
			// 		}else{
			// 			uni.hideLoading();
			// 		}
			// 	});
			// },
			//加载数据（旧）
			// loadingData: function() {
			// 	this.page++;
			// 	if (this.page > this.pageCount) {
			// 		uni.showToast({
			// 			title: '没有更多内容了',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	} else {
			// 		var data = {
			// 			page: this.page,
			// 		};
			// 		var parameter = '?page=' + this.page;
			// 		api.apiPost('/user/income', parameter, data, 'get', (status, res, code) => {
			// 			if (res.code == 0) {
			// 				var dataI = res.data.inComeList;
			// 				//拆分成数组----------
			// 				var arr = Array();
			// 				for (var key in dataI) {
			// 					if (dataI.hasOwnProperty(key)) {
			// 						var temp = new Object();
			// 						var value = dataI[key];
			// 						temp.key = key;
			// 						temp.value = value;
			// 						arr.push(temp);
			// 					}
			// 				}
			// 				this.inComeList = this.inComeList.concat(arr);
			// 				//计算累加
			// 				var value = 0;
			// 				for (let i = 0; i < arr.length; i++) {
			// 					for (let x = 0; x < arr[i].value.length; x++) {
			// 						value += parseFloat(arr[i].value[x].income_money);
			// 						var f_x = parseFloat(value);
			// 						if (isNaN(f_x)) {
			// 							return false;
			// 						}
			// 						var f_x = Math.round(value * 100) / 100;
			// 						value = f_x;
			// 					}
			// 					this.amountData.push(value.toFixed(2));
			// 					value = 0;
			// 				}
			// 				setTimeout(function() {
			// 					//隐藏加载框
			// 					uni.hideLoading();
			// 				}, 300);
			// 			}
			// 		});
			// 	}
			// },
			outcome: function() {
				uni.showLoading({
					title: '加载中'
				})
				api.apiPost('/user/outcome', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						var arrData = res.data.inComeList;
						if (arrData == '') {
							this.hasdata2 = false;
							this.n2 = '暂无提现记录';
						} else {
							this.hasdata2 = true;
						}
						//console.log(JSON.stringify(res.data.inComeList));
						//拆分成数组----------
						var arr = Array();
						for (var key in arrData) {
							if (arrData.hasOwnProperty(key)) {
								var temp = new Object();
								var value = arrData[key];
								temp.key = key;
								temp.value = value;
								arr.push(temp);
							}
						}
						this.outComeList = arr;
						var rowCount = res.data.pages.totalCount;
						var pageSize = res.data.pages.defaultPageSize;
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
						uni.hideLoading();
					}
				});
			},
			//加载数据
			loadZhichuData: function() {
				this.page2++;
				if (this.page2 > this.pageCount2) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						page: this.page2,
					};
					var parameter = '?page=' + this.page2;
					api.apiPost('/user/outcome', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							var arrData = res.data.inComeList;
							//console.log(JSON.stringify(res.data.inComeList));
							//拆分成数组----------
							var arr = Array();
							for (var key in arrData) {
								if (arrData.hasOwnProperty(key)) {
									var temp = new Object();
									var value = arrData[key];
									temp.key = key;
									temp.value = value;
									arr.push(temp);
								}
							}
							this.outComeList = this.outComeList.concat(arr);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			jiequ: function(str) {
				var len = str.length;
				var n = Number(len - 4);
				return str.slice(n);
			},
			//切换状态
			statusTAB: function(value) {
				this.status = value;
				if (this.status == 0) {
					this.income();
					this.isshow = true;
				} else {
					this.isshow = false;
					this.outcome();
				}
			},
			soFun: function() {
				if (this.isSo == true) {
					this.isSo = false;
				} else {
					this.isSo = true;
				}
			},
			sosuoFun: function() {
				if (this.isshow == true) {
					if (this.key != '') {
						uni.showLoading({
							title: '加载中'
						})
						api.apiPost('/user/income?key=' + this.key, '', '', 'get', (status, res, code) => {
							//console.log("这里："+JSON.stringify(res));
							if (res.code == 0) {
								this.inComeList = res.data.inComeList;
								if (this.inComeList == '') {
									this.hasdata = false;
									this.n1 = '暂无与' + this.key + '相关的收入记录'
								} else {
									this.hasdata = true;
								}
								//拆分成数组----------
								var arr = Array();
								for (var key in this.inComeList) {
									if (this.inComeList.hasOwnProperty(key)) {
										var temp = new Object();
										var value = this.inComeList[key];
										temp.key = key;
										temp.value = value;
										arr.push(temp);
									}
								}
								this.inComeList = arr;
								//console.log("拆分后："+JSON.stringify(arr));
								//计算累加
								var value = 0;
								for (let i = 0; i < arr.length; i++) {
									for (let x = 0; x < arr[i].value.length; x++) {
										value += parseFloat(arr[i].value[x].income_money);
									}
									this.amountData.push(value.toFixed(2));
									value = 0;
								}
								//分页
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
								this.isSo = true;
								uni.hideLoading();
							} else {
								uni.hideLoading();
							}
						});
					} else {
						this.isSo = true;
					}
					//this.income();
				} else {
					if (this.key != '') {
						uni.showLoading({
							title: '加载中'
						})
						api.apiPost('/user/outcome?key=' + this.key, '', '', 'get', (status, res, code) => {
							if (res.code == 0) {
								var arrData = res.data.inComeList;
								if (arrData == '') {
									this.hasdata2 = false;
									this.n2 = '暂无与' + this.key + '相关的提现记录'
								} else {
									this.hasdata2 = true;
								}
								//console.log(JSON.stringify(res.data.inComeList));
								//拆分成数组----------
								var arr = Array();
								for (var key in arrData) {
									if (arrData.hasOwnProperty(key)) {
										var temp = new Object();
										var value = arrData[key];
										temp.key = key;
										temp.value = value;
										arr.push(temp);
									}
								}
								this.outComeList = arr;
								var rowCount = res.data.pages.totalCount;
								var pageSize = res.data.pages.defaultPageSize;
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
								this.isSo = true;
								uni.hideLoading();
							} else {
								uni.hideLoading()
							}
						});
					} else {
						this.isSo = true;
					}
					//this.outcome();
				}
			},
			hotFun: function(obj) {
				this.key = obj;
				this.sosuoFun();
			},
		}
	}
</script>

<style>
	page {
		background: #F3F6FB;
	}

	.sosuobox {
		height: 100vh;
		background: #FFFFFF;
	}

	.shouzhibox {
		margin-bottom: 30upx;
	}

	.sz-tabbox {
		background: #FFFFFF;
		display: flex;
		padding: 30upx 30upx 0;
	}

	.sz-qiehuan {
		flex: 1;
	}

	.sz-tab {
		font-size: 26upx;
		color: #000000;
		float: left;
		line-height: 70upx;
		margin-right: 50upx;
	}

	.active {
		font-weight: bold;
		font-size: 32upx;
		border-bottom: 6upx solid #2A8CFB;
	}

	.ss-t01 {
		color: #E2E9F2;
		font-size: 26upx;
	}

	.ss-t02 {
		font-size: 28upx;
		color: #7E8691;
		padding-left: 20upx;
	}

	.shouzhi-con {
		width: 690upx;
		margin: 0 30upx;
	}

	.shouzhi-nav01 {
		width: 690upx;
		display: inline-block;
		margin-top: 40upx;
		margin-bottom: -18upx;
	}

	.shouzhi-time {
		float: left;
		font-size: 26upx;
		color: #ADB6C2;
	}

	.shouzhi-shouru {
		float: right;
		font-size: 26upx;
		color: #ADB6C2;
	}

	.shouzhi-nav02 {
		background: #FFFFFF;
		border-radius: 8upx;
		width: 630upx;
		padding: 30upx;
		margin-top: 30upx;
		display: flex;
	}

	.sz-nav02-left {
		flex: 1;
		height: 150upx;
		overflow: hidden;
	}

	.sz-nav02-a01 {
		display: flex;
	}

	.a-t01 {
		font-size: 34upx;
		color: #000000;
		font-weight: bold;
		height: 44upx;
		line-height: 44upx;
	}

	.a-t02 {
		font-size: 30upx;
		color: #000000;
		margin-left: 6upx;
		flex: 1;
		height: 44upx;
		line-height: 44upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.user-info {
		color: #757D86;
		font-size: 26upx;
		padding: 16upx 0;
	}

	.info-text01 {
		margin-right: 20upx;
	}

	.mx-time {
		font-size: 22upx;
		color: #AEB7C2;
		padding-bottom: 4upx;
	}

	.sz-nav02-right {
		height: 150upx;
		text-align: right;
	}

	.b-t01 {
		font-size: 36upx;
		line-height: 150upx;
		font-weight: bold;
		color: #2A8CFB;
	}

	.b-t02 {
		font-size: 40upx;
		line-height: 150upx;
		font-weight: bold;
		color: #2A8CFB;
	}

	.c-t01 {
		font-size: 36upx;
		font-weight: bold;
		color: #182130;
	}

	.c-t02 {
		font-size: 40upx;
		font-weight: bold;
		color: #182130;
	}

	.tx-cheng {
		color: #2A8CFB;
		font-size: 26upx;
		height: 36upx;
		line-height: 36upx;
	}

	.zc-data {
		height: 52upx;
		line-height: 52upx;
		margin-top: 31upx;
	}

	.nonebox {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: rgba(189, 203, 222, 1);
		margin-top: 260upx;
	}

	.soso-box {
		width: 690upx;
		padding: 30upx;
		box-shadow: 0px 4upx 17upx 3upx rgba(240, 244, 249, 1);
		background: #FFFFFF;
		display: flex;
	}

	.soso-navleft {
		flex: 1;
		background: rgba(255, 255, 255, 1);
		border: 1upx solid rgba(200, 212, 229, 1);
		border-radius: 33upx;
		display: flex;
		height: 66upx;
	}

	.soso-ipt {
		font-size: 26upx;
		flex: 1;
		height: 52upx;
		line-height: 52upx;
		margin-top: 7upx;
	}

	.soso-icon {
		margin: 8upx 16upx 0 20upx;
	}

	.soso-navright {
		font-size: 30upx;
		color: #000000;
		line-height: 66upx;
		padding: 0 20upx 0 40upx;
	}

	.soso-history {
		width: 690upx;
		margin: 30upx;
	}

	.soso-n-t {
		font-size: 30upx;
		color: #67707E;
	}

	.soso-con {
		width: 690upx;
		margin-top: 30upx;
	}

	.soso-list {
		float: left;
		margin: 40upx 34upx 0;
		color: #414953;
		font-size: 30upx;
	}
</style>
