(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-tglc-tglc"],{"2d53":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page",attrs:{id:"scroll"}},t._l(3,(function(t){return n("v-uni-view",{key:t,staticClass:"item"},[n("v-lazyload",{attrs:{src:"/static/tg-img"+t+".png",mode:"widthFix"}})],1)})),1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"3e03":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"#scroll[data-v-ef247ee0]{height:100vh; /* 需要给scroll-view设置高度 */background:#f8f8f9;font-size:0}\n.page[data-v-ef247ee0] .img-lazyLoad .load-img{width:%?750?%;display:block}.page[data-v-ef247ee0] .img-lazyLoad .load-error-img{width:100px}\n.item[data-v-ef247ee0]{width:-webkit-fit-content;width:fit-content;width:%?750?%\r\n    /* min-height: 200px; */}",""]),t.exports=e},"59b0":function(t,e,n){"use strict";n.r(e);var a=n("2d53"),i=n("6094");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("5c17");var r,c=n("f0c5"),u=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"ef247ee0",null,!1,a["a"],r);e["default"]=u.exports},"5c17":function(t,e,n){"use strict";var a=n("73b7"),i=n.n(a);i.a},6094:function(t,e,n){"use strict";n.r(e);var a=n("8152"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"73b7":function(t,e,n){var a=n("3e03");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("0fc15496",a,!0,{sourceMap:!1,shadowMode:!1})},8152:function(t,e,n){"use strict";var a=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("7d5d")),o=a(n("345b")),r={onPageScroll:function(){i.default.scroll()},mounted:function(){i.default.init("#scroll")},destroyed:function(){i.default.destroy()},components:{VLazyload:o.default}};e.default=r}}]);