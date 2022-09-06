<template>
	<view class="content">
		<view class="yj-title">我的团队业绩</view>
		<view class="yj-list" v-show="isShow">
			<view class="yj-nav" v-for="(item, index) in yjdata" :key="index">
				<view class="yj-time">{{ item.income_time }}</view>
				<view class="yj-money">{{ item.income_money }}</view>
			</view>
		</view>
		<view class="zanwuyj" v-show="!isShow">
			<image class="defimg" src="../../../static/def.png"></image>
			<view class="deftext">暂无历史业绩</view>
		</view>
	</view>
</template>

<script>
import api from '../../../common/api/api.js';
export default {
	data() {
		return {
			yjdata: '',
			isShow: true
		};
	},
	onLoad() {
		this.yejiData();
	},
	onPullDownRefresh() {
		this.yejiData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		//加载时间最新
		yejiData: function() {
			api.apiPost('/team/historyl', '', '', 'GET', (status, res, code) => {
				if (res.code == 0) {
					var jiusData = res.data.history;
					//排序开始
					var yeji = [];
					for (var i = 0; i < jiusData.length; i++) {
						var datezu = jiusData[i].income_time.split("-")
						var datezu2 = datezu[0]+datezu[1];
						yeji.push({
							id:i,
							riqi:datezu2
						});
					}
					yeji.sort(function(a, b) {
						return b.riqi - a.riqi;
					});
					var yeji2 = [];
					for (var x = 0; x < jiusData.length; x++) {
						yeji2.push(jiusData[yeji[x].id]);
					}
					this.yjdata = yeji2;
					// 排序结束
					if (this.yjdata == '') {
						this.isShow = false;
					} else {
						this.isShow = true;
					}
				}
			});
		}
	}
};
</script>

<style scoped>
page {
	background: #f3f6fb;
}
.content {
	width: 690upx;
	margin: 0 30upx;
}
.yj-title {
	padding: 20upx 0;
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(34, 36, 39, 1);
}
.yj-nav {
	display: flex;
	background: #ffffff;
	border-radius: 8upx;
	padding: 20upx 30upx;
	margin-bottom: 18upx;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(49, 56, 62, 1);
}
.yj-time {
	flex: 1;
}
.zanwuyj {
	width: 100%;
	text-align: center;
	padding: 120upx 0;
	font-size: 28upx;
}
</style>
