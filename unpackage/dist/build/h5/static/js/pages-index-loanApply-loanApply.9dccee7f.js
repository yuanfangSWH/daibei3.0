(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-loanApply-loanApply"],{"2b19":function(t,e,i){var a=i("23e7"),n=i("129f");a({target:"Object",stat:!0},{is:n})},"3d17":function(t,e,i){"use strict";var a=i("ee27");i("a15b"),i("2b19"),i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("0472")),s=a(i("bbc5")),o={components:{uniIcon:s.default},data:function(){return{icontype:"arrowright",mobile:"",sfz:"",name:"",msgCode:"",key:"",regName:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,sfzreg:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,phoneReg:/^1[3-9][0-9]{9}$/,safety:{time:60,state:!1,interval:""},historybox:"",toUrl:"",userid:"",isApply:!0}},onLoad:function(t){t.key&&(this.key=t.key);var e="",a="";t.fxtitle&&(e=t.icon,a=t.fxtitle);var s=i("03cb"),o=encodeURIComponent(location.href.split("#")[0]);n.default.apiPost("/index/wxshare?shareurl="+o,"","","get",(function(t,i,n){t?(s.config({debug:!1,appId:i.data.appId,timestamp:i.data.timestamp,nonceStr:i.data.nonceStr,signature:i.data.signature,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),s.ready((function(){s.updateAppMessageShareData({title:a,desc:"便捷申请，秒审批秒到账",link:location.href,imgUrl:e,success:function(){},fail:function(){}}),s.updateTimelineShareData({title:a,link:location.href,imgUrl:e,success:function(){},fail:function(){}})})),s.error((function(t){}))):uni.showToast({title:i.msg,icon:"none",duration:2e3})})),this.historydata()},methods:{loanapply:function(){var t=this;if(""!==this.name)if(this.regName.test(this.name))if(""!==this.sfz)if(this.sfzreg.test(this.sfz))if(""!==this.mobile)if(this.phoneReg.test(this.mobile))if(""!==this.msgCode){var e={mobile:this.mobile,sfz:this.sfz,name:this.name,msgCode:this.msgCode,key:this.key},i="?mobile="+this.mobile+"&sfz="+this.sfz+"&name="+this.name+"&msgCode="+this.msgCode+"&key="+this.key;1==this.isApply&&(this.isApply=!1,n.default.apiPost("/apply/loan",i,e,"post",(function(e,i,a){if(0!=i.code)return t.isApply=!0,void uni.showToast({title:""+i.msg,icon:"none"});t.isApply=!0,t.toUrl=i.data.toUrl,location.href=t.toUrl})))}else uni.showToast({title:"请输入验证码",icon:"none"});else uni.showToast({title:"手机号不正确,请重新输入",icon:"none"});else uni.showToast({title:"请输入手机号码",icon:"none"});else uni.showToast({icon:"none",title:"身份证号输入有误，请重新输入"});else uni.showToast({icon:"none",title:"身份证号不能为空"});else uni.showToast({icon:"none",title:"请输入正确的真实姓名"});else uni.showToast({icon:"none",title:"真实姓名不能为空"})},fnGetPhoneCode:function(){var t=this;uni.showToast({title:"正在发送验证码",icon:"loading",success:function(){t.safety.state=!0,t.safety.interval=setInterval((function(){t.safety.time--<=0&&(t.safety.time=60,t.safety.state=!1,clearInterval(t.safety.interval))}),1e3),uni.showToast({title:"发送成功",icon:"success"})}})},RetrieveCode:function(){var t=this;if(""!==this.mobile)if(this.phoneReg.test(this.mobile)){if(0==this.safety.state){var e={mobile:this.mobile},i="?mobile="+this.mobile;n.default.apiPost("/apply/message",i,e,"post",(function(e,i,a){0==i.code?t.fnGetPhoneCode():uni.showToast({title:""+i.msg,icon:"none"})}))}}else uni.showToast({title:"手机号不正确,请重新输入",icon:"none"});else uni.showToast({title:"请输入手机号码",icon:"none"})},historydata:function(){var t=this;n.default.apiPost("/apply/history","","","get",(function(e,i,a){Object.is(i.data.history,{})||(t.historybox=i.data.history)}))},formatName:function(t){return new Array(t.length).join("*")+t.substr(-1)},historynext:function(t){uni.navigateTo({url:"/pages/index/historyapply/historyapply?id="+t+"&key="+this.key})}}};e.default=o},"438c":function(t,e,i){"use strict";i.r(e);var a=i("97e3"),n=i("4890");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("7238");var o,l=i("f0c5"),f=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"7fd57250",null,!1,a["a"],o);e["default"]=f.exports},4890:function(t,e,i){"use strict";i.r(e);var a=i("3d17"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},7238:function(t,e,i){"use strict";var a=i("80d1"),n=i.n(a);n.a},"80d1":function(t,e,i){var a=i("e832");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("10090604",a,!0,{sourceMap:!1,shadowMode:!1})},"97e3":function(t,e,i){"use strict";var a={uniIcon:i("bbc5").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"applytitle"},[t._v("申请人信息")]),i("v-uni-view",{staticClass:"apply-row"},[i("v-uni-text",{staticClass:"apply-t"},[t._v("申请人")]),i("v-uni-view",{staticClass:"apply-iptbox"},[i("v-uni-input",{staticClass:"apply-ipt",attrs:{type:"text",placeholder:"请输入姓名","placeholder-style":"color:#CFCFCF"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1),i("v-uni-view",{staticClass:"apply-row"},[i("v-uni-text",{staticClass:"apply-t"},[t._v("身份证")]),i("v-uni-view",{staticClass:"apply-iptbox"},[i("v-uni-input",{staticClass:"apply-ipt",attrs:{type:"text",placeholder:"请输入身份证号",maxlength:"18","placeholder-style":"color:#CFCFCF"},model:{value:t.sfz,callback:function(e){t.sfz=e},expression:"sfz"}})],1)],1),i("v-uni-view",{staticClass:"apply-row"},[i("v-uni-text",{staticClass:"apply-t"},[t._v("手机号")]),i("v-uni-view",{staticClass:"apply-iptbox"},[i("v-uni-input",{staticClass:"apply-ipt",attrs:{type:"text",placeholder:"请输入手机号","placeholder-style":"color:#CFCFCF"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}})],1)],1),i("v-uni-view",{staticClass:"apply-row"},[i("v-uni-text",{staticClass:"apply-t"},[t._v("验证码")]),i("v-uni-view",{staticClass:"apply-iptbox"},[i("v-uni-input",{staticClass:"apply-ipt",attrs:{type:"text",placeholder:"请输入手机验证码","placeholder-style":"color:#CFCFCF",maxlength:"4"},model:{value:t.msgCode,callback:function(e){t.msgCode=e},expression:"msgCode"}}),i("v-uni-text",{staticClass:"code",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),!t.safety.state&&t.RetrieveCode()}}},[t._v(t._s(t.safety.state?t.safety.time+" s":"获取验证码"))])],1)],1),i("v-uni-view",{staticClass:"xieyi-box"},[i("v-uni-label",[i("v-uni-checkbox",{staticStyle:{transform:"scale(0.6)"},attrs:{value:"cb",checked:"true",color:"#257BFF"}})],1),i("v-uni-view",{staticClass:"xieyinav"},[t._v("注册即同意"),i("v-uni-navigator",{staticClass:"xieyi_a01",attrs:{"hover-class":"none",url:"../../agreement/agreement"}},[t._v("《隐私政策》")])],1)],1),i("v-uni-button",{staticClass:"register-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.loanapply.apply(void 0,arguments)}}},[t._v("提交申请并注册")]),i("v-uni-view",{staticClass:"applyuser"},[i("v-uni-view",{staticClass:"a-title"},[t._v("历史申请人记录")]),t._l(t.historybox,(function(e){return i("v-uni-view",{key:e.id,staticClass:"apply-list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.historynext(e.id)}}},[i("v-uni-view",{staticClass:"a-left"},[i("v-uni-view",{staticClass:"a-n01"},[t._v("姓名："+t._s(t.formatName(e.name)))]),i("v-uni-view",{staticClass:"a-n02"},[t._v("手机号："+t._s(e.mobile))]),i("v-uni-view",{staticClass:"a-n02"},[t._v("身份证："+t._s(e.sfz))])],1),i("v-uni-view",{staticClass:"a-right"},[i("uni-icon",{attrs:{type:t.icontype,size:"20"}})],1)],1)}))],2)],1)},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},e832:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".content[data-v-7fd57250]{width:%?650?%;margin:%?30?% %?50?%}.applytitle[data-v-7fd57250]{font-size:%?36?%;font-weight:700;color:#000;margin-bottom:%?60?%}.apply-row[data-v-7fd57250]{margin-bottom:%?50?%;display:-webkit-box;display:-webkit-flex;display:flex}.apply-t[data-v-7fd57250]{font-size:%?32?%;font-family:PingFang-SC-Medium;font-weight:700;color:#000;line-height:%?50?%}.apply-iptbox[data-v-7fd57250]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;margin-left:%?30?%;border-bottom:%?1?% solid #ededed;height:%?74?%}.apply-ipt[data-v-7fd57250]{font-size:%?32?%;font-family:PingFang-SC-Medium;padding-bottom:%?10?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.code[data-v-7fd57250]{width:%?184?%;height:%?57?%;line-height:%?57?%;background:#257bff;border-radius:%?29?%;font-size:%?28?%;text-align:center;font-family:PingFang-SC-Medium;font-weight:500;color:#fff}.xieyi-box[data-v-7fd57250]{font-size:%?26?%;font-family:PingFang-SC-Medium;font-weight:500;color:#b1b1b1}.xieyi-box uni-text[data-v-7fd57250]{color:#257bff}.register-btn[data-v-7fd57250]{margin-top:%?50?%;height:%?87?%;background:#257bff;border-radius:%?44?%;border:none;line-height:%?87?%;color:#fff;text-align:center;font-size:%?34?%;font-family:PingFang-SC-Medium;font-weight:500}.applyuser[data-v-7fd57250]{margin-top:%?100?%}.a-title[data-v-7fd57250]{font-size:%?36?%;font-family:PingFang-SC-Bold;font-weight:700;color:#000;line-height:%?34?%}.apply-list[data-v-7fd57250]{display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;box-shadow:0 %?2?% %?15?% %?1?% #ebf4ff;border-radius:%?8?%;padding:%?20?% %?30?%;margin-top:%?30?%}.a-left[data-v-7fd57250]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.a-n01[data-v-7fd57250]{font-size:%?32?%;font-family:PingFang-SC-Medium;font-weight:500;color:#182130}.a-n02[data-v-7fd57250]{font-size:%?26?%;font-family:PingFang-SC-Medium;font-weight:500;color:#99a8bc;padding-top:%?10?%}.a-right[data-v-7fd57250]{line-height:%?130?%;color:#99a8bc}.xieyinav[data-v-7fd57250]{display:inline-block;position:relative;top:%?4?%}.xieyi_a01[data-v-7fd57250]{color:#257bff;display:inline-block}",""]),t.exports=e}}]);