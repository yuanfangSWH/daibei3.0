(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-hehuoRegister-hehuoRegister"],{"13b2":function(e,t,i){"use strict";i.r(t);var n=i("1b72"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},"1b72":function(e,t,i){"use strict";var n=i("ee27");i("ac1f"),i("5319"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("0472")),a={data:function(){return{name:"",sfz:"",weixin:"",mobile:"",verification:"",re:/^1[3-9][0-9]{9}$/,reg:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,regName:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,safety:{time:60,state:!1,interval:"",toredirect:""},token:"",isApply:!0}},onLoad:function(e){var t=location.href.split("token=").pop();this.token=decodeURIComponent(decodeURIComponent(t,"UTF-8"),"UTF-8");var i=this.token;this.token=i.replace(/ /g,"%2B"),this.toredirect=e.toredirect},methods:{fnGetPhoneCode:function(){var e=this;this.re.test(this.mobile)?uni.showToast({title:"正在发送验证码",icon:"loading",success:function(){e.safety.state=!0,e.safety.interval=setInterval((function(){e.safety.time--<=0&&(e.safety.time=60,e.safety.state=!1,clearInterval(e.safety.interval))}),1e3),uni.showToast({title:"发送成功",icon:"success"})}}):uni.showToast({title:"手机号不正确，请重新输入",icon:"none"})},RetrieveCode:function(){var e=this;if(0==this.safety.state){if(""===this.mobile||null===this.mobile)return void uni.showToast({title:"请输入手机号",icon:"none"});if(!this.re.test(this.mobile))return void uni.showToast({title:"手机号不正确，请重新输入",icon:"none"});var t={mobile:this.mobile},i="?mobile="+this.mobile;o.default.apiPost("/account/sendmsg",i,t,"POST",(function(t,i){t?e.fnGetPhoneCode():i.code>400?uni.showToast({title:""+i.msg,icon:"none"}):i.code<400&&uni.showToast({title:""+i.data,icon:"none"})}))}},FindSubmit:function(){var e=this,t=this;if(""!==this.mobile&&null!==this.mobile)if(this.re.test(this.mobile))if(""!==this.verification&&null!==this.verification){var i={mobile:this.mobile,msgCode:this.verification},n="?mobile="+this.mobile+"&msgCode="+this.verification;1==this.isApply&&(this.isApply=!1,""!=this.token||void 0!=this.token?o.default.apiPost("/account/login?token="+this.token,n,i,"post",(function(i,n,a){0==n.code?(e.isApply=!0,uni.setStorageSync("landing",n.data),uni.reLaunch({url:"/pages/guanzhuGzh/guanzhuGzh"})):n.code>400?(e.isApply=!0,uni.showToast({title:""+n.msg,icon:"none"})):205==n.code&&(e.isApply=!0,uni.showModal({title:"登录提示",content:n.data,success:function(e){if(e.confirm){var i={mobile:t.mobile,msgCode:t.verification},n="?mobile="+t.mobile+"&msgCode="+t.verification;o.default.apiPost("/account/login?opcode=1000",n,i,"post",(function(e,t,i){0==t.code?uni.switchTab({url:"/pages/index/index"}):t.code>400&&uni.showToast({title:""+t.msg,icon:"none"})}))}else e.cancel}}))})):o.default.apiPost("/account/login",n,i,"post",(function(i,n,a){0==n.code?(e.isApply=!0,uni.setStorageSync("landing",n.data),uni.reLaunch({url:"/pages/guanzhuGzh/guanzhuGzh"})):n.code>400?(e.isApply=!0,uni.showToast({title:""+n.msg,icon:"none"})):205==n.code&&(e.isApply=!0,uni.showModal({title:"登录提示",content:n.data,success:function(e){if(e.confirm){var i={mobile:t.mobile,msgCode:t.verification},n="?mobile="+t.mobile+"&msgCode="+t.verification;o.default.apiPost("/account/login?opcode=1000",n,i,"post",(function(e,t,i){0==t.code&&uni.switchTab({url:"/pages/index/index"})}))}else e.cancel}}))})))}else uni.showToast({title:"请输入验证码",icon:"none"});else uni.showToast({title:"手机号不正确，请重新输入",icon:"none"});else uni.showToast({title:"请输入手机号",icon:"none"})}}};t.default=a},"3c5de":function(e,t,i){var n=i("e9a3");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("3093a130",n,!0,{sourceMap:!1,shadowMode:!1})},"49cc":function(e,t,i){"use strict";var n=i("3c5de"),o=i.n(n);o.a},"7e34":function(e,t,i){"use strict";var n,o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"dnmbt"},[e._v("注册合伙人")]),i("v-uni-view",{staticClass:"add-nav01"},[i("v-uni-view",{staticClass:"add-name"},[i("v-uni-input",{staticClass:"add-ipt01",attrs:{type:"text",maxlength:"11",placeholder:"请输入手机号"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1)],1),i("v-uni-view",{staticClass:"add-nav01"},[i("v-uni-view",{staticClass:"yzmbox"},[i("v-uni-input",{staticClass:"add-ipt01",attrs:{type:"number",maxlength:"4",placeholder:"请输入验证码"},model:{value:e.verification,callback:function(t){e.verification=t},expression:"verification"}}),i("v-uni-view",{staticClass:"register-phone-getcode",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),!e.safety.state&&e.RetrieveCode()}}},[e._v(e._s(e.safety.state?e.safety.time+" s":"获取验证码"))])],1)],1),i("v-uni-view",{staticClass:"btn-row"},[i("v-uni-button",{staticClass:"loan-btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.FindSubmit.apply(void 0,arguments)}}},[e._v("提交")])],1),i("v-uni-view",{staticClass:"tx-xieyi"},[e._v("注册即同意"),i("v-uni-navigator",{staticClass:"xieyi_a01",attrs:{"hover-class":"none",url:"../../agreement/agreement"}},[e._v("《用户注册协议》")]),e._v("和"),i("v-uni-navigator",{staticClass:"xieyi_a01",attrs:{"hover-class":"none",url:"../../agreement/agreement"}},[e._v("《软件使用规范》")])],1)],1)},a=[];i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}))},"938d":function(e,t,i){"use strict";i.r(t);var n=i("7e34"),o=i("13b2");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("49cc");var s,l=i("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"428313ef",null,!1,n["a"],s);t["default"]=c.exports},e9a3:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".dnmbt[data-v-428313ef]{font-size:%?62?%;height:%?200?%;line-height:%?200?%;margin-left:%?50?%}.content[data-v-428313ef]{margin-top:%?40?%}.add-nav01[data-v-428313ef]{width:%?650?%;margin:0 %?50?% %?70?%;border-bottom:%?1?% solid #eef3f8}.add-ipt01[data-v-428313ef]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-top:%?30?%}.add-t3[data-v-428313ef]{font-size:%?30?%;font-family:PingFang-SC-Medium;font-weight:500;color:#474e58}.add-name[data-v-428313ef]{font-size:%?32?%;font-family:PingFang-SC-Regular;color:#000;margin:%?14?% 0 %?20?%}.tx-xieyi[data-v-428313ef]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?26?%;font-family:PingFang-SC-Medium;color:#b1b1b1;margin:%?30?% 0 %?30?% %?90?%;position:fixed;bottom:%?20?%}.xieyinav[data-v-428313ef]{display:inline-block;position:relative;top:%?4?%}.xieyi-text[data-v-428313ef]{color:#257bff}.btn-row[data-v-428313ef]{margin:0 %?50?%}.loan-btn[data-v-428313ef]{background:#257bff;border-radius:%?46?%}.yzmbox[data-v-428313ef]{display:-webkit-box;display:-webkit-flex;display:flex;margin:0 0 %?20?%}.register-phone-getcode[data-v-428313ef]{margin-top:%?20?%;font-size:%?28?%;color:#257bff;border-radius:%?35?%;height:%?60?%;line-height:%?60?%;text-align:center;padding:0 %?20?%;border:1px #257bff solid}.xieyi_a01[data-v-428313ef]{color:#257bff;display:inline-block}",""]),e.exports=t}}]);