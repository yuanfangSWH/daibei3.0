(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/hehuoRegister/hehuoRegister"],{"145c":function(t,e,i){"use strict";var n=i("53c8"),o=i.n(n);o.a},"53c8":function(t,e,i){},"57f2":function(t,e,i){"use strict";i.r(e);var n=i("f65e"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},dc78:function(t,e,i){"use strict";i.r(e);var n=i("ff47"),o=i("57f2");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("145c");var a=i("2877"),l=Object(a["a"])(o["default"],n["a"],n["b"],!1,null,"52076e26",null);e["default"]=l.exports},f65e:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("81bd"));function o(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{name:"",sfz:"",weixin:"",mobile:"",verification:"",isXuan:"cb",re:/^1[3-9][0-9]{9}$/,reg:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,regName:/^[\u4e00-\u9fa5]{2,4}$/,safety:{time:60,state:!1,interval:"",token:"",toredirect:""}}},onLoad:function(t){this.token=t.token,this.toredirect=t.toredirect,this.tUrl=location.href.split("?").pop()},methods:{gouxFun:function(t){this.isXuan=t.mp.detail.value},fnGetPhoneCode:function(){var e=this;this.re.test(this.mobile)?t.showToast({title:"正在发送验证码",icon:"loading",success:function(){e.safety.state=!0,e.safety.interval=setInterval(function(){e.safety.time--<=0&&(e.safety.time=60,e.safety.state=!1,clearInterval(e.safety.interval))},1e3),t.showToast({title:"发送成功",icon:"success"})}}):t.showToast({title:"手机号不正确",icon:"none"})},RetrieveCode:function(){var e=this;if(0==this.safety.state){if(""===this.mobile||null===this.mobile)return void t.showToast({title:"请输入手机号",icon:"none"});if(!this.re.test(this.mobile))return void t.showToast({title:"请输入正确的手机号码",icon:"none"});var i={mobile:this.mobile},o="?mobile="+this.mobile;n.default.apiPost("/account/sendmsg",o,i,"POST",function(i,n){i?e.fnGetPhoneCode():t.showToast({title:""+n.msg,icon:"none"})})}},FindSubmit:function(){if(""!==this.name&&null!==this.name)if(this.regName.test(this.name))if(""!==this.sfz)if(this.reg.test(this.sfz))if(""!==this.weixin)if(""!==this.mobile&&null!==this.mobile)if(this.re.test(this.mobile))if(""!==this.verification&&null!==this.verification)if(""!=this.isXuan){var e={name:this.name,sfz:this.sfz,weixin:this.weixin,mobile:this.mobile,msgCode:this.verification},i="?name="+this.name+"&sfz="+this.sfz+"&weixin="+this.weixin+"&mobile="+this.mobile+"&msgCode="+this.verification;""!=this.tUrl||void 0!=this.tUrl?n.default.apiPost("/account/login?"+this.tUrl,i,e,"post",function(e,i,n){0==i.code?(t.setStorageSync("landing",i.data),t.reLaunch({url:"/pages/guanzhuGzh/guanzhuGzh"})):t.showToast({title:""+i.msg,icon:"none"})}):n.default.apiPost("/account/login",i,e,"post",function(e,i,n){0==i.code?(t.setStorageSync("landing",i.data),t.reLaunch({url:"/pages/guanzhuGzh/guanzhuGzh"})):t.showToast({title:""+i.msg,icon:"none"})})}else t.showToast({title:"请阅读并同意协议",icon:"none"});else t.showToast({title:"请输入验证码",icon:"none"});else t.showToast({title:"请输入正确的手机号码",icon:"none"});else t.showToast({title:"请输入手机号",icon:"none"});else t.showToast({icon:"none",title:"微信号不能为空！"});else t.showToast({icon:"none",title:"请输入正确的身份证号！"});else t.showToast({icon:"none",title:"身份证号不能为空！"});else t.showToast({icon:"none",title:"请输入正确的姓名！"});else t.showToast({title:"请输入姓名",icon:"none"})}}};e.default=s}).call(this,i("6e42")["default"])},ff47:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){!t.safety.state&&t.RetrieveCode()})},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})}},[["144c","common/runtime","common/vendor"]]]);