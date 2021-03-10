window.Sail=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(1),a=function(e){return e&&e.__esModule?e:{default:e}}(r);n(2);var Sail=function(){function Sail(e){o(this,Sail);var t={name:"MovieMate",author:"Ali Zahid",icon:"https://moviemate.co/assets/apple-touch-icon.png",description:"On Google Play",label:"View",price:"FREE"};this.options=Object.assign(t,e),"android"!==this.platform||this.hidden||this.drop()}return i(Sail,[{key:"drop",value:function(){var e=document.createElement("div");e.className="sail",e.innerHTML='\n<a href="#" class="close">\n  <span>\n  </span>\n</a>\n<figure style="background-image: url('+this.icon+')"></figure>\n<section>\n  <h1>'+this.options.name+"</h1>\n  <h2>"+this.options.author+"</h2>\n  <p>"+this.options.price+" &#8212; "+this.options.description+'</p>\n</section>\n<a href="'+this.link+'" class="view">\n  <span>'+this.options.label+"</span>\n</a>\n",document.body.appendChild(e),e.firstElementChild.onclick=this.close.bind(this),this.show()}},{key:"meta",value:function(e,t){var n=document.getElementsByTagName("link"),o=!0,i=!1,r=void 0;try{for(var a,s=n[Symbol.iterator]();!(o=(a=s.next()).done);o=!0){var c=a.value;if(c.rel===e)return c[t]}}catch(e){i=!0,r=e}finally{try{!o&&s.return&&s.return()}finally{if(i)throw r}}return""}},{key:"close",value:function(e){e.preventDefault(),a.default.set("sail-stowed",!0,{expires:7}),this.hide()}},{key:"show",value:function(){document.body.classList.add("sail-dropped")}},{key:"hide",value:function(){document.body.classList.remove("sail-dropped")}},{key:"platform",get:function(){if(/android/i.test(window.navigator.userAgent))return"android"}},{key:"hidden",get:function(){return a.default.get("sail-stowed")}},{key:"icon",get:function(){return this.options.icon||this.meta("apple-touch-icon","href")}},{key:"link",get:function(){return"http://play.google.com/store/apps/details?id="+this.appId}},{key:"appId",get:function(){return this.options.appId||this.meta("google-play-app").split(",").shift().split("=").pop()}}]),Sail}();t.default=Sail,e.exports=t.default},function(e,t,n){var o,i;!function(r){var a=!1;if(o=r,void 0!==(i="function"==typeof o?o.call(t,n,t,e):o)&&(e.exports=i),a=!0,e.exports=r(),a=!0,!a){var s=window.Cookies,c=window.Cookies=r();c.noConflict=function(){return window.Cookies=s,c}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(n){function o(t,i,r){var a;if("undefined"!=typeof document){if(arguments.length>1){if(r=e({path:"/"},o.defaults,r),"number"==typeof r.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*r.expires),r.expires=s}r.expires=r.expires?r.expires.toUTCString():"";try{a=JSON.stringify(i),/^[\{\[]/.test(a)&&(i=a)}catch(e){}i=n.write?n.write(i,t):encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape);var c="";for(var u in r)r[u]&&(c+="; "+u,!0!==r[u]&&(c+="="+r[u]));return document.cookie=t+"="+i+c}t||(a={});for(var l=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,d=0;d<l.length;d++){var f=l[d].split("="),h=f.slice(1).join("=");'"'===h.charAt(0)&&(h=h.slice(1,-1));try{var v=f[0].replace(p,decodeURIComponent);if(h=n.read?n.read(h,v):n(h,v)||h.replace(p,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch(e){}if(t===v){a=h;break}t||(a[v]=h)}catch(e){}}return a}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}return t(function(){})})},function(e,t){}]);