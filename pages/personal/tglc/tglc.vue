<template>
    <view class='page'
          id="scroll">
        <view v-for="n of 3"
              :key="n"
              class='item'>
            <v-lazyload :src="'/static/tg-img'+n+'.png'"
                        mode="widthFix"></v-lazyload>
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
#scroll {
    height: 100vh; /* 需要给scroll-view设置高度 */
    background: #f8f8f9;font-size:0;
}

/* #ifdef H5*/
.page >>> .img-lazyLoad .load-img {
    width: 750upx; display: block;
}

.page >>> .img-lazyLoad .load-error-img {
    width: 100px;
}
/* #endif */

/* #ifndef H5*/
.page .img-lazyLoad .load-img {
    width: 750upx;
}

.page .img-lazyLoad .load-error-img {
    width: 100px;
}
/* #endif */

.item {
    width: fit-content;
    width: 750upx;
    /* min-height: 200px; */
}
</style>