(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bbs/bbs"],{"0812":function(t,a,e){"use strict";var n=e("20d8"),s=e.n(n);s.a},"20d8":function(t,a,e){},"4e90":function(t,a,e){"use strict";e.r(a);var n=e("9d2b"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=s.a},"826d":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},s=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return s})},"9d2b":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=s(e("81bd"));function s(t){return t&&t.__esModule?t:{default:t}}var i=function(){return e.e("components/uni-segmented-control/uni-segmented-control").then(e.bind(null,"38fa"))},o={components:{uniSegmentedControl:i},data:function(){return{bannerData:"",scrollLeft:0,isshow:!0,indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,activecolor:"#2A8CFB",indicatorcolor:"#ffffff",items:["今日头条","社区交流"],styles:[{value:"button",text:"按钮",checked:!0},{value:"text",text:"文字"}],colors:["#000000","#4cd964","#dd524d"],current:0,colorIndex:0,activeColor:"#F1F4F8",styleType:"button",topdata:"",newid:"",page:1,pageCount:1,bbsdata:"",list_content:"",loantagarr:"",loanTags:"",tabcurrent:0,tagid:"",bbsTags:"",bbstagarr:"",bbscurrent:0,bbstagid:""}},onLoad:function(){this.page=1,this.pullData(),this.bannerD()},onPullDownRefresh:function(){this.topInfo(),setTimeout(function(){t.stopPullDownRefresh()},1e3)},onReachBottom:function(){t.showLoading({title:"加载中"}),0==this.current?this.loadingTopData():this.loadingBbsData()},methods:{onClickItem:function(t){this.current!==t&&(this.current=t,0==this.current?(this.topInfo(),this.isshow=!0):(this.bbstagFun(),this.isshow=!1))},bannerD:function(){var t=this;n.default.apiPost("/index/main","","","get",function(a,e,n){0==e.code&&(t.bannerData=e.data.bannerList)})},pullData:function(){var a=this;n.default.apiPost("/new/tags","","","get",function(e,n,s){if(0==n.code){a.loanTags=n.data;var i=[{id:"1000000",tab_name:"全部"}],o=i.concat(a.loanTags);if(a.loantagarr=o,1==a.isshow){var u=a.tabcurrent;a.tagid=a.loantagarr[u].id,a.topInfo()}}else 401==n.code||t.showToast({title:""+n.msg,icon:"none"})})},topInfo:function(){var a=this;if(0==this.tabcurrent)n.default.apiPost("/new/list","","","get",function(e,n,s){if(0==n.code){a.topdata=n.data.list;var i=n.data.pages.totalCount,o=n.data.pages.defaultPageSize;null==i||""==i?a.pageCount=0:(0!=o&&i%o==0&&(a.pageCount=parseInt(i/o)),0!=o&&i%o!=0&&(a.pageCount=parseInt(i/o)+1))}else t.showToast({title:""+n.msg,icon:"none"})});else{var e={tab:this.tagid,page:this.page},s="?tab="+this.tagid+"&page="+this.page;n.default.apiPost("/new/list",s,e,"get",function(e,n,s){if(0==n.code){a.topdata=n.data.list;var i=n.data.pages.totalCount,o=n.data.pages.defaultPageSize;null==i||""==i?a.pageCount=0:(0!=o&&i%o==0&&(a.pageCount=parseInt(i/o)),0!=o&&i%o!=0&&(a.pageCount=parseInt(i/o)+1))}else t.showToast({title:""+n.msg,icon:"none"})})}},bbstagFun:function(){var a=this;n.default.apiPost("/forum/tags","","","get",function(e,n,s){if(0==n.code){a.bbsTags=n.data;var i=[{id:"1000000",tab_name:"全部"}],o=i.concat(a.bbsTags);if(a.bbstagarr=o,0==a.isshow){var u=a.bbscurrent;a.bbstagid=a.bbstagarr[u].id,a.bbsInfo()}}else 401==n.code||t.showToast({title:""+n.msg,icon:"none"})})},bbsInfo:function(){var a=this;if(0==this.bbscurrent)n.default.apiPost("/forum/list","","","get",function(e,n,s){if(0==n.code){a.bbsdata=n.data.list;for(var i="",o=0;o<a.bbsdata.length;o++)i=a.bbsdata[o].list_content,i=i.replace('"',"").replace('"',""),i=i.replace('{content:"',"").replace('"}',""),i=i.replace(/\\u/gi,"%u"),i=i.replace(/\\/gi,""),i=unescape(i.replace(/\\u/g,"%u")),a.bbsdata[o].list_content=i;var u=n.data.pages.totalCount,r=n.data.pages.defaultPageSize;null==u||""==u?a.pageCount=0:(0!=r&&u%r==0&&(a.pageCount=parseInt(u/r)),0!=r&&u%r!=0&&(a.pageCount=parseInt(u/r)+1))}else t.showToast({title:""+n.msg,icon:"none"})});else{var e={tab:this.bbstagid,page:this.page},s="?tab="+this.bbstagid+"&page="+this.page;n.default.apiPost("/forum/list",s,e,"get",function(e,n,s){if(0==n.code){a.bbsdata=n.data.list;for(var i="",o=0;o<a.bbsdata.length;o++)i=a.bbsdata[o].list_content,i=i.replace('"',"").replace('"',""),i=i.replace('{content:"',"").replace('"}',""),i=i.replace(/\\u/gi,"%u"),i=i.replace(/\\/gi,""),i=unescape(i.replace(/\\u/g,"%u")),a.bbsdata[o].list_content=i;var u=n.data.pages.totalCount,r=n.data.pages.defaultPageSize;null==u||""==u?a.pageCount=0:(0!=r&&u%r==0&&(a.pageCount=parseInt(u/r)),0!=r&&u%r!=0&&(a.pageCount=parseInt(u/r)+1))}else t.showToast({title:""+n.msg,icon:"none"})})}},loadingTopData:function(){var a=this;if(this.page++,this.page>this.pageCount)t.showToast({title:"没有更多内容了",icon:"none",duration:2e3});else{var e="",s="";0==this.tabcurrent?(e={page:this.page},s="?page="+this.page):(e={tab:this.tagid,page:this.page},s="?tab="+this.tagid+"&page="+this.page),n.default.apiPost("/new/list",s,e,"get",function(e,n,s){0==n.code&&(a.topdata=a.topdata.concat(n.data.list),setTimeout(function(){t.hideLoading()},300))})}},loadingBbsData:function(){var a=this;if(this.page++,this.page>this.pageCount)t.showToast({title:"没有更多内容了",icon:"none",duration:2e3});else{var e="",s="";0==this.bbscurrent?(e={page:this.page},s="?page="+this.page):(e={tab:this.bbstagid,page:this.page},s="?tab="+this.bbstagid+"&page="+this.page),n.default.apiPost("/forum/list",s,e,"get",function(e,n,s){if(0==n.code){a.bbsdata=a.bbsdata.concat(n.data.list);for(var i="",o=0;o<a.bbsdata.length;o++)i=a.bbsdata[o].list_content,i=i.replace('"',"").replace('"',""),i=i.replace('{content:"',"").replace('"}',""),i=i.replace(/\\u/gi,"%u"),i=i.replace(/\\/gi,""),i=unescape(i.replace(/\\u/g,"%u")),a.bbsdata[o].list_content=i;setTimeout(function(){t.hideLoading()},300)}})}},tagfilter:function(t){this.tabcurrent=t,this.page=1,this.pullData()},bbstagfilter:function(t){this.bbscurrent=t,this.page=1,this.bbstagFun()},newsdetails:function(a){t.navigateTo({url:"/pages/NewsDetails/NewsDetails?id="+a})},bbsdetails:function(a){t.navigateTo({url:"/pages/bbsDetails/bbsDetails?id="+a})},fatie:function(){t.navigateTo({url:"/pages/bbs/posted/posted"})},bannerFun:function(a){t.navigateTo({url:"/pages/index/apply/apply?url="+a})}}};a.default=o}).call(this,e("6e42")["default"])},a093:function(t,a,e){"use strict";e.r(a);var n=e("826d"),s=e("4e90");for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);e("0812");var o=e("2877"),u=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);a["default"]=u.exports}},[["53c4","common/runtime","common/vendor"]]]);