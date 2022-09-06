<template>
	<view class="dlbox">
		<view class="iBox">
			<view class="dlBg">
				<image class="dlBgImg" src="../../static/andrio.jpg" mode="widthFix"></image>
			</view>
			<view class="dlfooter">
				<!-- <image class="dlbtn" src="../../static/downloadbtn.jpg"></image> -->
				<view class="anz"  @click="andriodFun">
					<view class="anz1">安卓版本</view>
				</view>
				
				
				<!-- <image class="dlbtn" src="../../static/downloadbtn.jpg"></image> -->
				<view class="pgbb"  @click="pgbbxz">
					<view class="pgbb1">苹果版本</view>
				</view>
			</view>
			
		
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad() {
			this.andriodInfo();
		},
		methods: {
			andriodInfo: function() {
				api.apiPost('/index/update', '', '', 'GET', (status, res, code) => {
					if (res.code == 0) {
						//console.log("数据："+JSON.stringify(res));
						this.url = res.data.src;
					} else {
						uni.showToast({
							title: ""+res.msg,
							icon: "none"
						})
					}
				});
			},
			// 苹果app软件安装包下载下载
			pgbbxz: function() {
				// uni.navigateTo({
				// 	url: '/pages/IOSdowmload/IOSdowmload'
				// })
				window.location.href = 'http://app.rong298.cn/pdla'
			},
			andriodFun: function() {
				var _this = this;
				if ((/MicroMessenger/i).test(navigator.userAgent)) {
					var currentFocus = document.activeElement;// 保存当前活动节点
					let input = document.createElement('input');// 创建一个input标签
					//let input = document.getElementById('#fuzhineirong');
					document.body.appendChild(input);// 把标签添加给body
					input.style.opacity = 0;//设置input标签设置为透明(不可见)
					input.style.height=0;
					input.value = _this.url;// 把需要复制的值放到input上
					
					// 记录当前滚动位置, 因为添加节点并选中的时候回影响页面滚动
					let scrollY = window.scrollY;
					
					input.focus();// input节点获取焦点
					input.setSelectionRange(0, input.value.length);// 选中input框中的所有文字
					uni.showModal({
						title: '链接复制成功',
						content: '打开手机浏览器粘贴下载',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					var res = document.execCommand('copy', true);// 复制文字并获取结果
					
					currentFocus.focus();// 之前活动节点获得焦点
					document.body.removeChild(input);// 删除添加的input节点
					
					// 页面滚动到之前位置
					window.scrollTo(0, scrollY);
					return res;// 返回操作结果
				}else{
					uni.navigateTo({
						url: '/pages/index/apply/apply?url=' + this.url
					})
				}
				
			}
		},
		
	}
</script>

<style scoped>
	.dlbox {
		height: 100vh;
		background: #FFFFFF;
	}

	.iBox {
		position: relative;
		height: 1206upx;
	}

	.dlBg {
		height: 100vh;
		width: 750upx;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
	}

	.dlBgImg {
		width: 750upx;
		display: block;
	}

	.dlfooter {
		width: 750upx;
		position: absolute;
		bottom: 40upx;
		left: 0;
		z-index: 2;
		display: flex;
	}

	.dlbtn {
		width: 606upx;
		height: 125upx;
		display: block;
		margin: 0 72upx;
	}
	.anz{
		width:295upx;
		height:90upx;
		background:linear-gradient(26deg,rgba(255,150,0,1),rgba(255,192,0,1));
		border:1px solid rgba(255, 204, NaN, 1);
		border-radius:45upx;
		margin-left: 48upx;
		opacity:0.86;
	}
	.anz1{
		width:auto;
		height:31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		padding-top: 25upx;
	}
	.pgbb{
		width:295upx;
		height:90upx;
		background:linear-gradient(26deg,rgba(255,150,0,1),rgba(255,192,0,1));
		border:1px solid rgba(255, 204, NaN, 1);
		border-radius:45upx;
		margin-left: 48upx;
		opacity:0.86;
	}
	.pgbb1{
		width:auto;
		height:31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		padding-top: 25upx;
	}
</style>
