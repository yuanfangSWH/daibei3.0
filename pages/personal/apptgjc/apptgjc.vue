<template>
    <view class='page'>
      <view class="tuu">
		  <image class="tu" src="../../../static/hehuotg.png">
      </view>
			 
            
			
    
    </view>
</template>

<script>
import lazyLoadPlugin from '@/plugins/lazyLoad/js/lazyLoad.js'
import VLazyload from "@/components/lazyLoad/index.vue";

export default {
    onPageScroll () {
        lazyLoadPlugin.scroll();
    },

    mounted () {
        lazyLoadPlugin.init('#scroll')
    },

    destroyed () {
        // 监听页面卸载
        lazyLoadPlugin.destroy();
    },

    components: {
        VLazyload,
    },
}
</script>

<style>
.tuu{
	display: flex;
}

.tu{
	width:100%;
	height:7719upx;
	background:linear-gradient(-23deg,rgba(250,84,72,1),rgba(255,155,66,1));
}
</style>