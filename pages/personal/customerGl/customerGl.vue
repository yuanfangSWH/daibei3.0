<template>
	<view>
		<view class="gl-nav01">
			<view class="gl-a01">
				<view class="gl-b01">已申请客户数(人)</view>
				<view class="gl-b02">{{yinum}}</view>
			</view>
			<view class="gl-a01">
				<view class="gl-b01">未申请客户数(人)</view>
				<view class="gl-b02">{{weinum}}</view>
			</view>
		</view>
		<view class="gl-nav02">
			<view class="gl-c01" :class="{ active: statu == 1 }" @click="statusTAB(1)">已申请客户</view><view class="gl-c01" :class="{ active: statu == 2 }" @click="statusTAB(2)">未申请客户</view>
		</view>
		<view class="kehuboxs" v-show="isshow">
			<view class="nullInfo" v-show="!hasdata">
				<view class="nullImg"><image src="../../../static/khgl.png" /></view>
				<view class="nulltext">您还没有任何客户，赶紧去推广吧</view>
				<view class="tg">去推广</view>
			</view>
			<view class="listbox" v-show="hasdata" v-for="(item, index) in kehudata" :key="index">
				<view class="d01">
					<view class="e01">
						<view class="f01"><image :src="item.order_wxicon" /></view>
						<view class="f02">{{item.order_nickname}}</view>
					</view>
					<view class="e02">{{item.order_to_mobile}}</view>
				</view>
				<view class="d02">{{item.a_id}}</view>
				<view class="d03">
					<view class="e03">
						<view class="f03"><image :src="item.a_icon" /></view>
						<view class="f04">{{item.a_name}}</view>
						<view class="f05">{{item.order_state}}</view>
					</view>
					<view class="e04">{{item.order_query_time}}失效</view>
				</view>
			</view>
		</view>
		<view class="kehuboxs" v-show="!isshow">
			<view class="nullInfo" v-show="!hasdata2">
				<view class="nullImg"><image src="../../../static/khgl.png" /></view>
				<view class="nulltext">您还没有任何客户，赶紧去推广吧</view>
				<view class="tg">去推广</view>
			</view>
			<view class="listbox02" v-show="hasdata2" v-for="(item, index) in weidata" :key="index">
				<view class="w-nav01"><image :src="item.user_avatar" /></view>
				<view class="w-nav02">
					<view class="w-a01">{{item.user_nickname}}</view>
					<view class="w-a02">{{item.user_mobile}}</view>
					<view class="w-a03">加入时间<text style="padding-left: 10upx;">{{item.user_create_time}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				page: 1,
				pageCount: 1,
				page2: 1,
				pageCount2: 0,
				statu: 1,
				kehudata:'',
				yinum:'',
				weinum:'',
				weidata:'',
				isshow: true,
				hasdata: true,
				hasdata2: true,
				kaiguan:true,
				kaiguan2:true,
			}
		},
		onLoad() {
		  this.kehuList();
		},
		//上拉加载
		onReachBottom() {
			if(this.statu == 1){
				uni.showLoading({
					title: '加载中'
				});
				this.loadingData();
			}else{
				uni.showLoading({
					title: '加载中'
				});
				this.loadingWeiData();
			}
			
		},
		methods: {
			kehuList: function(){
				uni.showLoading({
					title:'加载中'
				})
				var data = {
					type: this.statu,
				};
				var parameter = '?type=' + this.statu;
				if(this.kaiguan == true){
					this.kaiguan = false;
					api.apiPost('/team/customer', parameter, data, 'get', (status, res, code) => {
						
						if(res.code == 0){
							this.kaiguan = true;
							this.yinum = res.data.ysq;
							this.weinum = res.data.wsq;
							this.kehudata = res.data.ysqL;
							if(this.kehudata !=''){
								this.hasdata = true;
							}else{
								this.hasdata = false;
							}
							var sta='';
							for(var i=0; i<this.kehudata.length; i++){
								sta = this.kehudata[i].order_state;
								if(sta == '0'){
									this.kehudata[i].order_state = '失效';
								}else if(sta == '1'){
									this.kehudata[i].order_state = '已完成';
								}else if(sta == '2'){
									this.kehudata[i].order_state = '待查询';
								}else if(sta == '3'){
									this.kehudata[i].order_state = '待查询';
								}else if(sta == '4'){
									this.kehudata[i].order_state = '待结算';
								}else if(sta == '5'){
									this.kehudata[i].order_state = '已拒绝';
								}
							}
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
							uni.hideLoading();
						}else{
						  uni.showToast({
							title:'数据加载失败',
							icon:'none'
						  })
						}
					});
				}
			    
			},
			weiList: function(){
				uni.showLoading({
					title:'加载中'
				})
				var data = {
					type: this.statu,
				};
				var parameter = '?type=' + this.statu;
				if(this.kaiguan2==true){
					this.kaiguan2=false;
					api.apiPost('/team/customer', parameter, data, 'get', (status, res, code) => {
						if(res.code == 0){
							this.kaiguan2=true;
							// this.yinum = res.data.ysq;
							// this.weinum = res.data.wsq;
							this.weidata = res.data.wsqL;
							if(this.weidata !=''){
								this.hasdata2 = true;
							}else{
								this.hasdata2 = false;
							}
							var rowCount = res.data.pages.totalCount;
							var pageSize = res.data.pages.defaultPageSize;
							if (rowCount == null || rowCount == "") {
							  this.pageCount2 = 0;
							} else {
							  if (pageSize != 0 && rowCount % pageSize == 0) {
							    this.pageCount2 = parseInt(rowCount / pageSize);
							  }
							  if (pageSize != 0 &&
							  rowCount % pageSize != 0) {
							    this.pageCount2 = parseInt(rowCount / pageSize) + 1;
							  }
							}
							uni.hideLoading();
						}else{
						  uni.showToast({
							title:'数据加载失败',
							icon:'none'
						  })
						}
					});
				}
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
				  type: this.statu,
			      page: this.page,
			    };
			    var parameter = '?type=' + this.statu + '&page=' + this.page;
					api.apiPost('/team/customer', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							var dataD = res.data.ysqL;
							var sta='';
							for(var i=0; i<dataD.length; i++){
								sta = dataD[i].order_state;
								if(sta == '0'){
									res.data.ysqL[i].order_state = '失效';
								}else if(sta == '1'){
									res.data.ysqL[i].order_state = '已完成';
								}else if(sta == '2'){
									res.data.ysqL[i].order_state = '待查询';
								}else if(sta == '3'){
									res.data.ysqL[i].order_state = '待查询';
								}else if(sta == '4'){
									res.data.ysqL[i].order_state = '待结算';
								}else if(sta == '5'){
									res.data.ysqL[i].order_state = '已拒绝';
								}
							}
							this.kehudata = this.kehudata.concat(res.data.ysqL);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//加载数据
			loadingWeiData: function(){
				this.page2++;
				if (this.page2 > this.pageCount2) {
					uni.showToast({
						title: '没有更多内容了',
						icon: 'none',
						duration: 2000
					});
				} else {
				var data = {
				  type: this.statu,
				  page: this.page2,
				};
				var parameter = '?type=' + this.statu + '&page=' + this.page2;
					api.apiPost('/team/customer', parameter, data, 'get', (status, res, code) => {
						if (res.code == 0) {
							this.weidata = this.weidata.concat(res.data.wsqL);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						}
					});
				}
			},
			//切换状态
			statusTAB: function(value) {
				this.statu = value;
			    this.page = 1;
			    if(this.statu == 1 ){
					this.isshow = true;
					if(this.kehudata==''){this.kehuList();}
				}else{
					this.isshow = false;
					if(this.weidata==''){this.weiList();}
				}
			},
		}
	}
