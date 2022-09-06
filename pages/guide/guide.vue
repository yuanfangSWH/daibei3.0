<template>
	<view v-show="pageshow">
		<view class="zn-tab">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in edutagarr" :key="item.id" @click="tagfilter(index)" :class="{tactive:index==tabcurrent}"
						 :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
				<view v-show="current === 1">
					<scroll-view class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view class="db-tab-child" v-for="(item, index) in edutagarr" :key="item.id" @click="tagfilter(index)" :class="{tactive:index==tabcurrent}"
						 :data-current="index">{{item.tab_name}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- <loading :visible='kg'></loading> -->
		<view class="zn-content">
			<view class="content-nav" v-for="(item, index) in etuData" :key="index" @click="guidexq(item.id)">
				<view class="con-t">
					<image class="con-icon01" :src="item.education_logo"></image>
				</view>
				<view class="zn-r">
					<view class="zn-t">{{item.education_name}}</view>
					<view class="zn-fw">{{item.education_time}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	import uniSegmentedControl from '@/components/uni-segmented-control2/uni-segmented-control.vue'
	// import loading from '@/components/loading/loading.vue'
	export default {
		components: {
			uniSegmentedControl,
			// loading
		},
		data() {
			return {
				//kg:true,
				items: [
					'贷款推广教程',
					'拉新产品推广'
				],
				styles: [{
					value: 'button',
					text: '按钮',
					checked: true
				}, {
					value: 'text',
					text: '文字'
				}],
				colors: [
					'#000000',
					'#4cd964',
					'#dd524d'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#fff',
				styleType: 'text',
				//borderbtm: 'border-bottom:6upx solid #2A8CFB'
				tagsData: '',
				edutagarr: [],
				tabcurrent: 0,
				isshow: true,
				scrollLeft: 0,
				typeList: 1,
				etuData: '',
				cardcurrent: 0,
				pageCount: 1,
				page: 1,
				tagid: '',
				pageshow: false
			}
		},
		onLoad(e) {
			if(e.cur==1){
				this.current = 0;
				this.typeList = 1;
			}else if(e.cur==2){
				this.current = 1;
				this.typeList = 2;
			}else{
				this.current = 0;
				this.typeList = 1;
			}
			this.etuTagData();
			//this.etuList();
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			this.loadingData();
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					this.tabcurrent = 0;
					if (this.current == 0) {
						this.typeList = 1;
						this.page = 1;
						this.etuList();
					} else if (this.current == 1) {
						this.typeList = 2;
						this.page = 1;
						this.etuList();
					}
				}
			},
			etuTagData: function() {
				uni.showLoading({
					title:'加载中'
				})
				api.apiPost('/edu/tags', '', '', 'get', (status, res, code) => {
					if (res.code == 0) {
						this.tagsData = res.data.EduTags;
						var arr01 = [{
							"id": "1000000",
							"tab_name": "全部"
						}];
						var eduarr = arr01.concat(this.tagsData);
						this.edutagarr = eduarr;
						if (this.isshow == true) {
							var i = this.tabcurrent;
							this.tagid = this.edutagarr[i].id;
							this.etuList();
						}
						uni.hideLoading();
					} else if (res.code == 401) {
						//console.log("身份过期获取链接："+outurl);
						// uni.navigateTo({
						// 	//url:'http://www.huaniaopet.com/html/login'
						// 	url:'/pages/login/pwdlogin/pwdlogin'
						// })
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none"
						})
						uni.hideLoading();
					}
				});
			},
			showP: function(){
				this.pageshow = true;
			},
			etuList: function() {
				if (this.tabcurrent == 0) {
					var data = {
						type: this.typeList,
						page: this.page,
					};
					var parameter = '?type=' + this.typeList + '&page=' + this.page;
					api.apiPost('/edu/list', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.etuData = res.data.edulist;
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
							this.showP();
							uni.hideLoading();
						} else if (res.code == 401) {
							//console.log("身份过期获取链接："+outurl);
							// uni.navigateTo({
							// 	//url:'http://www.huaniaopet.com/html/login'
							// 	url:'/pages/login/pwdlogin/pwdlogin'
							// })
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
							uni.hideLoading();
							this.pageshow == false;
						}
					});
				} else {
					var data = {
						type: this.typeList,
						tab: this.tagid,
						page: this.page,
					};
					var parameter = '?type=' + this.typeList + '&tab=' + this.tagid + '&page=' + this.page;
					api.apiPost('/edu/list', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.etuData = res.data.edulist;
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
							//console.log("教程："+JSON.stringify(this.etuData))
						} else if (res.code == 401) {
							//console.log("身份过期获取链接："+outurl);
							// uni.navigateTo({
							// 	//url:'http://www.huaniaopet.com/html/login'
							// 	url:'/pages/login/pwdlogin/pwdlogin'
							// })
						} else {
							uni.showToast({
								title: "数据加载失败",
								icon: "none"
							})
						}
					});
				}

			},
			//教程加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = '',
						parameter = '';
					if (this.tabcurrent == 0) {
						data = {
							type: this.typeList,
							page: this.page,
						};
						parameter = '?type=' + this.typeList + '&page=' + this.page;
					} else {
						data = {
							tag: this.tagid,
							type: this.typeList,
							page: this.page,
						};
						parameter = '?tag=' + this.tagid + '&type=' + this.typeList + '&page=' + this.page;
					}
					api.apiPost('/edu/list', parameter, data, 'get', (status, res, code) => {
						if (status) {
							this.etuData = this.etuData.concat(res.data.edulist);
							// var rowCount = res.data.pages.totalCount;
							// var pageSize = res.data.pages.defaultPageSize;
							// if (rowCount == null || rowCount == "") {
							// 	this.pageCount = 0;
							// } else {
							// 	if (pageSize != 0 && rowCount % pageSize == 0) {
							// 		this.pageCount = parseInt(rowCount / pageSize);
							// 	}
							// 	if (pageSize != 0 &&
							// 		rowCount % pageSize != 0) {
							// 		this.pageCount = parseInt(rowCount / pageSize) + 1;
							// 	}
							// }
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			tagfilter: function(index) {
				this.tabcurrent = index;
				//console.log("贷款索引值："+this.tabcurrent);
				this.page = 1;
				this.etuTagData();
			},
			guidexq: function(id) {
				uni.navigateTo({
					url: '/pages/guideDetails/guideDetails?id=' + id
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F1F4F8;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		height: 60upx;
		padding: 26upx 0 30upx;
	}

	.zn-tab {
		width: 750upx;
		float: left;
		background: #FFFFFF;
	}

	.uni-padding-wrap {
		width: 690upx;
		padding: 30upx 30upx 0;
		border-bottom: 1upx solid #EEF3F9;
	}

	.content {
		width: 690upx;
		padding: 0 30upx;
	}

	.db-tab-box {
		width: 100%;
		float: left;
		display: flex;
		margin-top: 30upx;
		padding-bottom: 30upx;
	}

	.db-tab-child {
		width: auto;
		display: inline-block;
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 24upx;
		color: #95a2b0;
		margin-right: 20upx;
		border: 1px solid #e2e5e8;
		border-radius: 50upx;
		text-align: center;
		line-height: 50upx;
		height: 50upx;
	}

	.tactive {
		color: #459BFF !important;
		border-color: #459BFF !important;
	}

	.zn-content {
		width: 750upx;
		float: left;
	}

	.content-nav {
		width: 690upx;
		margin: 30upx 30upx 0;border-radius:10upx; padding: 50upx 36upx; box-sizing: border-box;
		display: flex;
		float: left;
		overflow: hidden;
		background: #FFFFFF;
	}
	.zn-r{ flex: 1; padding-left: 40upx;}
	.con-img {
		width: 330upx;
		height: 194upx;
		float: left;
	}

	.con-t {
		width: 100upx;
		float: left;
	}

	.con-icon01 {
		width: 100upx;
		height: 100upx;
		float: left;
		border-radius: 100%;
	}

	.zn-t {
		width: 490upx;
		float: left;
		font-size: 30upx;
		color: #000000;
		line-height: 38upx;
		height: 38upx; font-weight: 500; padding: 12upx 0 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.zn-fw {
		width: 100%;
		padding: 0;
		float: left;
		font-size: 24upx;
		color: #868789;
	}
</style>
