(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-replace-replace"],{"1bf7":function(t,a,i){"use strict";i.r(a);var d=i("2614"),e=i.n(d);for(var o in d)"default"!==o&&function(t){i.d(a,t,(function(){return d[t]}))}(o);a["default"]=e.a},2614:function(t,a,i){"use strict";var d=i("ee27");i("ac1f"),i("5319"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=d(i("0472")),o=(d(i("044c")),d(i("3057")),d(i("7d7d")),{data:function(){return{mobile:"",verification:"",re:/^1[3-9][0-9]{9}$/,tabbar:!0,windowHeight:"",urldata:"",safety:{time:60,state:!1,interval:""},isBtn:!1,token:"",userinfo:"",mobileXH:""}},onLoad:function(t){var a=this;uni.getSystemInfo({success:function(t){a.windowHeight=t.windowHeight}}),uni.onWindowResize((function(t){t.size.windowHeight<a.windowHeight?a.tabbar=!1:a.tabbar=!0})),this.chaxsjData()},methods:{chaxsjData:function(){var t=this;e.default.apiPost("/user/userinfo","","","get",(function(a,i,d){if(0==i.code){t.userinfo=i.data.baseInfo;var e=/^(\d{3})\d+(\d{4})$/,o=""+t.userinfo.user_mobile;t.mobileXH=o.replace(e,"$1****$2")}else uni.showToast({title:"数据加载失败",icon:"none"})}))},pawLogin:function(){this.isshow=!0},mobileLogin:function(){this.isshow=!1},showTabbar:function(){this.tabbar=!0,""!=this.verification&&""!=this.mobile?this.isBtn=!0:this.isBtn=!1},hideTabbar:function(){this.tabbar=!1},funIpt:function(){""!=this.verification&&""!=this.mobile?this.isBtn=!0:this.isBtn=!1},fnGetPhoneCode:function(){var t=this;this.re.test(this.mobile)?uni.showToast({title:"正在发送验证码",icon:"loading",success:function(){t.safety.state=!0,t.safety.interval=setInterval((function(){t.safety.time--<=0&&(t.safety.time=60,t.safety.state=!1,clearInterval(t.safety.interval))}),1e3),uni.showToast({title:"发送成功",icon:"success"})}}):uni.showToast({title:"新手机号格式错误",icon:"none"})},RetrieveCode:function(){var t=this;if(0==this.safety.state){if(""===this.mobile||null===this.mobile)return void uni.showToast({title:"请输入新手机号",icon:"none"});if(!this.re.test(this.mobile))return void uni.showToast({title:"新手机号格式错误",icon:"none"});var a={mobile:this.mobile},i="?mobile="+this.mobile;e.default.apiPost("/account/sendmsg",i,a,"POST",(function(a,i){a?t.fnGetPhoneCode():uni.showToast({title:""+i.msg,icon:"none"})}))}},login:function(){""!=this.mobile?this.re.test(this.mobile)?""!=this.verification?uni.request({url:"http://ts.rong298.cn/account/updatephone",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{mobile:this.mobile,msgCode:this.verification},success:function(t){0==t.data.code?uni.reLaunch({url:"/pages/personal/replacecg/replacecg"}):uni.showToast({title:""+t.data.msg,icon:"none"})}}):uni.showToast({title:"请输入验证码",icon:"none"}):uni.showToast({title:"新手机号格式错误",icon:"none"}):uni.showToast({title:"请输入新手机号码",icon:"none"})}}});a.default=o},"2c6d":function(t,a,i){var d=i("c441");"string"===typeof d&&(d=[[t.i,d,""]]),d.locals&&(t.exports=d.locals);var e=i("4f06").default;e("fe77bd4a",d,!0,{sourceMap:!1,shadowMode:!1})},"347f":function(t,a,i){"use strict";i.r(a);var d=i("686b"),e=i("1bf7");for(var o in e)"default"!==o&&function(t){i.d(a,t,(function(){return e[t]}))}(o);i("9fe1");var n,l=i("f0c5"),r=Object(l["a"])(e["default"],d["b"],d["c"],!1,null,"69d3d5a9",null,!1,d["a"],n);a["default"]=r.exports},"686b":function(t,a,i){"use strict";var d,e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",[i("v-uni-view",{staticClass:"login-box uni-flex uni-row"},[i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-text",{staticClass:"login-t"},[t._v("更换手机号码")]),i("v-uni-text",{staticClass:"login-t2"},[t._v(t._s(t.mobileXH))]),i("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",maxlength:"11",placeholder:"新手机号"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.hideTabbar.apply(void 0,arguments)},focus:function(a){arguments[0]=a=t.$handleEvent(a),t.hideTabbar.apply(void 0,arguments)},blur:function(a){arguments[0]=a=t.$handleEvent(a),t.showTabbar.apply(void 0,arguments)},input:function(a){arguments[0]=a=t.$handleEvent(a),t.funIpt.apply(void 0,arguments)}},model:{value:t.mobile,callback:function(a){t.mobile=a},expression:"mobile"}})],1),i("v-uni-view",{staticClass:"login-nav01"},[i("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",maxlength:"4",placeholder:"验证码"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.hideTabbar.apply(void 0,arguments)},focus:function(a){arguments[0]=a=t.$handleEvent(a),t.hideTabbar.apply(void 0,arguments)},blur:function(a){arguments[0]=a=t.$handleEvent(a),t.showTabbar.apply(void 0,arguments)},input:function(a){arguments[0]=a=t.$handleEvent(a),t.funIpt.apply(void 0,arguments)}},model:{value:t.verification,callback:function(a){t.verification=a},expression:"verification"}}),i("v-uni-view",{staticClass:"register-phone-getcode",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),!t.safety.state&&t.RetrieveCode()}}},[t._v(t._s(t.safety.state?t.safety.time+" s":"获取验证码"))])],1),i("v-uni-view",{staticStyle:{height:"56upx"}}),i("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[t.isBtn?i("v-uni-button",{staticClass:"loan-btn active01",attrs:{type:"primary"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.login.apply(void 0,arguments)}}},[t._v("确定")]):i("v-uni-button",{staticClass:"loan-btn",attrs:{type:"primary"}},[t._v("确定")])],1)],1)],1)},o=[];i.d(a,"b",(function(){return e})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return d}))},"9fe1":function(t,a,i){"use strict";var d=i("2c6d"),e=i.n(d);e.a},c441:function(t,a,i){var d=i("24fb"),e=i("1de5"),o=i("021d"),n=i("e371");a=d(!1);var l=e(o),r=e(n);a.push([t.i,".mainbox[data-v-69d3d5a9]{width:%?690?%;margin:%?30?%}.news-title[data-v-69d3d5a9]{width:100%;float:left;font-size:%?38?%;color:#1a1a1a;font-weight:700}.news-s-title[data-v-69d3d5a9]{width:100%;float:left;margin:%?40?% 0}.news-icon01[data-v-69d3d5a9]{float:left;width:%?80?%;height:%?80?%}.news-nav01[data-v-69d3d5a9]{float:left /* margin-left: 20upx; */}.news-t01[data-v-69d3d5a9]{font-size:%?34?%;color:#333538}.news-t02[data-v-69d3d5a9]{font-size:%?26?%;color:#747474}.news-t02 uni-text[data-v-69d3d5a9]{margin-right:%?20?%}.neirong[data-v-69d3d5a9]{width:100%;float:left;border-bottom:%?1?% solid #e6ecf8;padding-bottom:%?40?%}.nr-text[data-v-69d3d5a9]{font-size:%?30?%;color:#000;width:100%}.nr-img[data-v-69d3d5a9]{width:100%;margin-top:%?30?%}.news-i-box[data-v-69d3d5a9]{width:%?560?%;float:left;display:-webkit-box;display:-webkit-flex;display:flex;margin:%?80?% %?65?%}.news-i-child[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.n-pl[data-v-69d3d5a9]{width:%?56?%;height:%?56?%}.news-text01[data-v-69d3d5a9]{font-size:%?22?%;color:#7d7d7d;width:100%}.news-bt-list[data-v-69d3d5a9]{width:%?630?%;float:left;background:#f5f5f5;padding:0 %?30?%}.news-bt-child[data-v-69d3d5a9]{font-size:%?30?%;color:#3c3e40;padding:%?30?% 0;border-bottom:%?1?% solid #dedede}.news-bt-child[data-v-69d3d5a9]:last-child{border-bottom:none!important}.pinglun[data-v-69d3d5a9]{width:%?750?%;float:left;margin-bottom:%?107?%}.pl-title[data-v-69d3d5a9]{width:%?690?%;float:left;padding:%?40?% %?30?%;background:#fff;font-size:%?36?%;font-weight:700;color:#323232}.pl-list-null[data-v-69d3d5a9]{width:%?750?%;float:left;text-align:center;background:#eee;padding:%?100?% 0}.pl-imgnull[data-v-69d3d5a9]{width:%?252?%;height:%?189?%}.zanwu[data-v-69d3d5a9]{font-size:%?32?%;color:#ccc}.pinglun-bar[data-v-69d3d5a9]{position:fixed;left:0;bottom:0;width:%?710?%;height:%?107?%;background:#fff;border-top:1px solid #e2e2e2;display:-webkit-box;display:-webkit-flex;display:flex;padding:0 %?20?%}.pinglun-bar1[data-v-69d3d5a9]{position:fixed;left:0;bottom:0;width:%?710?%;height:%?107?%;background:#e6ecf8;border-top:1px solid #e2e2e2;display:-webkit-box;display:-webkit-flex;display:flex;padding:0 %?20?%}.pinglun-ibox[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?71?%;border-radius:%?35?%;background:#f3f3f3;display:-webkit-box;display:-webkit-flex;display:flex;margin-top:%?18?%}.xiepl[data-v-69d3d5a9]{width:%?28?%;height:%?28?%;float:left;margin:%?20?% %?10?% 0 %?20?%}.pl-ipt[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#5b6067;height:%?52?%;line-height:%?52?%;margin-top:%?10?%;float:left;padding-right:%?40?%}.bt-pz[data-v-69d3d5a9]{width:%?220?%;display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?107?%}.bt-pl[data-v-69d3d5a9],.bt-zan[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.bt-icon01[data-v-69d3d5a9]{width:%?26?%;height:%?23?%}.bt-text[data-v-69d3d5a9]{font-size:%?24?%;color:#5b6067;margin-left:%?10?%}.pl-list[data-v-69d3d5a9]{width:%?690?%;float:left;background:#fff;padding:0 %?30?%}.pl-list-box[data-v-69d3d5a9]{width:100%;float:left;display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:%?80?%}.pl-left[data-v-69d3d5a9]{width:%?72?%;height:%?72?%}.pl-pic[data-v-69d3d5a9]{width:%?72?%;height:%?72?%;border-radius:100%}.pl-right[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?20?%}.pl-nav01[data-v-69d3d5a9]{width:100%;float:left;display:-webkit-box;display:-webkit-flex;display:flex}.pl-nav01-left[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.pl-nav01-right[data-v-69d3d5a9]{width:%?220?%;display:-webkit-box;display:-webkit-flex;display:flex}.pl-huifu[data-v-69d3d5a9],.pl-zan[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.pl-text04[data-v-69d3d5a9]{font-size:%?22?%;color:#9a9a9e;margin-left:%?10?%;float:left;height:%?40?%;line-height:%?40?%}.pl-icon01[data-v-69d3d5a9]{width:%?26?%;height:%?24?%;float:left;margin-top:%?8?%}.pl-user[data-v-69d3d5a9]{width:100%;float:left;font-size:%?28?%;height:%?40?%;line-height:%?40?%;color:#777a80;font-weight:700}.pl-time[data-v-69d3d5a9]{font-size:%?22?%;color:#a2a2a2}.pl-nav02[data-v-69d3d5a9]{width:100%;float:left}.pl-nr01[data-v-69d3d5a9]{width:100%;float:left;font-size:%?28?%;color:#3a3a40;margin:%?18?% 0 0}.pl-nr02[data-v-69d3d5a9]{width:100%;box-sizing:border-box;float:left;background:#f3f3f3;padding:%?20?%;font-size:%?26?%;margin-top:%?18?%}.nr-text01[data-v-69d3d5a9]{color:#579ef0}.nr-text02[data-v-69d3d5a9]{color:#a8b1be}.nr-text03[data-v-69d3d5a9]{color:#515156}\r\n/*login*/.l_p_box[data-v-69d3d5a9]{width:100%;display:inline-block}.login-pwd[data-v-69d3d5a9]{float:right;font-size:%?34?%;color:#000;margin:%?30?% 0 %?70?%}.login-box[data-v-69d3d5a9]{margin:0 %?60?%}.daibei-logo[data-v-69d3d5a9]{width:100%;float:left;margin-bottom:%?60?%}.logo[data-v-69d3d5a9]{width:%?96?%;height:%?96?%}.login-t[data-v-69d3d5a9]{font-size:%?62?%;color:#343434;width:100%;margin-bottom:%?40?%;display:inline-block}.uni-input[data-v-69d3d5a9]{border-bottom:%?2?% solid #dcdcdc;padding-bottom:%?16?%}.login-ts[data-v-69d3d5a9]{font-size:%?24?%;color:#b1b1b1;width:100%;display:inline-block;margin:%?20?% 0 %?80?%}.login-ts2[data-v-69d3d5a9]{font-size:%?24?%;color:#b1b1b1;width:100%;display:inline-block;margin:0 0 %?60?%}.loan-btn[data-v-69d3d5a9]{border-radius:%?60?%;width:100%!important;background:#257bff;height:%?88?%;line-height:%?88?%}.fixed-nav[data-v-69d3d5a9]{position:fixed;bottom:0;left:0;width:%?750?%}.xieyi-nav[data-v-69d3d5a9]{font-size:%?26?%;width:100%;display:inline-block;text-align:center;padding:%?30?% 0;color:#b1b1b1}.xieyi_a01[data-v-69d3d5a9]{display:inline-block;color:#257bff}.login-t2[data-v-69d3d5a9]{color:#b4b6bd;font-size:%?30?%}.mr-40[data-v-69d3d5a9]{margin-top:%?40?%!important;margin-bottom:%?20?%!important}.login-t3[data-v-69d3d5a9]{font-size:%?62?%;color:#343434;width:100%;margin-bottom:0;display:inline-block}.register-phone[data-v-69d3d5a9],.register-code[data-v-69d3d5a9],.register-pwd[data-v-69d3d5a9]{width:100%;float:left;margin-top:%?60?%}.register-code[data-v-69d3d5a9]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #dcdcdc}.db-ipt01[data-v-69d3d5a9]{width:100%;float:left;border-bottom:%?1?% solid #dcdcdc;height:%?60?%;line-height:%?60?%;padding-bottom:%?10?%;font-size:%?36?%}.db-ipt02[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;float:left;height:%?60?%;line-height:%?60?%;padding-bottom:%?10?%;font-size:%?36?%}.register-phone-getcode[data-v-69d3d5a9]{float:left;width:auto;padding-left:%?20?%;font-size:%?30?%;color:#cbcbcb;margin-top:%?4?%}.btn-row[data-v-69d3d5a9]{width:100%;float:left;margin-top:%?60?%}.login-find[data-v-69d3d5a9]{width:100%;float:left}.find-pwd[data-v-69d3d5a9]{float:right;font-size:%?32?%;color:#343434}\r\n/*订单*/.or-nav01[data-v-69d3d5a9]{width:%?690?%;padding:%?30?% %?30?% 0;border-bottom:%?1?% solid #eef3f9;display:-webkit-box;display:-webkit-flex;display:flex}.or-t01[data-v-69d3d5a9]{font-size:%?32?%;color:#eef3f9}.or-t02[data-v-69d3d5a9]{font-size:%?30?%;color:#000;margin-left:%?30?%}.order-box[data-v-69d3d5a9]{width:%?690?%;margin:%?20?% %?30?% %?30?%;float:left}.loan-nav-child[data-v-69d3d5a9]{width:%?630?%;padding:%?30?%;margin-bottom:%?20?%;border-radius:%?10?%;float:left;background:#fff}.db-icon01[data-v-69d3d5a9]{width:100%;float:left;border-bottom:%?1?% solid #e9eef6;padding-bottom:%?16?%}.dou-img[data-v-69d3d5a9]{width:%?50?%;height:%?50?%;border-radius:%?50?%;float:left}.dou-name[data-v-69d3d5a9]{font-size:%?26?%;color:#000;font-weight:700;float:left;line-height:%?50?%;margin-left:%?10?%}.db-conten[data-v-69d3d5a9]{width:100%;float:left;display:-webkit-box;display:-webkit-flex;display:flex;padding:%?18?% 0 0}.db-c-left[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.order-name[data-v-69d3d5a9]{font-size:%?32?%;color:#000;width:100%;float:left;height:%?66?%;line-height:%?66?%;font-weight:700}.order-time[data-v-69d3d5a9]{width:100%;float:left;font-size:%?24?%;color:#363a3d;margin:%?10?% 0 %?16?%}.or-ztai[data-v-69d3d5a9]{font-size:%?24?%;color:#363a3d}.zt-t[data-v-69d3d5a9]{color:#2a8cfb}.db-c-right[data-v-69d3d5a9]{text-align:center;margin-left:%?10?%;float:right}.lianxi-kh[data-v-69d3d5a9]{width:%?140?%;height:%?50?%;margin-top:%?53?%;line-height:%?50?%;background:#2a8cfb;box-shadow:0 %?3?% %?8?% 0 #a3ceff;border-radius:%?25?%;color:#fff;font-size:%?24?%}.u-phone02[data-v-69d3d5a9]{font-size:%?26?%;color:#99a8bc;line-height:%?50?%;float:right}.dianj[data-v-69d3d5a9]{width:%?662?%;height:%?90?%;background:-webkit-linear-gradient(329deg,#4397ff,#2e88ff);background:linear-gradient(121deg,#4397ff,#2e88ff);border-radius:%?16?%;margin-left:auto;margin-right:auto;margin-top:%?7?%\r\n/* \tline-height: 300upx;\r\n\tposition: relative; */}.dianj1[data-v-69d3d5a9]{width:auto;height:%?32?%;font-size:%?34?%;color:#fff;text-align:center;line-height:%?90?%}\r\n/* 名片 */.mp-bj[data-v-69d3d5a9]{width:100%;height:auto;background:#fff}.mp-fk[data-v-69d3d5a9]{width:%?662?%;height:%?399?%;background:#fff;box-shadow:0 6px 15px 1px #e1e5ed;border-radius:%?12?%;margin-top:%?300?%;margin-left:auto;margin-right:auto}.mp-fk1[data-v-69d3d5a9]{width:%?662?%;height:%?399?%;background:#fff;box-shadow:0 6px 15px 1px #e1e5ed;border-radius:%?12?%;margin-top:%?110?%;margin-left:auto;margin-right:auto}.mp-bj-01[data-v-69d3d5a9]{width:%?660?%;height:%?268?%;background-image:url("+l+");background-size:contain\r\n\t\t/* margin-bottom: 131upx; */}.mp-bj-02[data-v-69d3d5a9]{width:%?660?%;height:%?268?%;background-image:url("+r+");background-size:contain\r\n\t\t\t\t/* margin-bottom: 131upx; */}.mp-tx[data-v-69d3d5a9]{text-align:center}.mp-toxiang[data-v-69d3d5a9]{width:%?129?%;height:%?129?%;border-radius:50%;margin-top:%?-70?%;border:%?6?% solid #fff;background:#fff}.mp-mzi[data-v-69d3d5a9]{width:auto;height:%?32?%;font-size:%?34?%;color:#fff;\r\n\t\t/* margin-left:auto; margin-right:auto; */text-align:center}.mp-dh-wx[data-v-69d3d5a9]{display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?265?%;text-align:center}.mp-dh[data-v-69d3d5a9]{width:%?200?%;height:%?100?%;margin-left:%?54?%}.mp-wx[data-v-69d3d5a9]{width:%?200?%;height:%?100?%;margin-left:%?54?%}.mp-ziti[data-v-69d3d5a9]{width:%?602?%;height:auto;font-size:%?26?%;color:#38393f;text-align:center;\r\n\t\t/* text-indent:2em; */padding-top:%?28?%;margin-bottom:%?31?%;margin-left:auto;margin-right:auto}.mp-xg[data-v-69d3d5a9]{width:auto;height:%?25?%;font-size:%?26?%;float:right;color:#606167;margin-top:%?-67?%;margin-right:%?20?%}.content[data-v-69d3d5a9]{width:%?630?%;margin:0 %?60?% 0}.loan-btn[data-v-69d3d5a9]{background:#dcdcdc}.active01[data-v-69d3d5a9]{background:#257bff!important}.login-t[data-v-69d3d5a9]{margin-top:%?100?%;margin-bottom:%?20?%}.login-t2[data-v-69d3d5a9]{display:block;font-size:%?36?%;color:#010101;padding-top:%?50?%}.login-ts[data-v-69d3d5a9]{margin-bottom:%?50?%}.phonglogin[data-v-69d3d5a9]{text-align:center;font-size:%?28?%;color:#888;margin-top:%?60?%}.uni-input[data-v-69d3d5a9]{height:%?70?%;line-height:%?70?%;padding-top:%?40?%;border:none}.login-nav01[data-v-69d3d5a9]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #e7e7e7}.uni-form-item[data-v-69d3d5a9]{border-bottom:%?1?% solid #e7e7e7}.login-nav01 .uni-input[data-v-69d3d5a9]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.register-phone-getcode[data-v-69d3d5a9]{margin-top:%?40?%;border:%?1?% solid #257bff;color:#257bff;border-radius:%?35?%;height:%?70?%;line-height:%?70?%;text-align:center;padding:0 %?20?%}",""]),t.exports=a}}]);