</script>

<style scoped>
page{ background: #F1F4F8;}
.gl-nav01{ width: 690upx; height: 210upx; margin: 20upx auto;background:linear-gradient(-51deg,rgba(85,117,255,1),rgba(60,175,255,1));border-radius:16upx; display: flex;}
.gl-a01{ flex: 1; text-align: center; color: #fff;}
.gl-b01{font-size:26upx;font-family:PingFang SC; margin: 46upx 0 10upx;}
.gl-b02{font-size:58upx;font-family:PingFang SC;font-weight:bold;}
.gl-nav02{ width: 690upx; margin: 40upx auto 20upx; display: flex;}
.gl-c01{ float: left;font-size:28upx;font-family:PingFang SC;color:#3C434D;font-weight:bold; height: 72upx; line-height: 72upx; margin-right: 46upx;} 
.active{ font-size: 32upx; color: #222427; font-weight: 800; border-bottom: 8upx solid #5490F5;}
.listbox{ width: 690upx; margin: 30upx 30upx 0;float: left; border-radius: 8upx; background-color: #FFFFFF;box-shadow:0px 6upx 20upx 0px rgba(115,153,206,0.1);}
.d01{ width: 630upx; padding:20upx 0; margin: 0 30upx; float: left; display: flex; border-bottom: 1px solid #F0F4F7;}
.e01{ flex: 1;}
.f01{ float: left; width: 44upx; height: 44upx; margin-right: 20upx;}
.f01 image{ width: 44upx; height: 44upx; border-radius: 44upx; display: block;}
.f02{ float: left; line-height: 44upx; font-size: 26upx;font-family:PingFang SC;font-weight:bold; color: #000000;}
.e02{font-size:26upx;font-family:PingFang SC;font-weight:500;color:rgba(153,168,188,1); line-height: 44upx;}
.d02{ width: 630upx; padding: 20upx 30upx 14upx;float: left;font-size:24upx;font-family:PingFang SC;font-weight:500;color:rgba(174,183,194,1);}
.d03{ width: 630upx; padding: 0 30upx 20upx;float: left; display: flex; }
.e03{ flex: 1; line-height: 60upx;}
.f03{ float: left; width: 34upx; height: 34upx; margin: 4upx 20upx 0 0;}
.f03 image{ width: 34upx; height: 34upx; border-radius: 4upx;}
.f04{ max-width: 280upx;white-space: nowrap;overflow: hidden; text-overflow: ellipsis; float: left;font-size:32upx;font-weight:bold;color:rgba(0,0,0,1); margin-right: 20upx;}
.f05{ float: left;font-size:26upx;font-family:PingFang SC;color:rgba(174,183,194,1); margin-right: 20upx;}
.e04{font-size:22upx;font-family:PingFang SC;font-weight:500;color:rgba(173,182,194,1);line-height: 60upx;}
.nullInfo{ width: 690upx; margin: 110upx 30upx 0; float: left; text-align: center;}
.nullImg image{ width: 238upx; height: 238upx; }
.nulltext{font-size:26upx;font-family:PingFang SC;color:rgba(200,217,237,1); margin: 34upx 0;}
.tg{font-size:28upx;font-family:PingFang SC;color:rgba(50,146,255,1);opacity:0.8; width: 178upx; height: 54upx; line-height: 54upx; border: 1px solid #3292FF; border-radius: 36upx; display: inline-block;}
.kehuboxs{ width: 100%; display: inline-block; margin-bottom: 20upx;}
.listbox02{ width: 690upx; margin: 30upx 30upx 0;float: left; border-radius: 8upx; background-color: #FFFFFF; display: flex; padding: 20upx 0 24upx;box-shadow:0px 6upx 20upx 0px rgba(115,153,206,0.1);}
.w-nav01 image{ width: 80upx; height: 80upx; border-radius: 80upx; margin: 26upx 30upx 0 30upx;}
.w-nav02{ flex: 1; }
.w-a01{font-size: 30upx; color: #000000;}
.w-a02{font-size: 24upx; color: #98A7B8; padding: 10upx 0;}
.w-a03{font-size: 24upx; color: #98A7B8;}
</style>
