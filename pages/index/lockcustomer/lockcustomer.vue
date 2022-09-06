<template>
	<view>
		<view class="lockbox">
			<view class="lockbg">
				<image class="limg" mode="widthFix" src="../../../static/suoimg.png"></image>
			</view>
			<view class="conbox">
				<view class="nav01">
					<view class="l-title">
						推广流程
					</view>
					<view class="cailiao-lc">
						<view class="cailiao-nav">
							<view class="cailiao-a01">
								<image src="../../../static/suoicon01.png"></image>
							</view>
						</view>
						<view class="cailiao-icon">
							<image src="../../../static/suoicon05.png"></image>
						</view>
						<view class="cailiao-nav">
							<view class="cailiao-a01">
								<image src="../../../static/suoicon02.png"></image>
							</view>
						</view>
						<view class="cailiao-icon">
							<image src="../../../static/suoicon05.png"></image>
						</view>
						<view class="cailiao-nav">
							<view class="cailiao-a01">
								<image src="../../../static/suoicon03.png"></image>
							</view>
						</view>
						<view class="cailiao-icon">
							<image src="../../../static/suoicon05.png"></image>
						</view>
						<view class="cailiao-nav">
							<view class="cailiao-a01">
								<image src="../../../static/suoicon04.png"></image>
							</view>
						</view>
					</view>
					<view class="lcwenzi">
						<view class="cailiao-a02 w01">邀请客户</view><view class="cailiao-a02 w02">客户下载注册</view><view class="cailiao-a02 w03">客户申请贷款</view><view class="cailiao-a02 w04">坐等佣金</view>
					</view>
					<view class="l-title">
						锁定客户返佣说明
					</view>
					<view class="shm">
						<view class="smnav">
							<image class="dian" src="../../../static/dian.png"></image>
							<view class="nr">邀请客户注册<text>“代呗APP”</text>，客户即被您锁粉。</view>
						</view>
						<view class="smnav">
							<image class="dian" src="../../../static/dian.png"></image>
							<view class="nr">客户在<text>代呗APP内</text>申请任意贷款产品，只要符合结算标准，您都自动获得佣金，次数不限。</view>
						</view>
						<view class="smnav">
							<image class="dian" src="../../../static/dian.png"></image>
							<view class="nr">若客户被锁粉前在某一产品已有推广人，则该产品佣金依旧结算给原有推广人。</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lockfot">
			<view class="locktg" @click="tgFun">立即推广</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tgFun: function(){
				uni.navigateTo({
					url: '/pages/personal/loantg/loantg'
				})
			}
		}
	}
</script>

<style scoped>
	page{ background: #F1F4F8;}
.lockbox{ width: 750upx; position: relative;}
.limg{ width: 750upx;}
.conbox{ position: absolute; z-index: 2; left: 0; top: 340upx; width: 750upx;}
.nav01{ background-color: #FFFFFF; width: 690upx; margin: 0 30upx 160upx; border-radius: 10upx; box-sizing: border-box; padding: 30upx 30upx 40upx;box-shadow:0px 10upx 24upx 0px rgba(23,39,11,.1);}
.l-title{font-size:32upx;font-weight:bold;color:rgba(0,0,0,1);}
.cailiao-lc {
	display: flex;
	padding: 30upx 0 0;
}

.cailiao-nav {
	flex: 1;
	text-align: center;
}

.cailiao-a01 image {
	width: 47upx;
	height: 47upx;
}
.cailiao-a02 {
	font-size: 22upx;
	font-family: PingFang-SC-Medium;
	font-weight: 400;
	color: #000;
	padding-top: 12upx;
	line-height: 42upx; text-align: center;
}
.cailiao-icon image {
	width: 47upx;
	height: 47upx;
}
.lcwenzi{ display: flex; margin-bottom: 54upx;}
.w01{ width: 20%; margin-right: 2%;}
.w02{ width: 27%;}
.w03{ width: 28%;}
.w04{ width: 21%; margin-left: 2%;}
.smnav{ display: flex; margin-top: 30upx;}
.dian{ float: left; width: 10upx; height: 10upx; margin-top: 18upx; margin-right: 16upx;}
.nr{ font-size:30upx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1); flex: 1; line-height: 48upx;}
.nr text{ color: #309EFF;}
.lockfot{ width: 750upx; height: 134upx; background: #FFFFFF; position: fixed; z-index: 10; left: 0; bottom: 0;}
.locktg{width:690upx; margin: 16upx 30upx 0; text-align: center; color: #FFFFFF; font-size: 30upx;font-family:PingFang SC; height:88upx; line-height: 88upx; background:rgba(38,130,255,1);border:1px solid rgba(70,151,255,1);box-shadow:0px 6upx 14upx 0px rgba(132,192,252,1);border-radius:44upx;}
</style>
