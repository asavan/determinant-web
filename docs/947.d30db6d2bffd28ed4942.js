"use strict";(self.webpackChunkdeterminant_web=self.webpackChunkdeterminant_web||[]).push([[947],{947:(t,e,n)=>{n.r(e),n.d(e,{default:()=>i});let r=null;try{r=new Worker(new URL(n.p+n.u(987),n.b))}catch(t){}function i(t){let e=null;const n={};function i(t,n){const r=new Date;let i=0;if(e){const t=r-e;i=Math.max(700-t,0)}setTimeout((()=>n(t)),i)}if(r){const e=function(e){const r=t.int_to_result(e.data.result),s=n[e.data.label];delete n[e.data.label],i(r,s)};r.addEventListener("message",e,!1)}return{makeMove:function(s,l){const o=t.fill_digits(s,[]);if(e=new Date,o===s.length){return i({result:t.determinant(s),bestK:-1,bestPos:-1},l),e}if(0===o&&3===t.getSize()){return i({result:40,bestK:4,bestPos:((t,e)=>{let n=t+Math.random()*(e-t);return Math.floor(n)})(0,s.length)},l),e}if(3===t.getSize()&&r){const e=t.matrix_to_int(s),i=(new Date).toISOString();n[i]=l,r.postMessage({input:e,label:i})}else{const e=function(t){const e=t.getSizeSqr(),n=t=>t%2==0,r=function(i,s,l,o,a){if(l===e)return t.determinant(i);let u=0;for(let t=0;t<e;++t)if(!s[t]){if(++u,2===u&&l===e-2)break;s[t]=!0;for(let u=0;u<e;++u){if(0!==i[u])continue;i[u]=t+1;const e=r(i,s,l+1,o,a);if(n(l)?a<e&&(a=e):o>e&&(o=e),i[u]=0,!n(l)&&e<=a||n(l)&&e>=o)return s[t]=!1,e}s[t]=!1}return n(l)?a:o};return{solve_matrix_flat:function(i){let s=-1,l=-1;const o=[];t.copy_matrix(i,o);const a=[],u=t.fill_digits(o,a);let f=500,c=-500;const b=n(u);u===e&&(f=r(o,a,u,f,c),s=-1,l=-1);for(let t=0;t<e;++t)if(!a[t]){a[t]=!0;for(let n=0;n<e;++n){if(0!==o[n])continue;let e=!1;o[n]=t+1;const i=r(o,a,u+1,f,c);b?c<i&&(c=i,e=!0):f>i&&(f=i,e=!0),e&&(l=n,s=t),o[n]=0}a[t]=!1}return{result:b?c:f,bestK:s,bestPos:l}}}}(t);i(e.solve_matrix_flat(s),l)}return e}}}}}]);