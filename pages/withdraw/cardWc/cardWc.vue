<template>
	<view class="content">
		<view class="wc-box">
      <image class="wcImg" src="../../../static/card.png"></image>
      <view class="wc-t">恭喜您，添加银行卡成功</view>
    </view>
    <view class="btn-row">
	  	<button type="primary" class="loan-btn" @click="wcSubmit">完 成</button>
	  </view>
	</view>
</template>

<script>
  import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			wcSubmit: function(){
        uni.reLaunch({
          url:'/pages/withdraw/withdraw'
        })
      },
		}
	}
</script>

<style scoped>
.wc-box{ text-align: center; margin: 100upx 0 120upx;}
.wcImg{ width: 166upx; height: 166upx; }
.wc-t{font-size:36upx;font-family:PingFang-SC-Medium;font-weight:bold;color:rgba(0,0,0,1);}
.btn-row{ margin: 50upx 50upx 0;}
.loan-btn{background:rgba(37,123,255,1);border-radius:46upx;}
</style>
