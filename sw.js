if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}}))).then((e=>{const r=n(...e);return s.default||(s.default=r),s}))})))}}define("./sw.js",["./workbox-15dd0bab"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./dist/../index.html",revision:"0bc948b31cd9001d579fe264cb9705c5"},{url:"./dist/154.bff2089db7c3a0c405a6.js",revision:null},{url:"./dist/547.333cc2207b9793b97f1d.js",revision:null},{url:"./dist/determinant.wasm",revision:"af48d066e2dc9e1079bed7b7971a219d"},{url:"./dist/main.3b4610389b11a1b2e8f8.css",revision:null},{url:"./dist/main.f94575a127c7ee8c206c.js",revision:null},{url:"./dist/worker.84871decfd7db712fe4b.worker.js",revision:null}],{})}));
