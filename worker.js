const wasmReady = new Promise((resolve) => {
    WebAssembly.instantiateStreaming(fetch('determinant.wasm'))
        .then(obj => {
            resolve(obj.instance.exports.solve_matrix_web);
        });
});

self.addEventListener('message', function (e) {
    const result = e.data;
    if (isNaN(result)) {
        postMessage('Please send a number');
    } else {
        wasmReady.then((solve_matrix) => {
            const res = solve_matrix(result);
            postMessage(res);
        });
    }
}, false);
