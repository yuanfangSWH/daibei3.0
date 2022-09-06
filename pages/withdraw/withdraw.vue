<template>
	<view class="content" v-show="pageshow">
		<view class="txbox">
			<view class="tx-nav01">
				<view class="nav01-child tx-t">提现金额(元)</view>
			</view>
			<view class="tx-nav02">
				<view class="nav01-child">
					<text class="tx-t2">￥</text>
					<input class="db-ipt01" v-model="moneyCount" type="text" displayable maxlength="12" placeholder="请输入提现金额"
					 placeholder-style="color:#CFD0D4; font-size:44upx"></input>
					<view class="tx-all" @click="allMoneyFun">全部提现</view>
				</view>
			</view>
			<view class="tx-nav01">
				<view class="nav01-child tx-t3">可提现金额：{{cardInfo.user_money}}元</view>
			</view>
		</view>
		<view class="txbox" v-if="cardInfo.user_bank_card">
			<view class="tx-nav02">
				<view class="nav01-child" @click="jiebang">
					<view class="tx-nav03"><text class="tx-jia02">银行卡号</text><text class="tx-tt02">({{cardNo}}) 储蓄卡</text></view>
					<view class="c-05">
						<image class="c-jiantou" src="../../static/jiantou.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="txbox" v-else>
			<view class="tx-nav02">
				<view class="nav01-child" @click="addBankCard">
					<view class="tx-nav03"><text class="tx-jia">+</text><text class="tx-tt">添加提现银行卡账号</text></view>
					<view class="c-05">
						<image class="c-jiantou" src="../../static/jiantou.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="tx-xieyi">
			<checkbox-group @change="isXuanzhong">
				<label>
					<checkbox value="cb" :checked="checked" color="#257BFF" style="transform:scale(0.7)" />
				</label><text @click="gotoxyFun">《“云账户”费用结算服务协议》</text>
			</checkbox-group>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="FindSubmit">同意协议并确认</button>
		</view>
		<view class="txguize">
			提现规则：<br />
			1. 提现10元起，每天可提现一次，免手续费。<br />
			2. 单笔提现佣金高于10万元即可联系客服申请大额提现。<br />
			3. 工作日21:00之前提现的当天到账，之后的次日到账，周末节假日顺延至第一个工作日到账。
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon,
		},
		data() {
			return {
				moneyCount: '',
				txMoney: '',
				cardInfo: '',
				card: '',
				cardNo: '',
				checked: true,
				isTx: true,
				pageshow: false
			}
		},
		onLoad(e) {
			this.userInfo();
			//this.txMoney = e.m;
		},
		methods: {
			showP: function() {
				this.pageshow = true;
			},
			userInfo: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.showP();
						//console.log("ffff:"+JSON.stringify(res.data));
						this.cardInfo = res.data;
						this.txMoney = res.data.user_money;
						var str = this.cardInfo.user_bank_card;
						this.card = str;
						this.cardNo = str.substring(str.length - 4);
					}
				});
			},
			allMoneyFun: function() {
				this.moneyCount = this.txMoney;
			},
			isXuanzhong: function() {
				if (this.checked == true) {
					this.checked = false;
				} else {
					this.checked = true;
				}
			},
			FindSubmit: function() {
				if (this.moneyCount == '') {
					uni.showToast({
						title: '提现金额不能为空',
						icon: 'none'
					});
					return;
				}
					if (this.checked == true) {
						if (this.isTx == true) {
							this.isTx = false;
							var data = {
								num: this.moneyCount,
								type: 1,
							};
							var parameter = '?num=' + this.moneyCount + '&type=1';
							api.apiPost('/user/take', parameter, data, 'POST', (status, res, code) => {
								if (res.code == 0) {
									uni.navigateTo({
										url: '/pages/withdraw/tixianSuccess/tixianSuccess?money=' + this.moneyCount + '&card=' + this.card
									})
									this.isTx = true;
								} else {
									uni.navigateTo({
										url: '/pages/withdraw/tixianfail/tixianfail?money=' + this.moneyCount + '&card=' + this.card + '&msg=' +
											res.msg
									})
									this.isTx = true;
								}
							});
						} else {
							uni.showToast({
								title: '请勿频繁操作',
								icon: 'none'
							})
						}

					} else {
						uni.showToast({
							title: '请先阅读协议并同意',
							icon: 'none'
						})
					}
				
			},
			addBankCard: function() {
				uni.navigateTo({
					url: '/pages/withdraw/addbank/addbank'
				})
			},
			jiebang: function() {
				uni.navigateTo({
					url: '/pages/withdraw/unbundle/unbundle'
				})
			},
			gotoxyFun: function() {
				var tUrl = "http://pro.rong298.cn/member/vipcpl?type=yzhxy&from=singlemessage&isappinstalled=0";
				location.href = tUrl;
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F4F6F9;
	}

	.txbox {
		background: #FFFFFF;
		margin-top: 30upx;
	}

	.content {
		width: 750upx;
	}

	.mr-setpwd {
		margin: 150upx 0 50upx;
	}

	.tx-nav01 {
		border-bottom: 1px solid #EEF3F8;
		padding: 20upx 0 20upx;
	}

	.tx-nav02 {
		border-bottom: 1px solid #EEF3F8;
		padding: 30upx 0;
	}

	.nav01-child {
		padding: 0 50upx;
		display: flex;
	}

	.tx-t {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
	}

	.db-ipt01 {
		flex: 1;
		height: 112upx;
		line-height: 112upx;
		font-size: 80upx;
		color: #000000;
	}

	.tx-t2 {
		line-height: 112upx;
		height: 112upx;
		font-size: 60upx;
		font-family: PingFang-SC-Regular;
		color: rgba(1, 1, 1, 1);
	}

	.tx-all {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: #257BFF;
		line-height: 112upx;
	}

	.tx-t3 {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: rgba(187, 187, 192, 1);
	}

	.tx-jia {
		font-size: 44upx;
		font-weight: bold;
		color: rgba(64, 75, 94, 1);
		line-height: 48upx;
	}

	.tx-tt {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(64, 75, 94, 1);
		margin-left: 20upx;
		line-height: 48upx;
	}

	.tx-xieyi {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: rgba(37, 123, 255, 1);
		margin: 30upx 0 30upx 50upx;
	}

	.btn-row {
		margin: 0 50upx;
	}

	.loan-btn {
		background: rgba(37, 123, 255, 1);
		border-radius: 46upx;
	}

	.tx-jia02 {
		margin-right: 30upx;
	}

	.tx-jia02,
	.tx-tt02 {
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
	}

	.tx-nav03 {
		flex: 1;
	}

	.c-jiantou {
		width: 20upx;
		height: 20upx;
		margin-top: 24upx;
	}

	.txguize {
		width: 650upx;
		margin: 30upx 50upx;
		font-size: 24upx;
		color: #A5ABB4;
		line-height: 40upx;
	}
</style>
