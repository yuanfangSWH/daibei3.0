(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/hehuoDetails/hehuoDetails"],{"006b":function(n,t,o){"use strict";var e=o("b167"),a=o.n(e);a.a},"11bc":function(n,t,o){"use strict";o.r(t);var e=o("9fef"),a=o.n(e);for(var i in e)"default"!==i&&function(n){o.d(t,n,function(){return e[n]})}(i);t["default"]=a.a},"9fef":function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=a(o("81bd"));function a(n){return n&&n.__esModule?n:{default:n}}var i={data:function(){return{productID:"",infobox:"",loanname:"",textbox:"",key:"",luyou:"",maxLoan:""}},onLoad:function(n){this.productID=n.id,this.pullData()},methods:{pullData:function(){var t=this,o={id:this.productID},a="?id="+this.productID;e.default.apiPost("/loan/info",a,o,"get",function(o,e,a){if(0==e.code){t.infobox=e.data.loadInfo;var i=t.infobox.loan_money_end,u="",l=0,r='<div style="font-size:30px !important;  display:inline-block;">,</div>';i=(i||0).toString();for(var f=i.length-1;f>=0;f--)l++,u=i.charAt(f)+u,l%3||0==f||(u=r+u);t.maxLoan=u,t.textbox=JSON.parse(t.infobox.text),t.key=t.infobox.key,t.loanname=t.infobox.loan_name,n.setNavigationBarTitle({title:t.loanname})}else 401==e.code||n.showToast({title:""+e.msg,icon:"none"})})},loanapply:function(){n.navigateTo({url:"/pages/index/loanApply/loanApply?key="+this.key})},loanTuig:function(){n.navigateTo({url:"/pages/index/loanposter/loanposter?id="+this.productID})}}};t.default=i}).call(this,o("6e42")["default"])},b167:function(n,t,o){},d08b:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},a=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return a})},f880:function(n,t,o){"use strict";o.r(t);var e=o("d08b"),a=o("11bc");for(var i in a)"default"!==i&&function(n){o.d(t,n,function(){return a[n]})}(i);o("006b");var u=o("2877"),l=Object(u["a"])(a["default"],e["a"],e["b"],!1,null,"1383f9e4",null);t["default"]=l.exports}},[["58ac","common/runtime","common/vendor"]]]);