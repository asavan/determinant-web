"use strict";(self.webpackChunkdeterminant_web=self.webpackChunkdeterminant_web||[]).push([[996],{996:(e,o,t)=>{t.r(o),t.d(o,{default:()=>i});var n=t(34),r=t(293);function s(e,o){const t={method:o};return t[o]=e,JSON.stringify(t)}const c={parser:function(e,o,t){const n=JSON.parse(e),r=n[n.method];return n.method===o&&t(r),r},toMove:function(e){return s(e,"move")},toObjJson:s};const a=function(e){return{playerMove:o=>{e.aiMove(o)}}};var h=t(363);function i(e,o,t,s){return new Promise(((i,u)=>{const f=(0,n.Z)(t),l=t.color,m=t.sh||e.location.href;f.on("socket_open",(()=>{const t=e.location.search,n=new URLSearchParams(t),s=new URL(m);s.search=n,s.searchParams.delete("wh"),s.searchParams.delete("sh"),s.searchParams.set("color",f.getOtherColor(l)),s.searchParams.set("currentMode","net");const c=(0,r.Z)(s.toString(),o.querySelector(".qrcode"));f.on("socket_close",(()=>{(0,h.ew)(c)}))}));try{f.connect(e.location.hostname)}catch(e){u(e)}f.on("open",(()=>{const n=s(e,o,t),r=a(n);f.on("recv",(e=>{for(const[o,t]of Object.entries(r))c.parser(e,o,t)}));for(const[e]of Object.entries(r))n.on(e,(o=>f.sendMessage(c.toObjJson(o,e))));i(n)}))}))}}}]);