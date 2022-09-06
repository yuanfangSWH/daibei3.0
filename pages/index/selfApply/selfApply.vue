<template>
	<view class="content" v-show="pageshow">
		<view>
			<view class="his-nav">
				<text class="his-t01">申请人</text><text class="his-t02">{{formatName(userInfo.name)}}</text>
			</view>
			<view class="his-nav">
				<text class="his-t01">身份证</text><text class="his-t02">{{userInfo.card}}</text>
			</view>
			<view class="his-nav">
				<text class="his-t01">手机号</text><text class="his-t02">{{userInfo.mobile}}</text>
			</view>
		</view>
		<view class="xieyi-box">
			<label><checkbox value="cb" checked="true" color="#257BFF" style="transform:scale(0.6)" />我同意</label><text>《用户注册协议》</text>和<text>《用户注册协议》</text>
		</view>
		<button class="register-btn" @click="loanapply">提交申请</button>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				userInfo: '',
				uid: '',
				hisbox: [],
				key: '',
				id: '',
				pageshow:false
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.userdata();
		},
		methods: {
			userdata: function() {
				uni.showLoading({
					title:'加载中'
				})
				var data = {
					id: this.id,
				};
				var parameter = '?id=' + this.id;
				api.apiPost('/card/info', parameter, data, 'get', (status, res, code) => {
					if (!Object.is(res.data.cardInfo, {})) {
						this.userInfo = res.data.userInfo;
						this.key = res.data.cardInfo.key;
						this.showP();
						uni.hideLoading();
					}else {
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
			formatName: function(str) {
				var n=String(str);
				return new Array(n.length).join('*') + n.substr(-1);
			},
			loanapply: function() {
				var data = {
					msgCode: 'history',
					key: this.key,
				};
				var parameter = '?msgCode=history' + '&key=' + this.key;
				api.apiPost('/apply/card', parameter, data, 'POST', (status, res, code) => {
					if (res.code == 0) {
						this.toUrl = res.data.toUrl;
						location.href=this.toUrl;
						// uni.navigateTo({
						// 	url: "/pages/index/apply/apply?url=" + this.toUrl
						// })
					} else {
						uni.showToast({
							title: "申请失败",
							icon: "none"
						});
						return;
					}
				});
			},
		}
	}
</script>

<style>
	.content {
		width: 670upx;
		margin: 0 40upx;
	}

	.his-nav {
		display: flex;
		width: 670upx;
	}

	.his-t01 {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin-right: 40upx;
	}

	.his-t02 {
		flex: 1;
		height: 59upx;
		line-height: 59upx;
		padding: 20upx 0;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		border-bottom: 1upx solid #EDEDED;
	}

	.xieyi-box {
		margin-top: 50upx;
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(177, 177, 177, 1);
	}

	.xieyi-box text {
		color: #257BFF;
	}

	.register-btn {
		margin-top: 50upx;
		height: 87upx;
		background: rgba(37, 123, 255, 1);
		border-radius: 44upx;
		border: none;
		line-height: 87upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
	}
</style>
