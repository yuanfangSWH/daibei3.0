(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-IOSdowmload-IOSdowmload"],{"114a":function(t,i,a){"use strict";a.r(i);var o=a("da12"),n=a.n(o);for(var d in o)"default"!==d&&function(t){a.d(i,t,(function(){return o[t]}))}(d);i["default"]=n.a},"4af8":function(t,i,a){t.exports=a.p+"static/img/downloadbtn.0fd135ec.jpg"},"534b":function(t,i,a){var o=a("c7e3");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=a("4f06").default;n("38acb7e0",o,!0,{sourceMap:!1,shadowMode:!1})},9084:function(t,i,a){t.exports=a.p+"static/img/iosimg03.ceb2f8f8.jpg"},a35c:function(t,i,a){t.exports=a.p+"static/img/andrio.6cda1946.jpg"},aa9b:function(t,i,a){"use strict";a.r(i);var o=a("e7d3"),n=a("114a");for(var d in n)"default"!==d&&function(t){a.d(i,t,(function(){return n[t]}))}(d);a("c935");var s,c=a("f0c5"),e=Object(c["a"])(n["default"],o["b"],o["c"],!1,null,"26d2dc9d",null,!1,o["a"],s);i["default"]=e.exports},bfd2:function(t,i,a){t.exports=a.p+"static/img/iosimg02.cb0ba8b9.jpg"},c7e3:function(t,i,a){var o=a("24fb");i=o(!1),i.push([t.i,".dlbox[data-v-26d2dc9d]{height:100vh;background:#fff}.iBox[data-v-26d2dc9d]{position:relative;height:%?1206?%}.dlBg[data-v-26d2dc9d]{height:100vh;width:%?750?%;position:absolute;z-index:1;left:0;top:0}.dlBgImg[data-v-26d2dc9d]{width:%?750?%;display:block}.iosImg[data-v-26d2dc9d]{width:%?750?%;display:block}.dlfooter[data-v-26d2dc9d]{width:%?750?%;position:absolute;bottom:%?40?%;left:0;z-index:2}.dlbtn[data-v-26d2dc9d]{width:%?606?%;height:%?125?%;display:block;margin:0 %?72?%}",""]),t.exports=i},c935:function(t,i,a){"use strict";var o=a("534b"),n=a.n(o);n.a},cc0c:function(t,i,a){t.exports=a.p+"static/img/iosimg01.348f4329.jpg"},da12:function(t,i,a){"use strict";var o=a("ee27");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=o(a("0472")),d={data:function(){return{url:""}},onLoad:function(){this.iosInfo()},methods:{iosInfo:function(){var t=this;n.default.apiPost("/index/update","","","GET",(function(i,a,o){0==a.code?t.url=a.data.ios_src:uni.showToast({title:"数据加载失败",icon:"none"})}))},iosFun:function(){location.href=this.url}}};i.default=d},e7d3:function(t,i,a){"use strict";var o,n=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("v-uni-view",{staticClass:"dlbox"},[o("v-uni-view",{staticClass:"iBox"},[o("v-uni-view",{staticClass:"dlBg"},[o("v-uni-image",{staticClass:"dlBgImg",attrs:{src:a("a35c"),mode:"widthFix"}})],1),o("v-uni-view",{staticClass:"dlfooter",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.iosFun.apply(void 0,arguments)}}},[o("v-uni-image",{staticClass:"dlbtn",attrs:{src:a("4af8")}})],1)],1),o("v-uni-view",{staticClass:"imgbox"},[o("v-uni-image",{staticClass:"iosImg",attrs:{src:a("cc0c"),mode:"widthFix"}}),o("v-uni-image",{staticClass:"iosImg",attrs:{src:a("bfd2"),mode:"widthFix"}}),o("v-uni-image",{staticClass:"iosImg",attrs:{src:a("9084"),mode:"widthFix"}})],1)],1)},d=[];a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return d})),a.d(i,"a",(function(){return o}))}}]);