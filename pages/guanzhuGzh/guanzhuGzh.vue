<template>
	<view class="content">
		<view class="smnav01">
			<view class="sm01">
				微信认证
			</view>
			<view class="sm02">
				扫码关注官方服务号，添加管理员微信完成注册
			</view>
		</view>
		<view class="mabox">
			<view class="smnav02">
				<view class="sm03">
					长按识别二维码添加关注
				</view>
				<view class="sm04">
					添加客服时请备注姓名哦
				</view>
			</view>
			<view class="smnav03">
				<image class="ewm" @longtap="fun($event)" :src="ewm"></image>
			</view>
			<view class="smnav04"></view>
		</view>
		<view class="sm05">
			客服通过时间为1-2个工作日, 请您耐心等待~
		</view>
		<view class="gotohome" @click="gotoFun">
			返回首页
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				ewm: ''
			}
		},
		onLoad() {
			this.kefuFun();
			uni.setNavigationBarTitle({
			    title: ''
			});
		},
		methods: {
			kefuFun: function() {
				api.apiPost('/user/service', '', '', 'GET', (status, res, code) => {
					if (res.code == 0) {
						this.ewm = res.data.gzhCode;
					} else {
						uni.showToast({
							title: '获取数据失败',
							icon: 'none'
						})
					}
				});
			},
			fun: function(e) {
				let eve = e || window.event;
				let url = this.ewm;
				plus.gallery.save(url, function() {
					uni.showToast({
						title: '图片已保存到相册中',
						icon: 'none'
					});
				}, function() {
					uni.showToast({
						title: '保存失败，请重试！',
						icon: 'none'
					});
				});
			},
			gotoFun: function(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F1F4F8;
	}

	.content {
		text-align: center;
	}

	.smnav01 {
		font-family: PingFang SC;
		margin-bottom: 68upx; margin-top: 40upx;
	}

	.sm01 { width: 660upx; margin: 0 45upx;
		font-size: 48upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		text-align: left;
	}
	.sm02 { margin: 0 45upx;
		font-size: 26upx;
		font-family: PingFang SC;
		color:#938F8F;
		text-align: left;
	}
	.mabox{ width: 660upx; margin: 0 45upx; background: #FFFFFF;border-radius:36upx;}
	.sm03{ font-size: 34upx; color: #2C3138; font-weight: bold; padding-top: 58upx; padding-bottom:20upx;}
	.sm04{ font-size: 28upx; color: #9DA1A7;}
	.smimg {
		width: 30upx;
		height: 30upx;
		display: inline-block;
		position: relative;
		top: 4upx;
		margin-right: 20upx;
	}

	.sm-text {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(33, 142, 255, 1);
		display: inline-block;
	}

	.ewm {
		width: 321upx;
		height: 325upx;
		display: inline-block;
		margin: 30upx 0 10upx;
	}

	.smnav04 {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #218EFF;padding-bottom: 58upx;
	}
	.sm05{font-size: 26upx; color: #938F8F; padding: 70upx 0;}
	.gotohome{ width: 660upx; height: 87upx; line-height: 87upx; color: #FFFFFF; font-size: 34upx; border-radius: 44upx; background: #257BFF; margin: 0 45upx;}
</style>
