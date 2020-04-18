"use strict"; // jshint ;_;
function game(window, document) {

    //Constants

    const determinant = function (a) {
        return a[0] * a[4] * a[8] +
            a[6] * a[1] * a[5] +
            a[3] * a[7] * a[2]
            - a[2] * a[4] * a[6]
            - a[1] * a[3] * a[8]
            - a[0] * a[5] * a[7];
    };


    let activeCell = null;
    let activeCellIndex = -1;
    let activeDigit = null;
    let activeDigitIndex = -1;
    const animationTime = 100;
    const size = 3;
    const size_sqr = size * size;
    const INF = 500;
    const MINUS_INF = -500;
    const matrix_result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let bestK = -1;
    let bestPos = -1;

    const is_first = function (step) {
        return step % 2 === 0;
    };

    const copy_matrix = function(src, dst) {
        for (let i = 0; i < size_sqr; ++i) {
            dst[i] = src[i];
        }
    };

    const who_wins = function (matrix, digits, step, best1, best2, need_push_result) {

        if (step === size_sqr) {
            return determinant(matrix);
        }

        for (let k = 0; k < size_sqr; ++k) {
            if (digits[k]) {
                continue;
            }
            digits[k] = true;
            const end = step === 1 ? 6 : size_sqr;
            for (let i = 0; i < end; ++i) {
                if (matrix[i] !== 0) {
                    continue;
                }
                let save_result = false;
                matrix[i] = k + 1;
                const res = who_wins(matrix, digits, step + 1, best1, best2, false);


                if (is_first(step)) {
                    if (best2 < res) {
                        best2 = res;
                        save_result = need_push_result;
                    }
                }
                else {
                    if (best1 > res) {
                        best1 = res;
                        save_result = need_push_result;
                    }
                }

                if (save_result) {
                    copy_matrix(matrix, matrix_result);
                    bestPos = i;
                    bestK = k;
                }

                matrix[i] = 0;

                if ((!is_first(step) && res <= best2) || (is_first(step) && res >= best1)) {
                    digits[k] = false;
                    return res;
                }

            }
            digits[k] = false;
        }
        return is_first(step) ? best2 : best1;
    };

    function fill_digits(matrix, digits) {
        let step = 0;
        for (let i = 0; i < size_sqr; ++i) {
            const value = matrix[i];
            if (value > 0) {
                ++step;
                let index = value - 1;
                digits[index] = true;
            }
        }
        return step;
    }

    const solve_matrix_flat = function (matrix_) {

        const matrix = [];
        copy_matrix(matrix_, matrix);

        const digits_local = [];
        let step = fill_digits(matrix, digits_local);

        return who_wins(matrix, digits_local, step, INF, MINUS_INF, true);
    };

    const getIndex = function(e, parent) {
        const target = e.target || e.srcElement;
        for(let i = 0; i < parent.children.length; i++) {
            if(parent.children[i] === target) return i;
        }
        return -1;
    };

    const handleClick = function (evt, activeCell, parent) {
        evt.preventDefault();
        // console.log(evt.target)
        if (!evt.target.classList.contains('cell')) {
            return;
        }
        return getIndex(evt, parent);
    };

    function doStep() {
        if (activeCellIndex >= 0 && activeDigitIndex >= 0) {
            if (matrix_result[activeCellIndex] > 0) {
                activeCellIndex = -1;
                activeCell = null;
                drawWithAnimation();
                return;
            }
            const digits_local = [];
            const step = fill_digits(matrix_result, digits_local);
            if (digits_local[activeDigitIndex]) {
                activeDigitIndex = -1;
                activeDigit = null;
                drawWithAnimation();
                return;
            }

            matrix_result[activeCellIndex] = activeDigitIndex + 1;
            drawWithAnimation();
            setTimeout(function() {
                bestPos = activeCellIndex;
                bestK = activeDigitIndex;
                const result = solve_matrix_flat(matrix_result);

                activeCellIndex = -1;
                activeDigitIndex = -1;
                activeCell = null;
                activeDigit = null;
                drawWithAnimation();
                if (step > 5) {
                    let message = result > 0 ? "You win" : "You lose";
                    message += " " + result;
                    setTimeout(function () {
                        alert(message);
                    }, 300);
                }
            }, 100);
        } else {
            drawWithAnimation();
        }
    }

    const handleBox = function (evt) {
        activeCellIndex = handleClick(evt, activeCell, box);
        doStep();
    };

    const handleClickDigits = function (evt) {
        activeDigitIndex = handleClick(evt, activeDigit, digits);
        doStep();
    };

    function log(msg) {
        let p = document.getElementById('log');
        if (!p) {
            p = document.body.appendChild(document.createElement('div'));
            p.setAttribute("id", "log");
        }
        p.innerHTML = msg + "\n" + p.innerHTML;
        console.log(msg)
    }


    function drawWithAnimation() {
        draw();
    }

    const box = document.getElementsByClassName("box")[0];
    const digits = document.getElementsByClassName("digits")[0];

    for (let i = 0; i < size_sqr; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        box.appendChild(cell);
    }

    for (let i = 0; i < size_sqr; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        digits.appendChild(cell);
    }


    const iconChanger = function () {
        const canvas = document.createElement('canvas');
        const link = document.getElementById('favicon');
        if (!link) {
            console.error("Can't find favicon");
        }
        canvas.height = canvas.width = 16; // set the size
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';

        const changeBage = function (num) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(num, 2, 12);
            if (!link) {
                console.log("Can't find favicon");
                return;
            }
            link.href = canvas.toDataURL('image/png');
        };
        return {changeBage: changeBage}
    }();


    function draw() {
        const digits_local = [];
        for (let i = 0; i < size_sqr; i++) {
            const tile = box.childNodes[i];
            const val = matrix_result[i];
            tile.textContent = val.toString();
            tile.style.backgroundColor = "";
            tile.style.transform = "";
            tile.style.transition = "";

            if (val) {
                tile.className = 'cell disabled';
            } else {
                tile.className = 'cell hole';
            }
            if (activeCellIndex === i) {
                tile.classList.add('active');
            }
            if (i === bestPos) {
                tile.classList.add("last");
            }
        }
        fill_digits(matrix_result, digits_local);

        for (let i = 0; i < size_sqr; i++) {
            const tile = digits.childNodes[i];
            const used = digits_local[i];
            const val = i+1;
            tile.textContent = val.toString();
            tile.style.backgroundColor = "";
            tile.style.transform = "";
            tile.style.transition = "";

            if (!used) {
                tile.className = 'cell';
            } else {
                tile.className = 'cell disabled';
            }
            if (activeDigitIndex === i) {
                tile.classList.add('active');
            }
            if (i === bestK) {
                tile.classList.add("last");
            }
        }

    }

    box.addEventListener("click", handleBox, false);
    digits.addEventListener("click", handleClickDigits, false);
    drawWithAnimation();
}

function install(window, document) {
    const btnAdd = document.getElementById('butInstall');
    let deferredPrompt;
    btnAdd.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        // btnAdd.setAttribute('disabled', true);
        btnAdd.classList.add("hidden");
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((resp) => {
            console.log(JSON.stringify(resp));
        });
    });

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-info bar from appearing.
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        // btnAdd.removeAttribute('disabled');
        btnAdd.classList.remove("hidden");
    });
}

(function (window, document) {

    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const isSolved = urlParams.get('solved');
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js', {scope: './'});
            install(window, document);
        }

        game(window, document);
    } catch (e) {
        console.log(e);
    }
})(window, document);
