<template>
	<view>
		<view class="question-nav" v-for="(item, key) in tzdata" :key='key'>
			<view class="question-title"><text class="zhid" v-show="key == 0">置顶</text>{{item.notice_name}}</view>
			<view class="notice-t">
        <text class="notice-time">{{item.notice_time}}</text>
        <view class="notice-cz">
          <text class="red-dian" v-show="theZK[key].isLook == 0"></text>
          <view class="act" @click="openFun(item.id)"><text class="show-corl">{{theZK[key].kaiguan}}</text><uni-icon :type="theZK[key].icontype" size="20"></uni-icon></view>
        </view>
      </view>
			<view class="question-con" v-show="theZK[key].isShow">{{theZK[key].notice_content}}</view>
		</view>
	</view>
</template>

<script>
  import api from '../../../common/api/api.js';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon},
		data() {
			return {
				icontype: 'arrowdown',
        page:1,
        pageCount:0,
        tzdata:'',
        theZK:[],
			}
		},
    onLoad() {
      this.dataFun();
    },
    //上拉加载
    onReachBottom() {
    	uni.showLoading({
    		title: '加载中'
    	});
      this.loadingData();
    },
		methods: {
			dataFun: function(){
        var data = {
          type: 1,
          page:this.page,
        };
        var parameter = '?type=1' + '&page=' + this.page;
        api.apiPost('/user/notice', parameter, data, 'GET', (status, res, code) => {
          if(res.code == 200){
            this.tzdata = res.data.notices;
            for (var i = 0; i < this.tzdata.length; i++) {
            	this.theZK.push({ id: this.tzdata[i].id, notice_name: this.tzdata[i].notice_name, notice_content: this.tzdata[i].notice_content, notice_time: this.tzdata[i].notice_time, notice_state: this.tzdata[i].notice_state, isLook: this.tzdata[i].isLook, kaiguan: '展开', icontype: 'arrowdown', isShow: false });
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
            type: 1,
            page:this.page,
          };
          var parameter = '?type=1' + '&page=' + this.page;
      		api.apiPost('/user/notice', parameter, data, 'GET', (status, res, code) => {
      			if (res.code == 0) {
      				this.tzdata = this.tzdata.concat(res.data.notices);
              for (var i = 0; i < this.tzdata.length; i++) {
              	this.theZK.push({ id: this.tzdata[i].id, notice_name: this.tzdata[i].notice_name, notice_content: this.tzdata[i].notice_content, notice_time: this.tzdata[i].notice_time, notice_state: this.tzdata[i].notice_state, isLook: this.tzdata[i].isLook, kaiguan: '展开', icontype: 'arrowdown', isShow: false });
              }
      				setTimeout(function() {
      					//隐藏加载框
      					uni.hideLoading();
      				}, 300);
      			}
      		});
      	}
      },
      openFun: function(id){
        for (var i = 0; i < this.theZK.length; i++) {
          			if (this.theZK[i].id == id) {
          				if (!this.theZK[i].isShow) {
          					this.theZK[i].isShow = true;
                    this.theZK[i].kaiguan = '收起';
                    this.theZK[i].icontype = 'arrowup';
                    this.theZK[i].isLook = '1';
          				} else {
          					this.theZK[i].isShow = false;
                    this.theZK[i].kaiguan = '展开';
                    this.theZK[i].icontype = 'arrowdown';
          				}
          			}
          		}
      },
		}
	}
</script>

<style>
page{ background: #F1F4F8;}
.question-nav{ width: 630upx; margin: 30upx; padding: 30upx 30upx 0;background:rgba(255,255,255,1);border-radius:12upx; float: left;}
.zhid{ width:58upx;height:32upx; margin-top: 9upx; margin-right: 20upx; float: left; text-align: center; background:linear-gradient(125deg,rgba(85,117,255,1),rgba(60,175,255,1));border-radius:2upx; font-size: 20upx; color: #FFFFFF; line-height: 32upx;}
.question-title{ font-size: 34upx; color: #24282E; font-weight: bold;}
.notice-t{ width: 100%; float: left; padding: 26upx 0;}
.notice-time{ float: left; font-size: 26upx; color: #ADB6C2; line-height: 50upx; height: 50upx;}
.notice-cz{ float: right; color: #AEB7C2;}
.show-corl{ font-size: 26upx;}
.question-con{ width: 630upx; font-size: 28upx; color: #677381; border-top: 1upx solid #E6E9ED; line-height: 44upx; display: inline-block; padding: 26upx 0 30upx;}
.red-dian{ width: 10upx; height: 10upx; background:rgba(241,79,8,1);border-radius:50%; display: inline-block; margin: 0 14upx 0 0; position: relative; top: -6upx;}
.act{ display: inline-block;}
</style>
