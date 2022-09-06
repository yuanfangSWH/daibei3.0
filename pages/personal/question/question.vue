<template>
	<view style="padding-bottom: 20upx;">
		<view class="question-nav" ref="bussinessTypeRef" v-for="(item, key) in theZK" :key='key'>
			<view class="question-title">{{item.notice_name}}</view>
			<view class="question-con2" v-show="!theZK[key].isShow">{{wzFun(theZK[key].notice_content)}}</view>
			<view class="question-con" v-show="theZK[key].isShow">{{theZK[key].notice_content}}</view>
			<view class="show-corl" v-show="theZK[key].kai" @click="openFun(item.id)"><text>{{theZK[key].kaiguan}}</text>
				<uni-icon :type="theZK[key].icontype" size="20"></uni-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				icontype: 'arrowdown',
				page: 1,
				pageCount: 0,
				tzdata: '',
				theZK: [],
				heightH: '',
				iskai:false,
			}
		},
		onLoad() {
			this.dataFun();
			
		},
		onReady() {
			//this.isFun();
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			this.loadingData();
		},
		methods: {
			dataFun: function() {
				var data = {
					type: 2,
					page: this.page,
				};
				var parameter = '?type=2' + '&page=' + this.page;
				api.apiPost('/user/notice', parameter, data, 'GET', (status, res, code) => {
					if (res.code == 200) {
						this.tzdata = res.data.notices;
						for (var i = 0; i < this.tzdata.length; i++) {
							this.theZK.push({
								id: this.tzdata[i].id,
								notice_name: this.tzdata[i].notice_name,
								notice_content: this.tzdata[i].notice_content,
								notice_time: this.tzdata[i].notice_time,
								kaiguan: '展开',
								icontype: 'arrowdown',
								isShow: false,
								kai: true,
							});
						}
						//this.dataBox = this.theZK;
						this.isFun();
						var rowCount = res.data.pages.totalCount;
						var pageSize = res.data.pages.defaultPageSize;
						if (rowCount == null || rowCount == "") {
							this.pageCount = 0;
						} else {
							if (pageSize != 0 && rowCount % pageSize == 0) {
								this.pageCount = parseInt(rowCount / pageSize);
							}
							if (pageSize != 0 &&
								rowCount % pageSize != 0) {
								this.pageCount = parseInt(rowCount / pageSize) + 1;
							}
						}
					}
				});
			},
			//加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						type: 2,
						page: this.page,
					};
					var parameter = '?type=2' + '&page=' + this.page;
					api.apiPost('/user/notice', parameter, data, 'GET', (status, res, code) => {
						if (res.code == 200) {
							//this.tzdata = this.tzdata.concat(res.data.notices);
							this.tzdata = res.data.notices;
							var arr=[];
							for (var i = 0; i < this.tzdata.length; i++) {
								arr.push({
									id: this.tzdata[i].id,
									notice_name: this.tzdata[i].notice_name,
									notice_content: this.tzdata[i].notice_content,
									notice_time: this.tzdata[i].notice_time,
									kaiguan: '展开',
									icontype: 'arrowdown',
									isShow: false,
									kai: true
								});
							}
							this.theZK = this.theZK.concat(arr);
							this.isFun();
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			openFun: function(id) {
				for (var i = 0; i < this.theZK.length; i++) {
					if (this.theZK[i].id == id) {
						if (!this.theZK[i].isShow) {
							this.theZK[i].isShow = true;
							this.theZK[i].kaiguan = '收起';
							this.theZK[i].icontype = 'arrowup';
						} else {
							this.theZK[i].isShow = false;
							this.theZK[i].kaiguan = '展开';
							this.theZK[i].icontype = 'arrowdown';
						}
					}
				}
			},
			isFun: function() {
				var zishu=0;
				for (var i = 0; i < this.theZK.length; i++) {
					zishu = this.theZK[i].notice_content.length;
					if (zishu < 47) {
						this.theZK[i].kai = false;
					} else {
						this.theZK[i].kai = true;
					}
				}
			},
			wzFun: function(str){
				if(str.length > 47){
					str = str.substr(0, [46]);
					str = str +'.....'
					return str
				}else{
					return str
				}
			}
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	.question-nav {
		width: 630upx;
		margin: 30upx;
		padding: 22upx 30upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 12upx;
	}

	.question-title {
		font-size: 32upx;
		color: #24282E; font-weight: bold;
	}

	.question-con2 {text-overflow:ellipsis;
		font-size: 26upx;
		color: #677381;
		padding-top: 20upx;
		line-height: 44upx;
		max-height: 88upx;
		overflow: hidden;
	}
	.question-con {
		font-size: 26upx;
		color: #677381;
		padding-top: 20upx;
		line-height: 44upx;
	}

	.show-corl {
		text-align: right;
		color: #2A8CFB;
	}

	.show-corl text {
		font-size: 26upx;
		color: #2A8CFB;
	}
</style>
