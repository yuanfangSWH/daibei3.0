(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-segmented-control2/uni-segmented-control"],{6859:function(t,n,e){},"6ca6":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})},"78e1":function(t,n,e){"use strict";e.r(n);var r=e("6ca6"),u=e("897c");for(var c in u)"default"!==c&&function(t){e.d(n,t,function(){return u[t]})}(c);e("ad70");var a=e("2877"),i=Object(a["a"])(u["default"],r["a"],r["b"],!1,null,null,null);n["default"]=i.exports},"897c":function(t,n,e){"use strict";e.r(n);var r=e("c38b"),u=e.n(r);for(var c in r)"default"!==c&&function(t){e.d(n,t,function(){return r[t]})}(c);n["default"]=u.a},ad70:function(t,n,e){"use strict";var r=e("6859"),u=e.n(r);u.a},c38b:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"uni-segmented-control",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}},created:function(){this.currentIndex=this.current}};n.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-segmented-control2/uni-segmented-control-create-component',
    {
        'components/uni-segmented-control2/uni-segmented-control-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("78e1"))
        })
    },
    [['components/uni-segmented-control2/uni-segmented-control-create-component']]
]);                
