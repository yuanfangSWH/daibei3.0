<template>
	<view>
		 <web-view :webview-styles="webviewStyles" :src="applyulr"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
				            progress: {
				                color: '#FF3333'
				            }
				        },
				applyulr:''
			}
		},
    onLoad(option) {
    	this.applyulr = option.url;
    },
		methods: {
			
		}
	}
</script>

<style>

</style>
