(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/withdraw/affirmInfo/affirmInfo"],{"04ec":function(n,a,t){"use strict";t.r(a);var e=t("da44"),r=t.n(e);for(var c in e)"default"!==c&&function(n){t.d(a,n,function(){return e[n]})}(c);a["default"]=r.a},"33de":function(n,a,t){},ab37:function(n,a,t){"use strict";var e=t("33de"),r=t.n(e);r.a},da44:function(n,a,t){"use strict";(function(n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=r(t("81bd"));function r(n){return n&&n.__esModule?n:{default:n}}var c={data:function(){return{name:"",sfz:"",mobile:"",bankcard:""}},onLoad:function(n){this.getUserinfo(),this.bankcard=n.bankcard},methods:{getUserinfo:function(){var n=this;e.default.apiPost("/account/ainfo","","","get",function(a,t,e){0==t.code&&(n.cardInfo=t.data,n.name=n.cardInfo.user_name,n.sfz=n.cardInfo.user_card,n.mobile=n.cardInfo.user_mobile)})},AddSubmit:function(){var a={bank_card:this.bankcard},t="?bank_card="+this.bankcard;e.default.apiPost("/account/setbankcard",t,a,"POST",function(a,t,e){0==t.code&&n.navigateTo({url:"/pages/withdraw/cardWc/cardWc"})})}}};a.default=c}).call(this,t("6e42")["default"])},f0a2:function(n,a,t){"use strict";t.r(a);var e=t("f600"),r=t("04ec");for(var c in r)"default"!==c&&function(n){t.d(a,n,function(){return r[n]})}(c);t("ab37");var o=t("2877"),u=Object(o["a"])(r["default"],e["a"],e["b"],!1,null,"2957f902",null);a["default"]=u.exports},f600:function(n,a,t){"use strict";var e=function(){var n=this,a=n.$createElement;n._self._c},r=[];t.d(a,"a",function(){return e}),t.d(a,"b",function(){return r})}},[["82ac","common/runtime","common/vendor"]]]);