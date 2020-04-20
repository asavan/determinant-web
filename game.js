"use strict"; // jshint ;_;
function game(window, document) {

    //Constants
    const animationTime = 100;
    const size = 3;
    const size_sqr = size * size;


    const solver = function () {
        const INF = 500;
        const MINUS_INF = -500;
        let bestK = -1;
        let bestPos = -1;

        const randomInteger = (min, max) => {
            let rand = min + Math.random() * (max - min);
            return Math.floor(rand);
        };

        const determinant3 = a => {
            return a[0] * a[4] * a[8] +
                a[6] * a[1] * a[5] +
                a[3] * a[7] * a[2]
                - a[2] * a[4] * a[6]
                - a[1] * a[3] * a[8]
                - a[0] * a[5] * a[7];
        };

        const is_first = step => step % 2 === 0;

        const copy_matrix = (src, dst) => {
            for (let i = 0; i < size_sqr; ++i) {
                dst[i] = src[i];
            }
        };

        const who_wins = function (matrix, digits, step, best1, best2) {

            if (step === size_sqr) {
                return determinant3(matrix);
            }

            let digits_count = 0;
            for (let k = 0; k < size_sqr; ++k) {
                if (digits[k]) {
                    continue;
                }

                ++digits_count;
                // TODO check this
                if (digits_count === 2 && step === size_sqr-2) {
                    break;
                }

                digits[k] = true;
                for (let i = 0; i < size_sqr; ++i) {
                    if (matrix[i] !== 0) {
                        continue;
                    }
                    matrix[i] = k + 1;
                    const res = who_wins(matrix, digits, step + 1, best1, best2);


                    if (is_first(step)) {
                        if (best2 < res) {
                            best2 = res;
                        }
                    }
                    else {
                        if (best1 > res) {
                            best1 = res;
                        }
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

            const digits = [];
            let step = fill_digits(matrix, digits);
            let best1 = INF;
            let best2 = MINUS_INF;
            const isFirstStep = is_first(step);
            if (step === size_sqr) {
                best1 = who_wins(matrix, digits, step, best1, best2);
                bestK = -1;
                bestPos = -1;
            }

            if (step === 0) {
                best2 = 40;
                bestK = 4;
                bestPos = randomInteger(0, size_sqr);
                return {result: best2, bestK: bestK, bestPos: bestPos};
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
                    const res = who_wins(matrix, digits, step + 1, best1, best2);


                    if (isFirstStep) {
                        if (best2 < res) {
                            best2 = res;
                            save_result = true;
                        }
                    }
                    else {
                        if (best1 > res) {
                            best1 = res;
                            save_result = true;
                        }
                    }

                    if (save_result) {
                        // copy_matrix(matrix, matrix_);
                        bestPos = i;
                        bestK = k;
                    }

                    matrix[i] = 0;
                }
                digits[k] = false;
            }
            const result = isFirstStep ? best2 : best1;
            return {result: result, bestK: bestK, bestPos: bestPos};
        };

        return {
            solve_matrix_flat: solve_matrix_flat,
            fill_digits: fill_digits,
            isFirstStep: is_first
        }
    }();

    const presenter = function (solver_) {
        let activeCellIndex = -1;
        let activeDigitIndex = -1;

        let bestDigit = -1;
        let bestPos = -1;
        let currResult = 0;
        const matrix_result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const makeMove = function () {
            console.time("stepTime");
            const res = solver_.solve_matrix_flat(matrix_result);
            console.timeEnd("stepTime");
            console.log(res.result);
            currResult = res.result;
            bestPos = res.bestPos;
            bestDigit = res.bestK;
            if (bestPos >= 0) {
                matrix_result[bestPos] = bestDigit + 1;
            }

            activeCellIndex = -1;
            activeDigitIndex = -1;
        };
        const getResult = function () {
            return currResult;
        };
        const getBestPos = function () {
            return bestPos;
        };

        const getBestDigit = function () {
            return bestDigit;
        };
        return {
            activeCellIndex: activeCellIndex,
            activeDigitIndex: activeDigitIndex,
            matrix_result: matrix_result,
            makeMove: makeMove,
            getBestDigit: getBestDigit,
            getBestPos: getBestPos,
            getResult: getResult
        }
    }(solver);

    const handleClick = function (evt, parent) {
        const getIndex = function (e, parent) {
            const target = e.target || e.srcElement;
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === target) return i;
            }
            return -1;
        };

        evt.preventDefault();
        if (!(evt.target.classList.contains('cell') || evt.target.classList.contains('digit'))) {
            return;
        }
        return getIndex(evt, parent);
    };

    function doStep() {
        if (presenter.activeCellIndex >= 0) {
            if (presenter.matrix_result[presenter.activeCellIndex] > 0) {
                presenter.activeCellIndex = -1;
            }
        }
        let step = -1;
        if (presenter.activeDigitIndex >= 0) {
            const digits_local = [];
            step = solver.fill_digits(presenter.matrix_result, digits_local);
            if (digits_local[presenter.activeDigitIndex]) {
                presenter.activeDigitIndex = -1;
            }
        }
        if (presenter.activeCellIndex >= 0 && presenter.activeDigitIndex >= 0) {
            presenter.matrix_result[presenter.activeCellIndex] = presenter.activeDigitIndex + 1;
            presenter.activeCellIndex = -1;
            presenter.activeDigitIndex = -1;
            // log(step);
            setTimeout(function () {
                presenter.makeMove();
                drawWithAnimation();
                if (step > 5) {
                    const message = ((presenter.getResult() > 0) && solver.isFirstStep(step)) ? "You win" : "You lose";
                    const h2 = overlay.querySelectorAll('h2')[0];
                    h2.textContent = message;
                    const content = overlay.querySelectorAll('.content')[0];
                    content.textContent = "Result " + presenter.getResult();
                    overlay.classList.add('show');
                }
            }, animationTime);
        }
        drawWithAnimation();
    }

    const handleBox = function (evt) {
        presenter.activeCellIndex = handleClick(evt, box);
        doStep();
    };

    const handleClickDigits = function (evt) {
        presenter.activeDigitIndex = handleClick(evt, digits);
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
        // setTimeout(draw, 1000);
        draw();
    }

    const box = document.getElementsByClassName("box")[0];
    const digits = document.getElementsByClassName("digits")[0];
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];

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
            const val = presenter.matrix_result[i];
            tile.textContent = val.toString();

            if (val) {
                tile.className = 'cell disabled';
            } else {
                tile.className = 'cell hole';
            }
            if (presenter.activeCellIndex === i) {
                tile.classList.add('active');
            }
            if (i === presenter.getBestPos()) {
                tile.classList.add("last");
            }
        }

        solver.fill_digits(presenter.matrix_result, digits_local);

        for (let i = 0; i < size_sqr; i++) {
            const tile = digits.childNodes[i];
            const used = digits_local[i];
            const val = i + 1;
            tile.textContent = val.toString();
            tile.className = 'digit';

            if (used) {
                tile.classList.add('disabled');
            }
            if (presenter.activeDigitIndex === i) {
                tile.classList.add('active');
            }
            if (i === presenter.getBestDigit()) {
                tile.classList.add("last");
            }
        }
    }

    box.addEventListener("click", handleBox, false);
    digits.addEventListener("click", handleClickDigits, false);
    close.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);
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
