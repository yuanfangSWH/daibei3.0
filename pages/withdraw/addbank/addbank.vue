<template>
	<view class="content" v-show="pageshow">
		<view class="add-tbox">
			<view class="add-t1">数据已加密防护</view>
			<view class="add-t2">保障您的信息安全</view>
		</view>
		<view class="add-nav01">
			<view class="add-t3">姓名</view>
			<view class="add-name">
				<view class="add-name"><input v-model="name" class="add-ipt01" type="text" :disabled="pandin" placeholder="请输入姓名"
					 placeholder-style="color:#CFD0D4;" /></view>
			</view>
		</view>
		<view class="add-nav01">
			<view class="add-t3">身份证</view>
			<view class="add-name">
				<view class="add-name"><input v-model="sfz" class="add-ipt01" :disabled="pandin" type="text" placeholder="请输入身份证"
					 placeholder-style="color:#CFD0D4;" /></view>
			</view>
		</view>
		<view class="add-nav01">
			<view class="add-t3">银行卡号</view>
			<view class="add-name"><input v-model="bankcard" class="add-ipt01" type="number" placeholder="请输入银行卡号"
				 placeholder-style="color:#CFD0D4;" /></view>
		</view>
		<view class="btn-row">
			<button type="primary" class="loan-btn" @click="NextStap">下 一 步</button>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon,
		},
		data() {
			return {
				name: '',
				sfz: '',
				bankcard: '',
				pageshow: false,
				pandin: true,
				reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				regName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
			}
		},
		onLoad() {
			this.getUserinfo();
		},
		methods: {
			showP: function() {
				this.pageshow = true;
			},
			getUserinfo: function() {
				api.apiPost('/account/ainfo', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.showP();
						this.cardInfo = res.data;
						this.name = this.cardInfo.user_name;
						this.sfz = this.cardInfo.user_card;
						if (this.name == "" || this.sfz == "") {
							this.pandin = false;
						}
					} else {
						uni.showToast({
							title: "" + res.msg,
							icon: "none"
						})
					}
				});
			},
			NextStap: function() {
				if (this.name == '') {
					uni.showToast({
						title: "请输入姓名",
						icon: "none"
					})
				} else if (!this.regName.test(this.name)) {
					uni.showToast({
						title: "姓名格式错误",
						icon: "none"
					})
				} else if (this.sfz == '') {
					uni.showToast({
						title: "请输入身份证",
						icon: "none"
					})
				} else if (this.bankcard == '') {
					uni.showToast({
						title: "请输入银行卡号",
						icon: "none"
					})
				} else {
					if (this.pandin) {
						this.tiaoz();
					} else {
						if (!this.reg.test(this.sfz)) {
							uni.showToast({
								title: "身份证格式错误",
								icon: "none"
							})
						} else {
							this.tiaoz();
						}
					}
				}
			},
			tiaoz: function() {
				var data = this.name + "|" + this.sfz + "|" + this.bankcard
				data = encodeURIComponent(data);
				uni.navigateTo({
					url: '/pages/withdraw/affirmInfo/affirmInfo?bankcard=' + data
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #FFFFFF;
	}

	.content {
		width: 750upx;
	}

	.add-tbox {
		text-align: center;
		margin: 80upx 0 120upx;
	}

	.add-t1 {
		height: 42upx;
		line-height: 42upx;
		font-size: 44upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
	}

	.add-t2 {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		color: rgba(182, 187, 195, 1);
		margin-top: 20upx;
	}

	.add-nav01 {
		width: 650upx;
		margin: 0 50upx 40upx;
		border-bottom: 1upx solid #EEF3F8;
	}

	.add-t3 {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		color: rgba(0, 0, 0, 1);
		font-weight: bold;
	}

	.add-name {
		font-size: 32upx;
		font-family: PingFang-SC-Regular;
		color: rgba(0, 0, 0, 1);
		margin: 14upx 0 20upx;
	}

	.btn-row {
		margin: 0 50upx;
	}

	.loan-btn {
		background: rgba(37, 123, 255, 1);
		border-radius: 46upx;
	}
</style>
