"use strict";

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

let myWorker = null;
if (window.Worker) {
    myWorker = new Worker("worker.js");
}

function jsSolver(size_sqr, solver_) {
    const INF = 500;
    const MINUS_INF = -500;


    let bestK = -1;
    let bestPos = -1;
    const is_first = step => step % 2 === 0;

    const copy_matrix = (src, dst) => {
        for (let i = 0; i < size_sqr; ++i) {
            dst[i] = src[i];
        }
    };

    const who_wins = function (matrix, digits, step, best1, best2) {

        if (step === size_sqr) {
            return solver_.determinant(matrix);
        }

        let digits_count = 0;
        for (let k = 0; k < size_sqr; ++k) {
            if (digits[k]) {
                continue;
            }

            ++digits_count;
            // TODO check this
            if (digits_count === 2 && step === size_sqr - 2) {
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
                } else {
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

    const solve_matrix_flat = function (matrix_) {

        const matrix = [];
        copy_matrix(matrix_, matrix);

        const digits = [];
        let step = solver_.fill_digits(matrix, digits);
        let best1 = INF;
        let best2 = MINUS_INF;
        const isFirstStep = is_first(step);
        if (step === size_sqr) {
            best1 = who_wins(matrix, digits, step, best1, best2);
            bestK = -1;
            bestPos = -1;
        }

        for (let k = 0; k < size_sqr; ++k) {
            if (digits[k]) {
                continue;
            }
            digits[k] = true;
            for (let i = 0; i < size_sqr; ++i) {
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
                } else {
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
        solve_matrix_flat: solve_matrix_flat
    }
}

function ai(solver_, presenter_, afterMove) {
    let lastMoveTime = null;

    function onAiMoveWithAnimation(res) {
        presenter_.onAiMove(res);
        const currTime = new Date();
        const minMoveTime = 700;
        if (lastMoveTime && currTime - lastMoveTime < minMoveTime) {
            // console.log(currTime - lastMoveTime);
            setTimeout(afterMove, minMoveTime - (currTime - lastMoveTime));
        } else {
            console.log("Why Instant?");
            afterMove();
        }
    }

    const makeMove = function () {
        let step = presenter_.getStep();
        lastMoveTime = new Date();
        if (step === presenter_.matrix_result.length) {
            let best1 = solver_.determinant(presenter_.matrix_result);
            onAiMoveWithAnimation({result: best1, bestK: -1, bestPos: -1});
            return lastMoveTime;
        }

        if (step === 0 && solver_.getSize() === 3) {
            let bestPos = randomInteger(0, presenter_.matrix_result.length);
            onAiMoveWithAnimation({result: 40, bestK: 4, bestPos: bestPos});
            return lastMoveTime;
        }

        if (solver_.getSize() === 3) {
            const matrixVal = solver_.matrix_to_int(presenter_.matrix_result);
            myWorker.postMessage(matrixVal);
        } else if (solver_.getSize() === 2) {
            const qSolver = jsSolver(4, solver_);
            const res = qSolver.solve_matrix_flat(presenter_.matrix_result);
            onAiMoveWithAnimation(res);
        }

        return lastMoveTime;
    };

    function onWorkerMove(val) {
        const res = solver_.int_to_result(val);
        onAiMoveWithAnimation(res);
    }

    const handleWorkerMessage = function (e) {
        onWorkerMove(e.data);
    };

    myWorker.addEventListener('message', handleWorkerMessage, false);

    return {
        makeMove: makeMove
    }

}
export {ai}
