if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,d)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const t={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return t;default:return e(r)}})).then(e=>{const r=d(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./dist/../index.html",revision:"1be5f218c8cfd03b5d110e0436ddd7b3"},{url:"./dist/1.3333cba024605977e5da.js",revision:"7f8561f0d29003d7eb24d8929aaacd46"},{url:"./dist/2.aa24236b650046f3cdf2.js",revision:"be5cf34bda784fd56667b3f684ea4ff8"},{url:"./dist/determinant.wasm",revision:"af48d066e2dc9e1079bed7b7971a219d"},{url:"./dist/main.3ef2dc6285221b9350d0.css",revision:"b7be0c11a658eae38f3e9a9498bc9322"},{url:"./dist/main.5923a3121f969efcb537.js",revision:"72fe00520a71f96117bb54d53eb3800f"},{url:"./dist/main.c986d976978ec7e9782c.worker.js",revision:"0ca2eb5ed1f64eebdfbf2ef36fb0e34b"}],{})}));
