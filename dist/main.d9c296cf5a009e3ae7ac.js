!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./dist/",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);var r={modes:["net","fake","ai","hotseat","netOrAi","server"],currentMode:"ai",debug:!0,wsPort:8088,negotiatedId:3,startRed:!1,color:"blue",size:3};function o(t,e){let n=e.startRed,r=-1,o=-1,i=-1,s=-1,a=-1,u=-1,l=0,c=0;const f=Array(t.getSizeSqr()).fill(0),d=Array(t.getSizeSqr()).fill(!1),h=Array(t.getSizeSqr()).fill(!1),g=Array(t.getSizeSqr()).fill(!1);const m=()=>{if(l)return l;const e=[];t.copy_matrix(f,e),t.fill_matrix(e);const n=t.determinant(e);return l=n,n},v=function(e,l){const m=function(e,n,l){return!(e<0)&&(!(n<0)&&(0===f[e]&&(f[e]=n+1,l?(h[e]=!0,i=e):(d[e]=!0,s=e),c=t.fill_digits(f,g),r=-1,o=-1,u=-1,a=-1,!0)))}(e,l,n);return m&&(n=!n),m},p=()=>o,w=()=>r;return{matrix_result:f,player_moves:d,comp_moves:h,getLastCompMove:()=>i,getLastUserMove:()=>s,isLastMove:t=>i===t||s===t,getResult:m,getActiveDigitIndex:p,setActiveDigitIndex:function(t){n&&"hotseat"!==e.currentMode||(o=t>=0&&g[t]?-1:t)},getActivePosition:w,setActivePosition:function(t){n&&"hotseat"!==e.currentMode||(r=t>=0&&f[t]>0?-1:t)},onAiMove:function(t){return l=t.result,v(t.bestPos,t.bestK)},onAiHint:function(t){l=t.result,u=t.bestPos,a=t.bestK},getDigits:()=>g,getStep:()=>c,isWin:t=>m()>0!==t,lessThanTwoMoves:()=>c+2>f.length,tryMove:function(){return v(w(),p())},isCurrentRed:()=>n,isBestDigit:t=>a===t,isBestPosition:t=>u===t}}function i(){}const s=function(t,e){if(t.preventDefault(),t.target.classList.contains("cell")||t.target.classList.contains("digit"))return function(t,e){const n=t.target||t.srcElement;for(let t=0;t<e.children.length;t++)if(e.children[t]===n)return t;return-1}(t,e)};function a(t,e,n){const r=e.getElementsByClassName("box")[0],a=e.getElementsByClassName("digits")[0],u=e.getElementsByClassName("overlay")[0],l=e.getElementsByClassName("close")[0],c=e.getElementsByClassName("install")[0];if(3!==n.size){e.documentElement.style.setProperty("--field-size",n.size)}const f=n.startRed,d=function(t){const e=t*t;function n(t,n){let r=0;for(let o=0;o<e;++o){const e=t[o];if(e>0){++r,n[e-1]=!0}}return r}return{fill_digits:n,fill_matrix:function(t){const e=[];let r=n(t,e);for(let n=0,o=0;n<t.length&&o<e.length;++n,++o){for(;0!==t[n];)if(++n,n>=t.length)return r;for(;e[o];)if(++o,o>=e.length)return r;n<t.length&&(t[n]=o+1,e[o]=!0,++r)}return r},matrix_to_int:function(t){let n=0;for(let r=0;r<e;++r)n*=10,n+=t[r];return n},copy_matrix:(t,e)=>{for(let n=0;n<t.length;++n)e[n]=t[n]},int_to_result:function(t){const e=t<0?-1:1,n=(t*=e)%10;t-=n;const r=(t/=10)%10;t-=r;return{result:e*(t/=10),bestK:r,bestPos:n}},determinant:function(n){return 3===t?(t=>t[0]*t[4]*t[8]+t[6]*t[1]*t[5]+t[3]*t[7]*t[2]-t[2]*t[4]*t[6]-t[1]*t[3]*t[8]-t[0]*t[5]*t[7])(n):2===t?(t=>t[0]*t[3]-t[1]*t[2])(n):e},getSize:()=>t,getSizeSqr:()=>e}}(n.size),h=o(d,n),g={playerMove:i,enemyMove:i,meMove:i,aiMove:i,aiHint:i,gameover:i};function m(t,e){p(),t&&(h.lessThanTwoMoves()&&function(){const t=h.isWin(f)?"You win":"You lose";u.querySelector("h2").textContent=t,u.querySelector(".content").textContent="Determinant =  "+h.getResult(),u.classList.add("show"),c.classList.remove("hidden2"),g.gameover(h.isWin(f))}(),e?(h.getLastUserMove()>=0&&g.playerMove({bestPos:h.getLastUserMove(),bestK:h.matrix_result[h.getLastUserMove()]-1,result:0}),g.aiMove(h.matrix_result)):(h.getLastCompMove()>=0&&g.enemyMove({bestPos:h.getLastCompMove(),bestK:h.matrix_result[h.getLastCompMove()]-1,result:0}),g.meMove(h.matrix_result)))}function v(){m(h.tryMove(),h.isCurrentRed())}function p(){!function(t,e,n){for(let n=0;n<t.matrix_result.length;n++){const r=e.childNodes[n],o=t.matrix_result[n];r.textContent=o.toString(),r.className=o?"cell disabled":"cell hole",t.getActivePosition()===n&&(r.classList.add("active"),t.isCurrentRed()?r.classList.add("comp"):r.classList.add("player")),t.comp_moves[n]&&r.classList.add("comp"),t.player_moves[n]&&r.classList.add("player"),t.isLastMove(n)&&r.classList.add("last"),t.isBestPosition(n)&&r.classList.add("best")}const r=t.getDigits();for(let e=0;e<t.matrix_result.length;e++){const o=n.childNodes[e],i=r[e],s=e+1;o.textContent=s.toString(),o.className="digit",i&&o.classList.add("disabled"),t.getActiveDigitIndex()===e&&(o.classList.add("active"),t.isCurrentRed()?o.classList.add("comp"):o.classList.add("player")),e===t.matrix_result[t.getLastCompMove()]-1&&o.classList.add("comp"),e===t.matrix_result[t.getLastUserMove()]-1&&o.classList.add("player"),t.isBestDigit(e)&&o.classList.add("best")}}(h,r,a)}function w(t,n,r){for(let o=0;o<t;o++){const t=e.createElement("div");t.className=n,r.appendChild(t)}}return w(h.matrix_result.length,"cell",r),w(h.matrix_result.length,"digit",a),r.addEventListener("click",(function(t){h.setActivePosition(s(t,r)),v()}),!1),a.addEventListener("click",(function(t){h.setActiveDigitIndex(s(t,a)),v()}),!1),l.addEventListener("click",(function(t){t.preventDefault(),u.classList.remove("show")}),!1),m(!0,h.isCurrentRed()),{guess:()=>g.aiHint(h.matrix_result),on:function(t,e){g[t]=e},aiMove:function(t){m(h.onAiMove(t),h.isCurrentRed())},aiHint:function(t){h.onAiHint(t),p()},getSolver:function(){return d}}}let u=new function(){return new Worker(n.p+"main.c986d976978ec7e9782c.worker.js")};function l(t){let e=null;const n={};function r(t,n){const r=new Date;let o=0;if(e){const t=r-e;o=Math.max(700-t,0)}setTimeout(()=>n(t),o)}return u.addEventListener("message",(function(e){const o=t.int_to_result(e.data.result),i=n[e.data.label];delete n[e.data.label],r(o,i)}),!1),{makeMove:function(o,i){const s=t.fill_digits(o,[]);if(e=new Date,s===o.length){return r({result:t.determinant(o),bestK:-1,bestPos:-1},i),e}if(0===s&&3===t.getSize()){return r({result:40,bestK:4,bestPos:((t,e)=>{let n=t+Math.random()*(e-t);return Math.floor(n)})(0,o.length)},i),e}if(3===t.getSize()){const e=t.matrix_to_int(o),r=(new Date).toISOString();n[r]=i,u.postMessage({input:e,label:r})}else if(2===t.getSize()){const e=function(t){const e=t.getSizeSqr();let n=-1,r=-1;const o=t=>t%2==0,i=function(n,r,s,a,u){if(s===e)return t.determinant(n);let l=0;for(let t=0;t<e;++t)if(!r[t]){if(++l,2===l&&s===e-2)break;r[t]=!0;for(let l=0;l<e;++l){if(0!==n[l])continue;n[l]=t+1;const e=i(n,r,s+1,a,u);if(o(s)?u<e&&(u=e):a>e&&(a=e),n[l]=0,!o(s)&&e<=u||o(s)&&e>=a)return r[t]=!1,e}r[t]=!1}return o(s)?u:a};return{solve_matrix_flat:function(s){const a=[];t.copy_matrix(s,a);const u=[];let l=t.fill_digits(a,u),c=500,f=-500;const d=o(l);l===e&&(c=i(a,u,l,c,f),n=-1,r=-1);for(let t=0;t<e;++t)if(!u[t]){u[t]=!0;for(let o=0;o<e;++o){if(0!==a[o])continue;let e=!1;a[o]=t+1;const s=i(a,u,l+1,c,f);d?f<s&&(f=s,e=!0):c>s&&(c=s,e=!0),e&&(r=o,n=t),a[o]=0}u[t]=!1}return{result:d?f:c,bestK:n,bestPos:r}}}}(t);r(e.solve_matrix_flat(o),i)}return e}}}const c=["blue","red"];function f(t){}var d=function(t){let e=null,n="",r="";const o={recv:f,open:f,socket_open:f,socket_close:f};function i(t){for(const e of c)if(t!==e)return e;return""}let s=null,a=!1;function u(e){const n=new RTCPeerConnection;return n.onicecandidate=function(t){n&&t&&t.candidate&&l("candidate",t.candidate,e)},s=n.createDataChannel("my channel",{negotiated:!0,id:t.negotiatedId}),s.onmessage=function(t){o.recv(t.data)},s.onopen=function(){a=!0,e.close(),o.open()},s.onclose=function(){a=!1},s.onerror=function(){},n}function l(t,e,o){const i={from:n,to:r,action:t,data:e};return o.send(JSON.stringify(i))}return{connect:function(t,s){e=new WebSocket(t);let a=null;e.onopen=function(t){o.socket_open(),n=s,r=i(s),l("connected",{color:n},e)},e.onclose=function(t){o.socket_close()},e.onmessage=function(t){const o=JSON.parse(t.data);o.from!==n&&("candidate"===o.action?function(t,e){e.addIceCandidate(new RTCIceCandidate(t)).catch(t=>{})}(o.data,a):"offer"===o.action?(r=o.from,a=function(t){const n=u(e);return n.setRemoteDescription(t).then(()=>n.createAnswer()).then(t=>n.setLocalDescription(t)).then(()=>l("answer",n.localDescription,e)).catch(t=>{}),n}(o.data)):"answer"===o.action?function(t,e){e.setRemoteDescription(new RTCSessionDescription(t))}(o.data,a):"connected"===o.action&&(a=function(){const t=u(e);return t.createOffer({offerToReceiveAudio:!1,offerToReceiveVideo:!1}).then(e=>t.setLocalDescription(e)).then(()=>{l("offer",t.localDescription,e)}).catch(t=>{}),t}()))},e.onerror=function(t){}},sendMessage:function(t){return!!s&&(!!a&&(s.send(t),a))},on:function(t,e){o[t]=e},getWebSocketUrl:function(e,n){return"https:"===window.location.protocol?null:e?"ws://"+e:"ws://"+n+":"+t.wsPort},getOtherColor:i}};function h(t){this.mode=m.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,n=this.data.length;e<n;e++){var r=[],o=this.data.charCodeAt(e);o>65536?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):o>2048?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):o>128?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function g(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}h.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,n=this.parsedData.length;e<n;e++)t.put(this.parsedData[e],8)}},g.prototype={addData:function(t){var e=new h(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=g.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=A.getLostPoint(this);(0==n||t>r)&&(t=r,e=n)}return e},createMovieClip:function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,s=0;s<this.modules[o].length;s++){var a=1*s;this.modules[o][s]&&(r.beginFill(0,100),r.moveTo(a,i),r.lineTo(a+1,i),r.lineTo(a+1,i+1),r.lineTo(a,i+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=A.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],o=t[n];if(null==this.modules[r][o])for(var i=-2;i<=2;i++)for(var s=-2;s<=2;s++)this.modules[r+i][o+s]=-2==i||2==i||-2==s||2==s||0==i&&0==s}},setupTypeNumber:function(t){for(var e=A.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++){r=!t&&1==(e>>n&1);this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r}},setupTypeInfo:function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=A.getBCHTypeInfo(n),o=0;o<15;o++){var i=!t&&1==(r>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++){i=!t&&1==(r>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var n=-1,r=this.moduleCount-1,o=7,i=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var a=0;a<2;a++)if(null==this.modules[r][s-a]){var u=!1;i<t.length&&(u=1==(t[i]>>>o&1)),A.getMask(e,r,s-a)&&(u=!u),this.modules[r][s-a]=u,-1==--o&&(i++,o=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},g.PAD0=236,g.PAD1=17,g.createData=function(t,e,n){for(var r=T.getRSBlocks(t,e),o=new S,i=0;i<n.length;i++){var s=n[i];o.put(s.mode,4),o.put(s.getLength(),A.getLengthInBits(s.mode,t)),s.write(o)}var a=0;for(i=0;i<r.length;i++)a+=r[i].dataCount;if(o.getLengthInBits()>8*a)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*a+")");for(o.getLengthInBits()+4<=8*a&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*a||(o.put(g.PAD0,8),o.getLengthInBits()>=8*a));)o.put(g.PAD1,8);return g.createBytes(o,r)},g.createBytes=function(t,e){for(var n=0,r=0,o=0,i=new Array(e.length),s=new Array(e.length),a=0;a<e.length;a++){var u=e[a].dataCount,l=e[a].totalCount-u;r=Math.max(r,u),o=Math.max(o,l),i[a]=new Array(u);for(var c=0;c<i[a].length;c++)i[a][c]=255&t.buffer[c+n];n+=u;var f=A.getErrorCorrectPolynomial(l),d=new x(i[a],f.getLength()-1).mod(f);s[a]=new Array(f.getLength()-1);for(c=0;c<s[a].length;c++){var h=c+d.getLength()-s[a].length;s[a][c]=h>=0?d.get(h):0}}var g=0;for(c=0;c<e.length;c++)g+=e[c].totalCount;var m=new Array(g),v=0;for(c=0;c<r;c++)for(a=0;a<e.length;a++)c<i[a].length&&(m[v++]=i[a][c]);for(c=0;c<o;c++)for(a=0;a<e.length;a++)c<s[a].length&&(m[v++]=s[a][c]);return m};for(var m={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},v=1,p=0,w=3,L=2,y=0,M=1,b=2,_=3,E=4,C=5,D=6,B=7,A={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;A.getBCHDigit(e)-A.getBCHDigit(A.G15)>=0;)e^=A.G15<<A.getBCHDigit(e)-A.getBCHDigit(A.G15);return(t<<10|e)^A.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;A.getBCHDigit(e)-A.getBCHDigit(A.G18)>=0;)e^=A.G18<<A.getBCHDigit(e)-A.getBCHDigit(A.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return A.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case y:return(e+n)%2==0;case M:return e%2==0;case b:return n%3==0;case _:return(e+n)%3==0;case E:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case C:return e*n%2+e*n%3==0;case D:return(e*n%2+e*n%3)%2==0;case B:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new x([1],0),n=0;n<t;n++)e=e.multiply(new x([1,P.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case m.MODE_NUMBER:return 10;case m.MODE_ALPHA_NUM:return 9;case m.MODE_8BIT_BYTE:case m.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case m.MODE_NUMBER:return 12;case m.MODE_ALPHA_NUM:return 11;case m.MODE_8BIT_BYTE:return 16;case m.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case m.MODE_NUMBER:return 14;case m.MODE_ALPHA_NUM:return 13;case m.MODE_8BIT_BYTE:return 16;case m.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var o=0;o<e;o++){for(var i=0,s=t.isDark(r,o),a=-1;a<=1;a++)if(!(r+a<0||e<=r+a))for(var u=-1;u<=1;u++)o+u<0||e<=o+u||0==a&&0==u||s==t.isDark(r+a,o+u)&&i++;i>5&&(n+=3+i-5)}for(r=0;r<e-1;r++)for(o=0;o<e-1;o++){var l=0;t.isDark(r,o)&&l++,t.isDark(r+1,o)&&l++,t.isDark(r,o+1)&&l++,t.isDark(r+1,o+1)&&l++,0!=l&&4!=l||(n+=3)}for(r=0;r<e;r++)for(o=0;o<e-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(n+=40);for(o=0;o<e;o++)for(r=0;r<e-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(n+=40);var c=0;for(o=0;o<e;o++)for(r=0;r<e;r++)t.isDark(r,o)&&c++;return n+=10*(Math.abs(100*c/e/e-50)/5)}},P={glog:function(t){if(t<1)throw new Error("glog("+t+")");return P.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return P.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},k=0;k<8;k++)P.EXP_TABLE[k]=1<<k;for(k=8;k<256;k++)P.EXP_TABLE[k]=P.EXP_TABLE[k-4]^P.EXP_TABLE[k-5]^P.EXP_TABLE[k-6]^P.EXP_TABLE[k-8];for(k=0;k<255;k++)P.LOG_TABLE[P.EXP_TABLE[k]]=k;function x(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&0==t[n];)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}function T(t,e){this.totalCount=t,this.dataCount=e}function S(){this.buffer=[],this.length=0}x.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<t.getLength();r++)e[n+r]^=P.gexp(P.glog(this.get(n))+P.glog(t.get(r)));return new x(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=P.glog(this.get(0))-P.glog(t.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<t.getLength();r++)n[r]^=P.gexp(P.glog(t.get(r))+e);return new x(n,0).mod(t)}},T.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],T.getRSBlocks=function(t,e){var n=T.getRsBlockTable(t,e);if(null==n)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=n.length/3,o=[],i=0;i<r;i++)for(var s=n[3*i+0],a=n[3*i+1],u=n[3*i+2],l=0;l<s;l++)o.push(new T(a,u));return o},T.getRsBlockTable=function(t,e){switch(e){case v:return T.RS_BLOCK_TABLE[4*(t-1)+0];case p:return T.RS_BLOCK_TABLE[4*(t-1)+1];case w:return T.RS_BLOCK_TABLE[4*(t-1)+2];case L:return T.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},S.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var N=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function O(t){if(this.options={padding:4,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},"string"==typeof t&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if("string"!=typeof this.options.content)throw new Error("Expected 'content' as string!");if(0===this.options.content.length)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var n=this.options.content,r=function(t,e){for(var n=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),r=1,o=0,i=0,s=N.length;i<=s;i++){var a=N[i];if(!a)throw new Error("Content too long: expected "+o+" but got "+n);switch(e){case"L":o=a[0];break;case"M":o=a[1];break;case"Q":o=a[2];break;case"H":o=a[3];break;default:throw new Error("Unknwon error correction level: "+e)}if(n<=o)break;r++}if(r>N.length)throw new Error("Content too long");return r}(n,this.options.ecl),o=function(t){switch(t){case"L":return v;case"M":return p;case"Q":return w;case"H":return L;default:throw new Error("Unknwon error correction level: "+t)}}(this.options.ecl);this.qrcode=new g(r,o),this.qrcode.addData(n),this.qrcode.make()}O.prototype.svg=function(t){var e=this.options||{},n=this.qrcode.modules;void 0===t&&(t={container:e.container||"svg"});for(var r=void 0===e.pretty||!!e.pretty,o=r?"  ":"",i=r?"\r\n":"",s=e.width,a=e.height,u=n.length,l=s/(u+2*e.padding),c=a/(u+2*e.padding),f=void 0!==e.join&&!!e.join,d=void 0!==e.swap&&!!e.swap,h=void 0===e.xmlDeclaration||!!e.xmlDeclaration,g=void 0!==e.predefined&&!!e.predefined,m=g?o+'<defs><path id="qrmodule" d="M0 0 h'+c+" v"+l+' H0 z" style="fill:'+e.color+';shape-rendering:crispEdges;" /></defs>'+i:"",v=o+'<rect x="0" y="0" width="'+s+'" height="'+a+'" style="fill:'+e.background+';shape-rendering:crispEdges;"/>'+i,p="",w="",L=0;L<u;L++)for(var y=0;y<u;y++){if(n[y][L]){var M=y*l+e.padding*l,b=L*c+e.padding*c;if(d){var _=M;M=b,b=_}if(f){var E=l+M,C=c+b;M=Number.isInteger(M)?Number(M):M.toFixed(2),b=Number.isInteger(b)?Number(b):b.toFixed(2),E=Number.isInteger(E)?Number(E):E.toFixed(2),w+="M"+M+","+b+" V"+(C=Number.isInteger(C)?Number(C):C.toFixed(2))+" H"+E+" V"+b+" H"+M+" Z "}else p+=g?o+'<use x="'+M.toString()+'" y="'+b.toString()+'" href="#qrmodule" />'+i:o+'<rect x="'+M.toString()+'" y="'+b.toString()+'" width="'+l+'" height="'+c+'" style="fill:'+e.color+';shape-rendering:crispEdges;"/>'+i}}f&&(p=o+'<path x="0" y="0" style="fill:'+e.color+';shape-rendering:crispEdges;" d="'+w+'" />');var D="";switch(t.container){case"svg":h&&(D+='<?xml version="1.0" standalone="yes"?>'+i),D+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+s+'" height="'+a+'">'+i,D+=m+v+p,D+="</svg>";break;case"svg-viewbox":h&&(D+='<?xml version="1.0" standalone="yes"?>'+i),D+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+s+" "+a+'">'+i,D+=m+v+p,D+="</svg>";break;case"g":D+='<g width="'+s+'" height="'+a+'">'+i,D+=m+v+p,D+="</g>";break;default:D+=(m+v+p).replace(/^\s+/,"")}return D};var I=function(t,e){const n=new O({content:t,container:"svg-viewbox",join:!0}).svg();var r;return e.innerHTML=n,(r=e).addEventListener("click",()=>r.classList.toggle("big")),e};var R={parser:function(t,e,n){const r=JSON.parse(t),o=r[r.method];return r.method===e&&n(o),o},toMove:function(t){return function(t,e){const n={method:e};return n[e]=t,JSON.stringify(n)}(t,"move")}};!function(){const t=document.createElement("canvas"),e=document.getElementById("favicon");t.height=t.width=16;const n=t.getContext("2d");n.fillStyle="#000"}();!function(t,e,n){"loading"!==n.readyState?t(e,n):n.addEventListener("DOMContentLoaded",(function(r){t(e,n)}))}((function(t,e){const n=t.location.search,o=new URLSearchParams(n),i="red"===(o.get("color")||"blue");r.startRed=i,r.size=o.get("size")?parseInt(o.get("size"),10):r.size,r.currentMode=o.get("currentMode")||r.currentMode;const s=a(0,e,r);if("ai"===r.currentMode){const t=l(s.getSolver());s.on("aiMove",e=>t.makeMove(e,s.aiMove)),s.on("aiHint",e=>t.makeMove(e,s.aiHint))}else"hotseat"===r.currentMode||"net"===r.currentMode&&function(t,e,n,r,o){const i=d(n),s=r.get("color")||"blue",a=t.location.hostname,u=i.getWebSocketUrl(r.get("wh"),a);let l=r.get("sh")||t.location.href,c=null;i.on("socket_open",()=>{const t=new URL(l);t.searchParams.set("color",i.getOtherColor(s)),c=I(t.toString(),e.querySelector(".qrcode"))}),i.on("socket_close",()=>{var t;(t=c)&&t.remove()});try{i.connect(u,s)}catch(t){}i.on("open",()=>{}),i.on("recv",t=>{R.parser(t,"move",t=>{o.aiMove(t)})}),o.on("playerMove",t=>i.sendMessage(R.toMove(t)))}(t,e,r,o,s);t.gameObj=s}),window,document),"serviceWorker"in navigator&&(navigator.serviceWorker.register("./sw.js",{scope:"./"}),function(t,e){const n=e.querySelector(".butInstall");let r;n.addEventListener("click",t=>{n.classList.add("hidden"),r.prompt(),r.userChoice.then(t=>{})}),t.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),r=t,n.classList.remove("hidden")})}(window,document))}]);