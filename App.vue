<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-head {
		display: none;
	}
	.uni-swiper-wrapper{ text-align: left !important;}
	uni-image{ height: auto;}
  ::-webkit-scrollbar {
  	width: 0;
  	height: 0;
  	color: transparent;
  } 
  /* uni-toast .uni-toast{background: none !important; color: #666666 !important; width: 6em !important;} */
  .noData{ width: 100%; text-align: center; margin-top: 100upx;}
  .defimg{ width: 253upx; height: 220upx; display: inline-block;}
  .deftext{ font-size: 28upx; color: #c1c1c1; margin-top: 20upx;}
</style>
