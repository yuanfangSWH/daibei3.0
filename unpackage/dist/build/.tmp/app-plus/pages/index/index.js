(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"17bb":function(a,t,e){},"5fb6":function(a,t,e){"use strict";var n=function(){var a=this,t=a.$createElement;a._self._c},i=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return i})},8855:function(a,t,e){"use strict";var n=e("17bb"),i=e.n(n);i.a},aaae:function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(e("81bd"));i(e("632e")),i(e("c530")),i(e("b3aa"));function i(a){return a&&a.__esModule?a:{default:a}}var o=function(){return e.e("components/uni-segmented-control/uni-segmented-control").then(e.bind(null,"38fa"))},s={components:{uniSegmentedControl:o},data:function(){return{scrollLeft:0,indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,activecolor:"#2A8CFB",indicatorcolor:"#ffffff",items:["贷款产品","信用卡推广"],styles:[{value:"button",text:"按钮",checked:!0},{value:"text",text:"文字"}],colors:["#000000","#4cd964","#dd524d"],current:0,colorIndex:0,activeColor:"#F1F4F8",styleType:"button",loanTags:[],cardTags:[],loanbox:"",cardbox:"",isshow:!0,tagid:[],page:1,pageCount:1,cardtagid:[],page2:1,pageCount2:1,tabcurrent:0,cardtab:0,loantagarr:[],cardtagarr:[],userinfo:"",usertype:"",bannerData:""}},onLoad:function(){this.loanlist(),this.pullData(),this.userInfo()},onPullDownRefresh:function(){this.pullData(),setTimeout(function(){a.stopPullDownRefresh()},1e3)},onReachBottom:function(){a.showLoading({title:"加载中"}),1==this.isshow?this.loadingData():this.loadingCardData()},methods:{onClickItem:function(a){this.current!==a&&(this.current=a,0==this.current?(this.loanlist(),this.isshow=!0):(this.banklist(),this.isshow=!1))},pullData:function(){var t=this;n.default.apiPost("/index/main","","","get",function(e,n,i){if(0==n.code){t.bannerData=n.data.bannerList,t.loanTags=n.data.loanTags;var o=[{id:"1000000",tab_name:"全部"}],s=o.concat(t.loanTags);t.loantagarr=s,t.cardTags=n.data.bankTags;var r=[{id:"2000000",tab_name:"全部"}],u=r.concat(t.cardTags);if(t.cardtagarr=u,1==t.isshow){var l=t.tabcurrent;t.tagid=t.loantagarr[l].id,t.loanlist()}else{var d=t.cardtab;t.cardtagid=t.cardtagarr[d].id,t.banklist()}}else n.code,a.showToast({title:""+n.msg,icon:"none"})})},userInfo:function(){var a=this;n.default.apiPost("/user/userinfo","","","get",function(t,e,n){0==e.code&&(a.userinfo=e.data.baseInfo,a.usertype=e.data.baseInfo.user_type)})},loanlist:function(){var t=this;if(0==this.tabcurrent)n.default.apiPost("/index/loanlist","","","get",function(e,n,i){if(0==n.code){t.loanbox=n.data.loadList;var o=n.data.pages.totalCount,s=n.data.pages.defaultPageSize;null==o||""==o?t.pageCount=0:(0!=s&&o%s==0&&(t.pageCount=parseInt(o/s)),0!=s&&o%s!=0&&(t.pageCount=parseInt(o/s)+1))}else a.showToast({title:""+n.msg,icon:"none"})});else{var e={tag:this.tagid,page:this.page},i="?tag="+this.tagid+"&page="+this.page;n.default.apiPost("/index/loanlist",i,e,"get",function(e,n,i){if(0==n.code){t.loanbox=n.data.loadList;var o=n.data.pages.totalCount,s=n.data.pages.defaultPageSize;null==o||""==o?t.pageCount=0:(0!=s&&o%s==0&&(t.pageCount=parseInt(o/s)),0!=s&&o%s!=0&&(t.pageCount=parseInt(o/s)+1))}else a.showToast({title:""+n.msg,icon:"none"})})}},banklist:function(){var t=this;if(0==this.cardtab)n.default.apiPost("/index/banklist","","","get",function(e,n,i){if(0==n.code){t.cardbox=n.data.bankList;var o=n.data.pages.totalCount,s=n.data.pages.defaultPageSize;null==o||""==o?t.pageCount2=0:(0!=s&&o%s==0&&(t.pageCount2=parseInt(o/s)),0!=s&&o%s!=0&&(t.pageCount2=parseInt(o/s)+1))}else a.showToast({title:""+n.msg,icon:"none"})});else{var e={tag:this.cardtagid,page:this.page2},i="?tag="+this.cardtagid+"&page="+this.page2;n.default.apiPost("/index/banklist",i,e,"get",function(e,n,i){if(0==n.code){t.cardbox=n.data.bankList;var o=n.data.pages.totalCount,s=n.data.pages.defaultPageSize;null==o||""==o?t.pageCount2=0:(0!=s&&o%s==0&&(t.pageCount2=parseInt(o/s)),0!=s&&o%s!=0&&(t.pageCount2=parseInt(o/s)+1))}else a.showToast({title:""+n.msg,icon:"none"})})}},loadingData:function(){var t=this;if(this.page++,this.page>this.pageCount)a.showToast({title:"没有更多产品了",icon:"none",duration:2e3});else{var e="",i="";0==this.tabcurrent?(e={page:this.page},i="?page="+this.page):(e={tag:this.tagid,page:this.page},i="?tag="+this.tagid+"&page="+this.page),n.default.apiPost("/index/loanlist",i,e,"get",function(e,n,i){e&&(t.loanbox=t.loanbox.concat(n.data.loadList),t.tagid=t.loanbox.id,setTimeout(function(){a.hideLoading()},300))})}},loadingCardData:function(){var t=this;if(this.page2++,this.page2>this.pageCount2)a.showToast({title:"没有更多产品了",icon:"none",duration:2e3});else{var e="",i="";0==this.cardtab?(e={page:this.page2},i="?page="+this.page2):(e={tag:this.cardtagid,page:this.page2},i="?tag="+this.cardtagid+"&page="+this.page2),n.default.apiPost("/index/banklist",i,e,"get",function(e,n,i){e&&(t.cardbox=t.cardbox.concat(n.data.bankList),t.cardtagid=t.cardbox.id,setTimeout(function(){a.hideLoading()},300))})}},tagfilter:function(a){this.tabcurrent=a,this.page=1,this.pullData()},cardtagfilter:function(a){this.cardtab=a,this.page2=1,this.pullData()},tuiguang:function(){a.navigateTo({url:"/pages/personal/tglc/tglc"})},zhinan:function(){a.navigateTo({url:"/pages/guide/guide"})},kefu:function(){a.navigateTo({url:"/pages/personal/customer/customer"})},loandetails:function(t){1==this.usertype?a.navigateTo({url:"/pages/index/hehuoDetails/hehuoDetails?id="+t}):a.navigateTo({url:"/pages/index/details/details?id="+t})},carddetails:function(t){a.navigateTo({url:"/pages/index/creditcardlist/creditcardlist?id="+t})},bannerFun:function(t){a.navigateTo({url:"/pages/index/apply/apply?url="+t})}}};t.default=s}).call(this,e("6e42")["default"])},d79a:function(a,t,e){"use strict";e.r(t);var n=e("aaae"),i=e.n(n);for(var o in n)"default"!==o&&function(a){e.d(t,a,function(){return n[a]})}(o);t["default"]=i.a},e200:function(a,t,e){"use strict";e.r(t);var n=e("5fb6"),i=e("d79a");for(var o in i)"default"!==o&&function(a){e.d(t,a,function(){return i[a]})}(o);e("8855");var s=e("2877"),r=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports}},[["1ca9","common/runtime","common/vendor"]]]);