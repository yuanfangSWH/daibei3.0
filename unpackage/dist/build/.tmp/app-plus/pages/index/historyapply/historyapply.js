(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/historyapply/historyapply"],{"1f6a":function(t,o,n){"use strict";n.r(o);var a=n("b4db"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(o,t,function(){return a[t]})}(r);o["default"]=i.a},"70b7":function(t,o,n){"use strict";n.r(o);var a=n("f5ba"),i=n("1f6a");for(var r in i)"default"!==r&&function(t){n.d(o,t,function(){return i[t]})}(r);n("a98e");var e=n("2877"),u=Object(e["a"])(i["default"],a["a"],a["b"],!1,null,null,null);o["default"]=u.exports},"8c5a":function(t,o,n){},a98e:function(t,o,n){"use strict";var a=n("8c5a"),i=n.n(a);i.a},b4db:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(n("81bd"));function i(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{historybox:[],uid:"",hisbox:[],key:""}},onLoad:function(t){this.uid=t.id,this.key=t.key,this.historydata()},methods:{historydata:function(){var t=this;a.default.apiPost("/apply/history","","","get",function(o,n,a){if(!Object.is(n.data.history,{})){t.historybox=n.data.history;for(var i=[],r=0;r<t.historybox.length;r++)t.historybox[r].id==t.uid&&i.push(t.historybox[r]);t.hisbox=i}})},formatName:function(t){return new Array(t.length).join("*")+t.substr(-1)},loanapply:function(){var o=this,n={key:this.key,historyId:this.uid},i="?key="+this.key+"&historyId="+this.uid;a.default.apiPost("/apply/loan",i,n,"post",function(n,a,i){0==a.code?(o.toUrl=a.data.toUrl,location.href=o.toUrl):t.showToast({title:""+a.msg,icon:"none"})})}}};o.default=r}).call(this,n("6e42")["default"])},f5ba:function(t,o,n){"use strict";var a=function(){var t=this,o=t.$createElement,n=(t._self._c,t.__map(t.hisbox,function(o,n){var a=t.formatName(o.name);return{$orig:t.__get_orig(o),m0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[];n.d(o,"a",function(){return a}),n.d(o,"b",function(){return i})}},[["0d0c","common/runtime","common/vendor"]]]);