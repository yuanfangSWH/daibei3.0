<template>
	<view class="content">
    <view v-for="item in hisbox" :ked="item.id">
      <view class="his-nav">
        <text class="his-t01">申请人</text><text class="his-t02">{{formatName(item.name)}}</text>
      </view>
      <view class="his-nav">
        <text class="his-t01">身份证</text><text class="his-t02">{{item.sfz}}</text>
      </view>
      <view class="his-nav">
        <text class="his-t01">手机号</text><text class="his-t02">{{item.mobile}}</text>
      </view>
    </view>
    <view class="xieyi-box">
    	 <label><checkbox value="cb" checked="true" color="#257BFF" style="transform:scale(0.6)" />我同意</label><text>《用户注册协议》</text>和<text>《用户注册协议》</text>
    </view>
    <button class="register-btn" @click="loanapply">提交申请</button>
	</view>
</template>

<script>
  import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				historybox:[],
        uid:'',
        hisbox:[],
        key:'',
			}
		},
    onLoad(option) {
      this.uid = option.id;
      this.key = option.key;
      //console.log("id:"+this.uid);
      //console.log("key:"+this.key);
      this.historydata();
    },
		methods: {
			historydata: function(){
			  api.apiPost('/apply/history','', '', 'get', (status, res, code) => {
          //console.log(res.data);
			    if(!Object.is(res.data.history, {})){
			      this.historybox = res.data.history;
            var arr=[];
            for(var i=0; i<this.historybox.length; i++){
              if(this.historybox[i].id == this.uid){
                arr.push(this.historybox[i]);
              }
            }
            this.hisbox = arr;
			      //console.log("lkklk"+JSON.stringify(this.hisbox));
			    }
			  });
			},
      formatName: function(str){
        return new Array(str.length).join('*') + str.substr(-1);
      },
      loanapply: function(){
        var data = {
          key: this.key,
          historyId: this.uid,
        };
        var parameter ='?key='+this.key+'&historyId='+this.uid;
        api.apiPost('/apply/card',parameter, data, 'post', (status, res, code) => {
          if(res.code == 0){
            this.toUrl = res.data.toUrl;
			//location.href=this.toUrl;
            uni.navigateTo({
              url: "/pages/index/apply/apply?url="+this.toUrl
            })
          }else{
            uni.showToast({
              title:"申请产品不存在或已下架",
              icon:"none"
            });
            return;
          }
        });
      },
		}
	}
</script>

<style>
.content{ width: 670upx; margin: 0 40upx;}
.his-nav{ display: flex; width: 670upx;}
.his-t01{ height:100upx; line-height:100upx; font-size:32upx; font-family:PingFang-SC-Medium; font-weight:bold;color:rgba(0,0,0,1); margin-right: 40upx;}
.his-t02{ flex: 1;height:59upx; line-height:59upx; padding: 20upx 0; font-size:32upx;font-weight:bold;color:rgba(0,0,0,1); border-bottom: 1upx solid #EDEDED;}
.xieyi-box{ margin-top: 50upx; font-size:26upx;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(177,177,177,1);}
.xieyi-box text{ color: #257BFF;}
.register-btn{ margin-top: 50upx; height:87upx;background:rgba(37,123,255,1);border-radius:44upx; border: none; line-height: 87upx; color: #FFFFFF; text-align: center;font-size:34upx;font-family:PingFang-SC-Medium;font-weight:500;}
</style>
