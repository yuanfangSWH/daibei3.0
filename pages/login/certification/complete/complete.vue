<template>
	<view class="content">
		<text class="login-t3 mr-120">您已通过实名认证</text>
		<view class="login-ts2">现在您可以开始使用代呗</view>
		<view class="img-nav"><image class="wc-img" src="../../../../static/tu.png"></image></view>
		<view class="btn-row"><button type="primary" class="loan-btn" @click="rzCard">完成</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			rzCard:function(){
				uni.switchTab({
					url:'/pages/personal/personal'
				})
			}
		}
	}
</script>

<style>
@import url("../../../../common/common.css");
.content{ width: 630upx; margin: 30upx 60upx 0;}
.img-nav{ text-align: center;}
.wc-img{ width: 250upx !important; height: 250upx !important; display: inline-block;}
.mr-120{ margin-top: 120upx;}
</style>
