(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-download-download"],{3803:function(n,e,t){"use strict";var a,o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-uni-view",[t("v-uni-view",[n._v("跳转下载中...")])],1)},r=[];t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return a}))},"411a":function(n,e,t){"use strict";t.r(e);var a=t("ee2e"),o=t.n(a);for(var r in a)"default"!==r&&function(n){t.d(e,n,(function(){return a[n]}))}(r);e["default"]=o.a},da06:function(n,e,t){"use strict";t.r(e);var a=t("3803"),o=t("411a");for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);var u,c=t("f0c5"),i=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,"29c5bfe4",null,!1,a["a"],u);e["default"]=i.exports},ee2e:function(n,e,t){"use strict";t("c975"),t("e25e"),t("ac1f"),t("466d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{}},onLoad:function(){uni.request({url:"http://ts.rong298.cn/index/update",header:{"Content-Type":"application/x-www-form-urlencoded"},method:"get",success:function(n){var e=n.data.code;switch(parseInt(e)){case 0:var t=navigator.userAgent,a=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,o=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);a&&location.assign(n.data.data.src),o&&location.assign(n.data.data.ios_src);break;default:console.log("未知错误")}},fail:function(n){console.log(n.data)}})},methods:{}};e.default=a}}]);