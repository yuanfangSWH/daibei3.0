(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-smRegister-smRegister"],{"0904":function(i,t,e){"use strict";e.r(t);var a=e("6928"),n=e.n(a);for(var o in a)"default"!==o&&function(i){e.d(t,i,(function(){return a[i]}))}(o);t["default"]=n.a},"1a66":function(i,t,e){var a=e("5f1a");"string"===typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);var n=e("4f06").default;n("1c232deb",a,!0,{sourceMap:!1,shadowMode:!1})},"2e25":function(i,t,e){"use strict";var a=e("1a66"),n=e.n(a);n.a},"5f1a":function(i,t,e){var a=e("24fb");t=a(!1),t.push([i.i,"uni-page-body[data-v-05d81ea8]{background:#f2f5fa}.tImg[data-v-05d81ea8]{width:%?750?%}.smImg[data-v-05d81ea8]{width:%?750?%}.smzcbox[data-v-05d81ea8]{width:%?750?%;background:#fff;margin-top:%?20?%;padding:%?40?% 0}.add-nav01[data-v-05d81ea8]{width:%?650?%;margin:0 %?50?% %?70?%;border-bottom:%?1?% solid #eef3f8}.add-ipt01[data-v-05d81ea8]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-top:%?30?%}.add-t3[data-v-05d81ea8]{font-size:%?30?%;font-family:PingFang-SC-Medium;font-weight:700;color:#474e58}.add-name[data-v-05d81ea8]{font-size:%?32?%;font-family:PingFang-SC-Regular;color:#000;margin:%?14?% 0 %?20?%}.tx-xieyi[data-v-05d81ea8]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?26?%;font-family:PingFang-SC-Medium;color:#b1b1b1;margin:%?30?% 0 %?30?% %?50?%}.xieyinav[data-v-05d81ea8]{display:inline-block;position:relative;top:%?4?%}.xieyi-text[data-v-05d81ea8]{color:#257bff}.btn-row[data-v-05d81ea8]{margin:0 %?50?%}.loan-btn[data-v-05d81ea8]{background:#1f8eff;border-radius:%?46?%;box-shadow:0 3px 8px 0 #84c0fc}.yzmbox[data-v-05d81ea8]{display:-webkit-box;display:-webkit-flex;display:flex;margin:0 0 %?20?%}.register-phone-getcode[data-v-05d81ea8]{margin-top:%?20?%;font-size:%?28?%;background:#1f8eff;color:#fff;border-radius:%?35?%;height:%?60?%;line-height:%?60?%;text-align:center;padding:0 %?20?%}.xieyi_a01[data-v-05d81ea8]{color:#257bff;display:inline-block}body.?%PAGE?%[data-v-05d81ea8]{background:#f2f5fa}",""]),i.exports=t},6928:function(i,t,e){"use strict";var a=e("ee27");e("ac1f"),e("5319"),e("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(e("0472")),o={data:function(){return{name:"",sfz:"",mobile:"",verification:"",re:/^1[3-9][0-9]{9}$/,reg:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,regName:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,isXuan:"cb",safety:{time:60,state:!1,interval:"",token:"",tUrl:""},isApply:!0}},onLoad:function(i){var t=location.href.split("?").pop();this.tUrl=decodeURIComponent(decodeURIComponent(t,"UTF-8"),"UTF-8");var e=this.tUrl;this.tUrl=e.replace(/\+/g,"%2B")},methods:{gouxFun:function(i){this.isXuan=i.mp.detail.value},fnGetPhoneCode:function(){var i=this;this.re.test(this.mobile)?uni.showToast({title:"正在发送验证码",icon:"loading",success:function(){i.safety.state=!0,i.safety.interval=setInterval((function(){i.safety.time--<=0&&(i.safety.time=60,i.safety.state=!1,clearInterval(i.safety.interval))}),1e3),uni.showToast({title:"发送成功",icon:"success"})}}):uni.showToast({title:"手机号不正确",icon:"none"})},RetrieveCode:function(){var i=this;if(0==this.safety.state){if(""===this.mobile||null===this.mobile)return void uni.showToast({title:"请输入手机号",icon:"none"});if(!this.re.test(this.mobile))return void uni.showToast({title:"手机号不正确，请重新输入",icon:"none"});var t={mobile:this.mobile},e="?mobile="+this.mobile;n.default.apiPost("/account/sendmsg",e,t,"POST",(function(t,e){t?i.fnGetPhoneCode():uni.showToast({title:""+e.msg,icon:"none"})}))}},FindSubmit:function(){var i=this,t=this;if(""!==this.name&&null!==this.name)if(this.regName.test(this.name))if(""!==this.sfz)if(this.reg.test(this.sfz))if(""!==this.mobile&&null!==this.mobile)if(this.re.test(this.mobile))if(""!==this.verification&&null!==this.verification)if(""!=this.isXuan){var e={name:this.name,sfz:this.sfz,mobile:this.mobile,msgCode:this.verification},a="?name="+this.name+"&sfz="+this.sfz+"&mobile="+this.mobile+"&msgCode="+this.verification;1==this.isApply&&(this.isApply=!1,""!=this.tUrl||void 0!=this.tUrl?n.default.apiPost("/account/login?"+this.tUrl,a,e,"POST",(function(e,a){if(e)switch(i.isApply=!0,uni.setStorageSync("landing",a.data),uni.getSystemInfoSync().platform){case"android":uni.navigateTo({url:"/pages/Andriodownload/Andriodownload"});break;case"ios":uni.navigateTo({url:"/pages/IOSdowmload/IOSdowmload"});break;default:uni.navigateTo({url:"/pages/Andriodownload/Andriodownload"});break}else a.code>400?(i.isApply=!0,uni.showToast({title:""+a.msg,icon:"none"})):205==a.code?(i.isApply=!0,uni.showModal({title:"下载APP",content:"安装APP，赚钱更方便",success:function(i){if(i.confirm){var e={mobile:t.mobile,msgCode:t.verification},a="?mobile="+t.mobile+"&msgCode="+t.verification;n.default.apiPost("/account/login?opcode=1000",a,e,"post",(function(i,t,e){if(0==t.code)switch(uni.getSystemInfoSync().platform){case"android":uni.navigateTo({url:"/pages/Andriodownload/Andriodownload"});break;case"ios":uni.navigateTo({url:"/pages/IOSdowmload/IOSdowmload"});break;default:uni.navigateTo({url:"/pages/Andriodownload/Andriodownload"});break}}))}else i.cancel}})):(i.isApply=!0,uni.showToast({title:""+a.msg,icon:"none"}))})):n.default.apiPost("/account/login",a,e,"POST",(function(t,e){t?(i.isApply=!0,uni.setStorageSync("landing",e.data),uni.reLaunch({url:"/pages/guanzhuGzh/guanzhuGzh"})):(i.isApply=!0,uni.showToast({title:""+e.msg,icon:"none"}))})))}else uni.showToast({title:"请阅读并同意协议",icon:"none"});else uni.showToast({title:"请输入验证码",icon:"none"});else uni.showToast({title:"手机号不正确，请重新输入",icon:"none"});else uni.showToast({title:"请输入手机号",icon:"none"});else uni.showToast({icon:"none",title:"身份证号输入有误，请重新输入"});else uni.showToast({icon:"none",title:"身份证号不能为空"});else uni.showToast({icon:"none",title:"姓名不正确，请重新输入"});else uni.showToast({title:"请输入姓名",icon:"none"})}}};t.default=o},"7eb9":function(i,t,e){i.exports=e.p+"static/img/3.eb252d07.png"},9338:function(i,t,e){"use strict";var a,n=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"tImg"},[a("v-uni-image",{staticClass:"smImg",attrs:{src:e("7eb9"),mode:"widthFix"}})],1),a("v-uni-view",{staticClass:"smzcbox"},[a("v-uni-view",{staticClass:"add-nav01"},[a("v-uni-view",{staticClass:"add-t3"},[i._v("申请人")]),a("v-uni-view",{staticClass:"add-name"},[a("v-uni-input",{staticClass:"add-ipt01",attrs:{type:"text",placeholder:"请输入本人真实姓名"},model:{value:i.name,callback:function(t){i.name=t},expression:"name"}})],1)],1),a("v-uni-view",{staticClass:"add-nav01"},[a("v-uni-view",{staticClass:"add-t3"},[i._v("申请人身份证号")]),a("v-uni-view",{staticClass:"add-name"},[a("v-uni-input",{staticClass:"add-ipt01",attrs:{type:"text",placeholder:"请输入本人真实身份证号"},model:{value:i.sfz,callback:function(t){i.sfz=t},expression:"sfz"}})],1)],1),a("v-uni-view",{staticClass:"add-nav01"},[a("v-uni-view",{staticClass:"add-t3"},[i._v("申请人手机号")]),a("v-uni-view",{staticClass:"add-name"},[a("v-uni-input",{staticClass:"add-ipt01",attrs:{maxlength:"11",type:"text",placeholder:"请输入本人手机号"},model:{value:i.mobile,callback:function(t){i.mobile=t},expression:"mobile"}})],1)],1),a("v-uni-view",{staticClass:"add-nav01"},[a("v-uni-view",{staticClass:"add-t3"},[i._v("验证码")]),a("v-uni-view",{staticClass:"yzmbox"},[a("v-uni-input",{staticClass:"add-ipt01",attrs:{type:"number",maxlength:"4",placeholder:"请输入验证码"},model:{value:i.verification,callback:function(t){i.verification=t},expression:"verification"}}),a("v-uni-view",{staticClass:"register-phone-getcode",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),!i.safety.state&&i.RetrieveCode()}}},[i._v(i._s(i.safety.state?i.safety.time+" s":"获取验证码"))])],1)],1),a("v-uni-view",{staticClass:"tx-xieyi"},[a("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=i.$handleEvent(t),i.gouxFun.apply(void 0,arguments)}}},[a("v-uni-label",[a("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"cb",checked:"true",color:"#257BFF"}})],1),a("v-uni-view",{staticClass:"xieyinav"},[i._v("注册即同意"),a("v-uni-navigator",{staticClass:"xieyi_a01",attrs:{"hover-class":"none",url:"../../agreement/agreement"}},[i._v("《隐私政策》")])],1)],1)],1),a("v-uni-view",{staticClass:"btn-row"},[a("v-uni-button",{staticClass:"loan-btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.FindSubmit.apply(void 0,arguments)}}},[i._v("立即申请")])],1)],1)],1)},o=[];e.d(t,"b",(function(){return n})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return a}))},"94b3":function(i,t,e){"use strict";e.r(t);var a=e("9338"),n=e("0904");for(var o in n)"default"!==o&&function(i){e.d(t,i,(function(){return n[i]}))}(o);e("2e25");var s,l=e("f0c5"),d=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"05d81ea8",null,!1,a["a"],s);t["default"]=d.exports}}]);