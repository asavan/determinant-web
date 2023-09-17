(()=>{"use strict";var e,t,n={363:(e,t,n)=>{function r(e){e&&e.remove()}function o(e){switch(e.toLowerCase().trim()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(e)}}function i(e,t,n){const r=e.location.search,i=new URLSearchParams(r);for(const[e,t]of i)"number"==typeof n[e]?n[e]=parseInt(t,10):"boolean"==typeof n[e]?n[e]=o(t):n[e]=t}n.d(t,{Bk:()=>i,ew:()=>r})}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,o),i.exports}o.m=n,o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[])),o.u=e=>e+"."+{567:"8cbdc5e14655dd7ed397",947:"b6794b5d091371662a21",964:"36502f5e351e3e8d1c9c",987:"b28c21025f50eba57d07",996:"ebff37e19c1a92d0738d"}[e]+".js",o.miniCssF=e=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="determinant-web:",o.l=(n,r,i,s)=>{if(e[n])e[n].push(r);else{var a,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+i){a=d;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",t+i),a.src=n),e[n]=[r];var f=(t,r)=>{a.onerror=a.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(r))),t)return t(r)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&!e;)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{o.b=document.baseURI||self.location.href;var e={179:0};o.f.j=(t,n)=>{var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=i);var s=o.p+o.u(t),a=new Error;o.l(s,(n=>{if(o.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,r[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,i,[s,a,l]=n,c=0;if(s.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(l)l(o)}for(t&&t(n);c<s.length;c++)i=s[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0},n=self.webpackChunkdeterminant_web=self.webpackChunkdeterminant_web||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{const e={modes:["net","ai","hotseat","server","cheating"],currentMode:"ai",wsPort:8088,negotiatedId:3,color:"blue",size:3};function t(e,t){const n="red"===t.color;let r=n,o=-1,i=-1,s=-1,a=-1,l=-1,c=-1,u=0,d=0;const f=Array(e.getSizeSqr()).fill(0),m=Array(e.getSizeSqr()).fill(!1),g=Array(e.getSizeSqr()).fill(!1),v=Array(e.getSizeSqr()).fill(!1);const p=()=>{const t=[];e.copy_matrix(f,t),e.fill_matrix(t);const n=e.determinant(t);return u=n,n},h=function(t,n){const u=function(t,n,r){return!(t<0||n<0||0!==f[t]||(f[t]=n+1,r?(g[t]=!0,s=t):(m[t]=!0,a=t),d=e.fill_digits(f,v),o=-1,i=-1,c=-1,l=-1,0))}(t,n,r);return u&&(r=!r),u},b=()=>i,y=()=>o;return{matrix_result:f,player_moves:m,comp_moves:g,getLastCompMove:()=>s,getLastUserMove:()=>a,isLastMove:e=>s===e||a===e,getResult:p,getActiveDigitIndex:b,setActiveDigitIndex:function(e){r&&"hotseat"!==t.currentMode||(i=e>=0&&v[e]?-1:e)},getActivePosition:y,setActivePosition:function(e){r&&"hotseat"!==t.currentMode||(o=e>=0&&f[e]>0?-1:e)},onAiMove:function(e){return u=e.result,h(e.bestPos,e.bestK)},onAiHint:function(e){u=e.result,c=e.bestPos,l=e.bestK},getDigits:()=>v,getStep:()=>d,endMessage:()=>(e=>p()>0!==e)(n)?"You win":"You lose",lessThanTwoMoves:()=>d+2>f.length,tryMove:function(){return h(y(),b())},isCurrentRed:()=>r,isBestDigit:e=>l===e,isBestPosition:e=>c===e}}function n(){}const r=function(e,t){return e.preventDefault(),e.target.classList.contains("cell")||e.target.classList.contains("digit")?function(e,t){const n=e.target||e.srcElement;for(let e=0;e<t.children.length;e++)if(t.children[e]===n)return e;return-1}(e,t):-1};function i(e,o,i){const s=o.getElementsByClassName("box")[0],a=o.getElementsByClassName("digits")[0],l=o.getElementsByClassName("overlay")[0],c=o.getElementsByClassName("close")[0],u=o.getElementsByClassName("install")[0];if(3!==i.size){o.documentElement.style.setProperty("--field-size",i.size)}const d=function(e){const t=e*e;function n(e,n){let r=0;for(let o=0;o<t;++o){const t=e[o];t>0&&(++r,n[t-1]=!0)}return r}return{fill_digits:n,fill_matrix:function(e){const t=[];let r=n(e,t);for(let n=0,o=0;n<e.length&&o<t.length;++n,++o){for(;0!==e[n];)if(++n,n>=e.length)return r;for(;t[o];)if(++o,o>=t.length)return r;n<e.length&&(e[n]=o+1,t[o]=!0,++r)}return r},matrix_to_int:function(e){let n=0;for(let r=0;r<t;++r)n*=10,n+=e[r];return n},copy_matrix:(e,t)=>{for(let n=0;n<e.length;++n)t[n]=e[n]},int_to_result:function(e){const t=e<0?-1:1,n=(e*=t)%10;e-=n;const r=(e/=10)%10;return e-=r,{result:t*(e/=10),bestK:r,bestPos:n}},determinant:function(n){return 3===e?(e=>e[0]*e[4]*e[8]+e[6]*e[1]*e[5]+e[3]*e[7]*e[2]-e[2]*e[4]*e[6]-e[1]*e[3]*e[8]-e[0]*e[5]*e[7])(n):2===e?(e=>e[0]*e[3]-e[1]*e[2])(n):t},getSize:()=>e,getSizeSqr:()=>t}}(i.size),f=t(d,i),m={playerMove:n,enemyMove:n,meMove:n,aiMove:n,aiHint:n,gameover:n};function g(e,t){p(),e&&(f.lessThanTwoMoves()&&function(){const e=f.endMessage();l.querySelector("h2").textContent=e,l.querySelector(".content").textContent="Determinant =  "+f.getResult(),l.classList.add("show"),u.classList.remove("hidden2"),m.gameover()}(),t?(f.getLastUserMove()>=0&&m.playerMove({bestPos:f.getLastUserMove(),bestK:f.matrix_result[f.getLastUserMove()]-1,result:0}),m.aiMove(f.matrix_result)):(f.getLastCompMove()>=0&&m.enemyMove({bestPos:f.getLastCompMove(),bestK:f.matrix_result[f.getLastCompMove()]-1,result:0}),m.meMove(f.matrix_result)))}function v(){g(f.tryMove(),f.isCurrentRed())}function p(){!function(e,t,n){for(let n=0;n<e.matrix_result.length;n++){const r=t.childNodes[n],o=e.matrix_result[n];r.textContent=o.toString(),r.className=o?"cell disabled":"cell hole",e.getActivePosition()===n&&(r.classList.add("active"),e.isCurrentRed()?r.classList.add("comp"):r.classList.add("player")),e.comp_moves[n]&&r.classList.add("comp"),e.player_moves[n]&&r.classList.add("player"),e.isLastMove(n)&&r.classList.add("last"),e.isBestPosition(n)&&r.classList.add("best")}const r=e.getDigits();for(let t=0;t<e.matrix_result.length;t++){const o=n.childNodes[t],i=r[t],s=t+1;o.textContent=s.toString(),o.className="digit",i&&o.classList.add("disabled"),e.getActiveDigitIndex()===t&&(o.classList.add("active"),e.isCurrentRed()?o.classList.add("comp"):o.classList.add("player")),t===e.matrix_result[e.getLastCompMove()]-1&&o.classList.add("comp"),t===e.matrix_result[e.getLastUserMove()]-1&&o.classList.add("player"),e.isBestDigit(t)&&o.classList.add("best")}}(f,s,a)}function h(e,t,n){for(let r=0;r<e;r++){const e=o.createElement("div");e.className=t,n.appendChild(e)}}return h(f.matrix_result.length,"cell",s),h(f.matrix_result.length,"digit",a),s.addEventListener("click",(function(e){f.setActivePosition(r(e,s)),v()}),!1),a.addEventListener("click",(function(e){f.setActiveDigitIndex(r(e,a)),v()}),!1),c.addEventListener("click",(function(e){e.preventDefault(),l.classList.remove("show")}),!1),g(!0,f.isCurrentRed()),{guess:function(){m.aiHint(f.matrix_result)},allCallbacksInited:function(){g(!0,f.isCurrentRed())},on:function(e,t){m[e]=t},wrap:function(e,t){const n=m[e];m[e]=e=>{n(e),t(e)}},aiMove:function(e){g(f.onAiMove(e),f.isCurrentRed())},aiHint:function(e){f.onAiHint(e),p()},getSolver:function(){return d}}}var s=o(363);!function(e,t,n){"loading"!==n.readyState?e(t,n):n.addEventListener("DOMContentLoaded",(function(){e(t,n)}))}((function(t,n){if((0,s.Bk)(t,n,e),"net"===e.currentMode)Promise.all([o.e(567),o.e(996)]).then(o.bind(o,996)).then((r=>{r.default(t,n,e,i)}));else if("server"===e.currentMode)Promise.all([o.e(567),o.e(964)]).then(o.bind(o,964)).then((r=>{e.color="black",r.default(t,n,e)}));else if("cheating"===e.currentMode)Promise.all([Promise.all([o.e(567),o.e(996)]).then(o.bind(o,996)),o.e(947).then(o.bind(o,947))]).then((([r,o])=>{r.default(t,n,e,i).then((e=>{const t=o.default(e.getSolver());e.on("meMove",(n=>t.makeMove(n,e.aiHint))),e.allCallbacksInited()}))}));else{const r=i(0,n,e);"ai"===e.currentMode?o.e(947).then(o.bind(o,947)).then((e=>{const t=e.default(r.getSolver());r.on("aiMove",(e=>t.makeMove(e,r.aiMove))),r.on("aiHint",(e=>t.makeMove(e,r.aiHint))),r.allCallbacksInited()})):e.currentMode,t.gameObj=r}}),window,document)})()})();