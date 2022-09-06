<template>
	<view>
		<view class="tg-nav01">
			<image @longtap="fun($event)" class="tg-img01" :src="infobox.posterImgUrl" mode="widthFix"></image>
		</view>
		<view class="tg-nav02">
			<view class="tg-t01">长按图片可保存海报</view>
			<view class="tebd">
				<view class="awtt" >
					<rich-text :nodes="wenaData"></rich-text>
				</view>
			</view>
			<view class="fuzhi" data-clipboard-action="copy" :data-clipboard-text="wenaData2" @click="sharurl">复制文案</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				id: '',
				infobox: '',
				url: '',
				imgUrl: '',
				wenaData: '',
				wenaData2:''
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.pullData();
		},
		methods: {
			pullData: function() {
				var data = {
					id: this.id
				};
				var parameter = '?id=' + this.id;
				uni.showLoading({
				    title: '加载中'
				});
				api.apiPost('/card/poster', parameter, data, 'get', (status, res, code) => {
					if (res.code == 0) {
						this.infobox = res.data;
						this.url = this.infobox.ShortUrl;
						this.imgUrl = this.infobox.posterImgUrl;
						var combination1 = JSON.parse(this.infobox.card_adcopy);
						var combination2 = "<dl>-----------------</dl><dl>立即申请："+this.url+" <dl>";
						var combination3 = " | 立即申请："+this.url;
						this.wenaData = combination1 + combination2;
						this.wenaData2 = combination1 + combination3;
						setTimeout(function () {
						    uni.hideLoading();
						}, 500);
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
						setTimeout(function () {
						    uni.hideLoading();
						}, 500);
					}
				});
			},
			fun: function(e) {
				let eve = e || window.event;
				let url = this.imgUrl;
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
			//复制分享链接
			sharurl: function() {
				let _this = this;
				let clipboard = new this.clipboard(".fuzhi");
				clipboard.on('success', function() {
					uni.showModal({
						title: '复制成功',
						content: '内容已复制到粘贴板，可前往其他应用粘贴查看。',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								//console.log('用户点击确定');
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});
				});
				clipboard.on('error', function() {
					//_this.$toast("复制失败")
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					})
				});
			},
		}
	}
</script>

<style>
	/*  */
	.tebd {
		width: 684upx;
		background: rgba(240, 243, 245, 1);
		border-radius: 6upx;
		margin-left: auto;
		margin-right: auto;
		padding-top: 30upx;
		padding-bottom: 50upx;
		margin-bottom: 24upx;
	}
	
	.awtt {
		width: 644upx;
		margin-left: auto;
		margin-right: auto;
		color: #3E4347;
		font-size: 24upx;
		text-align: left;
		line-height: 40upx;
	}
	/*  */
	.tg-nav01 {
		width: 480upx;
		margin-left: auto;
		margin-right: auto;
		padding-top: 50upx;
		padding-bottom: 20upx;
	}
	
	.tg-img01 {
		width: 480upx;
		/* margin-top: 150upx; */
	}

	.tg-nav02 {
		text-align: center;
	}

	.tg-t01 {
		margin-bottom: 30upx;
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(122, 141, 165, 1);
	}

	.fuzhi {
		width: 684upx;
		margin-bottom: 40upx;
		display: inline-block;
		text-align: center;
		height: 64upx;
		line-height: 64upx;
		background: rgba(38, 130, 255, 1);
		box-shadow: 0px 6upx 6upx 0px rgba(201, 224, 255, 1);
		border-radius: 32upx;
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(254, 254, 254, 1);
	}
</style>
