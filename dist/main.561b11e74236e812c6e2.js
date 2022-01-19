(()=>{"use strict";var e,t,n={21:(e,t,n)=>{function s(e){e&&e.remove()}n.d(t,{ew:()=>s,Bk:()=>i});!function(){const e=document.createElement("canvas"),t=document.getElementById("favicon");e.height=e.width=16;const n=e.getContext("2d");n.fillStyle="#000"}();function r(e){switch(e.toLowerCase().trim()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(e)}}function i(e,t,n){const s=e.location.search,i=new URLSearchParams(s);for(const[e,t]of i)"number"==typeof n[e]?n[e]=parseInt(t,10):"boolean"==typeof n[e]?n[e]=r(t):n[e]=t}}},s={};function r(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>e+"."+{154:"c7551f111805794e1224",547:"f2c9ce4e87e7571afbd6"}[e]+".js",r.miniCssF=e=>{},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="determinant-web:",r.l=(n,s,i,o)=>{if(e[n])e[n].push(s);else{var a,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+i){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",t+i),a.src=n),e[n]=[s];var f=(t,s)=>{a.onerror=a.onload=null,clearTimeout(m);var r=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((e=>e(s))),t)return t(s)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="./dist/",(()=>{var e={179:0};r.f.j=(t,n)=>{var s=r.o(e,t)?e[t]:void 0;if(0!==s)if(s)n.push(s[2]);else{var i=new Promise(((n,r)=>s=e[t]=[n,r]));n.push(s[2]=i);var o=r.p+r.u(t),a=new Error;r.l(o,(n=>{if(r.o(e,t)&&(0!==(s=e[t])&&(e[t]=void 0),s)){var i=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+o+")",a.name="ChunkLoadError",a.type=i,a.request=o,s[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{var s,i,[o,a,l]=n,c=0;if(o.some((t=>0!==e[t]))){for(s in a)r.o(a,s)&&(r.m[s]=a[s]);if(l)l(r)}for(t&&t(n);c<o.length;c++)i=o[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0},n=self.webpackChunkdeterminant_web=self.webpackChunkdeterminant_web||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{const e={modes:["net","fake","ai","hotseat","netOrAi","server"],currentMode:"ai",debug:!0,wsPort:8088,negotiatedId:3,startRed:!1,color:"blue",size:3};function t(e,t){let n=t.startRed,s=-1,r=-1,i=-1,o=-1,a=-1,l=-1,c=0,d=0;const u=Array(e.getSizeSqr()).fill(0),f=Array(e.getSizeSqr()).fill(!1),m=Array(e.getSizeSqr()).fill(!1),v=Array(e.getSizeSqr()).fill(!1);const g=()=>{if(c)return c;const t=[];e.copy_matrix(u,t),e.fill_matrix(t);const n=e.determinant(t);return c=n,n},p=function(t,c){const g=function(t,n,c){return!(t<0||n<0||0!==u[t]||(u[t]=n+1,c?(m[t]=!0,i=t):(f[t]=!0,o=t),d=e.fill_digits(u,v),s=-1,r=-1,l=-1,a=-1,0))}(t,c,n);return g&&(n=!n),g},h=()=>r,b=()=>s;return{matrix_result:u,player_moves:f,comp_moves:m,getLastCompMove:()=>i,getLastUserMove:()=>o,isLastMove:e=>i===e||o===e,getResult:g,getActiveDigitIndex:h,setActiveDigitIndex:function(e){n&&"hotseat"!==t.currentMode||(r=e>=0&&v[e]?-1:e)},getActivePosition:b,setActivePosition:function(e){n&&"hotseat"!==t.currentMode||(s=e>=0&&u[e]>0?-1:e)},onAiMove:function(e){return c=e.result,p(e.bestPos,e.bestK)},onAiHint:function(e){c=e.result,l=e.bestPos,a=e.bestK},getDigits:()=>v,getStep:()=>d,isWin:e=>g()>0!==e,lessThanTwoMoves:()=>d+2>u.length,tryMove:function(){return p(b(),h())},isCurrentRed:()=>n,isBestDigit:e=>a===e,isBestPosition:e=>l===e}}function n(){}const s=function(e,t){if(e.preventDefault(),e.target.classList.contains("cell")||e.target.classList.contains("digit"))return function(e,t){const n=e.target||e.srcElement;for(let e=0;e<t.children.length;e++)if(t.children[e]===n)return e;return-1}(e,t)};function i(e,r,i){const o=r.getElementsByClassName("box")[0],a=r.getElementsByClassName("digits")[0],l=r.getElementsByClassName("overlay")[0],c=r.getElementsByClassName("close")[0],d=r.getElementsByClassName("install")[0];if(3!==i.size){r.documentElement.style.setProperty("--field-size",i.size)}const u=i.startRed,f=function(e){const t=e*e;function n(e,n){let s=0;for(let r=0;r<t;++r){const t=e[r];t>0&&(++s,n[t-1]=!0)}return s}return{fill_digits:n,fill_matrix:function(e){const t=[];let s=n(e,t);for(let n=0,r=0;n<e.length&&r<t.length;++n,++r){for(;0!==e[n];)if(++n,n>=e.length)return s;for(;t[r];)if(++r,r>=t.length)return s;n<e.length&&(e[n]=r+1,t[r]=!0,++s)}return s},matrix_to_int:function(e){let n=0;for(let s=0;s<t;++s)n*=10,n+=e[s];return n},copy_matrix:(e,t)=>{for(let n=0;n<e.length;++n)t[n]=e[n]},int_to_result:function(e){const t=e<0?-1:1,n=(e*=t)%10;e-=n;const s=(e/=10)%10;return e-=s,{result:t*(e/=10),bestK:s,bestPos:n}},determinant:function(n){return 3===e?(e=>e[0]*e[4]*e[8]+e[6]*e[1]*e[5]+e[3]*e[7]*e[2]-e[2]*e[4]*e[6]-e[1]*e[3]*e[8]-e[0]*e[5]*e[7])(n):2===e?(e=>e[0]*e[3]-e[1]*e[2])(n):t},getSize:()=>e,getSizeSqr:()=>t}}(i.size),m=t(f,i),v={playerMove:n,enemyMove:n,meMove:n,aiMove:n,aiHint:n,gameover:n};function g(e,t){h(),e&&(m.lessThanTwoMoves()&&function(){const e=m.isWin(u)?"You win":"You lose";l.querySelector("h2").textContent=e,l.querySelector(".content").textContent="Determinant =  "+m.getResult(),l.classList.add("show"),d.classList.remove("hidden2"),v.gameover(m.isWin(u))}(),t?(m.getLastUserMove()>=0&&v.playerMove({bestPos:m.getLastUserMove(),bestK:m.matrix_result[m.getLastUserMove()]-1,result:0}),v.aiMove(m.matrix_result)):(m.getLastCompMove()>=0&&v.enemyMove({bestPos:m.getLastCompMove(),bestK:m.matrix_result[m.getLastCompMove()]-1,result:0}),v.meMove(m.matrix_result)))}function p(){g(m.tryMove(),m.isCurrentRed())}function h(){!function(e,t,n){for(let n=0;n<e.matrix_result.length;n++){const s=t.childNodes[n],r=e.matrix_result[n];s.textContent=r.toString(),s.className=r?"cell disabled":"cell hole",e.getActivePosition()===n&&(s.classList.add("active"),e.isCurrentRed()?s.classList.add("comp"):s.classList.add("player")),e.comp_moves[n]&&s.classList.add("comp"),e.player_moves[n]&&s.classList.add("player"),e.isLastMove(n)&&s.classList.add("last"),e.isBestPosition(n)&&s.classList.add("best")}const s=e.getDigits();for(let t=0;t<e.matrix_result.length;t++){const r=n.childNodes[t],i=s[t],o=t+1;r.textContent=o.toString(),r.className="digit",i&&r.classList.add("disabled"),e.getActiveDigitIndex()===t&&(r.classList.add("active"),e.isCurrentRed()?r.classList.add("comp"):r.classList.add("player")),t===e.matrix_result[e.getLastCompMove()]-1&&r.classList.add("comp"),t===e.matrix_result[e.getLastUserMove()]-1&&r.classList.add("player"),e.isBestDigit(t)&&r.classList.add("best")}}(m,o,a)}function b(e,t,n){for(let s=0;s<e;s++){const e=r.createElement("div");e.className=t,n.appendChild(e)}}return b(m.matrix_result.length,"cell",o),b(m.matrix_result.length,"digit",a),o.addEventListener("click",(function(e){m.setActivePosition(s(e,o)),p()}),!1),a.addEventListener("click",(function(e){m.setActiveDigitIndex(s(e,a)),p()}),!1),c.addEventListener("click",(function(e){e.preventDefault(),l.classList.remove("show")}),!1),g(!0,m.isCurrentRed()),{guess:()=>v.aiHint(m.matrix_result),forceAiMove:()=>v.aiMove(m.matrix_result),on:function(e,t){v[e]=t},aiMove:function(e){g(m.onAiMove(e),m.isCurrentRed())},aiHint:function(e){m.onAiHint(e),h()},getSolver:function(){return f}}}var o=r(21);!function(e,t,n){"loading"!==n.readyState?e(t,n):n.addEventListener("DOMContentLoaded",(function(s){e(t,n)}))}((function(t,n){if((0,o.Bk)(t,n,e),e.startRed="red"===e.color,"net"===e.currentMode)r.e(547).then(r.bind(r,547)).then((s=>{s.default(t,n,e,i)}));else{const s=i(0,n,e);"ai"===e.currentMode?r.e(154).then(r.bind(r,154)).then((t=>{const n=t.default(s.getSolver());s.on("aiMove",(e=>n.makeMove(e,s.aiMove))),s.on("aiHint",(e=>n.makeMove(e,s.aiHint))),e.startRed&&s.forceAiMove()})):e.currentMode,t.gameObj=s}}),window,document),"serviceWorker"in navigator&&(navigator.serviceWorker.register("./sw.js",{scope:"./"}),function(e,t){const n=t.querySelector(".butInstall");let s;n.addEventListener("click",(e=>{n.classList.add("hidden"),s.prompt(),s.userChoice.then((e=>{}))})),e.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),s=e,n.classList.remove("hidden")}))}(window,document))})()})();