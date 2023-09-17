"use strict";

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};
let myWorker = null;
try {
    myWorker = new Worker(new URL("./worker.js", import.meta.url));
} catch (e) {
    console.log(e);
}

function jsSolver(solver_) {
    const size_sqr = solver_.getSizeSqr();
    const INF = 500;
    const MINUS_INF = -500;

    const is_first = step => step % 2 === 0;

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
        let bestK = -1;
        let bestPos = -1;
        const matrix = [];
        solver_.copy_matrix(matrix_, matrix);

        const digits = [];
        const step = solver_.fill_digits(matrix, digits);
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
    };
}

export default function ai(solver_) {
    let lastMoveTime = null;
    const handlers = {};

    function onAiMoveWithAnimation(res, callback) {
        if (!callback) {
            console.log("No function");
        }
        const currTime = new Date();
        const minMoveTime = 700;
        let timeRest = 0;
        if (lastMoveTime) {
            const timeDiff = currTime - lastMoveTime;
            timeRest = Math.max(minMoveTime - timeDiff, 0);
        }
        setTimeout(() => callback(res), timeRest);
    }

    const makeMove = function (matrix_result, callback) {
        const digits = [];
        const step = solver_.fill_digits(matrix_result, digits);
        lastMoveTime = new Date();
        if (step === matrix_result.length) {
            let best1 = solver_.determinant(matrix_result);
            onAiMoveWithAnimation({result: best1, bestK: -1, bestPos: -1}, callback);
            return lastMoveTime;
        }

        if (step === 0 && solver_.getSize() === 3) {
            let bestPos = randomInteger(0, matrix_result.length);
            onAiMoveWithAnimation({result: 40, bestK: 4, bestPos: bestPos}, callback);
            return lastMoveTime;
        }

        if (solver_.getSize() === 3 && myWorker) {
            const matrixVal = solver_.matrix_to_int(matrix_result);
            const label = new Date().toISOString();
            handlers[label] = callback;
            myWorker.postMessage({input: matrixVal, label: label});
        } else {
            const qSolver = jsSolver(solver_);
            const res = qSolver.solve_matrix_flat(matrix_result);
            onAiMoveWithAnimation(res, callback);
        }

        return lastMoveTime;
    };

    if (myWorker) {
        const handleWorkerMessage = function (e) {
            console.log(e.data.label);
            const res = solver_.int_to_result(e.data.result);
            const callback = handlers[e.data.label];
            delete handlers[e.data.label];
            onAiMoveWithAnimation(res, callback);
        };

        myWorker.addEventListener("message", handleWorkerMessage, false);
    }

    return {
        makeMove: makeMove
    };

}
