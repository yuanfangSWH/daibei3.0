<template>
	<view>
		<view class="loadbox" v-if="visible">
			<image class="loadimg" src="../../static/loading.gif" mode="widthFix"></image>
			<view class="loadtext">{{text}}</view>
		</view>
		<!-- visible控制toast的显隐，text为提示文本 -->
		<!-- <view class="loading-toast" v-if="visible">
			<view class="toast-mask"></view>
			<view class="toast-tip">{{text}}</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: "loading-toast",
		props: {
			text: {
				type: String,
				default: "加载中..."
			},
			visible: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style>
	.loadbox{ width: 200upx; text-align: center; margin: 0 auto;}
	.loadimg{ width: 100%; display: inline-block;}
	.loadtext{ font-size: 32upx;}
</style>
