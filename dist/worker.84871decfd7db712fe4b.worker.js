(()=>{const e=new Promise((e=>{WebAssembly.instantiateStreaming(fetch("determinant.wasm")).then((s=>{e(s.instance.exports.solve_matrix_web)}))}));self.addEventListener("message",(function(s){const t=s.data.input,a=s.data.label;isNaN(t)?postMessage("Please send a number"):e.then((e=>{const s=e(t);postMessage({result:s,label:a})}))}),!1)})();